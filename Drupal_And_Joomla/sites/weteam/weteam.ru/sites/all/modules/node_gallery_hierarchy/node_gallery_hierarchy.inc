<?php
/**
 * @file
 * Common functions for node gallery hierarchy.
 */
/**
 * Returns a hierarchical array of galleries.
 *
 * @param string $type
 *   The content type name of the gallery type.
 */
function node_gallery_hierarchy_get_gallery_tree($type = 'node_gallery_gallery') {
  static $gallery_tree_cache = NULL;
  // we cannot cache this to the database, as it depends on the logged in user.
  if ($gallery_tree_cache) {
    $galleries = $gallery_tree_cache;
  }
  else {
    $sql = "SELECT n.nid as gid, n.title, n.uid, n.status, g.parent as parent, g.weight as weight FROM {node} n INNER JOIN {node_gallery_galleries} g ON n.nid = g.gid WHERE n.type = '%s'";
    $result = db_query(db_rewrite_sql($sql), array($type));
    $childrens = $parents = $terms = array();
    while ($gallery = db_fetch_object($result)) {
      // we create the tree in steps, because children might appear before parents
      $children[$gallery->parent][] = $gallery->gid;
      $parents[$gallery->gid][] = $gallery->parent;
      $galleries[$gallery->gid] = $gallery;
    }
    if (empty($galleries)) {
      return;
    }
    foreach ($galleries as $gid => $gallery) {
      if (isset($children[$gid])) {
        $galleries[$gid]->children = array();
        foreach ($children[$gid] as $child) {
          $galleries[$gid]->children[] = $galleries[$child];
        }
      }
      if (isset($parents[$gid])) {
        $galleries[$gid]->parents = array();
        foreach ($parents[$gid] as $parent) {
          if ($parent != 0) {
            $galleries[$gid]->parents[] = $galleries[$parent];
          }
        }
      }      
    }
    foreach ($galleries as $gid => $gallery) {
      if (!empty($gallery->parents)) {
        unset($galleries[$gid]);
      }
    }
    node_gallery_sort_gallery_tree($galleries);
    $gallery_tree_cache = $galleries;
  }
  return $galleries;
}

/**
 * Recursively sorts the nested gallery hierarchy tree by the weight element.
 * 
 * @param type $galleries the gallery tree.
 */
function node_gallery_sort_gallery_tree(&$galleries) {
  if (empty($galleries)) {
    return;
  }
  // sort this level of galleries
  uasort($galleries,
    create_function('$a,$b', 
      'return ($a->weight < $b->weight) ? -1 : ($a->weight == $b->weight) ? 0 : 1;'));

  foreach ($galleries as $key => $gallery) {
    if (!empty($gallery->children)) {
      node_gallery_sort_gallery_tree($gallery->children);
    }
  }
}

/**
 * Returns the tree of the gallery hierarchy with the passed GID as root (BFS).
 *
 * @param string $type Content type of gallery.
 * @param int $gid Gallery id which should act as root of the tree.
 * @param array $layer Recursion parameter, current level of tree that is traversed.
 */
function node_gallery_hierarchy_get_subgalleries($type, $gid, &$layer = array()) {
  if (empty($layer)) {
    // function entrance. begin with root elements.
    $layer = node_gallery_hierarchy_get_gallery_tree($type);
    if (empty($layer)) {
      return FALSE;
    }
  }
  $children = array();
  foreach ($layer as $gallery) {
    if ($gallery->gid == $gid) {
      return $gallery;
    }
    elseif (!empty($gallery->children)) {
      $children += $gallery->children;
    }
  }
  if (empty($children)) {
    // element not in tree
    return FALSE;
  }
  else {
    // advance to next layer of tree
    return node_gallery_hierarchy_get_subgalleries($type, $gid, $children);
  }
}

/**
 * Returns a flat list of gallery ids in the passed gallery tree (DFS).
 * 
 * @param array $gallery_tree The hierarchical gallery tree.
 * @return array List of gallery ids in the tree.
 */
function node_gallery_hierarchy_get_flatlist(&$gallery_tree, $depth = 0) {
  if (empty($gallery_tree)) {
    return;
  }
  $galleries = array();
  if (is_object($gallery_tree)) {
    // single root element (proper tree)
    $galleries[] = array(
      'gid' => $gallery_tree->gid,
      'uid' => $gallery_tree->uid,
      'parent' => $gallery_tree->parent,
      'title' => $gallery_tree->title,
      'depth' => $depth,
      'weight' => $gallery_tree->weight
    );
    if (!empty($gallery_tree->children)) {
      $galleries = array_merge($galleries, node_gallery_hierarchy_get_flatlist($gallery_tree->children, $depth+1));
    }
  }
  else {
    // array: multiple trees
    foreach ($gallery_tree as $gallery) {
      $galleries[] = array(
        'gid' => $gallery->gid,
        'uid' => $gallery->uid,
        'parent' => $gallery->parent,
        'title' => $gallery->title,
        'depth' => $depth,
        'weight' => $gallery->weight
      );
      if (!empty($gallery->children)) {
        $galleries = array_merge($galleries, node_gallery_hierarchy_get_flatlist($gallery->children, $depth+1));
      }
    }
  }
  return $galleries;
}

/**
 * Return the trail in the hierarchy to the passed gallery.
 *
 * @param <type> $gallery
 */
function node_gallery_hierarchy_get_trail($gid, $type) {
  static $galleries;
  if (empty($galleries)) {
    // we cannot cache this to the database as it depends on the logged in user.
    $sql = "SELECT n.nid as gid, n.title, n.uid, n.status, g.parent as parent FROM {node} n INNER JOIN {node_gallery_galleries} g ON n.nid = g.gid WHERE n.type = '%s'";
    $result = db_query(db_rewrite_sql($sql), array($type));
    while ($gallery = db_fetch_object($result)) {
      $galleries[$gallery->gid] = $gallery;
    }
  }
  if ($galleries[$gid]->parent == 0) {
    return array();
  }
  else {
    return array_merge(
             node_gallery_hierarchy_get_trail($galleries[$gid]->parent, $type),
             array(
               array(
                 'gid' => $galleries[$gid]->parent,
                 'title' => $galleries[$galleries[$gid]->parent]->title
               )
             )
           );
  }
}


/**
 * Return a list of galleries suitable for a gallery options drop down, respecting the hierarchy of galleries.
 *
 * @staticvar array $galleries Gallery hierarchy, @see node_gallery_hierarchy_get_gallery_tree().
 * @param string $type Content type of gallery.
 * @param int $account User account to check permissions of.
 * @param array $prune Prune the subtrees of these nodes (to avoid loops in hierarchy)
 * @param array $_siblings The current partial hierarchy.
 * @param int $depth The current depth level in the hierarchy.
 * @return partial string of gallery hierarchy for select list.
 */
function node_gallery_hierarchy_get_gallery_list($type, $account = NULL, $prune = array(), &$_siblings = NULL, $depth = -1) {
  $ret = array();
  if (!$_siblings) {
    $_siblings =& node_gallery_hierarchy_get_gallery_tree($type);
  }
  $depth++;
  foreach ($_siblings as $sibling) {
    if ($account && ($account->uid != $sibling->uid) && !user_access('administer nodes', $account) && !user_access(NODE_GALLERY_PERM_ADMIN_GALLERY, $account)) {
      // this part of the tree doesn't belong to the user
      continue;
    }
    if (!empty($prune) && in_array($sibling->gid, $prune)) {
      // skip this part of the tree
      continue;
    }
    $title = '';
    for ($i = 0; $i < $depth; ++$i) {
      $title .= '-';
    }
    $ret[$sibling->gid] = $title . $sibling->title;
    if (!empty($sibling->children)) {
      $ret += node_gallery_hierarchy_get_gallery_list($type, $account, $prune, $sibling->children, $depth);
    }
  }
  return $ret;
}

function _node_gallery_hierarchy_parent_views_argument_options() {
  return array(
    'default_action' => 'default',
    'style_plugin' => 'default_summary',
    'style_options' => array(),
    'wildcard' => 'all',
    'wildcard_substitution' => 'All',
    'title' => '',
    'breadcrumb' => '',
    'default_argument_type' => 'fixed',
    'default_argument' => '0',
    'validate_type' => 'numeric',
    'validate_fail' => 'ignore',
    'break_phrase' => 1,
    'id' => 'parent',
    'table' => 'node_gallery_galleries',
    'field' => 'parent',
    'relationship' => 'none',
    'default_options_div_prefix' => '',
    'default_argument_fixed' => '0',
    'default_argument_user' => 0,
    'default_argument_php' => '',
    'validate_argument_node_type' => array(
      'node_gallery_gallery' => 0,
      'node_gallery_image' => 0,
      'not_gallery_image' => 0,
      'page' => 0,
      'story' => 0,
    ),
    'validate_argument_node_access' => 0,
    'validate_argument_nid_type' => 'nid',
    'validate_argument_vocabulary' => array(),
    'validate_argument_type' => 'tid',
    'validate_argument_transform' => 0,
    'validate_user_restrict_roles' => 0,
    'validate_argument_php' => '',
  );
}


function node_gallery_hierarchy_delete_gallery($node) {
  $operations = array();
  $tree = node_gallery_hierarchy_get_subgalleries($node->type, $node->gid);
  if (!empty($tree->children)) {
    // the gallery has children, delete subgalleries in batches
    $gallery_deletes = array_chunk($tree->children, NODE_GALLERY_BATCH_CHUNK_SIZE);
    foreach ($gallery_deletes as $gallery_delete) {
      $operations[] = array('node_gallery_hierarchy_gallery_delete_process', array($gallery_delete));
    }
    if (!empty($operations)) {
      $batch = array(
        'operations' => $operations,
        'finished' => 'node_gallery_hierarchy_gallery_delete_process_finished',
        'title' => t('Processing Gallery Delete.'),
        'init_message' => t('Gallery deletion is cascading to subgalleries.'),
        'progress_message' => t('Processing gallery deletions.'),
        'error_message' => t('Gallery deletion has encountered an error.'),
      );
      batch_set($batch);
    }
  }
}

/**
 * Deletes batches of galleries for batch API.
 * _node_gallery_delete
 * @param $galleryies
 *   Array of gallery hierarchy objects to delete.
 * @param $context
 *   Array provided by batch API.
 */
function node_gallery_hierarchy_gallery_delete_process($galleries, &$context) {
  if (!isset($context['sandbox']['progress'])) {
    $context['sandbox']['progress'] = 0;
    $context['sandbox']['max'] = count($galleries);
  }
  if (!isset($context['sandbox']['galleries'])) {
      $context['sandbox']['galleries'] = $galleries;
  }
  while (!empty($context['sandbox']['galleries'])) {
    $gallery = array_shift($context['sandbox']['galleries']);
    node_delete($gallery->gid);
    $context['sandbox']['progress']++;
  }
  // Let the batch engine know how close we are to completion.
  if ($context['sandbox']['progress'] == $context['sandbox']['max']) {
    $context['finished'] = 1;
  }
  else {
    $context['finished'] = $context['sandbox']['progress'] / $context['sandbox']['max'];
  }
}

/**
 * Used as a finished callback for batch API deletion of Galleries.
 *
 * @param $success
 *   Scalar provided by batch API.
 * @param $results
 *   Array provided by batch API.
 * @param $operations
 *   Array provided by batch API.
 */
function node_gallery_hierarchy_gallery_delete_process_finished($success, $results, $operations) {
  if ($success) {
    drupal_set_message(t('Gallery deletions complete.'));
  }
  else {
    // An error occurred.
    // $operations contains the operations that remained unprocessed.
    $error_operation = reset($operations);
    $operation = array_shift($error_operation);
    $arguments = array_shift($error_operation);
    $arguments_as_string = implode(', ', $arguments);
    watchdog('node_gallery', "Error when calling operation '%s'('%s')", array($operation, $arguments_as_string));
    drupal_set_message(t('An error occurred and has been recorded in the system log.'), 'error');
  }
}
