<?php
// $Id: pane-messages.tpl.php,v 1.5 2010/02/03 02:26:15 merlinofchaos Exp $
/**
 * @file
 *
 * Theme implementation to display the messages area, which is normally
 * included roughly in the content area of a page.
 *
 * This utilizes the following variables thata re normally found in
 * page.tpl.php:
 * - $tabs
 * - $messages
 * - $help
 *
 * Additional items can be added via theme_preprocess_pane_messages(). See
 * template_preprocess_pane_messages() for examples.
 */
 ?>
<?php print $breadcrumb; ?>
<?php if ($mission): print '<div id="mission">'. $mission .'</div>'; endif; ?>
<?php if ($tabs): print '<div id="tabs-wrapper" class="clear-block">'; endif; ?>
<?php if ($title): print '<h2'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h2>'; endif; ?>
<?php if ($tabs): print $tabs; endif; ?>
<?php if ($tabs2): print $tabs2; endif; ?>
<?php if ($tabs): print '</div>'; endif; ?>
<?php print $messages; ?>
<?php print $help; ?>
