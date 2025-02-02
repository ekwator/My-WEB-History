<?php
// $Id: pane-header.tpl.php,v 1.1 2010/01/11 06:37:09 merlinofchaos Exp $
/**
 * @file
 *
 * Theme implementation to display the header block on a Drupal page.
 *
 * This utilizes the following variables thata re normally found in
 * page.tpl.php:
 * - $logo
 * - $front_page
 * - $site_name
 * - $front_page
 * - $site_slogan
 * - $search_box
 *
 * Additional items can be added via theme_preprocess_pane_header(). See
 * template_preprocess_pane_header() for examples.
 */
 ?>
<div id="header">
  <div id="logo-floater">
    <?php if ($logo || $site_title): ?>
      <h1><a href="<?php print $front_page; ?>" title="<?php print $site_title;?>">
      <?php if ($logo): ?>
        <img src="<?php print $logo; ?>" alt="<?php print $site_title; ?>" id="logo" />
      <?php endif; ?>
      <?php print $site_html; ?></a></h1>
    <?php endif; ?>
  </div>

  <?php if (isset($primary_links)) : ?>
    <?php print theme('links', $primary_links, array('class' => 'links primary-links')) ?>
  <?php endif; ?>
  <?php if (isset($secondary_links)) : ?>
    <?php print theme('links', $secondary_links, array('class' => 'links secondary-links')) ?>
  <?php endif; ?>

</div> <!-- /header -->
