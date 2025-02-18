<?php

function views_bulk_operations_script_action_info() {
  if (!module_exists('actions_permissions') && !user_access('administer site configuration')) return array();
  return array('views_bulk_operations_script_action' => array(
    'type' => 'system',
    'description' => t('Execute arbitrary PHP script'),
    'configurable' => TRUE,
    'hooks' => array('any' => TRUE),
  ));
}

function views_bulk_operations_script_action(&$object, $context) {
  if (!module_exists('actions_permissions') && !user_access('administer site configuration')) {
    global $user;
    $msg = 'An attempt to execute arbitrary PHP script action by user <a href="user/!uid">%user</a> was blocked because of lack of permission.';
    $arg = array('%user' => $user->name, '!uid' => $user->uid);
    drupal_set_message(t($msg, $arg), 'error', FALSE);
    watchdog('vbo', $msg, $arg, WATCHDOG_ERROR);
    return;
  }
  $return = eval($context['script']);
  if ($return === FALSE) {
    $msg = 'Error in script.';
    $arg = array();
    if (function_exists('error_get_last') && ($error = error_get_last())) {
      $msg = '!err in script: !msg in line \'%line\'.';
      $arg = array(
        '!msg' => $error['message'],
        '%line' => _views_bulk_operations_script_action_error_line($context['script'], $error['line']),
        '!err' => _views_bulk_operations_script_action_error_type($error['type']),
      );
    }
    drupal_set_message(t($msg, $arg), 'error', FALSE);
    watchdog('vbo', $msg, $arg, WATCHDOG_ERROR);
  }
}

function views_bulk_operations_script_action_form($context) {
  $form['script'] = array(
    '#type' => 'textarea',
    '#title' => t('PHP script'),
    '#description' => t('Type the PHP snippet that will run upon execution of this action. You can use variables <code>&$object</code> and <code>$context</code> in your snippet.
                         Note that it is up to the script to save the object once it\'s done modifying it. Do NOT enclose the script within a &lt;?php&gt; tag.'),
    '#default_value' => @$context['script'],
  );
  return $form;
}

function views_bulk_operations_script_action_validate($form, $form_state) {
}

function views_bulk_operations_script_action_submit($form, $form_state) {
  return array(
    'script' => $form_state['values']['script'],
  );
}

function _views_bulk_operations_script_action_error_line($script, $line) {
  $lines = preg_split("/(\r?\n)/", $script);
  if (isset($lines[$line-1])) {
    return $lines[$line-1];
  }
  else {
    return t('Line !line', array('!line' => $line));
  }
}

function _views_bulk_operations_script_action_error_type($type) {
  $types = array (
    E_ERROR              => 'Error',
    E_WARNING            => 'Warning',
    E_PARSE              => 'Parsing Error',
    E_NOTICE             => 'Notice',
    E_CORE_ERROR         => 'Core Error',
    E_CORE_WARNING       => 'Core Warning',
    E_COMPILE_ERROR      => 'Compile Error',
    E_COMPILE_WARNING    => 'Compile Warning',
    E_USER_ERROR         => 'User Error',
    E_USER_WARNING       => 'User Warning',
    E_USER_NOTICE        => 'User Notice',
    E_STRICT             => 'Runtime Notice',
    E_RECOVERABLE_ERROR  => 'Catchable Fatal Error',
  );
  if (version_compare(PHP_VERSION, '5.3.0') >= 0) {
    $types += array(
      E_DEPRECATED         => 'Deprecated Notice',
      E_USER_DEPRECATED    => 'User Deprecated Notice',
    );
  }
  return t($types[$type]);
}
