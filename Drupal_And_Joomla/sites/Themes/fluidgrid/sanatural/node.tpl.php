<?php
// $Id:
?>
<div id="node-<?php print $node->nid; ?>" class="node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?>">
  <?php print $picture ?>
  <?php if ($page == 0): ?>
    <h1><a href="<?php print $node_url ?>" title="<?php print $title ?>"><?php print $title ?></a></h1>
  <?php endif; ?>
  <?php if ($submitted): ?>
    <span class="submitted"><?php print $submitted; ?></span>
  <?php endif; ?>
  <div class="content clear-block">
    <?php print $content ?>
  </div>
  <?php if (($links) OR ($taxonomy)){ ?>
  <div class="meta_links">
  <?php if ($links): ?>
    <div class="links"><?php print $links; ?></div>
  <?php endif; ?>
  <?php if ($taxonomy): ?>
    <div class="terms"><?php print $terms ?></div>
  <?php endif;?>
  </div>
  <?php } ?>
</div>