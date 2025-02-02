<?php
// $Id: tinsel.tpl.php,v 1.2 2010/02/03 00:57:42 merlinofchaos Exp $
/**
 * @file
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['header']: Content in the top row.
 *   - $content['left']: Content in the left column.
 *   - $content['center']: Main content area.
 *   - $content['right']: Content in the right column.
 *   - $content['footer']: Content in the bottom row.
 */
?>
<div id="tinsel-wrapper" class="<?php print $tinsel_classes; ?>">
  <div id="header-region">
  </div>
  <div id="wrapper" class="center-wrapper">
    <div id="container" class="clear-block">
      <div id="header-wrapper">
        <?php print $content['header']; ?>
      </div>
      <?php if ($content['left']): ?>
        <div id="sidebar-left" class="panel-col-first panel-panel sidebar">
          <div class="inside"><?php print $content['left']; ?></div>
        </div>
      <?php endif; ?>

      <div id="center"><div id="squeeze"><div class="right-corner"><div class="left-corner">
        <div class="inside"><?php print $content['content']; ?></div>
        <div id="footer" class="panel-col-bottom panel-panel clear-block">
          <div class="inside"><?php print $content['footer']; ?></div>
        </div>
      </div></div></div></div> <!-- /.left-corner, /.right-corner, /#squeeze, /#center -->

      <?php if ($content['right']): ?>
        <div id="sidebar-right" class="panel-col-first panel-panel sidebar">
          <div class="inside"><?php print $content['right']; ?></div>
        </div>
      <?php endif; ?>
    </div> <!-- container -->
  </div> <!-- wrapper -->
</div>
