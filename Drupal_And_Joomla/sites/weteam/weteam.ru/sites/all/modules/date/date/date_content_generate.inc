<?php
/**
 * Implementation of Devel module's hook_content_generate().
 *
 * Included only when needed.
 */
function _date_content_generate($node, $field) {
  include_once('./'. drupal_get_path('module', 'date_api') .'/date_api_elements.inc');

  $node_field = array();
  if (isset($field['widget']['year_range'])) {
    $split = explode(':', $field['widget']['year_range']);
    $back = str_replace('-', '', $split[0]);
    $forward = str_replace('+', '', $split[1]);
  }
  else {
    $back = 2;
    $forward = 2;
  }
  // Pick a random year within the time range,
  // and a random second within that year.
	$year = date_format(date_now(), 'Y') - $back + mt_rand(0, ($forward + $back));
	$start = date_make_date($year .'-01-01 00:00:00', date_get_timezone_db($field['tz_handling']));
	$leap = date_format($start, 'L');
	$max_days = $leap ? 366 : 365;
	$seconds = mt_rand(0, ($max_days * 86400));
	date_modify($start, "+$seconds seconds");
	$increment = $field['widget']['increment'];
  date_increment_round($start, $increment);

	// Modify To date by 1 hour to 3 days, shorter for repeating dates
	// longer for others.
	$start2 = drupal_clone($start);
	$max = !empty($field['repeat']) ? 720 : 4320;
	$max = 240;
  date_modify($start2, '+'. mt_rand(60, $max) .' minutes');
  date_increment_round($start2, $increment);

  if ($field['tz_handling'] == 'date') {
    // Choose a random timezone.
    // Not all keys exist, so we have to check.
    $timezones = array_keys(date_timezone_names(TRUE));
    $key = mt_rand(0, count($timezones) - 1);
    if (!array_key_exists($key, $timezones)) {
      $timezone = date_default_timezone_name();
    }
    else {
      $timezone = $timezones[$key];
    }
  }
  else {
    $timezone = date_get_timezone($field['tz_handling']);
  }

  switch ($field['type']) {
    case 'date':
      $format = DATE_FORMAT_ISO;
      break;
    case 'datestamp':
      $format = DATE_FORMAT_UNIX;
      break;
    case 'datetime':
      $format = DATE_FORMAT_DATETIME;
      break;
  }
  $node_field['value'] = date_format($start, $format);
  if ($field['todate']) {
    $node_field['value2'] = date_format($start2, $format);
  }
  date_timezone_set($start, timezone_open($timezone));
  $node_field['timezone'] = $timezone;
  $node_field['offset'] = date_offset_get($start);
  date_timezone_set($start2, timezone_open($timezone));
  $node_field['offset2'] = date_offset_get($start2);

  if (!empty($field['repeat'])) {
    include_once('./'. drupal_get_path('module', 'date_repeat') .'/date_repeat_calc.inc');
    include_once('./'. drupal_get_path('module', 'date') .'/date_repeat.inc');
    include_once('./'. drupal_get_path('module', 'date_api') .'/date_api_ical.inc');

    // Create a repeating date.
    $duration = date_difference($start, $start2);
    $form_values = array();

    // Create the default case more frequently than case 1 or 2.
    $which = mt_rand(0, 10);
    $max_items = 10;
    $intervals = array_keys(INTERVAL_options());
    unset($intervals[0]);
    $interval = $intervals[mt_rand(1, 3)];
    switch ($which) {
      case 1:
        $mo = mt_rand(1, 28);
        $options = array('YEARLY', 'MONTHLY');
        $freq = date_content_generate_key($options);
        $freq = $options[$freq];
        $form_values['FREQ'] = $freq;
        // Make sure we'll find a match in our range.
        if ($freq == 'YEARLY') {
          $interval = 1;
        }
        $form_values['BYMONTHDAY'] = array($mo);
        break;
      case 2:
        $mo = mt_rand(1, 12);
        $options = array('YEARLY', 'MONTHLY');
        $freq = date_content_generate_key($options);
        $freq = $options[$freq];
        $form_values['FREQ'] = $freq;
        // Make sure we'll find a match in our range.
        if ($freq == 'YEARLY') {
          $interval = 1;
        }
        $form_values['BYMONTH'] = array($mo);
        break;
      default:
        $dows = array_keys(date_content_repeat_dow_options());
        $day = date_content_generate_key($dows);
        $dow = $dows[$day];
        $options = array('MONTHLY', 'DAILY', 'WEEKLY');
        $freq = date_content_generate_key($options);
        $freq = $options[$freq];
        $form_values['FREQ'] = $freq;
        $form_values['BYDAY'] = array($dow);
        break;
    }

    $form_values['INTERVAL'] = $interval;

    switch ($freq) {
      case 'YEARLY':
        $period = 'year';
        break;
      case 'MONTHLY':
        $period = 'month';
        break;
      case 'WEEKLY':
        $period = 'week';
        break;
      default:
        $period = 'day';
        break;

    }
    date_modify($start2, '+'. max(1, $forward) .' years');
    date_increment_round($start2, $increment);
    $until = date_format($start2, 'Y-m-d H:i:s');
    $form_values['UNTIL'] = array('datetime' => $until, 'tz' => 'UTC');
    $form_values['COUNT'] = $max_items;

    $rrule = date_api_ical_build_rrule($form_values);
    $values = date_repeat_build_dates($rrule, $form_values, $field, $node_field);

    $start = $node_field;
    $node_field = array(0 => $start);
    $node_field[0]['rrule'] = $rrule;
    $node_field += $values;
  }
  return $node_field;
}

function date_content_generate_key($array) {
  $keys = array_keys($array);
  $min = array_shift($keys);
  $max = array_pop($keys);
  return mt_rand($min, $max);
}

/**
 * Helper function for BYDAY options.
 *
 * Creates options like -1SU and 2TU
 * Omit options that won't find many matches, like 5th Sunday.
 */
function date_content_repeat_dow_options() {
  $options = array();
  foreach (date_repeat_dow_count_options() as $count_key => $count_value) {
    foreach (date_repeat_dow_day_options() as $dow_key => $dow_value) {
      if ($count_key != 5 && $count_key != -5) {
        $options[$count_key . $dow_key] = $count_value .' '. $dow_value;
      }
    }
  }
  return $options;
}