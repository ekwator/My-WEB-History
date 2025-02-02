<?php
// $Id: block.tpl.php,v 1.3 2010/07/07 06:26:47 phasma Exp $
?>
  <div class="block block-<?php print $block->module; ?>" id="block-<?php print $block->module; ?>-<?php print $block->delta; ?>">
    <?php if ($block->subject) { ?><h3 class="title"><?php print $block->subject; ?></h3><?php } ?>
    <div class="content"><?php print $block->content; ?></div>
  </div>