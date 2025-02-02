<?php
/**
 * Submodule for advanced upload pages, to add node information form 
 * with textarea for short body description text and select form components for current 
 * node taxonomy tags clicking set info button
 * Administration area.
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 */
 

function advupload_nodeinfo_admin_settings() {
  $form = array();
  $form['advupload_nodeinfo_filter_format'] = array(
    '#type' => 'select',
    '#multiple' => FALSE,
    '#title' => t('Default node input format'),
    '#description' => t('Select default input format to use in upload form'),
    '#default_value' => variable_get('advupload_nodeinfo_filter_format', FILTER_FORMAT_DEFAULT),
  );
  $formats = filter_formats();
  foreach ($formats as $format) {
    $form['advupload_nodeinfo_filter_format']['#options'][$format->format] = $format->name;
  }
  $form = system_settings_form($form);
  return $form;
}
