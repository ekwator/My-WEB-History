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
    <div id="skip-nav"><a href="#content">Skip to Content</a></div>  
    <div id="page">
      
      <div class="container_<?php echo container($col); ?>">
      <?php echo fluidgrid($grid); ?>
  	
  	<!-- ______________________ HEADER _______________________ -->
    
    <div id="header" class="span-full">		
  			
    <?php if (!empty($logo)): ?>
        <a href="<?php echo $base_path; ?>" title="<?php echo t('Home'); ?>" rel="home" id="logo">
          <img src="<?php echo $logo; ?>" alt="<?php echo t('Home'); ?>" />
        </a>
    <?php endif; ?>
    
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
                
        <?php if ($search_box): ?>
            <?php echo $search_box; ?>
        <?php endif; ?>
              
      <?php endif; ?>		
        
      <?php if ($header): ?>
        <div id="header-region">
          <?php echo $header; ?>
        </div>
      <?php endif; ?>
      
      <hr/>
  
    </div> <!-- /header -->
  
        
    <!-- ______________________ Navigation _______________________ -->
    
    <?php if (!empty($primary_links) or !empty($secondary_links)): ?>
    
      <div id="navigation" class="menu <?php if (!empty($primary_links)) { echo "withprimary"; } if (!empty($secondary_links)) { echo " withsecondary"; } ?> ">
      
        <?php if (!empty($primary_links)): ?>
          <div id="primary" class="clear-block">
            <?php echo theme('links', $primary_links, array('class' => 'links primary-links')); ?>
          </div>
        <?php endif; ?>
      
        <?php if (!empty($secondary_links)): ?>
          <div id="secondary" class="clear-block">
            <?php echo theme('links', $secondary_links, array('class' => 'links secondary-links')); ?>
          </div>
        <?php endif; ?>
      
      </div> <!-- /navigation -->
      
      <hr/>
    
    <?php endif; ?>
  
    <!-- ______________________ MAIN _______________________ -->
  
    <div id="main" class="span-full clearfix">
            
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
      
        </div> <!-- /#content-header -->
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
  
      </div> <!-- /content -->
      
      <?php if ($left): ?> <!-- SIDEBAR LEFT -->
        <div id="sidebar-left" class="column left">
  			  <?php echo $left; ?>
    		</div>
    	<?php endif; ?> <!-- /sidebar-left -->
      
    		
      <?php if ($right): ?> <!-- SIDEBAR RIGHT -->
        <div id="right" class="column right">
      		<?php echo $right; ?>
        </div>
      <?php endif; ?> <!-- /sidebar-right -->
  
    </div> <!-- /main -->
    	
  		<!-- ______________________ FOOTER _______________________ -->
  
      <?php if(!empty($footer_message) || !empty($footer_block)): ?>
    	  <div id="footer">
  	      <?php echo $footer_message; ?>
  	      <?php echo $layout; ?>
  	      <?php echo $footer_block; ?>
    	  </div> <!-- /footer -->
  		<?php endif; ?>
  		
    	<?php echo $closure; ?>
      </div> <!-- /container -->
    </div> <!-- /page -->
  
  	<?php echo switch_grid($link); ?>
  
  </body>
</html>
