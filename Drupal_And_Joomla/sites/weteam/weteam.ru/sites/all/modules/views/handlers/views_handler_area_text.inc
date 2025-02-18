<?php

/**
* @file
* Views area text handler.
*/

/**
 * @ingroup views_area_handlers Views' area handlers
*/

class views_handler_area_text extends views_handler_area {

  function option_definition() {
    $options = parent::option_definition();
    $options['content'] = array('default' => '', 'translatable' => TRUE, 'format_key' => 'format');
    $options['format'] = array('default' => variable_get('filter_default_format', 1));
    $options['tokenize'] = array('default' => FALSE);
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);

    $form['content'] = array(
      '#type' => 'textarea',
      '#default_value' => $this->options['content'],
      '#rows' => 6,
    );

    $form['format'] = filter_form($this->options['format']);

    $form['tokenize'] = array(
      '#type' => 'checkbox',
      '#title' => t('Use replacement tokens from the first row'),
      '#default_value' => $this->options['tokenize'],
    );

    // Get a list of the available fields and arguments for token replacement.
    $options = array();
    foreach ($this->view->display_handler->get_handlers('field') as $field => $handler) {
      $options[t('Fields')]["[$field]"] = $handler->ui_name();
    }

    $count = 0; // This lets us prepare the key as we want it printed.
    foreach ($this->view->display_handler->get_handlers('argument') as $arg => $handler) {
      $options[t('Arguments')]['%' . ++$count] = t('@argument title', array('@argument' => $handler->ui_name()));
      $options[t('Arguments')]['!' . $count] = t('@argument input', array('@argument' => $handler->ui_name()));
    }

    if (!empty($options)) {
      $output = '<p>' . t('The following tokens are available. If you would like to have the characters %5B and %5D please use the html entity codes \'%5B\' or  \'%5D\' or they will get replaced with empty space.)' . '</p>');
      foreach (array_keys($options) as $type) {
        if (!empty($options[$type])) {
          $items = array();
          foreach ($options[$type] as $key => $value) {
            $items[] = $key . ' == ' . $value;
          }
          $output .= theme('item_list',
            array(
              'items' => $items,
              'type' => $type
            ));
        }
      }

      $form['token_help'] = array(
        '#type' => 'fieldset',
        '#title' => t('Replacement patterns'),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
        '#value' => $output,
        '#id' => 'edit-options-token-help',
        '#dependency' => array(
          'edit-options-tokenize' => array(1),
        ),
        '#prefix' => '<div>',
        '#suffix' => '</div>',
      );
    }
  }

  function options_submit(&$form, &$form_state) {
    $form_state['values']['options']['format'] = $form_state['values']['format'];
    parent::options_submit($form, $form_state);
  }

  function render($empty = FALSE) {
    $format = isset($this->options['format']) ? $this->options['format'] : FILTER_FORMAT_DEFAULT;
    if (!$empty || !empty($this->options['empty'])) {
      return $this->render_textarea($this->options['content'], $format);
    }
    return '';
  }

  /**
   * Render a text area, using the proper format.
   */
  function render_textarea($value, $format) {
    static $formats = array();

    // Check to make sure the filter format exists; if not, we don't
    // display anything.
    $format = filter_resolve_format($format);

    if (!array_key_exists($format, $formats)) {
      $formats[$format] = db_result(db_query("SELECT name FROM {filter_formats} WHERE format = %d", $format));
    }

    if (!isset($formats[$format])) {
      return;
    }

    if ($value) {
      if ($this->options['tokenize']) {
        $value = $this->view->style_plugin->tokenize_value($value, 0);
      }
      return check_markup($value, $format, FALSE);
    }
  }
}
