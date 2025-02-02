<?php // $Id: block.tpl.php,v 1.1.2.1 2009/07/07 00:47:32 couzinhub Exp $ ?>
<div id="block-<?php echo $block->module .'-'. $block->delta ?>" class="block block-<?php echo $block->module .' '. $block_zebra .' '. $block->region ?>">
	<div class="block-inner">

		<?php if ($block->subject): ?>
		  <h3 class="title block-title"><?php echo $block->subject; ?></h3>
		<?php endif; ?>
		
		<div class="content">
		  <?php echo $block->content; ?>
		</div>
		
	  <?php echo $edit_links; ?>

	</div> <!-- /block-inner -->
</div> <!-- /block -->