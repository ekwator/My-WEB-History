<?php


include_once (drupal_get_path('module', 'take_control') . '/includes/security.inc');
include_once (drupal_get_path('module', 'take_control') . '/includes/filesystem.inc');

/**
 * take control admin configuration form.
 */
function take_control_settings_form(&$form_state = array()) {
  $form['key'] = array(
      '#type' => 'fieldset',
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
      '#title' => t('Key Settings'),
      '#description' => 'This section contains Public/Private key settings that are used by add-on modules for maintaining security in asynchronous Ajax calls and/or other purposes. These keys are uniquely generated during install, and the default should suffice in most cases. Change these settings only if you know what you are doing.');

  $form['key']['take_control_pass_phrase'] = array(
      '#type' => 'textfield',
      '#default_value' => variable_get('take_control_pass_phrase', ''),
      '#required' => TRUE,
      '#title' => t('Pass Phrase'),
      '#description' => t('Pass Phrase (This is required by this module)'));

  $form['key']['take_control_digest_algo'] = array(
      '#type' => 'select',
      '#options' => drupal_map_assoc(array(
          'OPENSSL_ALGO_SHA1',
          'OPENSSL_ALGO_MD5',
          'OPENSSL_ALGO_MD4',
          'OPENSSL_ALGO_MD2')),
      '#default_value' => variable_get('take_control_digest_algo', ''),
      '#required' => TRUE,
      '#title' => t('Digest Algorithm'),
      '#description' => t('Digest Algorithm  used for generating the keys'));

  $form['key']['take_control_private_key'] = array(
      '#type' => 'textarea',
      '#default_value' => variable_get('take_control_private_key', ''),
      '#rows' => 5,
      '#required' => TRUE,
      '#title' => 'Private Key',
      '#description' => t('PEM encoded private key'));

  $form['key']['take_control_public_key'] = array(
      '#type' => 'textarea',
      '#default_value' => variable_get('take_control_public_key', ''),
      '#rows' => 5,
      '#title' => 'Public Key',
      '#description' => t('PEM encoded public key'));

  $form['key']['take_control_generate_new'] = array(
      '#type' => 'button',
      '#button_type' => 'submit',
      '#executes_submit_callback' => TRUE,
      '#name' => 'take_control_generate_new',
      '#submit' => array(
          'take_control_generate_new_handler'),
      '#validate' => array(),
      '#value' => 'Generate new key',
      '#description' => t('PEM encoded public key'));

  $form['#submit'][] = 'take_control_settings_submit_handler';

  $rebuild = FALSE;
  if (!empty($form_state['rebuild'])) {
    $rebuild = $form_state['rebuild'];
  }
  if ($rebuild == TRUE) {
    take_control_restore_user_input($form, $form_state);
    $form_state['rebuild'] = FALSE;
  }

  return system_settings_form($form);
}

function take_control_restore_user_input(&$form, &$form_state) {
  $values = $form_state['values'];
  foreach ($form as $key => &$parent) {
    if (!empty($parent['#type'])) {
      if (!empty($parent['#tree']) && $parent['#tree'] == FALSE) {
        $values = $values[$key];
      }
      take_control_restore_user_input_recursive($key, $parent, $values);
    }
  }
}

function take_control_restore_user_input_recursive($key, &$parent, &$values) {
  $value = $values[$key];
  if (!empty($value)) {
    $parent['#default_value'] = $value;
  }
  foreach ($parent as $key => &$child) {
    if (is_array($child) && !empty($child['#type'])) {
      if (!empty($child['#tree']) && $child['#tree'] == FALSE) {
        $values = $values[$key];
      }
      take_control_restore_user_input_recursive($key, $child, $values);
    }
  }
}

function take_control_generate_new_handler($form, &$form_state) {
  $algo = $form_state['values']['take_control_digest_algo'];
  $passphrase = $form_state['values']['take_control_pass_phrase'];

  $keys = take_control_new_keys($algo, $passphrase);
  form_set_value($form['key']['take_control_private_key'], $keys['priv'], $form_state);
  form_set_value($form['key']['take_control_public_key'], $keys['pub'], $form_state);

  $form_state['rebuild'] = TRUE;

  drupal_set_message('New Public /Private Key Pair generated.', 'status');
  drupal_set_message('New keys would not be used/stored until you click "Save Configuration" below.', 'warning');
}

/**
 * Implementation of hook_validate().
 */
function take_control_settings_form_validate($form, &$form_state) {
}

/**
 * Custom submit handler to process custom form data.
 */
function take_control_settings_submit_handler($form, &$form_state) {
  variable_set('take_control_digest_algo', $form_state['values']['take_control_digest_algo']);
  variable_set('take_control_pass_phrase', $form_state['values']['take_control_pass_phrase']);
  variable_set('take_control_private_key', $form_state['values']['take_control_private_key']);
  variable_set('take_control_public_key', $form_state['values']['take_control_public_key']);

  take_control_save_config_items(array(
      'pubKey' => $form_state['values']['take_control_public_key'],
      'appDir' => take_control_app_dir()));
}
