<?php // $Id: page.tpl.php,v 1.1.2.5 2009/08/01 17:19:43 couzinhub Exp $ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $language->language ?>" lang="<?php echo $language->language ?>" dir="<?php echo $language->dir ?>">

  <head>
    <title><?php echo $head_title; ?></title>
    <?php echo $head; ?>
    <?php echo $styles; ?>
    <?php echo page_property($values); ?>
    <?php echo $scripts; ?>
    <?php echo ie6($css); ?>
  </head>
  
  <body class="<?php echo $body_classes; ?>">
<!-- ______________________ PAGE _______________________ -->
	<div id="page">
<!-- ______________________ container _______________________ -->
	 <div class="container_<?php echo container($col); ?>">
	  <?php echo fluidgrid($grid); ?>
<!-- ______________________ HEADER _______________________ -->
	  <div id="header" class="span-full">		
	   <?php if (!empty($logo)): ?>
	    <a href="<?php echo $base_path; ?>" title="<?php echo t('Home'); ?>" rel="home" id="logo">
	     <img class="logo-picture" src="<?php echo $logo; ?>" alt="<?php echo t('Home'); ?>" />
	    </a>
	   <?php endif; ?>
	   <div id="header_bar">
	    <?php echo $headerbar ?>&nbsp;
	   </div>
	    <div class="headlines">
	     <div class="span-full"><img src="/sites/all/themes/fluidgrid/sanatural/css/images/header_bg.jpg" width="100%" height="100%" ></div>
	     <?php if (!empty($site_name) || !empty($site_slogan)): ?>
	      <?php if (!empty($site_name)): ?>
	       <h1 id="site-name">
	        <a href="<?php echo $base_path; ?>" title="<?php echo t('Home'); ?>" rel="home">
	         <span><?php echo $site_name; ?></span>
	        </a>
	       </h1>
	      <?php endif; ?>
	      <?php if ($site_slogan): ?>
	       <div id='site-slogan'><?php print $site_slogan; ?></div>
	      <?php endif; ?>
	    <?php endif; ?>
	   </div>
	   <div class="searchbox">
	    <?php if ($search_box): ?>
	     <?php echo $search_box; ?>
	    <?php endif; ?>
	   </div>
	   <div id="header-region">
	    <?php if ($header): ?>
	     <?php echo $header; ?>
	    <?php endif; ?>
	   <div id="header-region">
	  </div>
<!-- ______________________/HEADER _______________________ -->
	<div id="top_bar">
	 <?php echo $topbar ?>
	</div>
<!-- ______________________ MainNavigation _______________________ -->
	  <?php if (!empty($primary_links)): ?>
	   <div id="mainnavigation" class="menu<?php if (!empty($primary_links)) { echo "withprimary"; }  ?> ">
	    <?php if (!empty($primary_links)): ?>
	     <div id="block-menu-primary-links" class="block block-menu">
	      <?php echo theme('links', $primary_links, array('class' => 'links primary-links')); ?>
	     </div>
	    <?php endif; ?>
	   </div>
	  <?php endif; ?>
<!-- ______________________/MainNavigation _______________________ -->      
<!-- ______________________ SIDEBAR LEFT _______________________ -->      
	   <?php if ($left): ?>
	    <div id="sidebar-left" class="column left span-5 alpha">
	     <?php echo $left; ?>
	    </div>
	   <?php endif; ?>
<!-- ______________________/SIDEBAR LEFT _______________________ -->      
<!-- ______________________ MAIN _______________________ -->
	   <div id="main" class="span-15 clearfix">
	    <div id="content">
	     <?php if ($content_top): ?>
	      <div id="content-top">
	       <?php echo $content_top; ?>
	      </div>
	     <?php endif; ?>
	     <?php if ($breadcrumb || $title || $mission || $messages || $help || $tabs): ?>
	      <div id="content-header">
	       <?php echo $breadcrumb; ?>
	       <?php if ($title): ?>
	        <h1 class="title"><?php echo $title; ?></h1>
	       <?php endif; ?>
	       <?php if ($mission): ?>
	        <div id="mission"><?php echo $mission; ?></div>
	       <?php endif; ?>
	       <?php echo $messages; ?>
	       <?php echo $help; ?> 
	       <?php if ($tabs): ?>
	        <div class="tabs"><?php echo $tabs; ?></div>
	       <?php endif; ?>
	      </div>
	     <?php endif; ?>
	     <div id="content-area">
	      <?php echo $content; ?>
	     </div>
	     <?php echo $feed_icons; ?>
	     <?php if ($content_bottom): ?>
	      <div id="content-bottom">
	       <?php echo $content_bottom; ?>
	      </div>
	     <?php endif; ?>
	    </div>
	   </div>
<!-- ______________________/MAIN _______________________ -->
<!-- ______________________ SIDEBAR RIGHT _______________________ -->
	   <?php if ($right): ?> 
	    <div id="right" class="column right span-5 omega">
	     <?php echo $right; ?>
	    </div>
	   <?php endif; ?>
<!-- ______________________ SIDEBAR RIGHT _______________________ -->
<!-- ______________________ FOOTER _______________________ -->
	   <div class="footer">
	    <?php if ($footer_block): ?>
	     <div class="footer-blocks">
	      <?php if ($footer_block): ?><?php echo $footer_block ?><?php endif; ?>
	     </div>
	    <?php endif; ?>
	   </div>
	   <div id="footerbar">
	    <?php echo $footer ?>
	    <div class="message"><?php echo $footer_message ?></div>
	   </div>
	  </div>
<!-- ______________________/FOOTER _______________________ -->
	  <?php echo $closure; ?>
	 </div>
<!-- ______________________ MainNavigation _______________________ -->
	  <?php if (!empty($primary_links)): ?>
	   <div id="mainnavigation" class="menu<?php if (!empty($primary_links)) { echo "withprimary"; }  ?> ">
	    <?php if (!empty($primary_links)): ?>
	     <div id="primary" class="clear-block">
	      <?php echo theme('links', $primary_links, array('class' => 'links primary-links')); ?>
	     </div>
	    <?php endif; ?>
	   </div>
	  <?php endif; ?>
<!-- ______________________/MainNavigation _______________________ -->      
<!-- ______________________ Navigation _______________________ -->
	  <?php if (!empty($secondary_links)): ?>
	   <div id="navigation" class="menu <?php if (!empty($secondary_links)) { echo " withsecondary"; } ?> ">
	    <?php if (!empty($secondary_links)): ?>
	     <div id="secondary" class="clear-block">
	      <?php echo theme('links', $secondary_links, array('class' => 'links secondary-links')); ?>
	     </div>
	    <?php endif; ?>
	   </div>
	   <hr/>
	  <?php endif; ?>
<!-- ______________________/Navigation _______________________ -->      
	 </div>
	 <?php echo $closure; ?>
<!-- ______________________/container _______________________ -->

	</div> 
<!-- ______________________/PAGE _______________________ -->
  </body>
</html>
