<?php
/**
 * @file views-view-list--node-gallery-hierarchy-views--covers.tpl
 * Default template for the Covers List display of node gallery hierarchy default 
 * views.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>
<div class="node-gallery-hierarchy-subgallery-list">
  <?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>
  <<?php print $options['type']; ?>>
    <?php foreach ($rows as $id => $row): ?>
      <li class="<?php print $classes[$id]; ?>"><?php print $row; ?></li>
    <?php endforeach; ?>
  </<?php print $options['type']; ?>>
</div>