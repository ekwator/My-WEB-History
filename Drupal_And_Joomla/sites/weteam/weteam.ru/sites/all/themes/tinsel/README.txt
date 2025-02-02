Tinsel is nothing more than Garland, converted to be able to use a Panels
layout and still provide the Garland look for your site when using
Panels Everywhere.

This includes:

 o A couple of cleanups in garland's page.tpl.php where too much code was
   actually in the template.

 o Header and Messages panes. Tinsel does not use the Navigation pane; all
   the Navigation elements are actually part of the header in this theme.

 o A custom layout for use with Panels that includes the Garland markup.
   When using that layout, the Header pane should be placed in the Header
   region, and the Messages and Content panes should be placed in the
   Content region. The sidebars will collapse properly if empty.

 o Hollywood is a sub-theme of Tinsel that corresponds to Minelli. It
   fixes the width.

 o At this time CTools does not contain a pane for the 'Feed icon', so that
   element is missing. This will be fixed in CTools soon.

Installation
------------

o Enable Panels Everywhere and Tinsel. 

o Visit Administer >> Site building >> Pages >> site_template and either
  modify the site template to use the 'Tinsel' layout with the Header,
  Content and Messages panes or import the variant included in this file.

o For convenience, the export of a basic site template is included. Just edit
  the 'site_template' page and select 'Import variant'. Cut and paste everything
  into the import area. You may need to re-order the Tinsel variant above other
  variants, or just disable/remove others.

--- cut handler here ---
$handler = new stdClass;
$handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
$handler->api_version = 1;
$handler->name = 'site_template_panel_context_tinsel';
$handler->task = 'site_template';
$handler->subtask = '';
$handler->handler = 'panel_context';
$handler->weight = -10;
$handler->conf = array(
  'title' => 'Tinsel',
  'no_blocks' => 1,
  'css_id' => '',
  'css' => '',
  'contexts' => array(),
  'relationships' => array(),
  'access' => array(
    'plugins' => array(),
    'logic' => 'and',
  ),
);
$display = new panels_display;
$display->layout = 'tinsel';
$display->layout_settings = array();
$display->panel_settings = array();
$display->cache = array();
$display->title = '';
$display->hide_title = PANELS_TITLE_PANE;
$display->content = array();
$display->panels = array();
  $pane = new stdClass;
  $pane->pid = 'new-1';
  $pane->panel = 'content';
  $pane->type = 'pane_messages';
  $pane->subtype = 'pane_messages';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $display->content['new-1'] = $pane;
  $display->panels['content'][0] = 'new-1';
  $pane = new stdClass;
  $pane->pid = 'new-2';
  $pane->panel = 'content';
  $pane->type = 'page_content';
  $pane->subtype = 'page_content';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'context' => 'argument_page_content_1',
    'override_title' => 1,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $display->content['new-2'] = $pane;
  $display->panels['content'][1] = 'new-2';
  $pane = new stdClass;
  $pane->pid = 'new-3';
  $pane->panel = 'header';
  $pane->type = 'pane_header';
  $pane->subtype = 'pane_header';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array();
  $pane->cache = array();
  $pane->style = array(
    'style' => 'naked',
  );
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $display->content['new-3'] = $pane;
  $display->panels['header'][0] = 'new-3';
  $pane = new stdClass;
  $pane->pid = 'new-4';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'user-0';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 0;
  $display->content['new-4'] = $pane;
  $display->panels['right'][0] = 'new-4';
  $pane = new stdClass;
  $pane->pid = 'new-5';
  $pane->panel = 'right';
  $pane->type = 'block';
  $pane->subtype = 'user-1';
  $pane->shown = TRUE;
  $pane->access = array();
  $pane->configuration = array(
    'override_title' => 0,
    'override_title_text' => '',
  );
  $pane->cache = array();
  $pane->style = array();
  $pane->css = array();
  $pane->extras = array();
  $pane->position = 1;
  $display->content['new-5'] = $pane;
  $display->panels['right'][1] = 'new-5';
$display->title_pane = 'new-2';
$handler->conf['display'] = $display;
