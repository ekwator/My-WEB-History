<?php
// $Id$ 

/*!
 * Dynamic display block module template: gradient-green10p - pager template
 * Copyright (c) 2008 - 2009 P. Blaauw All rights reserved.
 * Version 1.1 (11-FEB-2009)
 * Licenced under GPL license
 * http://www.gnu.org/licenses/gpl.html
 */

/**
 * @file
 * Dynamic display block module template: gradient-green10p - pager template
 * - Number pager
 *
 * Available variables:
 * - $delta: Block number of the block.
 * - $pager: Type of pager to add
 * - $pager_position: position of the slider (top | bottom) 
 *
 * notes: don't change the ID names, they are used by the jQuery script.
 */
?>
<?php if ($pager_position == 'bottom'): ?>
 <div class="spacer-horizontal"><b></b></div>
<?php endif; ?>
<!-- number pager -->
<div id="ddblock-<?php print $pager ."-". $delta ?>" class="<?php print $pager ?> ddblock-pager clear-block">
</div>
<?php if ($pager_position == 'top'): ?>
 <div class="spacer-horizontal"><b></b></div>
<?php endif; ?>
