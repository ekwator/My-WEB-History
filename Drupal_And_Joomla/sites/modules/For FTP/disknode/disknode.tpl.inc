<?php 
global $title;
global $subdir;
global $disknode_breadcrumb;
global $disknode_content;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
    <title>Disknode - <?php print $title ?></title> 
    <link href="<?php print base_path() . drupal_get_path('module', 'disknode') . '/disknode.style.css'; ?>" rel="stylesheet" type="text/css" /> 
    <script type="text/javascript">
    function selectPath(selection, myid) {
        if (window.opener.disknodeFiles) {
            if (window.opener.disknodeFiles.add(selection)) {
            	// Request the <span> that called this function
            	var elem = document.getElementById(myid);
                elem.style.color = "red";
                elem.style.fontWeight = 700; // make it bold
            }
            return;
        }
        alert('Unable to set selection. Could not find a disknode editor page.');
    }
    function setCookie(name, value) {
        document.cookie = name + '=' + escape(value);
    }
	// Read a page's GET URL variables and returns the ''uploaded'' param
	function getUploadParam() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          if (hash[0] == 'uploaded') {
          	return hash[1].replace("%20"," ");
          }
      }
      return;
	}
	window.opener.disknodeFiles.add(getUploadParam());
    </script>
    <base href="<?php print base_path() ?>" />
</head>

<body>
<div>
<h1><?php print $title ?></h1>
<h2><?php print $disknode_breadcrumb ?></h2>
</div>
<div id="controls">
<?php
  print '<ul class="controls">';
  print '<li class="control-browse">' . l('Browse', "disknode/browse", array('attributes' => array('class' => 'controltext'), 'absolute' => true, 'query' => "subdir=".$subdir)) . '</li>';
  print '<li class="control-upload">' . l("Upload", "disknode/upload", array('attributes' => array('class' => 'controltext'), 'absolute' => true, 'query' => "subdir=".$subdir)) . '</li>';
  print '<li class="control-mkfolder">' . l("Create dir", "disknode/mkdir", array('attributes' => array('class' => 'controltext'), 'absolute' => true, 'query' => "subdir=".$subdir)) . '</li>';
  print '<li class="control-rmfolder">' . l("Remove dir", "disknode/rmdir", array('attributes' => array('class' => 'controltext'), 'absolute' => true, 'query' => "subdir=".$subdir)) . '</li>';
  print '<li class="control-okay"><a href="Javascript:window.close()" class= "controltext">Done</a></li>';
  print '</ul>';
?>
</div>
<div>
<?php
echo theme_status_messages();
echo $disknode_content;
?>
</div>
</body>
</html>