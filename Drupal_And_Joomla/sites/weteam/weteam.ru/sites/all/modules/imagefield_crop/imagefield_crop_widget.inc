<?php


// load imagefield widget, so we can extend it, and not fully replace it
module_load_include('inc','imagefield', 'imagefield_widget');


function imagefield_crop_widget_settings_form($widget) {
  $form = module_invoke('imagefield', 'widget_settings_form', $widget);
  $form['resolution'] = array(
    '#type' => 'textfield', 
    '#title' => t('The resolution to crop the image onto'), 
    '#default_value' => isset($widget['resolution']) ? $widget['resolution'] : '200x150',
    '#size' => 15, 
    '#maxlength' => 10, 
    '#description' => 
    t('The output resolution of the cropped image, expressed as WIDTHxHEIGHT (e.g. 640x480). Set to 0 not to rescale after cropping. Note: output resolution must be defined in order to present a dynamic preview.'),
    '#element_validate' => array('_imagefield_crop_widget_settings_resolution_validate'),
  );
  $form['enforce_ratio'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enforce crop box ratio'),
    '#default_value' => isset($widget['enforce_ratio']) ? $widget['enforce_ratio'] : 1,
    '#description' => t('Check this to force the ratio of the output on the crop box. NOTE: If you leave this unchecked but enforce an output resolution, the final image might be distorted.'),
    '#element_validate' => array('_imagefield_crop_widget_settings_enforce_ratio_validate'),
  );
  $form['enforce_minimum'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enforce minimum crop size based on the output size'),
    '#default_value' => isset($widget['enforce_minimum']) ? $widget['enforce_minimum'] : 1,
    '#description' => t('Check this to force a minimum cropping selection equal to the output size. NOTE: If you leave this unchecked you might get zoomed pixels if the cropping area is smaller than the output resolution.'),
    '#element_validate' => array('_imagefield_crop_widget_settings_enforce_minimum'),
  );
  $form['croparea'] = array(
    '#type' => 'textfield',
    '#title' => t('The resolution of the cropping area'),
    '#default_value' => isset($widget['croparea']) ? $widget['croparea'] : '500x500',
    '#size' => 15,
    '#maxlength' => 10,
    '#description' => t('The resolution of the area used for the cropping of the image. Image will displayed at this resolution for cropping. Use WIDTHxHEIGHT format, zero values are permitted, e.g. 500x0 will limit crop box to 500 pixels width.'),
    '#element_validate' => array('_imagefield_crop_widget_settings_croparea_validate'),
  );
  
  return $form;
}

function _imagefield_crop_widget_settings_resolution_validate($element, &$form_state) {
  if ($form_state['values']['resolution'] == 0) {
    $rw = $rh = 0;    
  }
  else {
    list($rw, $rh) = explode('x', $form_state['values']['resolution']);
  }
  if ($form_state['values']['enforce_ratio'] &&
      (!is_numeric($rw) || intval($rw) != $rw || $rw <= 0 ||
       !is_numeric($rh) || intval($rh) != $rh || $rh <= 0)) {
    form_error($element, t('Target resolution must be defined as WIDTHxHEIGHT if resolution is to be enforced.'));
  }
  if (($rw != $rh) && ($rw == 0 || $rh == 0)) {
    form_error($element, t('The resolution is not valid. Set to 0x0 if you do not want to rescale.'));
  }
}

function _imagefield_crop_widget_settings_enforce_ratio_validate($element, &$form_state) {
  if ($form_state['values']['resolution'] && !$form_state['values']['enforce_ratio']) {
    drupal_set_message('Output resolution is defined, but not enforced. Final images might be distorted.');
  }
}

function _imagefield_crop_widget_settings_enforce_minimum($element, &$form_state) {
  if ($form_state['values']['resolution'] == 0) {
    $rw = $rh = 0;    
  }
  else {
    list($rw, $rh) = explode('x', $form_state['values']['resolution']);
  }
  if ($form_state['values']['enforce_minimum'] && 
      (!is_numeric($rw) || intval($rw) != $rw || $rw <= 0 ||
       !is_numeric($rh) || intval($rh) != $rh || $rh <= 0)) {
    form_error($element, t('Target resolution must be defined as WIDTH_HEIGHT if minimum is to be enforced.'));
  }
}

function _imagefield_crop_widget_settings_croparea_validate($element,&$form_state) {
  if ($form_state['values']['croparea']) {
    list($cw, $ch) = explode('x', $form_state['values']['croparea']);
    if (!is_numeric($cw) || intval($cw) != $cw || $cw < 0 ||
        !is_numeric($ch) || intval($ch) != $ch || $ch < 0) {
      form_error($element, t('Crop area resolution must be defined as WIDTHxHEIGHT.'));
    }
  }
}

function imagefield_crop_widget_settings_validate($widget) {
  module_invoke('imagefield', 'widget_settings_validate', $widget);
}

function imagefield_crop_widget_settings_save($widget) {
  $settings = array('resolution', 'enforce_ratio', 'croparea', 'enforce_minimum');
  return array_merge($settings, module_invoke('imagefield', 'widget_settings_save', $widget));
}

/**
 * FormAPI theme function. Theme the output of an image field.
 */
function theme_imagefield_crop_widget($element) {
  return theme('form_element', $element, $element['#children']);
}

function imagefield_crop_widget_process($element, $edit, &$form_state, $form) {
  static $added_js = array();

  $module_path = drupal_get_path('module', 'imagefield_crop');
  drupal_add_js($module_path . '/Jcrop/js/jquery.Jcrop.js');
  // We must define Drupal.behaviors for ahah to work, even if there is no file
  drupal_add_js($module_path . '/imagefield_crop.js');
  drupal_add_css($module_path . '/imagefield_crop.css');
  drupal_add_css($module_path . '/Jcrop/css/jquery.Jcrop.css');

  $file = $element['#value'];

  $field = content_fields($element['#field_name'], $element['#type_name']);

  // check remove buttons...
  $remove_name = $element['#field_name'] .'_'. $element['#delta'] .'_remove_btn';
  if (isset($form_state['clicked_button']) && $form_state['clicked_button']['#name'] == $remove_name) {
    return $element;
  }

  if ($field['widget']['resolution']) {
    list($w, $h) = explode('x', $field['widget']['resolution']);

    // ratio is zero when not enforced
    $ratio = $field['widget']['enforce_ratio'] * $w/$h;
  }
  else {
    // no output resolution requested
    $ratio = 0;
    $w = $h = 0;
  }

  if ($field['widget']['croparea']) {
    list($bwidth, $bheight) = explode('x', $field['widget']['croparea']);
  }
  else {
    $bwidth = $bheight = 0;
  }
  $defaults = array(
    'x'       => 0,
    'y'       => 0,
    'width'   => $w ? $w : 50,
    'height'  => $h ? $h : 50,
    'changed' => 0,
  );

  if (!empty($file) && 
      is_file($file['filepath']) &&
      (list($width, $height, $type, $image_attributes) = @getimagesize($file['filepath']))) {

    if ($field['widget']['enforce_ratio']) {
      $image_ratio = $width/$height;
      if ($ratio > $image_ratio) {
        $height = $width/$ratio;
      }
      else {
        $width = $height*$ratio;
      }
      // if the enforced ratio is different, force crop
      $defaults['changed'] = ($ratio != $image_ratio);
      
    }
    $defaults['width'] = $width;
    $defaults['height'] = $height;
  }
  
  $crop_display = $file;
  $crop_display['filepath'] = imagefield_crop_file_admin_crop_display_path($file);
  if (!file_exists($crop_display['filepath'])) {
    // crop_display_path might not exist if we were imagefield_crop is added to existing images
    $crop_display['filepath'] = $file['filepath'];
  }
  $element['data']['cropbox'] = array(
    '#type' => 'markup',
    '#value' => theme('imagefield_crop_cropbox', $crop_display, isset($crop_display['alt']) ? $crop_display['alt'] : '', isset($crop_display['title']) ? $crop_display['title'] : '', NULL, FALSE, $element['#id'] .'-cropbox'),
  );
  
  $element['data']['crop'] = array(
    '#weight' => -10,
  );
  
  foreach ($defaults as $name => $default) {
    $element['data']['crop'][$name] = array(
      '#type' => 'hidden',
      '#title' => $name,
      '#attributes' => array('class' => 'edit-image-crop-'. $name),
      '#value' => !empty($file['data']['crop'][$name]) ? $file['data']['crop'][$name] : $default,
    );
  }
  
  // show dynamic crop preview
  list($preview, $preview_js) = theme('imagefield_crop_dynamic_preview', $crop_display, $field['widget']['resolution']);

  if (!isset($added_js[$element['#id']])) {
    // Add settings only once (for ahah).
    $settings = array(
      $element['#id'] => array(
        'box' => array(
          'ratio' => $ratio,
          'box_width' => (integer)$bwidth,
          'box_height' => (integer)$bheight,
        ),
        'minimum' => array(
          'width'   => $field['widget']['enforce_minimum'] ? $w : NULL,
          'height'  => $field['widget']['enforce_minimum'] ? $h : NULL,
        ),
        'preview' => $preview_js,
      ),
    );
    drupal_add_js(array('imagefield_crop' => $settings), 'setting');
    $added_js[$element['#id']] = TRUE;
  }
  $element['preview'] = array(
      '#type' => 'markup',
      // the jQuery.extend is required for ahah("add another item" button) to work
      '#value' => $preview . '<script type="text/javascript">jQuery.extend(Drupal.settings.imagefield_crop, '. drupal_to_js($settings) .');</script>',

    );

  return $element;
}

function imagefield_crop_widget_value($element, $edit = FALSE) {
  if ($edit && isset($edit['data'])) {
    $file = field_file_load($edit['fid']);
    $field = content_fields($element['#field_name'], $element['#type_name']);
    
    $crop = $edit['data']['crop'];
    if ($field['widget']['resolution']) {
      list($scale['width'], $scale['height']) = explode('x', $field['widget']['resolution']);
    }
    if ($crop['changed']) {
      // save crop time, for preview
      variable_set('imagefield_crop_query_string', REQUEST_TIME);
      _imagefield_crop_resize(imagefield_crop_file_admin_original_path($file),
                              $crop,
                              $scale,
                              $file['filepath']);
    }
  }

  return module_invoke('filefield', 'widget_value', $element, $edit);
}

function imagefield_crop_widget_validate($element) {
  // @todo: Check if crop values are not empty.
}


function theme_imagefield_crop_cropbox($file = NULL, $alt = '', $title = '', $attributes = NULL, $getsize = TRUE, $id) {
  $attributes = array_merge((array)$attributes + array('class' => 'cropbox', 'id' => $id));
  $output = theme('imagefield_image', $file, $alt, $title, $attributes, $getsize);
  $element = array(
    '#type'  => 'element',
    '#title' => t('Crop area'),
    '#id'    => $id,
  );
  return theme('form_element', $element, $output);
}


function theme_imagefield_crop_dynamic_preview($file, $resolution) {
  $file = (array)$file;
  if (!is_file($file['filepath'])) {
    return array('<!-- file not found: '. $file['filepath'] .' -->', '');
  }
  list($width, $height) = explode('x', $resolution);
  
  $image_attributes = array();
  if (list($orig_width, $orig_height, $type, $image_attributes) = @getimagesize($file['filepath'])) {
    $alt = isset($file['alt']) ? $file['alt'] : 'jcrop preview';
    $title = isset($file['title']) ? $file['title'] : '';
    $url = file_create_url($file['filepath']);
    $settings = array(
      'orig_width' => $orig_width,
      'orig_height' => $orig_height,
      'width' => (integer)$width,
      'height' => (integer)$height,
    );
    $output = '<div class="jcrop-preview-wrapper" style="width:'. $width .'px;height:'. $height .'px;overflow:hidden;"><img src="'. check_url($url) .'" alt="'.
      check_plain($alt) .'" title="'. check_plain($title) .'" class="jcrop-preview" /></div>';
    return array($output, $settings);
  }
  return array('<!-- could not get imagesize, possibly corrupt or non image. '. $file['filepath'] .' -->', '');

  
}

function _imagefield_crop_resize($src, $crop = NULL, $scale = NULL, $dst = '') {
  $image = imageapi_image_open($src);

  if ($image) {
    if ($crop) {
      imageapi_image_crop($image, $crop['x'], $crop['y'], $crop['width'], $crop['height']);
    }

    if ($scale) {
      imageapi_image_scale_and_crop($image, $scale['width'], $scale['height']);
    }

    $result = imageapi_image_close($image, $dst);
  }

  return $result;
}
