<?php
// $Id$
/**
 * @file
 * Additiona api to get information about fields' parameters to make correct validation during upload
 */

/* get list array of lists of filefield descriptions each for each field type */
function _advupload_get_types_filefields() {
  // don't know do we need static or rest of ontent_types() has it somewhere inside CCK
  static $filefieldtypes;
  if (isset($filefieldtypes)) {
    return $filefieldtypes;
  }
  $types = content_types();
  $filefieldtypes = array();
  foreach ($types as $name => $type) if (isset($type['fields']) && is_array($type['fields']) && count($type['fields'])) {
    foreach ($type['fields'] as $fieldname => $field) if (isset($field['type']) && ('filefield' == $field['type'])) {
      $filefieldtypes[$name][$fieldname] = $field;
    }
  }
  return $filefieldtypes;
}
/* same as _advupload_get_types_filefields() but gives array for only configured in system types */
function _advupload_get_types_preset() {
  $fft = _advupload_get_types_filefields();
  foreach ($fft as $name => $val) if (!variable_get('advupload_type_'. $name, FALSE))unset($fft[$name]);
  return $fft;
}
// this is just field limits etc. user limitation will be in the code logic
function _advupload_get_filefield_settings($type, $fieldname) {
  static $settings;
  if (!isset($settings)) {
    $settings = array();
  }
  if (isset($settings[$type][$fieldname])) {
    return $settings[$type][$fieldname];
  }
  $keys = array(
    'file_extensions', 'file_path', 'max_filesize_per_file',
    'max_filesize_per_node', 'max_resolution', 'min_resolution', 'label',
  );
  $keys_p = array('max_filesize_per_file', 'max_filesize_per_node');
  $fl = _advupload_get_types_preset();
  $settings[$type][$fieldname] = array();
  //error_log(var_export($fl[$type] [$fieldname] ['widget'], TRUE ) );
  foreach ($keys as $key) $settings[$type][$fieldname][$key] = (isset($fl[$type][$fieldname]['widget'][$key])) ? $fl[$type][$fieldname]['widget'][$key] : '0';
  foreach ($keys_p as $key) $settings[$type][$fieldname][$key] = empty($settings[$type][$fieldname][$key]) ? 0 : parse_size($settings[$type][$fieldname][$key]);
  // this is number of values!11 we need know that! it's number of maximum fild values
  $settings[$type][$fieldname]['multiple'] = isset($fl[$type][$fieldname]['multiple']) ? $fl[$type][$fieldname]['multiple'] : 0;
  return $settings[$type][$fieldname];
}

function _advupload_get_tmp() {
  return file_directory_path() .'/'. variable_get('advupload_temporary', 'advupload_tmp');
}

function _advupload_get_libraries() {
  global $profile;

  // When this function is called during Drupal's initial installation process,
  // the name of the profile that is about to be installed is stored in the
  // global $profile variable. At all other times, the regular system variable
  // contains the name of the current profile, and we can call variable_get()
  // to determine the profile.
  if (!isset($profile)) {
    $profile = variable_get('install_profile', 'default');
  }

  $directory = 'libraries';
  $searchdir = array();
  $config = conf_path();

  // The 'profiles' directory contains pristine collections of modules and
  // themes as organized by a distribution.  It is pristine in the same way
  // that /modules is pristine for core; users should avoid changing anything
  // there in favor of sites/all or sites/<domain> directories.
  if (file_exists("profiles/$profile/$directory")) {
    $searchdir[] = "profiles/$profile/$directory";
  }

  // Always search sites/all/*.
  $searchdir[] = 'sites/all/' . $directory;

  // Also search sites/<domain>/*.
  if (file_exists("$config/$directory")) {
    $searchdir[] = "$config/$directory";
  }

  // Retrieve list of directories.
  // @todo Core: Allow to scan for directories.
  $directories = array();
  $nomask = array('CVS');
  foreach ($searchdir as $dir) {
    if (is_dir($dir) && $handle = opendir($dir)) {
      while (FALSE !== ($file = readdir($handle))) {
        if (!in_array($file, $nomask) && $file[0] != '.') {
          if (is_dir("$dir/$file")) {
            $directories[$file] = "$dir/$file";
          }
        }
      }
      closedir($handle);
    }
  }

  return $directories;
}
