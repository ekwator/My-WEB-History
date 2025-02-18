<?php


/**
 * @file
 * Allows modules to contribute styles.
 */

// -----------------------------------------------------------------------
// REQUEST FUNCTIONS

/**
 * Fetch an advanced forum style plugin
 *
 * @param $style
 *   Name of the style plugin
 *
 * @return
 *   An array with information about the requested style plugin.
 */
function advanced_forum_get_style($style) {
  return advanced_forum_get_plugins('styles', 'advforum_styles', $style);
}

/**
 * Collate information about all available advanced_forum styles.
 *
 * @return
 *   An array with information about the requested forum style.
 */
function advanced_forum_get_styles() {
  return advanced_forum_get_plugins('styles', 'advforum_styles');
}

// -----------------------------------------------------------------------
// MASTER HANDLER

/**
 * Fetch a group of plugins by name.
 *
 * @param $plugin
 *   This is the name of the plugin, and also the name of the directory.
 * @param $hook
 *   This is the hook to call to get the info for the plugin.
 *
 * @return
 *   An array of information arrays about the plugins received.
 */
function advanced_forum_get_plugins($plugin, $hook, $id = NULL) {
  static $plugins = array();
  static $all_hooks = array();

  // Always load all hooks if we need them.
  if (!isset($all_hooks[$plugin])) {
    $all_hooks[$plugin] = TRUE;
    $plugins[$plugin] = advanced_forum_load_hooks($hook);
  }

  // If a specific plugin $id is being requested, return it.
  if ($id && array_key_exists($id, $plugins[$plugin])) {
    return $plugins[$plugin][$id];
  }

  // If no $id was requested, return the lot.
  if (!$id) {
    return $plugins[$plugin];
  }
}

// -----------------------------------------------------------------------
// WORKER/RETRIEVER FUNCTIONS

/**
 * Load plugin info for all hooks; this is handled separately from plugins
 * from files.
 *
 * @param $hook
 *   The hook being invoked.
 *
 * @return
 *   An array of info supplied by any hook implementations.
 */
function advanced_forum_load_hooks($hook) {
  $info = array();
  foreach (module_implements($hook) as $module) {
    $result = _advanced_forum_process_plugin($module, $module, drupal_get_path('module', $module), $hook);
    if (is_array($result)) {
      $info = array_merge($info, $result);
    }
  }
  return $info;
}

/**
 * Process a single hook implementation of a advanced_forum plugin.
 *
 * @param $module
 *   The module that owns the hook.
 * @param $identifier
 *   Either the module or 'advanced_forum_' . $file->name
 * @param $hook
 *   The name of the hook being invoked.
 */
function _advanced_forum_process_plugin($module, $identifier, $path, $hook) {
  $function = $identifier . '_' . $hook;
  if (!function_exists($function)) {
    return NULL;
  }
  $result = $function();
  if (!isset($result) || !is_array($result)) {
    return NULL;
  }

  // Fill in defaults.
  foreach ($result as $name => $plugin) {
    if (!is_dir($path . '/' . $plugin['directory'])) {
      unset($result[$name]);
      continue;
    }
    $result[$name] += array(
      'module' => $module,
      'name' => $name,
      'path' => $path . '/' . $plugin['directory'],
    );
  }

  return !empty($result) ? $result : NULL;
}