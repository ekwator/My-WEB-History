<?php


include_once (drupal_get_path('module', 'take_control') . '/includes/security.inc');
include_once (drupal_get_path('module', 'take_control') . '/includes/filesystem.inc');

/**
 * take control admin configuration form.
 */
function take_control_fb_settings_form(&$form_state = array()) {
//  $form['take_control_fb_sec_token'] = array(
//      '#type' => 'textfield',
//      '#default_value' => variable_get('take_control_fb_sec_token', ''),
//      '#title' => t('Security Token'),
//      '#required' => TRUE,
//      '#description' => t('Security Token to be used to authenticate Ajax calls. Changing this would force any users who are currently using the File Browser to refresh their page to continue using it. This can be used to immediately close File Browser for users using it without waiting for the timeout below. Remove the "access file browser" permission from the user\'s role and change this security token.'));
//
//  $form['take_control_fb_session_duration'] = array(
//      '#type' => 'select',
//      '#options' => drupal_map_assoc(array(
//          5,
//          10,
//          15,
//          30,
//          60,
//          120,
//          300)),
//      '#default_value' => variable_get('take_control_fb_session_duration', '30'),
//      '#required' => TRUE,
//      '#title' => t('Session Duration (in minutes)'),
//      '#description' => t('Users would be asked to reload the File Browser page after this much duration.'));

  $extvers = take_control_extjs_dirs();

  $form['take_control_fb_extjs_ver'] = array(
      '#type' => 'select',
      '#options' => drupal_map_assoc($extvers),
      '#default_value' => variable_get('take_control_fb_extjs_ver', ''),
      '#required' => TRUE,
      '#title' => t('ExtJs version directory'),
      '#description' => t('ExtJs version directory (in /sites/all/modules) that should be used by the File Browser module.'));

  $form['#submit'][] = 'take_control_fb_settings_submit_handler';

  return system_settings_form($form);
}

/**
 * Custom submit handler to process custom form data.
 */
function take_control_fb_settings_submit_handler($form, &$form_state) {
//  variable_set('take_control_fb_sec_token', $form_state['values']['take_control_fb_sec_token']);
//  variable_set('take_control_fb_session_duration', $form_state['values']['take_control_fb_session_duration']);
  variable_set('take_control_fb_extjs_ver', $form_state['values']['take_control_fb_extjs_ver']);

//  take_control_save_config_items(array(
//      'sessionDuration' => $form_state['values']['take_control_fb_session_duration'],
//      'secToken' => $form_state['values']['take_control_fb_sec_token']));
}
