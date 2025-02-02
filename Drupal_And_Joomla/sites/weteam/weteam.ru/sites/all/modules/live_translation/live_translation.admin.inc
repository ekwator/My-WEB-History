<?php
// $Id: live_translation.admin.inc,v 1.3 2009/06/07 03:18:43 brmassa Exp $
/**
 * @author Bruno Massa
 * @file
 *  Live Translation settings and admin pages
 */

module_load_include('inc', 'live_translation');

/**
 * Show which modules now have uptaded translations.
 *
 * @return
 *   HMTL. The list of module and in which language they have updated strings.
 */
function _live_translation_report() {
  if (arg(3) == 'update') {
    module_load_include('update.inc', 'live_translation');
    _live_translation_update();
  }
  elseif (arg(3) == 'import' and arg(4) and arg(5)) {
    module_load_include('update.inc', 'live_translation');
    _live_translation_import(arg(4), arg(5));
  }

  module_load_include('inc', 'update', 'update.compare');
  $modules        = update_get_projects();
  $languages      = language_list('enabled');
  $status         = _live_translation_status();
  $import_status  = variable_get('live_translation_import_status', array());
  $import_time    = variable_get('live_translation_import_time', array());
  $untranslated   = variable_get('live_translation_update_untranslated', array());
  $data           = array();

  foreach ($languages[1] as $langcode => $language) {
    if ($langcode == 'en') {
      continue;
    }
    foreach ($modules as $mod => $module) {
      $data[$langcode][$mod] = array(
        'name'    => $module['info']['project'],
        'lang'    => $language->native,
        'status'  => $status[$langcode][$mod],
        'strings' => isset($import_status[$langcode][$mod]) ? $import_status[$langcode][$mod] : 0,
        'time'    => isset($import_time[$langcode][$mod]) ? $import_time[$langcode][$mod] : 0,
        'un'      => isset($untranslated[$langcode][$mod]) ? $untranslated[$langcode][$mod] : '-',
      );
    }
  }

  return empty($data) ? t('There is no language enabled (besides English)') : theme('live_translation_report', $data);
}

/**
 * Let users to select the translation server URL.
 *
 * @return
 *   HMTL. The list of module and in which language they have updated strings.
 */
function _live_translation_settings() {
  $languages = language_list('enabled');
  $form['live_translation_servers'] = array(
    '#title'  => t('Servers'),
    '#tree'   => TRUE,
    '#type'   => 'fieldset',
  );

  foreach ($languages[1] as $langcode => $language) {
    if ($langcode == 'en') {
      continue;
    }
    $form['live_translation_servers'][$langcode] = array(
      '#default_value' => _live_translation_servers($langcode),
      '#title'         => $language->native,
      '#type'          => 'textfield',
    );
  }
  return system_settings_form($form);
}

/**
 * Show which modules now have uptaded translations.
 *
 * @ingroup themable
 */
function theme_live_translation_report($data) {
  $output = l(t('Check the updates now.'), 'admin/reports/live-translation/update');

  $statuses = array(
    LIVE_TRANSLATION_STATUS_UNKNOWN => array('name' => t('Unknown'),                                  'class' => 'warning'),
    LIVE_TRANSLATION_STATUS_OUTDATE => array('name' => '',                                            'class' => 'error'),
    LIVE_TRANSLATION_STATUS_OK      => array('name' => t('Ok'),                                       'class' => 'ok'),
    LIVE_TRANSLATION_STATUS_PROJECT => array('name' => t('Project not available on server'),          'class' => ''),
    LIVE_TRANSLATION_STATUS_VERSION => array('name' => t('Project version not available on server'),  'class' => ''),
  );
  foreach ($data as $langcode => $language) {
    $rows = array();
    $collapsed = TRUE;
    foreach ($language as $mod => $module) {
      if ($module['status'] == LIVE_TRANSLATION_STATUS_OUTDATE) {
        $status = l(t('Outdated: !strings new strings', array('!strings' => $module['strings'])), "admin/reports/live-translation/import/$mod/$langcode");
        $collapsed = FALSE;
      }
      else {
        $status = $statuses[$module['status']]['name'];

        if ($module['status'] == LIVE_TRANSLATION_STATUS_UNKNOWN) {
          $collapsed = FALSE;
        }
      }

      $rows[] = array(
        'data'  => array(
          $module['name'],
          $status,
          $module['un'],
          (($module['status'] == LIVE_TRANSLATION_STATUS_INVALID) or $module['time'] == 0) ? '-' : format_date($module['time'], 'small')
        ),
        'class' => $statuses[$module['status']]['class']
      );
      $language = $module['lang'];
    }
    $output .= theme('fieldset', array(
      '#collapsed'    => $collapsed,
      '#collapsible'  => TRUE,
      '#title'        => $language,
      '#value'        => theme('table', array(t('Module'), t('Status'), t('Untranslated'), t('Last update')), $rows, array('class' => 'update'))
    ));
  }

  drupal_add_css(drupal_get_path('module', 'update') .'/update.css');

  return $output;
}
