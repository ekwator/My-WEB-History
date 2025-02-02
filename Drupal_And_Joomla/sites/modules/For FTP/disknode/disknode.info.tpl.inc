<?php
global $title;
global $disknode_breadcrumb;
global $disknode_file;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
<head>
    <title>Disknode - <?php print $title ?></title>
    <link href="<?php print base_path() . drupal_get_path('module', 'disknode') . '/disknode.style.css'; ?>" rel="stylesheet" type="text/css" />
    <base href="<?php print base_path() ?>" />
</head>
<body>
<div>
<h1><?php print $title ?></h1>
<h2><?php print $disknode_breadcrumb . $disknode_file->filename ?></h2>
</div>
<div id="controls">
<?php
  print '<ul class="controls">';
  print '<li class="control-browse">' . l('Browse', "disknode/browse", array('attributes' => array('class' => 'controltext'), 'absolute' => true, 'query' => "subdir=".$subdir)) . '</li>';
  print '</ul>'
?>
</div>
<?php
  echo theme_status_messages();
?>

<dl>
<dt>File path</dt>
<dd><input readonly="readonly" value="<?php echo $disknode_file->filepath ?>" style="width: 90%;" /></dd>

<dt>Last modified</dt>
<dd><?php echo date("r", $disknode_file->filetime) ?></dd>

<dt>File size</dt>
<dd title="<?php echo $disknode_file->size ?> bytes"><?php echo format_size($disknode_file->size) ?></dd> <!-- TODO: find function for human readable size (drupal function?) -->

<dt>Mime type</dt>
<dd><code><?php echo $disknode_file->mimetype ?></code></dd>

<?php if (count($disknode_file->fileowner)) {?>

<dt>Owned by:</dt>
<dd><code><?php echo $disknode_file->fileowner  ?></code></dd>

<?php  } ?>
</dl>
<?php if (count($disknode_file->nodes) > 0) {
  echo '<h4>Associated nodes</h4>';
  echo '<ul>';
  foreach ($disknode_file->nodes as $node) {
    echo '<li class="disknode-associated-nodes">' . $node->link . '</li>';
  }
  echo '</ul>';
  echo '<br />';
}
?>

<div class="tabcontrol">
<script type="text/javascript">
var currentTab;
var currentTabPage;
function openTab(tabname) {
  if (currentTabPage) {
    currentTabPage.style.display = 'none';
  }
  if (currentTab) {
    currentTab.className = '';
  }
  currentTab = document.getElementById('tab_'+tabname);
  currentTabPage = document.getElementById('tabpage_'+tabname);
  if (currentTabPage) {
    currentTabPage.style.display = 'block';
  }
  if (currentTab) {
    currentTab.className = 'active';
  }
}
</script>
<ul class="tabcontrol">
    <li id="tab_move" onclick="openTab('move');">Move</li>
    <li id="tab_copy" onclick="openTab('copy');">Copy</li>
    <li id="tab_delete" onclick="openTab('delete');">Delete</li>
</ul>
<div class="tab" id="tabpage_move">
  <form method="post" action="">
	<input type="hidden" name="op" value="move" />
	<label for="newname">New name/location</label><br />
	<input type="text" name="newname" id="newname" value="<?php echo isset($_POST["newname"])?$_POST["newname"]:$disknode_file->filepath ?>" style="width: 95%;" /><br />
	<br />
	<button type="submit">move</button>
  </form>
</div>

<div class="tab" id="tabpage_copy">
  <form method="post" action="">
	<input type="hidden" name="op" value="copy" />
	<label for="newname">New file</label><br />
	<input type="text" name="newname" id="newname" value="<?php echo isset($_POST["newname"])? $_POST["newname"]:$disknode_file->filepath ?>" style="width: 95%;" /><br /><br />
	<button type="submit">copy</button>
  </form>
</div>

<div class="tab" id="tabpage_delete">
  <form method="post" action="">
	<input type="hidden" name="op" value="delete" />
	<input type="checkbox" name="yesimsure" id="yesimsure" value="1" />
	<label for="yesimsure">Yes, I am sure.</label><br /><br />
	<button type="submit">delete</button>

  </form>
</div>



<?php
if (isset($_POST["op"])) {
  echo "<script type=\"text/javascript\">openTab('" . $_POST["op"] . "');</script>";
}
?>
</div>
</body>
</html>