<?php

/**
 * @file
 * contains the functions for group management
 */

function filepicker_groups() {
  drupal_add_js(FILEPICKER_PATH .'/filepicker.js');

  // from iframe
  if (! arg(2)) {
    $content = filepicker_groups_list();
    $content .= drupal_get_form('filepicker_groups_form');
  }
  elseif ( arg(2) == 'edit') {
    $record = filepicker_get_user_group(arg(3));
    $content .= drupal_get_form('filepicker_groups_form', $record);
  }
  elseif (arg(2) == 'delete') {
    $content .= drupal_get_form('filepicker_group_delete_form', arg(3));
  }
  elseif ( is_numeric(arg(2)) && arg(2) > 0 ) {
    filepicker_set_user_group_state(1, arg(2));
    drupal_goto('filepicker/browse');
  }
  return theme('filepicker_iframe', $content);
}

/**
 * groups
 * from filepicker groups in my account
 */
function filepicker_user_groups($mode="", $gid=0) {
  $content = '';
  // $mode is edit, delete or empty
  if (empty($mode)) {
    $content .= filepicker_groups_list('account');
    $content .= drupal_get_form('filepicker_groups_form');
  }
  elseif ($mode == 'edit') {
    $record = filepicker_get_user_group($gid);
    $content .= drupal_get_form('filepicker_groups_form', $record);
  }
  elseif ($mode == 'delete') {
    $content .= drupal_get_form('filepicker_group_delete_form', $gid);
  }
  return $content;
}

function filepicker_groups_form(&$form_state, $record=0, $account=FALSE) {
  $form['groupsave'] = array(
    '#type' => 'fieldset',
    '#title' => ( $record ?  t('Edit group') : t('Add group')),
    '#description' => t('Give your group a brief name and optionally put any additional information in the group description box'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['groupsave']['group_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Group name'),
    '#size' => 20,
    '#default_value' => (isset($record->group_name) ? $record->group_name : ''),
    '#required' => TRUE
  );
  $form['groupsave']['group_description'] = array(
    '#type' => 'textfield',
    '#title' => t('group description'),
    '#size' => 50,
    '#maxlength' => 50,
    '#default_value' => (isset($record->group_description) ? $record->group_description : ''),
    '#description' => t('Maximum 50 characters'),
    '#required' => FALSE
  );
  if (user_access('use public filepicker') && user_access('create public filepicker groups') && variable_get('filepicker_public_enabled', 1)) {
    $form['groupsave']['group_public'] = array(
      '#type' => 'checkbox',
      '#title' => t('Public'),
      '#return_value' => 1,
      '#default_value' => (isset($record->public) ? $record->public : ''),
      '#description' => t('Make this group publicly available'),
    );
    // Create role restrictions
    if (variable_get('filepicker_publicroles_enabled', 1)) {
      $form['groupsave']['group_public_roles'] = array(
        '#type' => 'fieldset',
        '#title' => ( isset($record->gid) ?  t('Edit group roles') : t('Add public group roles')),
        '#description' => t('Add roles for public access to your group. (Don\'t check anything to make it available to all roles.)'),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
      );
      // Output a list of available roles as checkboxes
      $form['groupsave']['group_public_roles']['roles']['#tree'] = TRUE;
      if (isset($record->avail_roles)) {
        if ($record->avail_roles != 'all') $availroles = explode(':', $record->avail_roles);
      }
      foreach (user_roles(TRUE) as $rid => $role) {
        if (filepicker_role_has_permission($rid)) {
          if (isset($availroles) && is_array($availroles) && in_array($role, array_values($availroles))) $checked = TRUE;
          else $checked = FALSE;
          $form['groupsave']['group_public_roles']['roles'][$rid] = array(
            '#type' => 'checkbox',
            '#title' => $role,
            '#return_value' => $role,
            '#default_value' => ($checked ? 1 : ''),
          );
        }
      }
    }
  }

  if ($account) {
    $form['groupsave']['account'] = array(
      '#type' => 'value',
      '#value' => $account->uid,
    );
  }
  if (isset($record->gid)) {
    $form['groupsave']['gid'] = array(
      '#type' => 'value',
      '#value' => $record->gid,
    );
  }
  $form['groupsave']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save group'),
  );
  return $form;
}

function filepicker_groups_form_submit($form, &$form_state) {
  global $user;
  $record['group_name'] = $form_state['values']['group_name'];
  $record['group_description'] = $form_state['values']['group_description'];
  $record['public'] = $form_state['values']['group_public'];

  // Check role restrictions submitted
  if ( isset($form_state['values']['roles']) && $form_state['values']['roles']) {
    $found = 0;
    foreach ($form_state['values']['roles'] as $rid => $role) {
      if (!$role) {
        unset($form_state['values']['roles'][$rid]);
      }
      else {
        $found++;
      }
    }
    if ($found) {
      $record['avail_roles'] = implode(':', $form_state['values']['roles']);
    }
    else {
      $record['avail_roles'] = 'all';
    }
  }

  if ( isset($form_state['values']['account'])) {
    $record['uid'] = $form_state['values']['account'];
  }
  else {
    $record['uid'] = $user->uid;
  }
  if (isset($form_state['values']['gid'])) {
    $record['gid'] = $form_state['values']['gid'];
    filepicker_update_user_group($record);
  }
  else {
    filepicker_insert_user_group($record);
  }
}

/**
 * filepicker_user_groups functions
 */
function filepicker_insert_user_group($record) {
  if (db_query(
    "INSERT INTO {filepicker_user_groups} (uid, group_name, group_description, public, avail_roles) VALUES (%d, '%s', '%s', %d, '%s')",
    array($record['uid'], $record['group_name'], $record['group_description'], $record['public'], $record['avail_roles']))) {
    drupal_set_message(t('Group was successfully inserted'));
  }
  else {
    drupal_set_message(t('Error while trying to insert your group.'));
  }
}

function filepicker_update_user_group($record) {
  if (db_query(
    "UPDATE {filepicker_user_groups} SET group_name='%s', group_description='%s', public=%d, avail_roles='%s' WHERE gid = %d",
    array($record['group_name'], $record['group_description'], $record['public'], $record['avail_roles'], $record['gid']))) {
    drupal_set_message(t('Group was successfully updated'));
  }
  else {
    drupal_set_message(t('Error while trying to update your group.'));
  }
}

function filepicker_delete_user_group($gid) {
  if (db_query("DELETE FROM {filepicker_user_groups} WHERE gid = %d", array($gid))
    && db_query("DELETE FROM {filepicker_group_files} WHERE gid=%d", array($gid)) ) {
    drupal_set_message(t('Group was successfully deleted'));
    $pgid = variable_get('filepicker_public_currentgroup', 0);
    if($pgid == $gid) {
      variable_del("filepicker_public_currentgroup");
    }
    $pgid = variable_get('filepicker_currentgroup', 0);
    if($pgid == $gid) {
      variable_del("filepicker_currentgroup");
    }
  }
  else {
    drupal_set_message(t('Error while trying to delete group.'));
  }
}

function filepicker_get_user_groups_by_user($uid, $obj=TRUE) {
  $result = db_query("SELECT * FROM {filepicker_user_groups} WHERE uid = %d", array($uid));
  if ($obj) {
    return db_fetch_object($result);
  }
  return db_fetch_array($result);
}

function filepicker_group_edit($gid) {
  $record = filepicker_get_user_group($gid);
  $content .= drupal_get_form('filepicker_groups_form', $record);
  return $content;
}

/**
 * group delete form
 */
function filepicker_group_delete_form(&$form_state, $gid) {
  $record = filepicker_get_user_group($gid);
  if ($record) {
    $form['groupname'] = array(
      '#value' => '<p>'. $record->group_name .'</p>',
    );
    $form['mode'] = array(
      '#type' => 'value',
      '#value' => 'reallydelete',
    );
    $form['gid'] = array(
      '#type' => 'value',
      '#value' => $gid,
    );
    $form['delete'] = array(
      '#type' => 'submit',
      '#value' => t('Really Delete record'),
    );
    return $form;
  }
  else {

  }
}

/**
 * Submit group delete form
 */
function filepicker_group_delete_form_submit($form, &$form_state) {
  filepicker_delete_user_group($form_state['values']['gid']);
}


function filepicker_role_has_permission($rid) {
  $result = db_query("SELECT count(pid) AS ct FROM {permission} WHERE rid = %d AND perm LIKE '%%use public filepicker%%'", array($rid));
  $row = db_fetch_array($result);
  return $row['ct'];
}

// build a table
function filepicker_groups_list($src=FALSE, $account=FALSE, $label="") {
  if ($account) {
    $user = $account;
  }
  else {
    global $user;
  }
  if ($src) {
    if ($src == 'admin') {
      $editpath = FILEPICKER_ADMIN_PATH .'/groups/user/'. $user->uid .'/edit/';
      $deletepath = FILEPICKER_ADMIN_PATH .'/groups/user/'. $user->uid .'/delete/';
    }
    else {
      $editpath = 'user/'. $user->uid .'/filepicker/groups/edit/';
      $deletepath = 'user/'. $user->uid .'/filepicker/groups/delete/';
    }
  }
  else {
    $editpath = "filepicker/groups/edit/";
    $deletepath = "filepicker/groups/delete/";
  }

  $content = "";
  $how_many = variable_get('filepicker_rows_per_page', 25);
  $use_icons = variable_get('filepicker_use_icons', 1);

  if (user_access('use public filepicker') && variable_get('filepicker_public_enabled', 1)) {
    $header = array(
      array('data' => t('Group name'), 'field' => 'g.group_name'),
      array('data' => t('Description'), 'field' => 'g.group_description'),
      array('data' => t('No. files'), 'field' => 'ct'),
      t('State'),
      array('data' => t('Public'), 'field' => 'g.public'),
      array('data' => t('Actions'), 'colspan' => 2),
    );
    $cols = 7;
  }
  else {
    $header = array(
      array('data' => t('Group name'), 'field' => 'g.group_name'),
      array('data' => t('Description'), 'field' => 'g.group_description'),
      array('data' => t('No. files'), 'field' => 'ct'),
      t('State'),
      array('data' => t('Actions'), 'colspan' => 2),
    );
    $cols = 6;
  }

  $countsql = "SELECT COUNT(DISTINCT(g.gid)) FROM {filepicker_user_groups} g JOIN {filepicker_group_files} u USING(gid) WHERE  g.uid=%d";
  $sql = "SELECT g.gid, g.group_name, g.group_description, g.public, COUNT(i.file_id) AS ct
    FROM {filepicker_user_groups} g LEFT JOIN {filepicker_group_files} i USING(gid)
    WHERE  g.uid=%d
    GROUP BY g.gid, g.group_name, g.group_description, g.public". tablesort_sql($header);

  $result = pager_query($sql, $how_many, 0, $countsql, array($user->uid));
  $rows = array();
  $totcount = 0;
  $rowcount = 0;
  $enabledlist = filepicker_get_enabled_group($account);
  while ($row = db_fetch_array($result)) {
    if (user_access('use public filepicker') && variable_get('filepicker_public_enabled', 1)) {
      $row_data = array(
        check_plain($row['group_name']),
        check_plain($row['group_description']),
        $row['ct'],
        (($enabledlist && in_array($row['gid'], $enabledlist)) ? t('selected') : ''),
        ($row['public'] ? t('Yes') : t('No')),
        ($use_icons ? _filepicker_get_icon('edit', $editpath . $row['gid'], array('title' => t('Edit'))) : l(t('Edit'), $editpath . $row['gid'])),
        ($use_icons ? _filepicker_get_icon('delete', $deletepath . $row['gid'], array('title' => t('Delete'))) : l(t('Delete'), $deletepath . $row['gid'])),
      );
    }
    else {
      $row_data = array(
        check_plain($row['group_name']),
        check_plain($row['group_description']),
        $row['ct'],
        (($enabledlist && in_array($row['gid'], $enabledlist)) ? t('selected') : ''),
        ($use_icons ? _filepicker_get_icon('edit', $editpath . $row['gid'], array('title' => t('Edit'))) : l(t('Edit'), $editpath . $row['gid'])),
        ($use_icons ? _filepicker_get_icon('delete', $deletepath . $row['gid'], array('title' => t('Delete'))) : l(t('Delete'), $deletepath . $row['gid'])),
      );
    }
    $rows[] = $row_data;
    $rowcount++;
  }
  return theme('filepicker_list', $header, $rows, $how_many, t('No groups found.'), '<div class="filep_groups_list">', '</div>', $label, $cols);

}

// not in use I think
function filepicker_get_group_files_count($gid) {
  $result = db_query("SELECT count(gid) as gidct FROM {filepicker_group_files} WHERE gid = %d", array($gid));
  $row = db_fetch_array($result);
  return $row['gidct'];
}

