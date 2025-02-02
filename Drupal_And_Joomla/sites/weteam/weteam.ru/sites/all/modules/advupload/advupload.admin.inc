<?php
// $Id$
/**
 * @file
 * Admin settings page, forms, validation, different things
 */

/**
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 * Admin pages
 */
function advupload_admin_settings_form() {
  return drupal_get_form('advupload_admin_settings');
}

function advupload_admin_settings() {
  $form = array();
  drupal_add_js(drupal_get_path('module', 'advupload') .'/js/advupload.admin.js', 'module', 'footer');
  drupal_add_css(drupal_get_path('module', 'advupload') .'/css/advupload.css', 'module');
  $form['library-paths'] = array(
    '#type' => 'fieldset',
    '#title' => t('Plupload library paths'),
    'advupload_pathtopluploadlibrary' => array(
      '#type' => 'textfield',
      '#title' => t('Path to JavaScript Plupload library'),
      '#description' => t('Enter path to plupload library. Download from <a href="http://www.plupload.com">www.plupload.com</a> and place plupload folder for example in sites/all/libraries<br />It\'s also strongly recommended delete php and html files in the examples directory'),
      '#default_value' => variable_get('advupload_pathtopluploadlibrary', 'sites/all/libraries'),
    ),
    'advupload_temporary' => array(
      '#type' => 'textfield',
      '#title' => t('Name of directory for temporary files'),
      '#description' => t(
        'This directory will be created inside !sub to store files while chunked uploading',
        array('!sub' => file_directory_path())
      ),
      '#default_value' => variable_get('advupload_temporary', 'advupload_tmp'),
    ),
  );
  $form['advupload-node-settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Settings for node types with filefield fields'),
    '#attributes' => array('id' => 'advupload-node-settings'),
  );
  module_load_include('inc', 'advupload', 'advupload.api');
  $fl = _advupload_get_types_filefields();
  $nt = node_get_types();
  foreach ($fl as $type => $fields) {
    $options = array();
    foreach ($fields as $fn => $field) {
      //var_dump($field);
      $options[$field['field_name']] = $field['field_name'] . (isset($field['widget']['label']) ? (' ('. $field['widget']['label'] .') ') : '');
    }
    $form['advupload-node-settings']['advupload-settings-'. $type] = array(
      '#type' => 'fieldset',
      '#title' => t('Settings for node type &quot;@type&quot;(@name)', array('@type' => $nt[$type]->name, '@name' => $type)),
      'advupload_type_'. $type => array(
        '#type' => 'checkbox',
        '#title' => t('Use advanced file upload for &quot;@type&quot;', array('@type' => $nt[$type]->name)),
        '#default_value' => variable_get('advupload_type_'. $type, FALSE),
      ),
      'advupload_type_'. $type .'_fieldname' => array(
        '#type' => 'select',
        '#title' => t('Select field you want to use with the upload form'),
        '#default_value' => variable_get('advupload_type_'. $type .'_fieldname', ''),
        '#options' => $options,
      ),
      'advupload_type_'. $type .'_uploadtype' => array(
        '#type' => 'select',
        '#title' => t('Select the way how to create nodes'),
        '#default_value' => variable_get('advupload_type_'. $type .'_uploadtype', 'multinode'),
        '#options' => array(
          'multinode' => t('Create new node per each file'),
          'onenode' => t('Create only one node, containing all the files'),
          'both' => t('Provide both variants - node per file, many nodes per file')
        ),
      ),
    );
  }
  $form = system_settings_form($form);
  $form['#submit'][] = 'advupload_admin_settings_submit';
  return $form;
}

function advupload_admin_settings_submit($form, &$form_state) {
  menu_rebuild();
  cache_clear_all();
}

function advupload_admin_settings_validate($form, &$form_values) {
  global $base_path;
  $lp = $form_values['values']['advupload_pathtopluploadlibrary'];
  $lp = $lp . DIRECTORY_SEPARATOR .'plupload'. DIRECTORY_SEPARATOR .'js'. DIRECTORY_SEPARATOR .'plupload.js';
  //die($lp);
  if (!file_exists($lp)) {
    form_set_error('advupload_pathtopluploadlibrary', t('plupload library is not placed in directory you\'ve entered!'));
  }
  $lp = file_directory_path() . DIRECTORY_SEPARATOR . $form_values['values']['advupload_temporary'];
  if (!(is_dir($lp) || mkdir($lp, 0777, TRUE))) {
    form_set_error('advupload_temporary', t('Wrong temporary directory selected or error creatin directory'));
  }
}

