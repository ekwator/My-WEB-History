<?php
// $Id$
/**
 * @file
 * JSON handlers
 */

/**
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 * json menu handlers to make correct answers for plupload requests
 */
function _advupload_error_message($code) {
  $error_messages = array(
    600 => t('Unsupported usage of upload module'),
    601 => t('Wrong tokens. Form you use is incorrect. Try reload page'),
    603 => t('You\'re using upload JSON script incorrectly. Try reload page'),
    604 => t('Thats impossible - 0 chunks in one upload. Tell to site administration'),
    605 => t('Filename is not valid'),
    // no in $_FILES or no is_uploaded_file()
    606 => t('Something wrong with file upload on the server. Tell to the server administrator'),
    607 => t('Can not create or open temporary file for writing'),
    608 => t('Error during temporary file saving while reading input file'),
    609 => t('Error during temporary file saving while writing input file'),
    610 => t('Wrong chunk number'),
    611 => t('Database error occured'),
    612 => t('Too large file for upload. Sorry.'),
    613 => t('Internal module API error. If you\'re site administrator please tell to developer about that'),
    614 => t('File you\'re going to upload is to large'),
    615 => t('Chunk number is not null but no temporary file for it'),
    616 => t('Uploaded chuncks have more filesize then was declared'),
    617 => t('Uploaded file size differs from declared'),
    666 => t('Unknown error'),
    618 => t('Internal system misconfiguration error. Contact administrator'),
    619 => t('Cannot create directory for new uploaded file'),
    620 => t('Error while saving uploaded file'),
    621 => t('Something wrong with POST token variables while upload'),
    622 => t('Error - wrong interaction token checksums or they are not present'),
    623 => t('Internal system error while token checking'),
    624 => t('You\'re make attempt upload files with total filesize larger then it\'s allowed upload per one node'), 
    800 => t('You\'re trying upload file with wrong extension'),
  );
  return isset($error_messages[$code]) ? $error_messages[$code] : $error_messages[666];
}

function _advupload_error_die($code = 666, $additional = array()) {
  die(
    drupal_to_js(
      array(
        'jsonrpc' => '2.0',
        'error' => array('code' => $code, 'message' => _advupload_error_message($code)),
        'error_data' => $additional,
        'id' => 'id',
      )
    )
  );
}

// for now it just works for $uptype = multinode
// later we will make more function calls just from one place depending on $uptype
function advupload_json_upload($type, $uptype) {
  /*  
 * $_POST structure is
 * 'chunk'  chunk number
 * 'chunks'  chunck count
 * 'name' initial filename
 * 'drupal_node_title' node title for the new node
 * 'token_name' - form token for checks
 * 'token_value' - checksum to check form is correct
 *  'file_size' - size of file we're going to upload
 * For onenode upload case interaction we do use:
 * 'advupload_nid' - created node nid - if node was created and we must add files to it
 * 'advupload_nid_token', 'advupload_nid_token_value' - to protect site from smart asshole hackers :-)
 * see same token, token_value checks in advupload_json_node_list()
 */
  global $user;
  module_load_include('inc', 'advupload', 'advupload.api');
  drupal_set_header('Content-type: text/javascript; charset=utf-8');
  drupal_set_header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  drupal_set_header('Last-Modified: '. gmdate('D, d M Y H:i:s') .' GMT');
  drupal_set_header('Cache-Control: no-store, no-cache, must-revalidate');
  drupal_set_header('Pragma: no-cache');
  if (!(isset($_POST['token_name']) && isset($_POST['token_value']))) {
    _advupload_error_die(603);
  }
  if (!drupal_valid_token($_POST['token_value'], $_POST['token_name'])) {
    _advupload_error_die(601);
  }
  $old_uniqid = str_replace('advupload_plupload_'. $type .'_'. $uptype .'_', '', $_POST['token_name']);
  $messages   = array();
  $tmpdir     = _advupload_get_tmp();
  $chunk      = @intval($_POST['chunk']);
  $chunks     = @intval($_POST['chunks']);
  // form the too smart assholes :-)
  if ($chunk >= $chunks) {
    _advupload_error_die(610, $_POST);
  }
  if ($chunks == 0) {
    _advupload_error_die(604);
  }
  if ($chunk == 0) {  // SECURITY PROTECTION AGAINST IDIOTS :)
    $result =  db_query(
      'SELECT * FROM {files} WHERE uid=%d AND status=%d AND filepath LIKE \'%s\'',
      $user->uid, FILE_STATUS_TEMPORARY, $tmpdir . '%'
    );
    $badfl = array();
    while($o = db_fetch_object($result) ) $badfl []= $o;
    $delnums = '';
    foreach($badfl as $o) {
      $delnums .= (empty($delnums) ? '' : ', ') . $o->fid;
      @file_delete($o->filepath);
    }
    if(!empty($delnums) ) db_query('DELETE FROM {files} WHERE fid in (%s)', $delnums);
    unset($badfl);
  }
  $file_size = @intval($_POST['file_size']);
  $fieldname = variable_get('advupload_type_'. $type .'_fieldname', '');
  if (empty($fieldname)) {
    _advupload_error_die(618, $_POST);
  }
  $fieldsettings = _advupload_get_filefield_settings($type, $fieldname);
  if (!is_numeric($fieldsettings['max_filesize_per_file'])) {
    _advupload_error_die(613);
  }
  $max_filesize_per_file = @intval($fieldsettings['max_filesize_per_file'] );
  $max_filesize_per_node = @intval($fieldsettings['max_filesize_per_node'] );
  $allowed_extensions = $fieldsettings['file_extensions'];
  if ($fieldsettings['max_filesize_per_file'] > 0) if ($file_size > $fieldsettings['max_filesize_per_file']) {
    _advupload_error_die(614, $_POST);
  }
  $fname = empty($_POST['name']) ? '' : $_POST['name'];
  if (function_exists('transliteration_get')) {
    $fname = transliteration_get($fname);// language_default() );
  }
  $tmp_parts =  explode(DIRECTORY_SEPARATOR,  $fname);
  $fname = $tmp_parts[count($tmp_parts) - 1];
  // try validate extensions
  $file           = new stdClass();
  $file->filename = $fname;
  $errors         = file_validate_extensions($file, $allowed_extensions);
  unset($file);
  if (count($errors)) {
    _advupload_error_die(800, $_POST);
  }
  unset($errors);
  // this chickens don't know what does unicode means %)
  $fname = file_munge_filename(str_replace(' ', '_', $fname), $allowed_extensions, FALSE);
  if (empty($fname)) {
    _advupload_error_die(605, $_POST);
  }
  if (!isset($_FILES['file']['tmp_name'])) {
    _advupload_error_die(606, $_POST);
  }
  // now we do do check if there is onenode upload type
  $advupload_nid = null;
  $advupload_node = null;
  module_load_include('inc', 'advupload', 'advupload.nodeapi');
  if('onenode' == $uptype) {
    if (isset($_POST['advupload_nid'] ) ){
      if (!(isset($_POST['advupload_nid_token'] ) && isset($_POST['advupload_nid_token_value'] ) ) ) {
        _advupload_error_die(621, $_POST);
      }
      $advupload_nid = @intval($_POST['advupload_nid'] );
      if ( 
        !(
          $advupload_nid
          && (!empty( $_POST['advupload_nid_token_value'] ) ) 
          && drupal_valid_token(
            $_POST['advupload_nid_token_value'], $_POST['token_name'] . $advupload_nid
          )
        )
      ) {
        _advupload_error_die(622, $_POST);
      }
      $advupload_node = node_load(array('nid' => $advupload_nid) );
      if(!($advupload_nid && $advupload_node ) ) {
        _advupload_error_die(623, $_POST);
      }
      // now we do compute total filesize
      if($max_filesize_per_node > 0){
        $sum = _advupload_compute_total_filesize($node, $field_name);
        if ($sum > _advupload_compute_total_filesize) {
          _advupload_error_die(624, $_POST);
        }
      }
    }
  }
  // that will be about unique
  $tmpfname = file_munge_filename($old_uniqid .'-'. $fname, $allowed_extensions, FALSE);
  // !!!! modify if more load and more files in one dir, dir 0/1/2/3/4/5  struct by checksums if needed
  $tmpfpath = $tmpdir .'/'. $tmpfname;
  if ($max_filesize_per_file > 0) if (filesize($_FILES['file']['tmp_name']) > $max_filesize_per_file) {
    _advupload_error_die(614, $_POST);
  }
  // id in database
  $fid = 0;
  if ($chunk > 0) {
    $result = db_query(
      'SELECT fid FROM {files} WHERE uid=%d AND status=%d AND filepath=\'%s\'',
      $user->uid, FILE_STATUS_TEMPORARY, $tmpfpath
    );
    if ($o = db_fetch_object($result)) {
      $fid = $o->fid;
    }
    if ($fid == 0) {
      _advupload_error_die(615, $_POST);
    }
  }
  $out = fopen($tmpfpath, $chunk == 0 ? "wb" : "ab");
  if (!$out) {
    _advupload_error_die(607, $_POST);
  }
  $in = fopen($_FILES['file']['tmp_name'], "rb");
  if (!$in) {
    _advupload_error_die(608, $_POST);
  }
  $noerror = TRUE;
  while ($noerror && ($buff = fread($in, 4096))) {
    $noerror = (fwrite($out, $buff) !== FALSE);
  }
  fclose($in);
  fclose($out);
  if (!$noerror) {
    _advupload_error_die(609, $_POST);
  }
  $nowsize = filesize($tmpfpath);
  // cleanup, death
  if ($nowsize > $file_size) {
    @unlink($tmpfpath);
    if ($fid) {
      db_query('DELETE FROM {files} WHERE fid=%d', $fid);
    }
    _advupload_error_die(616, $_POST);
  }
  if ($fid) {
    db_query('UPDATE {files} SET filesize=%d, timestamp=%d WHERE fid=%d', $fid, time());
  }
  else {
    if (
      !db_query(
        'INSERT INTO {files}(uid,filename,filepath,filesize,status,timestamp) VALUES(%d, \'%s\', \'%s\', %d, %d, %d)',
        $user->uid, $fname, $tmpfpath, $nowsize, FILE_STATUS_TEMPORARY, time()
      )
    ) {
      advupload_error_die(611, $_POST);
    }
    $fid = db_last_insert_id('files', 'fid');
    if (!$fid) {
      advupload_error_die(611, $_POST);
    }
  }
  if ($chunks > 1 && $chunk < $chunks - 1) {
    die(drupal_to_js(array('jsonrpc' => '2.0', 'result' => NULL, 'id' => 'id')));
  }
  if ($nowsize != $file_size) {
    @unlink($tmpfpath);
    db_query('DELETE FROM {files} WHERE fid=%d', $fid);
    _advupload_error_die(617, $_POST);
  }
  $node_title = empty($_POST['drupal_node_title']) ? $fname : $_POST['drupal_node_title'];
  $field = content_fields($fieldname, $type);
  module_load_include('inc', 'filefield', 'filefield_widget');
  $directory = filefield_widget_file_path($field);
  module_load_include('inc', 'filefield', 'field_file');
  if (!field_file_check_directory($directory, FILE_CREATE_DIRECTORY)) {
    @unlink($tmpfpath);
    db_query('DELETE FROM {files} WHERE fid=%d', $fid);
    _advupload_error_die(619, $_POST);
  }
  // we had had validate all of thing upper via widget values so do not need everything anymore
  $validators = array();
  $form_state_values = array(
    'title' => $node_title,
    'body' => '',
    $fieldname => array(
      0 => array(
        'fid' => 0,
        'list' => '1',
        'data' => array(
          'description' => '',
          'alt' => '',
          'title' => '',
        ),
        'alt' => '',
        'title' => '',
        'filepath' => '',
        'filename' => '',
        'filemime' => '',
        'filesize' => 0,
        'filefield_upload' => 'Upload',
        'filefield_remove' => 'Remove',
        'upload' => 0,
      ),
      'node_status' => NULL,
    ),
  );
  if ($file = _advupload_field_file_save_file($tmpfpath, $directory, $fname)) {
    // no need to unlink temporary - it's moved
    db_query('DELETE FROM {files} WHERE fid=%d', $fid);
    $file['original_path'] = $tmpfpath;
    // now we must create node
    $addfields = array();
    foreach($_POST as $key => $value)if(strpos($key, 'node_') === 0) {
      $key1 = substr($key, 5);
      if(!empty($key1) ) $addfields[$key1] = $value;
    }
    // add here $uptype multinode/onenode saving difference based on
    // $advupload_nid and $advupload_node 
    // shorten logic
    if ($advupload_nid && $advupload_node){
      $node = $advupload_node;
      _advupload_save_node_addfield($node, $field, $file);
    } else { // here is multinode variant or first node for onenode variant :)
      $node = _advupload_create_node($type, $field, $form_state_values, $file, $addfields);
    }
    cache_clear_all();
    die(
      // drupal_to_js not enough ;-(
      drupal_to_js(
        array(
          'jsonrpc' => '2.0', 'result' => 'success', 'id' => 'id',
          'data' => array(
            // if there will be need in nid ;-)
            'nid' => $node->nid,
            'newtokenvalue' => drupal_get_token($_POST['token_name'] . $node->nid),
          ),
        )
      )
    );
  }
  else {
    @unlink($tmpfpath);
    db_query('DELETE FROM {files} WHERE fid=%d', $fid);
    _advupload_error_die(620, $_POST);
  }
  _advupload_error_die(603);
}

function advupload_json_node_list() {
  global $user;
  drupal_set_header('Content-type: text/plain; charset=utf-8');
  $nid         = intval($_GET['nid']);
  $token       = empty($_GET['token']) ? '' : $_GET['token'];
  $token_value = empty($_GET['token_value']) ? '' : $_GET['token_value'];
  if ($nid && (!empty($token)) && (!empty($token_value)) && drupal_valid_token($token_value, $token . $nid)) {
    die(
      drupal_to_js(
        array(
          'result' => array(
            'nid' => $nid,
            'url' => url('node/' . $nid, array('absolute' => TRUE) ), 
            'html' => theme('advupload_json_edit_node_draw', $nid),
          ),
        )
      )
    );
  }
  drupal_set_header('HTTP/1.1 404 Not Found');
  die(drupal_to_js(array()));
}

