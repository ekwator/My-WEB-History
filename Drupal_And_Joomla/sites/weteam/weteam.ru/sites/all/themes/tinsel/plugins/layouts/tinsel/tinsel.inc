<?php
// $Id: tinsel.inc,v 1.2 2010/07/26 18:24:27 merlinofchaos Exp $

/**
 * Implementation of hook_panels_layouts().
 */
$plugin = array(
  'title' => t('Tinsel'),
  'category' => t('Theme: Tinsel'),
  'icon' => 'tinsel.png',
  'theme' => 'tinsel',
  'admin theme' => 'tinsel_admin',
//  'css' => 'tinsel.css',
  'admin css' => 'tinsel-admin.css',
  'panels' => array(
    'header' => t('Header'),
    'left' => t('Left sidebar'),
    'content' => t('Content'),
    'right' => t('Right sidebar'),
    'footer' => t('Footer')
  ),
);

/**
 * Override or insert tinsel variables into the templates.
 */
function template_preprocess_tinsel(&$vars) {
  $vars['tinsel_classes'] = '';
  if ($vars['content']['left'] != '' && $vars['content']['right'] != '') {
    $vars['tinsel_classes'] = 'sidebars';
  }
  else {
    if ($vars['content']['left'] != '') {
      $vars['tinsel_classes'] .= ' sidebar-left';
    }
    if ($vars['content']['right'] != '') {
      $vars['tinsel_classes'] .= ' sidebar-right';
    }
  }
}
