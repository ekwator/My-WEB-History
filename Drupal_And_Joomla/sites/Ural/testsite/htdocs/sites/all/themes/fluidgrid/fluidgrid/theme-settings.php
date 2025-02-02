<?php // $Id: theme-settings.php,v 1.1.2.4 2009/08/07 22:40:26 couzinhub Exp $ 

function fluidgrid_settings($saved_settings, $subtheme_defaults = array()) {

  // Get the default values from the .info file.
  $defaults = fluidgrid_theme_get_default_settings('fluidgrid');

  // Allow a subtheme to override the default values.
  $defaults = array_merge($defaults, $subtheme_defaults);

  // Merge the saved variables and their default values.
  $settings = array_merge($defaults, $saved_settings);

  /*
   * Create the form using Forms API
   */
      
 $form['fluidgrid_grid'] = array(
   '#type'           => 'radios',
   '#title'          => t('Grid Selection'),
   '#default_value'  => $settings['fluidgrid_grid'],
   '#options'        => array(12,16,24),
   '#prefix'         => '<fieldset class="span-4 first"><legend>Grid Settings</legend>',
   '#description'    => t('Choose which grid should be used for the page.'),
 );
 $form['fluidgrid_grid_display'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show the grid by default'),
    '#description'   => t('Check the box if you want the Grid to be displayed on page refresh. Leave unchecked if you only want the grid to be displayed when clicking on the show/hide grid link'),
    '#default_value' => $settings['fluidgrid_grid_display'],
    '#suffix'        => '</fieldset>',
  ); 
 
 
  $form['fluidgrid_width'] = array(
     '#type'          => 'textfield',
     '#size'          => 10,
     '#title'         => t('Page Width'),
     '#default_value' => $settings['fluidgrid_width'],
     '#prefix'        => '<fieldset class="span-4"><legend>Styles Settings</legend>',
     '#description'   => t('<span class="optional">Optionnal</span>. Enter the width of the page in pixels. Leave empty for a fluid layout or if you wish to set it manually in your CSS.')
   ); 
  $form['fluidgrid_margin'] = array(
     '#type'          => 'textfield',
     '#size'          => 10,
     '#title'         => t('Sides Margin'),
     '#default_value' => $settings['fluidgrid_margin'],
     '#description'   => t('<span class="optional">Optionnal</span>, and only for fluid layouts. Set the margins on left and right of the page (you have to specify if you want to use pixels or percentage, by adding px or %). Leave empty for a fixed layout or if you wish to set it manually in your CSS.'),
     '#suffix'        => '</fieldset>',
   ); 

  
   $form['fluidgrid_css_reset'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('reset.css'),
     '#default_value' => $settings['fluidgrid_css_reset'],
     '#description'    => t('Add a browser reset stylesheet.'),
     '#prefix'        => '<fieldset class="span-3"><legend>Extra Styles</legend>',
   );
   $form['fluidgrid_css_debug'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('debug.css'),
     '#default_value' => $settings['fluidgrid_css_debug'],
     '#description'    => t('Activate hovering informations when displaying the grid.'),
   );
   $form['fluidgrid_css_text'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('text.css'),
     '#default_value' => $settings['fluidgrid_css_text'],
     '#description'    => t('Add a default text stylesheet.'),
   );
   $form['fluidgrid_css_print'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('print.css'),
     '#default_value' => $settings['fluidgrid_css_print'],
     '#description'    => t('Add a default print stylesheet.'),
   );
   
   $form['fluidgrid_css_ie6'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('ie6.css'),
     '#default_value' => $settings['fluidgrid_css_ie6'],
     '#description'    => t('Check this if you actually care about ie6...'),
     '#suffix'        => '</fieldset>',
   );
  
  
   
   $form['fluidgrid_block_editing'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('Show block editing on hover'),
     '#description'   => t('When hovering over a block, privileged users will see block editing links.'),
     '#default_value' => $settings['fluidgrid_block_editing'],
     '#prefix'        => '<fieldset class="span-4 first"><legend>' . t('Development Settings:') . '</legend>',
   );
   
   $form['themedev']['fluidgrid_rebuild_registry'] = array(
     '#type'          => 'checkbox',
     '#title'         => t('Rebuild theme registry on every page.'),
     '#default_value' => $settings['fluidgrid_rebuild_registry'],
     '#description'   => t('During theme development, it can be very useful to continuously <a href="!link">rebuild the theme registry</a>. WARNING: this is a huge performance penalty and must be turned off on production websites.', array('!link' => 'http://drupal.org/node/173880#theme-registry')),
     '#suffix'        => '</fieldset>',
   );
 
  // Return the form
  return $form;
}


function _fluidgrid_theme(&$existing, $type, $theme, $path) {
  // Each theme has two possible preprocess functions that can act on a hook.
  // This function applies to every hook.
  $functions[0] = $theme . '_preprocess';
  // Inspect the preprocess functions for every hook in the theme registry.
  // @TODO: When PHP 5 becomes required (Zen 7.x), use the following faster
  // implementation: foreach ($existing AS $hook => &$value) {}
  foreach (array_keys($existing) AS $hook) {
    // Each theme has two possible preprocess functions that can act on a hook.
    // This function only applies to this hook.
    $functions[1] = $theme . '_preprocess_' . $hook;
    foreach ($functions AS $key => $function) {
      // Add any functions that are not already in the registry.
      if (function_exists($function) && !in_array($function, $existing[$hook]['preprocess functions'])) {
        // We add the preprocess function to the end of the existing list.
        $existing[$hook]['preprocess functions'][] = $function;
      }
    }
  }

  // Since we are rebuilding the theme registry and the theme settings' default
  // values may have changed, make sure they are saved in the database properly.
  fluidgrid_theme_get_default_settings($theme);

  // Since we modify the $existing cache directly, return nothing.
  return array();
}


function fluidgrid_theme_get_default_settings($theme) {
  $themes = list_themes();

  // Get the default values from the .info file.
  $defaults = !empty($themes[$theme]->info['settings']) ? $themes[$theme]->info['settings'] : array();

  if (!empty($defaults)) {
    // Get the theme settings saved in the database.
    $settings = theme_get_settings($theme);
    // Don't save the toggle_node_info_ variables.
    if (module_exists('node')) {
      foreach (node_get_types() as $type => $name) {
        unset($settings['toggle_node_info_' . $type]);
      }
    }
    // Save default theme settings.
    variable_set(
      str_replace('/', '_', 'theme_' . $theme . '_settings'),
      array_merge($defaults, $settings)
    );
    // If the active theme has been loaded, force refresh of Drupal internals.
    if (!empty($GLOBALS['theme_key'])) {
      theme_get_setting('', TRUE);
    }
  }

  // Return the default settings.
  return $defaults;
}
