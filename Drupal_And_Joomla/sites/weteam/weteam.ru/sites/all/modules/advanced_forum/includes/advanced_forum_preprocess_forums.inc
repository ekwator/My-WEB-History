<?php

/**
 * @file
 * Holds the contents of a preprocess function moved into its own file
 * to ease memory requirements and having too much code in one file.
 */

function _advanced_forum_preprocess_forums(&$variables) {
  advanced_forum_add_template_suggestions("forums", $variables['template_files']);

  $variables['forums_defined'] = count($variables['forums']) || count($variables['parents']);

  $tid = intval($variables['tid']);

  if (!empty($variables['forums'])) {
    $variables['forums'] = theme('forum_list', $variables['forums'], $variables['parents'], $variables['tid']);
  }
  else {
    $variables['forums'] = '';
  }

  $variables['search'] = theme('advanced_forum_search_forum', $tid);

  if (arg(1) == 0) {
    // We're on the front page of the forums.

    // Remove forum description.
    $variables['forum_description'] = '';

    // This is normally attached to the topic list so we need to create it
    // here as well since the main page has no topics.
    $variables['forum_tools'] = advanced_forum_forum_tools(0);

    // Fetch the forum statistics.
    $variables['forum_statistics'] = '';
    if (user_access('view forum statistics')) {
      $variables['forum_statistics'] = theme('advanced_forum_statistics');
    }

    // Fetch the forum legend.
    $variables['forum_legend'] = theme('advanced_forum_forum_legend');
  }
  else {
    // Grab the forum description and make it available to the template file
    $forum = taxonomy_get_term($tid);
    $variables['forum_description'] = $forum->description;

    // Get the themed list of node types that can be posted in this forum.
    $variables['forum_links'] = theme('advanced_forum_node_type_create_list', $variables['tid']);

    // Set a variable for displaying the topic legend.
    $variables['topic_legend'] = theme('advanced_forum_topic_legend');
  }
}
