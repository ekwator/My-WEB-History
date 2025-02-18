<?php

/**
 * Field handler to display the depth of a comment
 */
class views_handler_field_comment_depth extends views_handler_field {
  function construct() {
    parent::construct();
    $this->additional_fields['thread'] = 'thread';
  }
  /**
   * Work out the depth of this comment
   */
  function render($values) {
    return count(explode('.', $values->{$this->aliases['thread']})) - 1;
  }
}
