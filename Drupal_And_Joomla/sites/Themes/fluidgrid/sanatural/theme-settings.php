<?php // $Id: theme-settings.php,v 1.1.2.1 2009/07/07 00:47:22 couzinhub Exp $ 

// Include the definition of zen_settings() and zen_theme_get_default_settings().
include_once './' . drupal_get_path('theme', 'fluidgrid') . '/theme-settings.php';

function sanatural_settings($saved_settings) {

  // Get the default values from the .info file.
  $defaults = fluidgrid_theme_get_default_settings('sanatural');

  // Merge the saved variables and their default values.
  $settings = array_merge($defaults, $saved_settings);

  $form = array();

  // Add the base theme's settings.
  $form += fluidgrid_settings($saved_settings, $defaults);

  // Return the form
  return $form;
}
