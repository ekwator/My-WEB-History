<?php
// $Id: tinsel-admin.tpl.php,v 1.1 2010/01/11 06:37:09 merlinofchaos Exp $
/**
 * @file
 * Template for a 2 column panel layout.
 *
 * This template provides a two column panel display layout, with
 * additional areas for the header and the footer.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['header']: Content in the header row.
 *   - $content['left']: Content in the left column.
 *   - $content['content']: Main content area.
 *   - $content['right']: Content in the right column.
 *   - $content['footer']: Content in the footer row.
 */
?>
<div class="tinsel clear-block panel-display" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <div class="panel-col-header panel-panel">
    <div class="inside"><?php print $content['header']; ?></div>
  </div>
  <div class="center-wrapper clear-block">
    <div class="panel-col-first panel-panel">
      <div class="inside"><?php print $content['left']; ?></div>
    </div>

    <div class="panel-col panel-panel">
      <div class="inside"><?php print $content['content']; ?></div>
    </div>

    <div class="panel-col-last panel-panel">
      <div class="inside"><?php print $content['right']; ?></div>
    </div>
  </div>
  <div class="panel-col-footer panel-panel">
    <div class="inside"><?php print $content['footer']; ?></div>
  </div>
</div>
