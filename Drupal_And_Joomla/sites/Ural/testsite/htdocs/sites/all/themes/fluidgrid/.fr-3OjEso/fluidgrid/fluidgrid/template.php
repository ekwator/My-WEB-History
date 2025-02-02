<?php // $Id: template.php,v 1.1.2.5 2009/08/07 22:40:26 couzinhub Exp $
    
// Auto-rebuild the theme registry during theme development.
// ________________________________________________________________________

if (theme_get_setting('fluidgrid_rebuild_registry')) {
  drupal_rebuild_theme_registry();
}


// Implements HOOK_theme().
// ________________________________________________________________________

function fluidgrid_theme(&$existing, $type, $theme, $path) {
  if (!db_is_active()) {
    return array();
  }
  include_once './' . drupal_get_path('theme', 'fluidgrid') . '/theme-settings.php';
  return _fluidgrid_theme($existing, $type, $theme, $path);
}

// Adding the right CSS files
// ________________________________________________________________________


if (theme_get_setting('fluidgrid_css_reset')) {
  drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/extra/reset.css', 'theme', 'all');
}
if (theme_get_setting('fluidgrid_css_debug')) {
  drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/extra/debug.css', 'theme', 'all');
}

switch (theme_get_setting('fluidgrid_grid')) {
  case 0:
      drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/framework/fluidgrid-12.css', 'theme', 'all');
      break;
  case 1:
      drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/framework/fluidgrid-16.css', 'theme', 'all');
      break;
  case 2:
      drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/framework/fluidgrid-24.css', 'theme', 'all');
      break;
}

if (theme_get_setting('fluidgrid_css_text')) {
  drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/extra/text.css', 'theme', 'all');
}
if (theme_get_setting('fluidgrid_css_print')) {
  drupal_add_css( drupal_get_path('theme', 'fluidgrid') .'/css/extra/print.css', 'theme', 'print');
}

function ie6($css) {
  if (theme_get_setting('fluidgrid_css_ie6')) {
    echo "<!--[if IE 6]><style type='text/css' media='all'>@import" . $base_path . path_to_theme() . "/css/extra/ie6.css;</style><![endif]-->";
  }
}



//	 This function creates the body classes that are relative to each page
// ________________________________________________________________________

function fluidgrid_preprocess_page(&$vars, $hook) {
  global $theme;

  // Don't display empty help from node_help().
  if ($vars['help'] == "<div class=\"help\"><p></p>\n</div>") {
    $vars['help'] = '';
  }
  
  // Classes for body element. Allows advanced theming based on context
  // (home page, node of certain type, etc.)
  $body_classes = array($vars['body_classes']);
  if (user_access('administer blocks')) {
	  $body_classes[] = 'admin';
	}
  if (!$vars['is_front']) {
    // Add unique classes for each page and website section
    $path = drupal_get_path_alias($_GET['q']);
    list($section, ) = explode('/', $path, 2);
    $body_classes[] = fluidgrid_id_safe('page-'. $path);
    $body_classes[] = fluidgrid_id_safe('section-'. $section);

    if (arg(0) == 'node') {
      if (arg(1) == 'add') {
        if ($section == 'node') {
          array_pop($body_classes); // Remove 'section-node'
        }
        $body_classes[] = 'section-node-add'; // Add 'section-node-add'
      }
      elseif (is_numeric(arg(1)) && (arg(2) == 'edit' || arg(2) == 'delete')) {
        if ($section == 'node') {
          array_pop($body_classes); // Remove 'section-node'
        }
        $body_classes[] = 'section-node-'. arg(2); // Add 'section-node-edit' or 'section-node-delete'
      }
    }
  }  
  $vars['body_classes'] = implode(' ', $body_classes); // Concatenate with spaces  
    
  // Adding some options for alternative templates.
  // You can create custom page templates for specific nodes using there Node ID
  // like this : page-node-12.tpl.php   
  if ($vars['node']->type != "") {
    $vars['template_files'][] = "page-type-" . $vars['node']->type;
  }
  // Or using the content type name like this : page-type-story.tpl.php
  if ($vars['node']->nid != "") {
    $vars['template_files'][] = "page-node-" . $vars['node']->nid;
  }
}


// Creating link to turn on/off the Grid
// in page template, use : echo switch_grid($link); to output the link
// ________________________________________________________________________

function switch_grid($link) {
  global $user;
  if ($user->uid == 1 || user_access('administer site configuration')) { 
    $output .= '<div id="switchgrid">Show/Hide Grid</div>' ;
  }
  return $output;
}

// Page width and margin (set in the theme settings page)
// ________________________________________________________________________

function page_property($values) {
  if (theme_get_setting('fluidgrid_width') || theme_get_setting('fluidgrid_margin')) { 
    $output .= '<style type="text/css" media="screen">#page{' ;
    if (theme_get_setting('fluidgrid_width')) {
      $output .= "width:" . theme_get_setting('fluidgrid_width') . "px;" ;
    }
    if (theme_get_setting('fluidgrid_margin') && !theme_get_setting('fluidgrid_width')) {
      $output .= "margin:0 " . theme_get_setting('fluidgrid_margin') ;
    }
    $output .= '}</style>' ;
  }
  return $output;
}


// GRID MARKUP
// Creating the GRID (using only HTML and CSS)
// This will not be activated if you choose 'Set Manually' 
// in the theme settings. You can use this code to create your own grid
// But keep in mind that you will have to create your own css.
//
// In the page.tpl.php,  use echo fluidgrid($grid); to output the grid
// ________________________________________________________________________


function fluidgrid($grid) {
  
  // default 12 columns (all grids have at least 12)
  $output .= '<div class="grid_';
  if (theme_get_setting('fluidgrid_grid') == 0) {
    $output .= '12';
  } elseif (theme_get_setting('fluidgrid_grid') == 1){
    $output .= '16';
  } elseif (theme_get_setting('fluidgrid_grid') == 2){
    $output .= '24';
  }
  if (theme_get_setting('fluidgrid_grid_display') != 0) {
    $output .= ' display';
  }
  $output .= '">
              <div class="col col-1 span-1"></div>
              <div class="col col-2 span-1"></div>
              <div class="col col-3 span-1"></div>
              <div class="col col-4 span-1"></div>
              <div class="col col-5 span-1"></div>
              <div class="col col-6 span-1"></div>
              <div class="col col-7 span-1"></div>
              <div class="col col-8 span-1"></div>
              <div class="col col-9 span-1"></div>
              <div class="col col-10 span-1"></div>
              <div class="col col-11 span-1"></div>
              <div class="col col-12 span-1"></div>';
  
  // Adding 4 columns for grid 16
  if (theme_get_setting('fluidgrid_grid') == 1 or theme_get_setting('fluidgrid_grid') == 2) {
    $output .= '
              <div class="col col-13 span-1"></div>
              <div class="col col-14 span-1"></div>
              <div class="col col-15 span-1"></div>
              <div class="col col-16 span-1"></div>';
  }
  // Adding 8 columns for grid 24
  if (theme_get_setting('fluidgrid_grid') == 2) {
    $output .= '
              <div class="col col-17 span-1"></div>
              <div class="col col-18 span-1"></div>
              <div class="col col-19 span-1"></div>
              <div class="col col-20 span-1"></div>
              <div class="col col-21 span-1"></div>
              <div class="col col-22 span-1"></div>
              <div class="col col-23 span-1"></div>
              <div class="col col-24 span-1"></div>';
  }
  $output .= '
      </div>';
  return $output;
}

// Creating the right container for the chosen grid
// ________________________________________________________________________

function container($col) {
  if (theme_get_setting('fluidgrid_grid') == 0) {
    $output .= '12';
  } elseif (theme_get_setting('fluidgrid_grid') == 1) {
    $output .= '16';
  } elseif (theme_get_setting('fluidgrid_grid') == 2) {
    $output .= '24';
  }
  if (theme_get_setting('fluidgrid_css_debug') && theme_get_setting('fluidgrid_grid_display')) {
    $output .= ' debug';
  }
  return $output;
}



//	 This function creates the NODES classes, like 'node-unpublished' for nodes
//	 that are not published, or 'node-mine' for node posted by the connected user...
// ________________________________________________________________________

function fluidgrid_preprocess_node(&$vars, $hook) {
  global $user;

  // Special classes for nodes
  $node_classes = array();
  if ($vars['sticky']) {
    $node_classes[] = 'sticky';
  }
  if (!$vars['node']->status) {
    $node_classes[] = 'node-unpublished';
    $vars['unpublished'] = TRUE;
  }
  else {
    $vars['unpublished'] = FALSE;
  }
  if ($vars['node']->uid && $vars['node']->uid == $user->uid) {
    // Node is authored by current user
    $node_classes[] = 'node-mine';
  }
  if ($vars['teaser']) {
    // Node is displayed as teaser
    $node_classes[] = 'node-teaser';
  }
  // Class for node type: "node-type-page", "node-type-story", "node-type-my-custom-type", etc.
  $node_classes[] = 'node-type-'. $vars['node']->type;
  $vars['node_classes'] = implode(' ', $node_classes); // Concatenate with spaces
}


//	This function create the EDIT LINKS for blocks and menus blocks.
// ________________________________________________________________________

function fluidgrid_preprocess_block(&$vars, $hook) {
  $block = $vars['block'];

  if (theme_get_setting('fluidgrid_block_editing') && user_access('administer blocks')) {
    // Display 'edit block' for custom blocks
    if ($block->module == 'block') {
      $edit_links[] = l( t('edit block'), 'admin/build/block/configure/'. $block->module .'/'. $block->delta, array('title' => t('edit the content of this block'), 'class' => 'block-edit'), drupal_get_destination(), NULL, FALSE, TRUE);
    }
    // Display 'configure' for other blocks
    else {
      $edit_links[] = l(t('configure'), 'admin/build/block/configure/'. $block->module .'/'. $block->delta, array('title' => t('configure this block'), 'class' => 'block-config'), drupal_get_destination(), NULL, FALSE, TRUE);
    }

    // Display 'edit menu' for menu blocks
    if (($block->module == 'menu' || ($block->module == 'user' && $block->delta == 1)) && user_access('administer menu')) {
      $edit_links[] = l(t('edit menu'), 'admin/build/menu', array('title' => t('edit the menu that defines this block'), 'class' => 'block-edit-menu'), drupal_get_destination(), NULL, FALSE, TRUE);
    }
    $vars['edit_links_array'] = $edit_links;
    $vars['edit_links'] = '<div class="edit">'. implode(' ', $edit_links) .'</div>';
  }
}


//  Create some custom classes for comments
// ________________________________________________________________________

function comment_classes($comment) {
  $node = node_load($comment->nid);
  global $user;
 
  $output .= ($comment->new) ? ' comment-new' : ''; 
  $output .=  ' '. $status .' '; 
  if ($node->name == $comment->name) {	
    $output .= 'node-author';
  }
  if ($user->name == $comment->name) {	
    $output .=  ' mine';
  }
  return $output;
}


//	Add custom classes to menu item
// ________________________________________________________________________
	
function fluidgrid_menu_item($link, $has_children, $menu = '', $in_active_trail = FALSE, $extra_class = NULL) {
  $class = ($menu ? 'expanded' : ($has_children ? 'collapsed' : 'leaf'));
  if (!empty($extra_class)) {
    $class .= ' '. $extra_class;
  }
  if ($in_active_trail) {
    $class .= ' active-trail';
  }
#New line added to get unique classes for each menu item
  $css_class = fluidgrid_id_safe(str_replace(' ', '_', strip_tags($link)));
  return '<li class="'. $class . ' ' . $css_class . '">' . $link . $menu ."</li>\n";
}


//	Converts a string to a suitable html ID attribute.
// ________________________________________________________________________

function fluidgrid_id_safe($string) {
  // Replace with dashes anything that isn't A-Z, numbers, dashes, or underscores.
  $string = strtolower(preg_replace('/[^a-zA-Z0-9_-]+/', '-', $string));
  // If the first character is not a-z, add 'n' in front.
  if (!ctype_lower($string{0})) { // Don't use ctype_alpha since its locale aware.
    $string = 'id'. $string;
  }
  return $string;
}