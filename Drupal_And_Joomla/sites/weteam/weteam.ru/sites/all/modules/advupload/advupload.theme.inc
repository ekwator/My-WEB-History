<?php
// $Id$
/**
 * @file
 * theme functions to make normal themiation
 */

/**
 * list of node upload links
 */
function theme_advupload_add_list($content) {
  $output = '';
  if ($content) {
    $output = '<dl class="node-type-list">';
    foreach ($content as $item) {
      $output .= '<dt>'. l($item['title'], $item['href'], $item['localized_options']) .'</dt>';
      $output .= '<dd>'. filter_xss_admin($item['description']) .'</dd>';
    }
    $output .= '</dl>';
  }
  return $output;
}
// output uploaded node with edit/etc pages
function theme_advupload_json_edit_node_draw($nid = NULL) {
  $out = '';
  if ($node = node_load(array('nid' => $nid))) {
    $actions = array(l(t('View'), 'node/'. $node->nid), l(t('Edit'), 'node/'. $node->nid . '/edit') );
    $out .= '<div class="advuploaded-loaded-node" id="advupload-nid-'. $nid .'">' . '<div class="advuploaded-node-title">'. l($node->title, 'node/'. $node->nid, array('attributtes' => array('class' => 'advupload-node-title'))) .'</div>' . '<div class="advuploaded-node-actions"><ul>';
    foreach ($actions as $a) $out .= '<li>'. $a .'</li>';
    $out .= '</ul></div></div>';
  }
  return $out;
}
// add this to external theme to make more flexible multilanguage sites
function theme_typetitle_label($type) {
  $typetitle_label = '';
  $type_struct = node_get_types();
  if(isset($type_struct[$type] ) && isset($type_struct[$type]->title_label) ) {
    $typetitle_label = $type_struct[$type]->title_label;
  }
  if(empty($typetitle_label) ) {
    $typetitle_label = t('Node title');
  }
  return  $typetitle_label;
}
