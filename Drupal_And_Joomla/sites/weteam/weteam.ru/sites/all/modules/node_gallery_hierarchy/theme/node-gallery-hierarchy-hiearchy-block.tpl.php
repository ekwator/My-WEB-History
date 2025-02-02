<?php $depth = 0; $in = FALSE; ?>
<ul class='node-gallery-hierarchy-block'>
 <?php foreach ($gallery_list as $gallery): ?>
  <?php if ($gallery['depth'] > $depth): ?>
   <ul>
  <?php $depth++; ?>
  <?php elseif ($gallery['depth'] < $depth): ?>
   </ul></li>
  <?php $depth--; ?>
  <?php elseif ($in): ?>
   </li>
  <?php endif; ?>
  <li <?php if($gid && $gid == $gallery['gid']): ?> class="active" <?php endif; ?>><span class='node-gallery-hierarchy-icon'>&nbsp;</span><?php $in = TRUE; ?><?php print l($gallery['title'], 'node/' . $gallery['gid']); ?>
 <?php endforeach; ?>
  </li>
 <?php for (; $depth > 0; $depth--): ?>
  </ul></li>
 <?php endfor; ?>
</ul>
