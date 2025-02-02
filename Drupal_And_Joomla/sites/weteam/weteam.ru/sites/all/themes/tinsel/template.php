<?php
// $Id: template.php,v 1.8 2010/07/26 18:24:27 merlinofchaos Exp $

/**
 * Return a themed breadcrumb trail.
 *
 * @param $breadcrumb
 *   An array containing the breadcrumb links.
 * @return a string containing the breadcrumb output.
*drupal_add_js(path_to_theme() . '/js/jquery-ui-1.8.13.custom.min.js');
*/
drupal_add_css(path_to_theme() . '/css/jquery-ui-1.8.13.custom.css');

function tinsel_breadcrumb($breadcrumb) {
  if (!empty($breadcrumb)) {
    return '<div class="breadcrumb">'. implode(' › ', $breadcrumb) .'</div>';
  }
}

/**
 * Override or insert tinsel variables into the templates.
 */
function tinsel_preprocess_page(&$vars) {
  $vars['tinsel_classes'] = '';
  if ($vars['left'] != '' && $vars['right'] != '') {
    $vars['tinsel_classes'] = 'sidebars';
  }
  else {
    if ($vars['left'] != '') {
      $vars['tinsel_classes'] .= ' sidebar-left';
    }
    if ($vars['right'] != '') {
      $vars['tinsel_classes'] .= ' sidebar-right';
    }
  }

  // Prepare header
  $site_fields = array();
  if ($vars['site_name']) {
    $site_fields[] = check_plain($vars['site_name']);
  }
  if ($vars['site_slogan']) {
    $site_fields[] = check_plain($$vars['site_slogan']);
  }
  $vars['site_title'] = implode(' ', $site_fields);
  if ($site_fields) {
    $site_fields[0] = '<span>'. $site_fields[0] .'</span>';
  }
  $vars['site_html'] = implode(' ', $site_fields);

  if (function_exists('ctools_menu_secondary_local_tasks')) {
    $tabs = ctools_menu_secondary_local_tasks();
  }
  else {
    $tabs = ctools_menu_secondary_local_tasks();
  }
  $vars['tabs2'] = '';
  if ($tabs) {
    $vars['tabs2'] = '<ul class="tabs secondary">' . $tabs . '</ul>';
  }

  // Hook into color.module
  if (module_exists('color')) {
    _color_page_alter($vars);
  }
}

/**
 * Add a "Comments" heading above comments except on forum pages.
 */
function tinsel_preprocess_comment_wrapper(&$vars) {
  if ($vars['content'] && $vars['node']->type != 'forum') {
    $vars['content'] = '<h2 class="comments">'. t('Comments') .'</h2>'.  $vars['content'];
  }
}

/**
 * Returns the rendered local tasks. The default implementation renders
 * them as tabs. Overridden to split the secondary tasks.
 *
 * @ingroup themeable
 */
function tinsel_menu_local_tasks() {
  if (module_exists('ctools')) {
    ctools_include('menu');
    $tabs = ctools_menu_primary_local_tasks();
  }
  else {
    $tabs = menu_primary_local_tasks();
  }

  if ($tabs) {
    return '<ul class="tabs primary">' . $tabs . '</ul>';
  }
}

function tinsel_comment_submitted($comment) {
  return t('!datetime — !username',
    array(
      '!username' => theme('username', $comment),
      '!datetime' => format_date($comment->timestamp)
    ));
}

function tinsel_node_submitted($node) {
  return t('!datetime — !username',
    array(
      '!username' => theme('username', $node),
      '!datetime' => format_date($node->created),
    ));
}

/**
 * Generates IE CSS links for LTR and RTL languages.
 */
function tinsel_get_ie_styles() {
  global $language;

  $iecss = '<link type="text/css" rel="stylesheet" media="all" href="'. base_path() . path_to_theme() .'/fix-ie.css" />';
  if ($language->direction == LANGUAGE_RTL) {
    $iecss .= '<style type="text/css" media="all">@import "'. base_path() . path_to_theme() .'/fix-ie-rtl.css";</style>';
  }

  return $iecss;
}

/**
 * Override or insert tinsel variables into the templates.
 */
function tinsel_preprocess_pane_header(&$vars) {
  $vars['primary_links'] = menu_primary_links();
  $vars['secondary_links'] = menu_secondary_links();

  $vars['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  $vars['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));

  // Prepare header
  $site_fields = array();
  if ($vars['site_name']) {
    $site_fields[] = check_plain($vars['site_name']);
  }
  if ($vars['site_slogan']) {
    $site_fields[] = check_plain($vars['site_slogan']);
  }
  $vars['site_title'] = implode(' ', $site_fields);
  if ($site_fields) {
    $site_fields[0] = '<span>'. $site_fields[0] .'</span>';
  }
  $vars['site_html'] = implode(' ', $site_fields);
}

/**
 * Override or insert tinsel variables into the templates.
 */
function tinsel_preprocess_pane_messages(&$vars) {
  $vars['tabs'] = theme('menu_local_tasks');
  $tabs = ctools_menu_secondary_local_tasks();
  $vars['tabs2'] = '';
  if ($tabs) {
    $vars['tabs2'] = '<ul class="tabs secondary">' . $tabs . '</ul>';
  }

  $vars['title'] = drupal_get_title();
  $vars['mission'] = '';
  // Set mission when viewing the frontpage.
  if (drupal_is_front_page()) {
    $vars['mission'] = filter_xss_admin(theme_get_setting('mission'));
  }
  $vars['breadcrumb'] =  theme('breadcrumb', drupal_get_breadcrumb());
}

/*!
 * Dynamic display block preprocess functions
 * Copyright (c) 2008 - 2009 P. Blaauw All rights reserved.
 * Version 1.6 (01-OCT-2009)
 * Licenced under GPL license
 * http://www.gnu.org/licenses/gpl.html
 */

 /**
 * Override or insert variables into the ddblock_cycle_block_content templates.
 *   Used to convert variables from view_fields to slider_items template variables
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * 
 */
function tinsel_preprocess_ddblock_cycle_block_content(&$vars) {
  if ($vars['output_type'] == 'view_fields') {
    $content = array();
    // Add slider_items for the template 
    // If you use the devel module uncomment the following line to see the theme variables
    // dsm($vars['settings']['view_name']);  
    // dsm($vars['content'][0]);
    // If you don't use the devel module uncomment the following line to see the theme variables
    // drupal_set_message('<pre>' . var_export($vars['settings']['view_name'], true) . '</pre>');
    // drupal_set_message('<pre>' . var_export($vars['content'][0], true) . '</pre>');
    if ($vars['settings']['view_name'] == 'user_hit_items') {
      if (!empty($vars['content'])) {
        foreach ($vars['content'] as $key1 => $result) {
          // add slide_image variable 
          if (isset($result->node_data_field_user_hit_pager_item_text_field_user_hit_image_fid)) {
            // get image id
            $fid = $result->node_data_field_user_hit_pager_item_text_field_user_hit_image_fid;
            // get path to image
            $filepath = db_result(db_query("SELECT filepath FROM {files} WHERE fid = %d", $fid));
            //  use imagecache (imagecache, preset_name, file_path, alt, title, array of attributes)
            if (module_exists('imagecache') && is_array(imagecache_presets()) && $vars['imgcache_slide'] <> '<none>'){
              $slider_items[$key1]['slide_image'] = 
              theme('imagecache', 
                    $vars['imgcache_slide'], 
                    $filepath,
                    check_plain($result->node_title));
            }
            else {          
              $slider_items[$key1]['slide_image'] = 
                '<img src="' . base_path() . $filepath . 
                '" alt="' . check_plain($result->node_title) . 
                '"/>';     
            }          
          }
          // add slide_text variable
          if (isset($result->node_data_field_user_hit_pager_item_text_field_user_hit_slide_text_value)) {
            $slider_items[$key1]['slide_text'] =  check_markup($result->node_data_field_user_hit_pager_item_text_field_user_hit_slide_text_value);
          }
          // add slide_title variable
          if (isset($result->node_title)) {
            $slider_items[$key1]['slide_title'] =  check_plain($result->node_title);
          }
          // add slide_read_more variable and slide_node variable
          if (isset($result->nid)) {
            $slider_items[$key1]['slide_read_more'] =  l('Читать...', 'node/' . $result->nid);
            $slider_items[$key1]['slide_node'] =  base_path() . 'node/' . $result->nid;
          }
        }
      }
    }    
    $vars['slider_items'] = $slider_items;
  }
}  
/**
 * Override or insert variables into the ddblock_cycle_pager_content templates.
 *   Used to convert variables from view_fields  to pager_items template variables
 *  Only used for custom pager items
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 *
 */
function tinsel_preprocess_ddblock_cycle_pager_content(&$vars) {
  if (($vars['output_type'] == 'view_fields') && ($vars['pager_settings']['pager'] == 'custom-pager')){
    $content = array();
    // Add pager_items for the template 
    // If you use the devel module uncomment the following lines to see the theme variables
    // dsm($vars['pager_settings']['view_name']);     
    // dsm($vars['content'][0]);     
    // If you don't use the devel module uncomment the following lines to see the theme variables
    // drupal_set_message('<pre>' . var_export($vars['pager_settings'], true) . '</pre>');
    // drupal_set_message('<pre>' . var_export($vars['content'][0], true) . '</pre>');
    if ($vars['pager_settings']['view_name'] == 'user_hit_items') {
      if (!empty($vars['content'])) {
        foreach ($vars['content'] as $key1 => $result) {
          // add pager_item_image variable
          if (isset($result->node_data_field_user_hit_pager_item_text_field_user_hit_image_fid)) {
            $fid = $result->node_data_field_user_hit_pager_item_text_field_user_hit_image_fid;
            $filepath = db_result(db_query("SELECT filepath FROM {files} WHERE fid = %d", $fid));
            //  use imagecache (imagecache, preset_name, file_path, alt, title, array of attributes)
            if (module_exists('imagecache') && 
                is_array(imagecache_presets()) && 
                $vars['imgcache_pager_item'] <> '<none>'){
              $pager_items[$key1]['image'] = 
                theme('imagecache', 
                      $vars['pager_settings']['imgcache_pager_item'],              
                      $filepath,
                      check_plain($result->node_data_field_user_hit_pager_item_text_field_user_hit_pager_item_text_value));
            }
            else {          
              $pager_items[$key1]['image'] = 
                '<img src="' . base_path() . $filepath . 
                '" alt="' . check_plain($result->node_data_field_user_hit_pager_item_text_field_user_hit_pager_item_text_value) . 
                '"/>';     
            }          
          }
          // add pager_item _text variable
          if (isset($result->node_data_field_user_hit_pager_item_text_field_user_hit_pager_item_text_value)) {
            $pager_items[$key1]['text'] =  check_plain($result->node_data_field_user_hit_pager_item_text_field_user_hit_pager_item_text_value);
          }
        }
      }
    }
    $vars['pager_items'] = $pager_items;
  }    
}
