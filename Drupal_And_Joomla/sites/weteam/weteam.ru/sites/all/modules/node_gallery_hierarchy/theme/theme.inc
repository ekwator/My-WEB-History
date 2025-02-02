<?php
/*
 * @file
 * Theme and template functions for node gallery hierarchy.
 */
function theme_node_gallery_hierarchy_structure_form($form) {
  $path = drupal_get_path('module', 'node_gallery_hierarchy');
  drupal_add_css($path . '/node_gallery_hierarchy.css');
  drupal_add_js($path . '/js/ng_hierarchy.js');
  drupal_add_tabledrag('node-gallery-hierarchy-structure', 'match', 'parent', 'gallery-parent', 'gallery-parent', 'gallery-id', FALSE);
  drupal_add_tabledrag('node-gallery-hierarchy-structure', 'depth', 'group', 'gallery-depth', NULL, NULL, FALSE);
  $output = '';
  $rows = array();
  foreach (element_children($form) as $key) {
    if (isset($form[$key]['#gallery'])) {
      $gallery = &$form[$key];

      $row = array();
      $row[] = (isset($gallery['#gallery']['depth']) && $gallery['#gallery']['depth'] > 0 ? theme('indentation', $gallery['#gallery']['depth']) : '') . drupal_render($gallery['title']);
      $gallery['gid']['#attributes']['class'] = 'gallery-id';
      $gallery['parent']['#attributes']['class'] = 'gallery-parent';
      $gallery['depth']['#attributes']['class'] = 'gallery-depth';
      $row[0] .= drupal_render($gallery['parent']) . drupal_render($gallery['gid']) . drupal_render($gallery['depth']);
      
      $rows[] = array('data' => $row, 'class' => 'draggable');      
    } elseif ($key != 'submit') {
      // render all other fields except the submit button above the list.
      $output .= drupal_render($form[$key]);
    }
  }
  // perhaps I'll add some more columns later on.
  $header = array(t('Name'));
  $output .= theme('table', $header, $rows, array('id' => 'node-gallery-hierarchy-structure'));  
  $output .= drupal_render($form);
  return $output;
}
