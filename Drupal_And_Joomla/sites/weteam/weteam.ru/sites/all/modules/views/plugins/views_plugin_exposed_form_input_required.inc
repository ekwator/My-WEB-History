<?php

/**
 * Exposed form plugin that provides basic exposed form
 */
class views_plugin_exposed_form_input_required extends views_plugin_exposed_form {

  function summary_title() {
    return t('Input required');
  }

  function option_definition() {
    $options = parent::option_definition();

    $options['text_input_required'] = array('default' => t('Select any filter and click on Apply to see results'), 'translatable' => TRUE);
    $options['text_input_required_format'] = array('default' => FILTER_FORMAT_DEFAULT);
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);

    $form['text_input_required'] = array(
      '#type' => 'textarea',
      '#title' => t('Text on demand'),
      '#description' => t('Text to display instead of results until the user selects and applies an exposed filter.'),
      '#default_value' => $this->options['text_input_required'],
    );

    $form['text_input_required_format'] = filter_form($this->options['text_input_required_format'], NULL, array('text_input_required_format'));
  }

  function options_submit($form, &$form_state) {
    $form_state['values']['exposed_form_options']['text_input_required_format'] = $form_state['values']['text_input_required_format'];

    parent::options_submit($form, $form_state);
  }

  function exposed_filter_applied() {
    static $cache = NULL;
    if (!isset($cache)) {
      $view = $this->view;
      if (is_array($view->filter) && count($view->filter)) {
        foreach ($view->filter as $filter_id => $filter) {
          if ($filter->is_exposed()) {
            $identifier = $filter->options['expose']['identifier'];
            if (isset($view->exposed_input[$identifier])) {
              $cache = TRUE;
              return $cache;
            }
          }
        }
      }
      $cache = FALSE;
    }

    return $cache;
  }

  function pre_render(&$values) {
    if (!$this->exposed_filter_applied()) {
      $options = array(
        'id' => 'area',
        'table' => 'views',
        'field' => 'area',
        'label' => '',
        'relationship' => 'none',
        'group_type' => 'group',
        'content' => $this->options['text_input_required'],
        'format' => $this->options['text_input_required_format'],
      );
      $handler = views_get_handler('views', 'area', 'area');
      $handler->init($this->view, $options);
      $this->display->handler->handlers['empty'] = array(
        'area' => $handler,
      );
      $this->display->handler->set_option('empty', array('text' => $options));
    }
  }

  function query() {
    if (!$this->exposed_filter_applied()) {
      // We return with no query; this will force the empty text.
      $this->view->built = TRUE;
      $this->view->executed = TRUE;
      $this->view->result = array();
    }
    else {
      parent::query();
    }
  }

}
