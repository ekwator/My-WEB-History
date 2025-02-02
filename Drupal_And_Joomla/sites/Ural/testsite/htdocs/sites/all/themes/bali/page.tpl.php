<?php
// $Id: page.tpl.php,v 1.3 2010/07/07 06:26:47 phasma Exp $
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php echo $language->language ?>" xml:lang="<?php echo $language->language ?>" dir="<?php echo $language->dir ?>" id="html-main">
<head>
  <title><?php echo $head_title ?></title>
  <?php echo $head ?>
  <?php echo $styles ?>
  <?php echo $scripts ?>
</head>
<body>

<div id="top_bar">
  <?php echo $topbar ?>
</div>

<!--Start Page-->
<div class="page">

  <?php if (isset($primary_links)) : ?>
  <div class="topmenu">
  <?php if ($is_admin): ?><?php echo l(t("Edit menu"), "admin/build/menu-customize/primary-links", array("attributes" => array("class" => "edit-this-link"))); ?><?php endif; ?>
	  <?php echo theme('links', $primary_links) ?>
  <?php endif; ?>
  </div>

  <div class="header">
    <div id="header_bar">
    <?php echo $headerbar ?>&nbsp;
    </div>
    <div class="headlines">
    <?php if ($logo) { ?>
    <a href="<?php print $base_path ?>" title="<?php print t('Home') ?>"><img class="logo-picture" src="<?php print $logo ?>" alt="<?php print t('Home') ?>" /></a>
    <?php } ?>
    <?php if ($site_name) { ?>
      <h3 id="site-title"><a href="<?php print $front_page ?>" title="<?php print t('Home') ?>"><?php print $site_name ?></a></h3>
    <?php } ?>
    <?php if ($site_slogan) { ?>
      <h3 id='subtitle'><?php print $site_slogan ?></h3>
    <?php } ?>
    </div>
  </div>
  <div class="content_wrapper">
  <div class="breadcrumb"><?php print $breadcrumb; ?></div>
  <div class="clear-both">
  </div>

  <!--Start col_left-->
  <?php if ($left): ?>
    <div class="col_left">
    <?php echo $left ?>
    </div>
  <?php endif; ?>
  <!--End col_left-->

  <!--Start col_center-->
  <div class="col_center<?php if (empty($right) AND !empty($left)) {echo '_78';} if (empty($right) AND empty($left)) {echo '_97';} if (!empty($right) AND empty($left)) {echo '_66';} ?>">
    <div class="main-content-wrap">
    <?php if ($content_top_block): ?>
      <div class="content_top_block">
      <?php echo $content_top_block ?>
      </div>
    <?php endif; ?>

    <?php if ($show_messages): ?>
      <?php echo $messages; ?>
    <?php endif; ?>

    <div class="main-content-block">
    <?php if ($title): ?>
      <h1 class="title"><?php echo $title ?></h1>
    <?php endif; ?>
    <?php if ($tabs): ?>
      <div class="tabs"><?php echo $tabs; ?></div>
    <?php endif; ?>
    <?php echo $content; ?>
    <?php if ($content_after_blocks): ?>
      <div class="content_after_blocks"><?php echo $content_after_blocks ?></div>
    <?php endif; ?>
    </div>
    </div>
  </div>
  <!--End col_center-->
  <!--Start col_right-->
  <?php if ($right): ?>
    <div class="col_right"><?php echo $right ?></div>
  <?php endif; ?>
  <!--End col_right-->
  <div class="clear-both"></div>
  <!--Start footer-->
  <div class="footer">

  <?php if ($footer_block): ?>
    <div class="footer-blocks">
    <?php if ($footer_block): ?><?php echo $footer_block ?><?php endif; ?>
    </div>
  <?php endif; ?>
  </div>
  <div id="footerbar">
  <?php echo $footer ?><span class="footer_small"><a href="http://wyltstyle.com" title="Drupal Theme Design: wyltstyle">theme by wyltstyle</a></span>
  <div class="message"><?php echo $footer_message ?></div>
  </div>
  </div>
  <!--End footer-->
<!--End Page-->
</div>
<?php echo $closure ?>
</body>
</html>