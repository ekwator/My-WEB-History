<?php
// $Id: page.tpl.php,v 1.3 2010/07/26 18:24:27 merlinofchaos Exp $
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
  <head>
    <?php print $head ?>
    <title><?php print $head_title ?></title>
    <?php print $styles ?>
    <?php print $scripts ?>
    <!--[if lt IE 7]>
      <?php print tinsel_get_ie_styles(); ?>
    <![endif]-->
  </head>
  <body class="<?php print $body_classes; ?>"><div id="tinsel-wrapper" class="<?php print $tinsel_classes; ?>">

  <!-- Layout
  <div id="header-region" class="clear-block"><?php print $header; ?></div> -->

    <div id="wrapper">
    <div id="container" class="clear-block">

      <div id="header-wrapper">
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

      <?php if ($left): ?>
        <div id="sidebar-left" class="sidebar">
          <?php if ($search_box): ?><div class="block block-theme"><?php print $search_box ?></div><?php endif; ?>
          <?php print $left ?>
        </div>
      <?php endif; ?>

      <div id="center"><div id="squeeze"><div class="right-corner"><div class="left-corner">
          <?php print $breadcrumb; ?>
          <?php if ($mission): print '<div id="mission">'. $mission .'</div>'; endif; ?>
          <?php if ($tabs): print '<div id="tabs-wrapper" class="clear-block">'; endif; ?>
          <?php if ($title): print '<h2'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h2>'; endif; ?>
          <?php if ($tabs): print $tabs; endif; ?>
          <?php if ($tabs2): print $tabs2; endif; ?>
          <?php if ($show_messages && $messages): print $messages; endif; ?>
          <?php print $help; ?>
          <div class="clear-block">
            <?php print $content ?>
          </div>
          <?php print $feed_icons ?>
          <div id="footer"><?php print $footer_message . $footer ?></div>
      </div></div></div></div> <!-- /.left-corner, /.right-corner, /#squeeze, /#center -->

      <?php if ($right): ?>
        <div id="sidebar-right" class="sidebar">
          <?php if (!$left && $search_box): ?><div class="block block-theme"><?php print $search_box ?></div><?php endif; ?>
          <?php print $right ?>
        </div>
      <?php endif; ?>

    </div> <!-- /container -->
  </div>
  <!-- /layout -->

  <?php print $closure ?>
  </div></body>
</html>