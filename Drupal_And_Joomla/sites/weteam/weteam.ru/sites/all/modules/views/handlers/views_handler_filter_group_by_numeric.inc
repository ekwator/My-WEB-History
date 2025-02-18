<?php

/**
 * Simple filter to handle greater than/less than filters
 */
class views_handler_filter_group_by_numeric extends views_handler_filter_numeric {
  function query() {
    $this->ensure_my_table();
    $field = $this->get_field();

    $info = $this->operators();
    if (!empty($info[$this->operator]['method'])) {
      $this->{$info[$this->operator]['method']}($field);
    }
  }
  function op_between($field) {
    if ($this->operator == 'between') {
      $this->query->add_having($this->options['group'], "$field >= %d", $this->value['min']);
      $this->query->add_having($this->options['group'], "$field <= %d", $this->value['max']);
    }
    else {
      $this->query->add_having($this->options['group'], "$field <= %d OR $field >= %d", $this->value['min'], $this->value['max']);
    }
  }

  function op_simple($field) {
    $this->query->add_having($this->options['group'], "$field $this->operator %d", $this->value['value']);
  }

  function op_empty($field) {
    if ($this->operator == 'empty') {
      $operator = "IS NULL";
    }
    else {
      $operator = "IS NOT NULL";
    }

    $this->query->add_having($this->options['group'], "$field $operator");
  }

  function ui_name($short = FALSE) {
    return $this->get_field(parent::ui_name($short));
  }

  function can_group() { return FALSE; }
}
