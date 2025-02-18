<?php

/**
 * Field handler to allow linking to a user account or homepage
 */
class views_handler_field_username_comment extends views_handler_field {
  /**
   * Override init function to add uid and homepage fields.
   */
  function init(&$view, &$data) {
    parent::init($view, $data);
    $this->additional_fields['uid'] = 'uid';
    $this->additional_fields['homepage'] = 'homepage';
  }

  function option_definition() {
    $options = parent::option_definition();
    $options['link_to_user'] = array('default' => TRUE);
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['link_to_user'] = array(
      '#title' => t("Link this field to its user or an author's homepage"),
      '#type' => 'checkbox',
      '#default_value' => $this->options['link_to_user'],
    );
  }

  function render_link($data, $values) {
    $account->uid = $values->{$this->aliases['uid']};
    $account->name = $values->{$this->field_alias};
    $account->homepage = $values->{$this->aliases['homepage']};

    if (!empty($this->options['link_to_user'])) {
      return theme('username', $account);
    }
    else {
      return $data;
    }
  }

  function render($values) {
    return $this->render_link(check_plain($values->{$this->field_alias}), $values);
  }

}

?>