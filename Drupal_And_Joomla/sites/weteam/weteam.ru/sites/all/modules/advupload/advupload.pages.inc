<?php
// $Id$
/**
 * @file
 * Function to implement basic upload pages
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 */

/**
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 * upload area
 */
define('ADVUPLOAD_DEBUG_JS', 0);
function advupload_main_page() {
  $item = menu_get_item();
  $content = system_admin_menu_block($item);
  return theme('advupload_add_list', $content);
}
/*
 * store data from modules to enchance upload  form
 */
function _advupload_add_custom_form_values($module = NULL, $data = NULL){
  static $formstruct;
  if (!isset($formstruct) ) $formstruct = array();
  if (is_null($module) ) return $formstruct;
  $formstruct[$module] = $data;
  return null;
}
/*
 * Sorts array from _advupload_add_custom_form_values() according to weight in there
 **/
function _advupload_draw_additional_form_fields(){
  $formstruct = _advupload_add_custom_form_values();
  $newarr = array();
  if(count($formstruct) ){
    foreach ($formstruct as $module => $struct) {
      if (isset($struct['weight']) && isset($struct['html'] ) ) {
        if (!isset($newarr[$struct['weight'] ]  ) ){
          $newarr[$struct['weight'] ] =  array();
        }
        $newarr[$struct['weight'] ] [$module] = $struct['html'];
      }
    }
  }
  if(count($newarr) ) {
    ksort($newarr);
    $out = '';
    foreach($newarr as $struct) foreach($struct as $module => $html) {
      $out .= '<div id="adupload-uploader-input-' . $module . '">' . $html . '</div>';
    }
    return $out;
  }
  
  return false;
}
function advupload_bulk_upload_page($type, $uptype = 'multinode') {
  $libpath = variable_get('advupload_pathtopluploadlibrary', 'sites/all/libraries');
  $mpath = drupal_get_path('module', 'advupload');
  // gears if client have that
  module_load_include('inc', 'advupload', 'advupload.api');
  $fieldname = variable_get('advupload_type_'. $type .'_fieldname', '');
  // error
  if (empty($fieldname)) {
    return;
  }
  $fieldsettings = _advupload_get_filefield_settings($type, $fieldname);
  if (!$fieldsettings) {
    /* !!!!!! for future rework that */
    return t('Site configuration error!');
  }
  // uniqid is so unique!!11
  // token to check all is correct
  $token_name = 'advupload_plupload_'. $type .'_'. $uptype .'_'. str_replace('.', '_', uniqid('', TRUE));
  $settings = array(
    'advupload' => array(
      'plupload' => array(
        'max_filesize_per_file' => $fieldsettings['max_filesize_per_file'],
        // plupload JS engine settings
        'chunk_size' => (1048576 < file_upload_max_size()) ? 1048576 : (file_upload_max_size() / 4),
        'flash_swf_url' => url($libpath .'/plupload/js/plupload.flash.swf'),
        'silverlight_xap_url' => url($libpath .'/plupload/js/plupload.silverlight.xap'),
        'runtimes' => 'flash,silverlight,gears',
        // f...cking html5 sends non multipart data so we can not sent post parameters ;-(
        // !!!!! learn more docs later - to find ways
        // depending on that there
        'uploadtype' => $uptype,
        // for now url such clear - drupal token goes to multipart parameters
        // i hope to POST request
        'url' => url('advupload/json/upload/'. $uptype .'/'. $type),
        'node_json_url' => url('advupload/json/nodelist'),
        'filters' => array(
          array(
            'title' => $fieldsettings['label'],
            'extensions' => str_replace(
              ' ', ',',
              $fieldsettings['file_extensions'] .
              (empty($fieldsettings['file_extensions']) ? '' : (','. strtoupper($fieldsettings['file_extensions'])))
            ),
          ),
        ),
        // our specific settings
        'drupal_token_name' => $token_name,
        'drupal_token_value' => drupal_get_token($token_name),
        // if system allow make precheck before sending file - there will be token exchange
        'check_url' => url('advupload/json/token/'. $uptype .'/'. $type),
        // for future complex forms  - for singlenode-multinode - no need
        // for uptype - onenode - we need
        'drupal_max_total_upload_size' => ($uptype == 'multinode') ? 0 : $fieldsettings['max_filesize_per_node'],
        'drupal_type_title_label' => theme('typetitle_label', $type),
      ),
    ),
  );
  drupal_add_js($settings, 'setting');
  drupal_add_css($mpath .'/css/plupload.queue.css', 'module');
  drupal_add_css($mpath .'/css/advupload.css', 'module');
  
  
  drupal_add_js($libpath .'/plupload/js/plupload.js');
  drupal_add_js($libpath .'/plupload/js/plupload.flash.js');
  drupal_add_js($libpath .'/plupload/js/plupload.gears.js');
  
  drupal_add_js($mpath .'/js/jquery.plupload.advupload.js');
  module_invoke_all('advupload_pages', $type, $uptype);
  drupal_add_js($mpath .'/js/page.plupload.js', 'module', 'footer');
  $modulesfields = _advupload_draw_additional_form_fields();
  // hook - divs for extensibility
  $out = '<div id="advupload-messages"></div><div id="advupload-uploader-hook-interface"></div>
<div id="advupload-uploader-wrapper">
  <div id="advupload-uploader-input-values">
    <div id="advupload-uploader-input-values-own"></div><div id="advupload-uploader-input-values-modules">' 
    . ($modulesfields ? $modulesfields : '')
    . '</div>
  </div>
  <div id="advupload-uploader">'. t('Loading upload form...<br />If you ever see this text - that just mean that your browser does not support Flash, Silverlight or JavaScript.') .'</div>
  <div id="advupload-uploader-additional">
    <div id="advupload-uploader-hook-pre"></div>
    <div id="advupload-uploader-additional-own"></div>
    <div id="advupload-uploader-hook-post"></div>
  </div>
</div>';
  return $out;
}

