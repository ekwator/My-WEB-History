<?php
// $Id$ 

/*!
 * Dynamic display block module template: chromatic-blue10l - content template
 * Copyright (c) 2008 - 2009 P. Blaauw All rights reserved.
 * Version 1.0 (13-DEC-2009)
 * Licenced under GPL license
 * http://www.gnu.org/licenses/gpl.html
 */

/**
 * @file
 * Dynamic display block module template: chromatic-blue10l - content template
 *
 * Available variables:
 * - $origin: From which module comes the block.
 * - $delta: Block number of the block.
 *
 * - $custom_template: template name
 * - $output_type: type of content
 *
 * - $slider_items: array with slidecontent
 * - 
 * - $pager_content: Themed pager content
 * - $pager_position: position of the pager (left | right)
 *
 * notes: don't change the ID names, they are used by the jQuery script.
 */
// add Cascading style sheet
drupal_add_css($directory .'/custom/modules/ddblock/'.$custom_template. '/ddblock-cycle-'.$custom_template. '.css', 'template', 'all', FALSE);
?>
<!-- dynamic display block slideshow -->
<div id="ddblock-<?php print $delta ?>" class="ddblock-cycle-<?php print $custom_template ?> clear-block">
 <div class="container clear-block border">
  <div class="container-inner clear-block border">
   <!-- slider content -->
   <div class="slider clear-block border">
    <div class="slider-inner clear-block border">
     <?php if ($output_type == 'view_fields') : ?>
      <?php foreach ($slider_items as $slider_item): ?>
       <div class="slide clear-block border">
        <div class="slide-inner slide-inner-<?php print $pager_position ?> clear-block border">
         <div class="slide-image slide-image-<?php print $pager_position ?>">
          <?php print $slider_item['slide_image']; ?>                  
         </div>
         <div class="slide-text slide-text-<?php print $pager_position ?> clear-block border">
          <div class="slide-text-inner slide-text-inner-<?php print $pager_position ?>clear-block border">
           <div class="slide-title clear-block border">
            <div class="slide-title-inner clear-block border">
             <h2><?php print $slider_item['slide_title'] ?></h2>
            </div> <!-- slide-title-inner-->
           </div>  <!-- slide-title-->
           <div class="slide-body clear-block border">
            <div class="slide-body-inner clear-block border">
             <p><?php print $slider_item['slide_text'] ?></p>
            </div> <!-- slide-body-inner-->
           </div>  <!-- slide-body-->
           <div class="slide-read-more slide-read-more clear-block border">
		        <p><?php print $slider_item['slide_read_more'] ?></p>
		       </div><!-- slide-read-more-->
          </div> <!-- slide-text-inner-->
         </div>  <!-- slide-text-->
        </div> <!-- slide-inner-->
       </div>  <!-- slide-->
      <?php endforeach; ?>
     <?php endif; ?>
    </div> <!-- slider-inner-->
   </div>  <!-- slider-->
   <!-- number pager -->
   <?php print $pager_content ?>
  </div> <!-- container-inner-->
 </div> <!--container-->      
</div> <!--  template -->
