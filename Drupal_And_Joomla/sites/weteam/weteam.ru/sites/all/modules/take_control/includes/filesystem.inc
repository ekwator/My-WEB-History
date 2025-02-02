<?php


require_once ('security.inc');

/**
 * Should be used only from scripts running under Drupal bootstrap, where Drupal's index.php is the central script
 * executing for the server.
 */
function take_control_app_dir() {
  return (dirname($_SERVER['SCRIPT_FILENAME']));
}

function take_control_app_url() {
  return ($_SERVER['SERVER_NAME'] . base_path());
}

function take_control_client_path($path) {
  return (base_path() . $path);
}

function take_control_base_extjs_dir() {
  return (take_control_app_dir() . str_replace('/', DIRECTORY_SEPARATOR, '/sites/all/libraries/extjs'));
}

function take_control_extjs_dirs() {
  $extvers = array();
  $basedir = take_control_base_extjs_dir();
  foreach (scandir($basedir) as $item) {
    if ($item == '.' || $item == '..')
      continue;
    if (is_dir($basedir . DIRECTORY_SEPARATOR . $item)) {
      $extvers[] = $item;
    }
  }

  return ($extvers);
}

function take_control_config_dir() {
  $curdir = dirname(__FILE__);
  $pubkeydir = realpath($curdir . '/..') . DIRECTORY_SEPARATOR . 'temp';
  return ($pubkeydir);
}

function take_control_config_file() {
  return (take_control_config_dir() . DIRECTORY_SEPARATOR . 'tc.ini');
}

function take_control_save_config_items($items, $flush = FALSE) {
  $pubkeydir = take_control_config_dir();

  if (!is_dir($pubkeydir)) {
    $success = mkdir($pubkeydir, 0775);
    if (!$success) {
      return (FALSE);
    }
  }
  $file = take_control_config_file();

  $config = NULL;
  if ($flush || !file_exists($file)) {
    $config = $items;
  }
  else {
    $config = parse_ini_file($file);
    foreach ($items as $key => $value) {
      $config[$key] = $value;
    }
  }

  $content = '';
  foreach ($config as $key => $value) {
    if (strpos($value, "\r") !== FALSE || strpos($value, "\n") !== FALSE) {
      $value = '"' . $value . '"';
    }
    $content = $content . $key . '=' . $value . "\r";
  }
  $success = file_put_contents($file, $content);
  if ($success === FALSE) {
    return (FALSE);
  }
  else {
    chmod($file, 0600);
    file_put_contents($pubkeydir . DIRECTORY_SEPARATOR . '.htaccess', "Order deny, allow\r");

    return (TRUE);
  }
}

function take_control_delete_directory($dir) {
  if (!file_exists($dir))
    return true;
  if (!is_dir($dir))
    return unlink($dir);
  foreach (scandir($dir) as $item) {
    if ($item == '.' || $item == '..')
      continue;
    if (!take_control_delete_directory($dir . DIRECTORY_SEPARATOR . $item))
      return false;
  }
  return rmdir($dir);
}

function take_control_copy($source, $dest) {
  // Check for symlinks
  if (is_link($source)) {
    return symlink(readlink($source), $dest);
  }

  // Simple copy for a file
  if (is_file($source)) {
    return copy($source, $dest);
  }

  // Make destination directory
  if (!is_dir($dest)) {
    mkdir($dest);
  }

  // Loop through the folder
  $dir = dir($source);
  while (false !== $entry = $dir->read()) {
    // Skip pointers
    if ($entry == '.' || $entry == '..') {
      continue;
    }

    // Deep copy directories
    take_control_copy($source . DIRECTORY_SEPARATOR . $entry, $dest . DIRECTORY_SEPARATOR . $entry);
  }

  // Clean up
  $dir->close();
  return true;
}

function take_control_move($source, $dest) {
  // Simple move for a file
  if (is_file($source)) {
    if (is_file($dest)) {
      unlink($dest);
    }
    return rename($source, $dest);
  }

  if (!is_dir($dest)) {
    mkdir($dest); // make subdirectory before subdirectory is copied
  }

  if ($handle = opendir($source)) { // if the folder exploration is sucsessful, continue
    while (false !== ($file = readdir($handle))) { // as long as storing the next file to $file is successful, continue
      if ($file != '.' && $file != '..') {
        take_control_move($source . DIRECTORY_SEPARATOR . $file, $dest . DIRECTORY_SEPARATOR . $file);
        rmdir($source);
      }
    }
    closedir($handle);
  }
}

function take_control_zip_mimes() {
  return (array(file_get_mimetype('a.zip'), file_get_mimetype('a.tar')));
}
