<?php

/**
 * @file
 * Provides a preprocess function to integrate Privatemsg with Author Pane.
 */

/**
 * Implements hook_preprocess_author_pane().
 */
function privatemsg_preprocess_author_pane(&$variables) {
  global $user;
  $account = $variables['account'];

  if (function_exists('author_pane_api') && author_pane_api() == "2") {
    // Author Pane 2.x

    // Check if this preprocess needs to be run given who's calling it.
    if (!author_pane_run_preprocess('privatemsg', $variables['caller'])) {
      return;
    }

    $url = privatemsg_get_link($account);
    if (!empty($url)) {
      $variables['privatemsg'] = l('<span>' . t('Send PM') . '</span>', $url, array('attributes' => array('class' => 'author-pane-link', 'title' => t('Send @name a private message', array('@name' => privatemsg_recipient_format($account, array('plain' => TRUE))))), 'html' => TRUE));

      // Early versions of the template used this variable so fill it for
      // backwards compatability.
      $variables['privatemsg_link'] = $variables['privatemsg'];
    }
  }
  else {
    // Author Pane 1.x

    $image_path = $variables['image_path'];

    // Send private message
    if ($url = privatemsg_get_link($account)) {
      $img = theme('image', "$image_path/private-message.png", t('Send private message'), t('Send private message'), NULL, TRUE);
      $variables['privatemsg'] = l($img, $url, array('absolute' => TRUE, 'html' => TRUE));
      $variables['privatemsg_link'] = l(t('Send private message'), $url, array('attributes' => array('class' => 'author-privatemsg-icon'), 'html' => TRUE));
    }
  }
}

/**
 * Implementation of hook_author_pane_allow_preprocess_disable().
 */
function privatemsg_author_pane_allow_preprocess_disable() {
  return array('privatemsg' => 'Privatemsg');
}
