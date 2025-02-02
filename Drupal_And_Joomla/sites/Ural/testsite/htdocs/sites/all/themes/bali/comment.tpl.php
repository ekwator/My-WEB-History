<?php
// $Id: comment.tpl.php,v 1.3 2010/07/07 06:26:47 phasma Exp $
?>
<div class="clear-block comment<?php if ($comment->status == COMMENT_NOT_PUBLISHED) print ' comment-unpublished'; ?>">
  <?php if ($picture) { print $picture; } ?>
  <span class="this-link <?php if ($new != '') { ?>new <?php } ?>"><?php echo "<a href=\"$node_url#comment-$comment->cid\">#</a>"; ?></span><span class="submitted"><?php print $submitted; ?></span>
  <div class="content"><?php print $content; ?></div>
  <div class="links-comment "><?php print $links; ?></div>
</div>