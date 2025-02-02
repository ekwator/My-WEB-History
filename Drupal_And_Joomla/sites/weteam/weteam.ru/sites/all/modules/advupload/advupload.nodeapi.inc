<?php
// $Id$
/**
 * @file
 * Here is simple API to programmatically load file, than move() it - because for large files it's faster
 * So here we emulate and use some Drupal API in non standard way because we need that
 */

/**
 * our custom impleentation of field_file_save_file
 * but we not copy file - we make move of them
 *
 **/
function _advupload_field_file_save_file($filepath, $dest, $fname, $validators = array()) {
  global $user;
  module_load_include('inc', 'filefield', 'field_file');
  $account = $user;
  $validators = array();
  // Add in our check of the the file name length.
  $validators['file_validate_name_length'] = array();

  // Begin building file object.
  $file           = new stdClass();
  $file->uid      = $account->uid;
  $file->filename = $fname;
  $file->filepath = $filepath;
  $file->filemime = module_exists('mimedetect') ? mimedetect_mime($file) : file_get_mimetype($file->filename);

  // Rename potentially executable files, to help prevent exploits.
  if (preg_match('/\.(php|pl|py|cgi|asp|js)$/i', $file->filename) && (substr($file->filename, -4) != '.txt')) {
    $file->filemime = 'text/plain';
    $file->filepath .= '.txt';
    $file->filename .= '.txt';
  }


  $file->source = 'field_file_save_file';
  $file->destination = file_destination(file_create_path($dest .'/'. $file->filename), FILE_EXISTS_RENAME);
  // for future moar filesize
  $file->filesize = filesize($filepath);

  // Call the validation functions.
  $errors = array();
  foreach ($validators as $function => $args) {
    // Add the $file variable to the list of arguments and pass it by
    // reference (required for PHP 5.3 and higher).
    array_unshift($args, NULL);
    $args[0] = &$file;
    $errors = array_merge($errors, call_user_func_array($function, $args));
  }

  // !!!! do we need that bullshit? :-)
  if (false) if (!empty($errors)) {
    $message = t('The selected file %name could not be saved.', array('%name' => $file->filename));
    if (count($errors) > 1) {
      $message .= '<ul><li>'. implode('</li><li>', $errors) .'</li></ul>';
    }
    else {
      $message .= ' '. array_pop($errors);
    }
    form_set_error($file->source, $message);
    return 0;
  }

  if (!file_move($file, $file->destination, FILE_EXISTS_RENAME)) {
    //form_set_error($file->source, t('File upload error. Could not move uploaded file.'));
    //watchdog('file', 'Upload error. Could not move file %file to destination %destination.', array('%file' => $file->filename, '%destination' => $file->destination));
    return 0;
  }

  // If we made it this far it's safe to record this file in the database.
  $file->status = FILE_STATUS_TEMPORARY;
  $file->timestamp = time();
  // Insert new record to the database.
  drupal_write_record('files', $file);

  // Let modules add additional properties to the yet barebone file object.
  foreach (module_implements('file_insert') as $module) {
    $function = $module .'_file_insert';
    $function($file);
  }
  // cache the file in order to minimize load queries
  _field_file_cache($file);
  return (array)$file;
}

function _advupload_create_node($type, $field, $form_state_values, $file, $addfields = array()) {
  global $user;
  module_load_include('inc', 'node', 'node.pages');
  $node        = new stdClass();
  $node->type  = $type;
  $node->uid   = $user->uid;
  $node->name  = $user->name;
  $node->title = $form_state_values['title'];
  $node->body  = $form_state_values['body'];
  node_object_prepare($node);
  // add filefield to the node
  $field_name = $field['field_name'];
  $node->$field_name = array($file);
  // do we need that? the above hook may make all
  // Add any additional cck fields set during import.
  $tf = content_types($type);
  if (!empty($tf['fields'])) {
    foreach ($tf['fields'] as $name => $field) {
      if ($field['type'] != 'filefield') {
        $node->$name = $form_state_values[$name];
      }
    }
  }
  $node->form_id = $node->type .'_node_form';
  // there were some issues with that, so it will be so as done
  foreach (module_implements('advupload_presubmit') as $module) {
    $function = $module .'_advupload_presubmit';
    $function($node, $addfields);
  }
  $node = node_submit($node);
  // now here ready node structure. but may be we will need integration hooks like saving in OG or saving into gallery/chapter/ect
  // this two hooks go before and after node save to store additional fields into node
  foreach (module_implements('advupload_prenodesave') as $module) {
    $function = $module .'_advupload_prenodesave';
    $function($node, $addfields);
  }
  node_save($node);
  foreach (module_implements('advupload_postnodesave') as $module) {
    $function = $module .'_advupload_postnodesave';
    $function($node, $addfields);
  }
  return $node;
}
// adds field to node and after that save them
function _advupload_save_node_addfield($node, $field, $file){
  global $user;
  module_load_include('inc', 'node', 'node.pages');
  $field_name = $field['field_name'];
  array_push($node->$field_name,$file);
  module_invoke_all('advupload_before_node_addfield', $node);
  node_save($node);
  module_invoke_all('advupload_after_node_addfield', $node);
}
function _advupload_compute_total_filesize($node, $field_name){
  $sum = 0;
  if (isset($node->$field_name) &&  is_array($node->$field_name) && count($node->$field_name) )
  foreach($node->$field_name as $field) if(isset($field['filesize'] ) ) $sum += $field['filesize'];
  return $sum;
}
