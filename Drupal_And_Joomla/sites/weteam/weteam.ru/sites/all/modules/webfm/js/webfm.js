
/*jslint browser: true, devel: true, windows: true, forin: true, nomen: true, regexp: true, newcap: true, immed: true */

/* namespace */
function Webfm() {}

/*
 ** Global variables
 */
//Translation possible by changing the array values (DO NOT ALTER KEYS!)
Webfm.js_msg = [];
Webfm.js_msg.mkdir = Drupal.t("Create New Dir");
Webfm.js_msg.file = Drupal.t("file");
Webfm.js_msg.dir = Drupal.t("directory");
Webfm.js_msg.u_file = Drupal.t("File");
Webfm.js_msg.u_dir = Drupal.t("Directory");
Webfm.js_msg.tree = Drupal.t("");
Webfm.js_msg.work = Drupal.t("Working... please wait");
Webfm.js_msg.refresh = Drupal.t("refresh");
Webfm.js_msg.sort = Drupal.t("sort by this column");
Webfm.js_msg.newdir = Drupal.t("Create New Folder");
Webfm.js_msg.addtodb = Drupal.t("Add files in this folder to database");
Webfm.js_msg.recursivecaddaddtodb = Drupal.t("Recursive add files to database");
Webfm.js_msg.column1 = Drupal.t("Name");
Webfm.js_msg.column2 = Drupal.t("Modified");
Webfm.js_msg.column3 = Drupal.t("Size");
Webfm.js_msg.column4 = Drupal.t("Owner");
Webfm.js_msg.attachtitle = Drupal.t("Attached Files");
Webfm.js_msg.metatitle = Drupal.t("File Meta Data");
Webfm.js_msg.searchtitle = Drupal.t("File Search");
Webfm.js_msg.debugtitle = Drupal.t("WebFM Debug");
Webfm.js_msg.cachetitle = Drupal.t("Directory Cache");
Webfm.js_msg.searchcur = Drupal.t("Search current directory (see listing breadcrumb trail)");
Webfm.js_msg.nomatch = Drupal.t("No match found");
Webfm.js_msg.search = Drupal.t("Search");
Webfm.js_msg.submit = Drupal.t("Submit");
Webfm.js_msg.reset = Drupal.t("Reset");
Webfm.js_msg.clear = Drupal.t("Clear");
Webfm.js_msg.cancel = Drupal.t("Cancel");
Webfm.js_msg.close = Drupal.t("Close");
Webfm.js_msg.resize = Drupal.t("Resize");
Webfm.js_msg.replace = Drupal.t("Replace and Version original copy of ");
Webfm.js_msg.replacedel = Drupal.t("Replace and Delete original copy of ");
Webfm.js_msg.noreplace = Drupal.t("Version new copy of ");
Webfm.js_msg.cache = Drupal.t("Cache Content");
Webfm.js_msg.curdirundef = Drupal.t("current directory undefined");
Webfm.js_msg.ajaxerr = Drupal.t("server is unreachable");
Webfm.js_msg.moveerr = Drupal.t("move operation fail");
Webfm.js_msg.lengtherr = Drupal.t("Too long");
Webfm.js_msg.confirmdel0 = Drupal.t("Do you want to delete the ");
Webfm.js_msg.confirmdel1 = Drupal.t(" and all its contents");
Webfm.js_msg.confirmdet = Drupal.t("Do you want to detach ");
Webfm.js_msg.confirmdbrem0 = Drupal.t("Do you want to remove ");
Webfm.js_msg.confirmdbrem1 = Drupal.t(" from the database?\n     All metadata and attachments for this file will be lost");
Webfm.js_msg.enum_local = Drupal.t("Do you want to add all files of this directory into the database?");
Webfm.js_msg.enum_recur = Drupal.t("Do you want to add all files of this directory and sub-directories into the database?");
Webfm.js_msg.filedwld = Drupal.t("download file");
Webfm.js_msg.nofiledwld = Drupal.t("file not in database");
Webfm.js_msg.inserted = Drupal.t(" files inserted into db");
Webfm.js_msg.notinserted = Drupal.t(" files failed to insert into db");
Webfm.js_msg.metadata = Drupal.t("Metadata");
Webfm.js_msg.fix_input = Drupal.t("correct input");
Webfm.js_msg.perm = Drupal.t("File Permissions");
Webfm.js_msg.noattachments = Drupal.t("No files attached.");

Webfm.meta_msg = [];
Webfm.meta_msg.fid = Drupal.t("fid");
Webfm.meta_msg.uid = Drupal.t("uid");
Webfm.meta_msg.uname = Drupal.t("file owner");
Webfm.meta_msg.name = Drupal.t("name");
Webfm.meta_msg.title = Drupal.t("title");
Webfm.meta_msg.desc = Drupal.t("description");
Webfm.meta_msg.lang = Drupal.t("language");
Webfm.meta_msg.pub = Drupal.t("publisher");
Webfm.meta_msg.format = Drupal.t("format");
Webfm.meta_msg.ver = Drupal.t("version");
Webfm.meta_msg.type = Drupal.t("image type");
Webfm.meta_msg.width = Drupal.t("width");
Webfm.meta_msg.height = Drupal.t("height");
Webfm.meta_msg.dl_cnt = Drupal.t("downloads");
Webfm.meta_msg.link = Drupal.t("link");

Webfm.perm_msg = [];
Webfm.perm_msg.pub_view = Drupal.t("Public download");
Webfm.perm_msg.rol_view = Drupal.t("Role View/Download");
Webfm.perm_msg.rol_att = Drupal.t("Role Attach");
Webfm.perm_msg.rol_full = Drupal.t("Role Full Access");

Webfm.menu_msg = [];
Webfm.menu_msg.mkdir = Drupal.t("Create Subdirectory");
Webfm.menu_msg.rmdir = Drupal.t("Delete Directory");
Webfm.menu_msg.rm = Drupal.t("Delete File");
Webfm.menu_msg.rendir = Drupal.t("Rename Directory");
Webfm.menu_msg.search = Drupal.t("Search Directory");
Webfm.menu_msg.ren = Drupal.t("Rename File");
Webfm.menu_msg.meta = Drupal.t("File meta data");
Webfm.menu_msg.att = Drupal.t("Attach to Node");
Webfm.menu_msg.det = Drupal.t("Detach from Node");
Webfm.menu_msg.dwnld = Drupal.t("Download as file");
Webfm.menu_msg.view = Drupal.t("View file");
Webfm.menu_msg.enum_menu = Drupal.t("Add file to database");
Webfm.menu_msg.denum = Drupal.t("Remove file from database");
Webfm.menu_msg.perm = Drupal.t("File permissions");
Webfm.menu_msg.paste = Drupal.t("Paste link in editor window");
//Do not translate any code below this line

Webfm.current = null; // current directory

// Options that modify behaviour.
Webfm.options = {
  displayTree: true,  // Display trees div.
  displayDir: true,   // Display directory
  breadcrumbRoot: null, // Psuedo root for breadcrumb display.
  displayColumns: {
    name: true,
    modified: true,
    size: true,
    owner: true
  }
};
Webfm.numColumns = -1; //Number of display columns

Webfm.dragCont = null;
Webfm.metaCont = null;
Webfm.contextCont = null;
Webfm.searchCont = null;
Webfm.debugCont = null;
Webfm.viewCont = null;

Webfm.dragStart = null;
Webfm.dragging = false;
Webfm.oldOnContextMenu = null;

Webfm.activeDropCont = null;
Webfm.dropContainers = [];
Webfm.attachContainer = null;

Webfm.browser = null;
Webfm.menuHT = null;
Webfm.metadataHT = null;
Webfm.dirTreeObj = null;
Webfm.dirListObj = null;
Webfm.attachObj = null;
Webfm.alrtObj = null;
Webfm.contextMenuObj = null;
Webfm.progressObj = null;
Webfm.dbgObj = null;
Webfm.metaObj = null;
Webfm.searchObj = null;
Webfm.permObj = null;
Webfm.permKey = null;
Webfm.permHT = null;
Webfm.permInfoHT = null;

Webfm.renameActive = false;
Webfm.admin = false;

Webfm.zindex = 1000;
Webfm.scrollVal = null; // freeze scroll

Webfm.eventListeners = [];

//Name of node edit form hidden field where attached node list is populated by js
Webfm.attachFormInput = "edit-attachlist";

Webfm.icons = {
  epdf: "pdf",
  ephp: "php",
  ephps: "php",
  ephp4: "php",
  ephp5: "php",
  eswf: "swf",
  esfa: "swf",
  exls: "xls",
  eods: "xls",
  edoc: "doc",
  ertf: "doc",
  eodt: "doc",
  eodd: "doc",
  ezip: "zip",
  erar: "zip",
  egz: "zip",
  e7z: "zip",
  etxt: "doc",
  echm: "hlp",
  ehlp: "hlp",
  enfo: "nfo",
  expi: "xpi",
  ec: "c",
  eh: "h",
  emp3: "mp3",
  ewav: "mp3",
  esnd: "mp3",
  einc: "cod",
  esql: "sql",
  edbf: "sql",
  ediz: "nfo",
  eion: "nfo",
  emod: "mp3",
  es3m: "mp3",
  eavi: "avi",
  empg: "avi",
  empeg: "avi",
  ewma: "mp3",
  ewmv: "avi",
  edwg: "dwg",
  ejpg: "i",
  ejpeg: "i",
  egif: "i",
  epng: "i",
  etiff: "i",
  ebmp: "i",
  eico: "i",
  eai: "ai",
  eskp: "skp",
  emov: "qt",
  epps: "pps",
  eppt: "pps"
  };

Webfm.lastarea = null;

/*
 ** Functions
 */

/**
 * Remember last used textarea for inserting file hrefs.
 */
function webfmSetlast() {
  Webfm.lastarea = this;
}

/**
 * Determine browser
 */
Webfm.browserDetect = function() {
  var b = navigator.userAgent.toLowerCase();

  this.isIE = false;
  this.isOP = false;

  if(b.indexOf("msie") >= 0) {
    this.isIE = true;
  }
  if(b.indexOf("opera") >= 0) {
    this.isOP = true;
  }
};

/**
 * Hashtable (used by directory listing cache and metadata)
 */
Webfm.ht = function() {
  this.flush();
};

Webfm.ht.prototype.put = function(key, value) {
  if((key === null) || (value === null)) {
    throw "NullPointerException {" + key + "},{" + value + "}";
  }
  this.hash[key] = value;
};

Webfm.ht.prototype.get = function(key) {
  return this.hash[key];
};

Webfm.ht.prototype.containsKey = function(key) {
  var i;
  for(i in this.hash) {
    if(i == key && this.hash[i] !== null) {
      return true;
    }
  }
  return false;
};

Webfm.ht.prototype.remove = function(key) {
  if(this.hash[key]) {
    this.hash[key] = null;
    return true;
  }
  return false;
};

Webfm.ht.prototype.dump = function() {
  var i, values;
  values = [];

  for(i in this.hash) {
    if(this.hash[i] !== null) {
      values.push(this.hash[i]);
    }
  }
  return values;
};

Webfm.ht.prototype.flush = function() {
  this.hash = [];
};

/**
 * Hashable Hashtable (used by menus)
 */
Webfm.hht = function() {
  this.flush();
};

Webfm.hht.prototype.put = function(key, obj) {
  if((key === null) || (obj === null)) {
    throw "NullPointerException {" + key + "},{" + obj + "}";
  }

  //TODO improve null check
  if(this.hash[key] === null || typeof this.hash[key] === 'undefined') {
    this.keys[this.keys.length] = key;
    this.hash[key] = [];
  }

  // append new object to array
  this.hash[key].push(obj);
};

Webfm.hht.prototype.get = function(key) {
  return this.hash[key];
};

Webfm.hht.prototype.remove = function(key) {
  if(this.hash[key]) {
    this.hash[key] = null;
    return true;
  }
  return false;
};

Webfm.hht.prototype.removeSub = function(key, subkey) {
  if(this.hash[key][subkey]) {
    this.hash[key][subkey] = null;
    return true;
  }
  return false;
};

Webfm.hht.prototype.flush = function() {
  this.hash = [];
  this.keys = [];
};

//Webfm.metaElement objects have description/edit/max_size params
Webfm.metaElement = function(desc, edit, size) {
  this.desc = desc;
  this.edit = edit;
  this.size = size;
};

/**
 * Create Web File Manager at 'webfm' id anchor
 * ..or at node-edit 'webfm-inline' id anchor
 */
function webfmLayout() {
  var layoutDiv, textareas, i, textfields;
  layoutDiv = '';

  // Initialize textarea for pasting file hrefs with the most often used
  // in case we try to paste before a textarea or -field was focussed.
  Webfm.lastarea = document.getElementById('edit-body');
  if(!Webfm.lastarea) {
    Webfm.lastarea = document.getElementById('edit-comment');
  }
  // Tell textareas and text fields to remember which one was last focussed.
  textareas = document.getElementsByTagName('textarea');
  i = textareas.length;
  while(i > 0) {
    i = i - 1;
    textareas[i].onfocus = webfmSetlast;
  }
  textfields = document.getElementsByTagName('input');
  i = textfields.length;
  while(i > 0) {
    i = i - 1;
    if(textfields[i].type == 'text') {
      textfields[i].onfocus = webfmSetlast;
    }
  }

  layoutDiv = Webfm.$('webfm');
  if(layoutDiv) {
    Webfm.commonInterface(layoutDiv);
    if(Webfm.options.displayTree) {
      //first param forces trees refresh
      //second param forces list refresh
      Webfm.dirTreeObj.fetch(true, true);
    } else {
      Webfm.dirListObj.refresh();
    }
    return;
  }

  // Shortcut to displaying files only via 'webfm-dir' div id.
  layoutDiv = Webfm.$('webfm-dir');
  if(layoutDiv) {
    Webfm.options.displayTree = false;
    Webfm.commonInterface(layoutDiv);
    Webfm.dirListObj.refresh();
    return;
  }

  layoutDiv = Webfm.$('webfm-inline');
  if(layoutDiv) {
    Webfm.commonInterface(layoutDiv);

    //Add attach-list menu and attach option to listing menu
    try {
      Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.att, Webfm.menuAttach, Webfm.menuFidVal));
      Webfm.menuHT.put('det', new Webfm.menuElement(Webfm.menu_msg.meta, Webfm.menuGetMeta, ''));
      Webfm.menuHT.put('det', new Webfm.menuElement(Webfm.menu_msg.det, Webfm.menuDetach, ''));
      Webfm.menuHT.put('det', new Webfm.menuElement(Webfm.menu_msg.paste, Webfm.menuPasteHref, ''));
    } catch(err) {
      alert( Drupal.t("Creating Menu failed. \n") + err);
    }
    // attach-list anchored to 'webfm-attach' div in webfm_form_alter()
    Webfm.attachObj = new Webfm.attach('webfm-attach');
    Webfm.attachObj.fetch();

    if(Webfm.options.displayTree) {
      //first param forces trees refresh
      //second param forces list refresh
      Webfm.dirTreeObj.fetch(true, true);
    } else {
      if(Webfm.options.displayDir) {
        Webfm.dirListObj.refresh();
      }
    }
  }
}

/*
 ** Initialize webfm on the current page (Must come after webfmLayout()).
 */
if(Drupal.jsEnabled) {
  $(window).load(webfmLayout);
}

//Attaches the upload behaviour to the upload form (borrowed jquery).
function webfmUploadAutoAttach() {
  var uri, button, wrapper, hide, upload;
  button = 'wfmatt-button';
  wrapper = 'wfmatt-wrapper';
  hide = 'wfmatt-hide';
  $('input.webfmupload').each(function() {
    uri = this.value;
    upload = new Webfm.jsUpload(uri, button, wrapper, hide);
  });
}

Webfm.commonInterface = function (parent) {
  var layout_cont, elTreeDiv;

  Webfm.browser = new Webfm.browserDetect();

  //create the popup container for file/dir object draggables
  Webfm.dragCont = new Webfm.popup("webfm-dragCont");

  //create the popup container for image view
  Webfm.viewCont = new Webfm.popup("webfm-viewCont");

  //create context menu popup
  Webfm.oldOnContextMenu = document.body.oncontextmenu;
  Webfm.contextCont = new Webfm.popup("webfm-cxtCont");
  Webfm.contextMenuObj = new Webfm.context(Webfm.contextCont);

  //create metadata popup
  Webfm.metaCont = new Webfm.popup("webfm-paneCont");
  Webfm.metaObj = new Webfm.metadata(Webfm.metaCont, 440, 420);

  //create file permissions popup
  Webfm.permCont = new Webfm.popup("webfm-permCont");
  Webfm.permObj = new Webfm.perm(Webfm.permCont, 300, 200);

  //create search popup
  Webfm.searchCont = new Webfm.popup("webfm-searchCont");
  Webfm.searchObj = new Webfm.search(Webfm.searchCont, 280, 200);

  //create debug popup
  Webfm.debugCont = new Webfm.popup("webfm-debugCont");
  Webfm.dbgObj = new Webfm.debug(Webfm.debugCont, 800, 400);

  //build menu hashtable
  //global to allow external functions to push new menu elements into the menu array
  Webfm.menuHT = new Webfm.hht();

  try {
    Webfm.menuHT.put('root', new Webfm.menuElement(Webfm.menu_msg.mkdir, Webfm.menuMkdir, Webfm.menuAdmin));
    Webfm.menuHT.put('root', new Webfm.menuElement(Webfm.menu_msg.search, Webfm.menuSearch, ''));

    Webfm.menuHT.put('dir', new Webfm.menuElement(Webfm.menu_msg.mkdir, Webfm.menuMkdir, Webfm.menuAdmin));
    Webfm.menuHT.put('dir', new Webfm.menuElement(Webfm.menu_msg.rmdir, Webfm.menuRemove, Webfm.menuAdmin));
    Webfm.menuHT.put('dir', new Webfm.menuElement(Webfm.menu_msg.rendir, Webfm.menuRename, Webfm.menuAdmin));
    Webfm.menuHT.put('dir', new Webfm.menuElement(Webfm.menu_msg.search, Webfm.menuSearch, ''));

    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.rm, Webfm.menuRemove, Webfm.menuFileUid));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.ren, Webfm.menuRename, Webfm.menuRenFileUid));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.meta, Webfm.menuGetMeta, Webfm.menuFidVal));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.view, Webfm.menuView, ''));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.dwnld, Webfm.menuDownload, Webfm.menuFidVal));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.enum_menu, Webfm.menuInsert, Webfm.menuAdminNoFidVal));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.denum, Webfm.menuDbRem, Webfm.menuAdminFidVal));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.perm, Webfm.menuGetPerm, Webfm.menuFilePerm));
    Webfm.menuHT.put('file', new Webfm.menuElement(Webfm.menu_msg.paste, Webfm.menuPasteHref, ''));
  } catch (err) {
    alert(Drupal.t("Creating Menu failed. \n") + err);
  }

  //build metadata hashtable
  //Webfm.metaElement objects have description/edit/max_size properties
  Webfm.metadataHT = new Webfm.ht();
  Webfm.metadataHT.put('id', new Webfm.metaElement(Webfm.meta_msg.fid, false, 0));
  Webfm.metadataHT.put('u', new Webfm.metaElement(Webfm.meta_msg.uid, true, 10));
  Webfm.metadataHT.put('un', new Webfm.metaElement(Webfm.meta_msg.uname, false, 0));
  Webfm.metadataHT.put('n', new Webfm.metaElement(Webfm.meta_msg.name, false, 0));
  Webfm.metadataHT.put('t', new Webfm.metaElement(Webfm.meta_msg.title, true, 255));
  Webfm.metadataHT.put('d', new Webfm.metaElement(Webfm.meta_msg.desc, true, 256));
  Webfm.metadataHT.put('l', new Webfm.metaElement(Webfm.meta_msg.lang, true, 16));
  Webfm.metadataHT.put('p', new Webfm.metaElement(Webfm.meta_msg.pub, true, 255));
  Webfm.metadataHT.put('f', new Webfm.metaElement(Webfm.meta_msg.format, true, 255));
  Webfm.metadataHT.put('v', new Webfm.metaElement(Webfm.meta_msg.ver, false, 0));
  Webfm.metadataHT.put('i', new Webfm.metaElement(Webfm.meta_msg.type, false, 0));
  Webfm.metadataHT.put('w', new Webfm.metaElement(Webfm.meta_msg.width, false, 0));
  Webfm.metadataHT.put('h', new Webfm.metaElement(Webfm.meta_msg.height, false, 0));
  Webfm.metadataHT.put('c', new Webfm.metaElement(Webfm.meta_msg.dl_cnt, false, 0));
  Webfm.metadataHT.put('lk', new Webfm.metaElement(Webfm.meta_msg.link, false, 0));

  //build permissions hashtable
  //key is permission bit, value is string
  Webfm.permInfoHT = new Webfm.ht();
  Webfm.permInfoHT.put("id", Webfm.meta_msg.fid);
  Webfm.permInfoHT.put("u", Webfm.meta_msg.uid);
  Webfm.permInfoHT.put("n", Webfm.meta_msg.name);
  Webfm.permKey = ['1', '2', '4', '8'];

  Webfm.permHT = new Webfm.ht();
  Webfm.permHT.put('1', Webfm.perm_msg.pub_view);
  Webfm.permHT.put('2', Webfm.perm_msg.rol_view);
  Webfm.permHT.put('4', Webfm.perm_msg.rol_att);
  Webfm.permHT.put('8', Webfm.perm_msg.rol_full);

  layout_cont = Webfm.ce('div');
  Webfm.alrtObj = new Webfm.alert(layout_cont, 'webfm-alert');

  //Container for tree(s)
  if(Webfm.options.displayTree) {
    elTreeDiv = Webfm.ce('div');
    elTreeDiv.setAttribute('id', 'webfm-tree'); //css id
    layout_cont.appendChild(elTreeDiv);
    Webfm.dirTreeObj = new Webfm.treeBuilder( elTreeDiv, Webfm.menuHT.get('root'), Webfm.menuHT.get('dir'));
  }

  //progress indicator
  Webfm.progressObj = new Webfm.progress(layout_cont, 'webfm-progress');

  //Directory Listing
  if(Webfm.options.displayDir) {
    var claz = Webfm.options.displayTree ? 'narrow' : 'wide';
    Webfm.dirListObj = new Webfm.list(layout_cont, 'webfm-dirlist', 'file', claz, true, Webfm.menuHT.get('dir'), Webfm.menuHT.get('file'));
  }

  //insert trees, listing, search, metadata, progress and alert divs before upload fset built in php
  parent.insertBefore(layout_cont, parent.firstChild);
  //  parent.appendChild(layout_cont); //If upload desired to be placed above browser

  webfmUploadAutoAttach();
};


/**
 * Webfm.jsUpload constructor
 * 1st param is upload iframe url
 * 2nd param is id of redirected button object)
 * 3rd param is id of container of html repainted by ajax
 * 4th param is id of upload input field
 * TODO: fix progress throbber
 */
Webfm.jsUpload = function (uri, button, wrapper, hide) {
  // Note: these elements are replaced after an upload, so we re-select them
  // everytime they are needed.
  this.button = '#' + button;
  this.wrapper = '#' + wrapper;
  this.hide = '#' + hide;
  Drupal.redirectFormButton(uri, $(this.button).get(0), this);
};

//Handler for the form redirection submission.
Webfm.jsUpload.prototype.onsubmit = function() {
  var hide;
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  hide = this.hide;
  $(hide).fadeOut('slow');
};

//Handler for the form redirection completion.
Webfm.jsUpload.prototype.oncomplete = function (data) {
  var div, hide, cp, replaceButton, listener;

  // Remove old form
  Drupal.freezeHeight(); // Avoid unnecessary scrolling
  $(this.wrapper).html('');

  // Place HTML into temporary div
  div = document.createElement('div');
  $(div).html(data.html);
  $(this.wrapper).append(div);

  //div with id='replace-options' present only in case of file overwrite
  this.confirm = Webfm.$('replace-options');
  if(this.confirm) {
    hide = this.hide;
    $(hide).fadeOut('slow');
    cp = this;
    this.confirm.id = 'replace-options';
    replaceButton = Webfm.ce('input');
    replaceButton.setAttribute('type', 'button');
    replaceButton.setAttribute('value', Webfm.js_msg.submit);
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, replaceButton, "click", function(e) {cp.submit(); Webfm.stopEvent(e); });
    this.confirm.appendChild(replaceButton);
    this.confirm.file = data.file;
  } else {
    $(this.hide, div).fadeIn('slow');
    webfmUploadAutoAttach();
  }

  Drupal.unfreezeHeight();
  Webfm.progressObj.hide();
  Webfm.dirListObj.refresh();

  if(typeof (Webfm.$('webfm-inline')) !== 'undefined' && Webfm.$('webfm-inline') !== null) {
    // attach file to node if inside node-edit
    if(typeof data.fid !== 'undefined' && data.fid !== null) {
      Webfm.menuAttach(null, data.fid);
    }
  }
};

//Handler for the form redirection error.
Webfm.jsUpload.prototype.onerror = function (error) {
  alert(Drupal.t("An error occurred:\n\n") + error);
  Webfm.progressObj.hide();

  if(this.confirm) {
    Webfm.clearNodeById('replace-options');
  }

  // Undo hide
  $(this.hide).css({
    position: 'static',
    left: '0px'
  });
};

Webfm.jsUpload.prototype.submit = function() {
  var inputs, selection, i, url, postObj;
  inputs = [];
  selection = '';

  inputs = this.confirm.getElementsByTagName('input');
  for(i = 0; i < inputs.length; i++) {
    if(inputs[i].checked === true) {
      selection = i;
      break;
    }
  }

  if(typeof selection != 'undefined') {
    url = Webfm.ajaxUrl();
    Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
    postObj = { action: encodeURIComponent("version"), param0: encodeURIComponent(selection), param1: encodeURIComponent(this.confirm.file)};
    Webfm.HTTPPost(url, this.callback, this, postObj);
  }
};

Webfm.jsUpload.prototype.callback = function (string, xmlhttp, cp) {
  var parent, hide, result, elDiv;

  Webfm.progressObj.hide();

  // Remove overwrite radios
  parent = cp.confirm.parentNode;
  parent.removeChild(parent.firstChild);

  hide = cp.hide;
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    if(result.status) {
      Webfm.dirListObj.refresh();
    }
    cp.confirm.style.display = 'none';

    // Insert ajax feedback before upload form
    elDiv = Webfm.ce('div');
    if(result.status) {
      elDiv.className = 'upload-msg';
    } else {
      elDiv.className = 'upload-msg-err';
    }
    elDiv.appendChild(Webfm.ctn(result.data.msg));

    $(hide).before($(elDiv));

    // Undo hide
    Webfm.dbgObj.dbg("hide:", Webfm.dump(hide));
    $(hide).css({ display: 'block' });
    webfmUploadAutoAttach();

    if(typeof (Webfm.$('webfm-inline')) != 'undefined' && Webfm.$('webfm-inline') !== null) {
      // attach file to node if inside node-edit
      if(typeof result.data.fid !== 'undefined' && result.data.fid !== null) {
        Webfm.menuAttach(null, result.data.fid);
      }
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

/**
 * Webfm.list constructor
 * 1st param is object to append this list object to
 * 2nd param is base id of listing (multiple listing objects must have unique ids)
 * 3rd param is base id of file rows of table
 * 4th param sets styling for listing
 * 5th param enables drag and drop
 * 6th param is directory menu array
 * 7th param is file menu array
 */
Webfm.list = function (parent, id, type, class_name, dd_enable, dir_menu, file_menu) {
  var wl, node, elTable, elTableBody, elTr, elTd, elA, elImg, listener, elSpan;
  wl = this;

  this.id = id;
  this.type = type;
  this.dd_enable = dd_enable;
  this.url = Webfm.ajaxUrl();
  this.sc_n = 0;
  this.sc_m = 0;
  this.sc_s = 0;
  this.content = '';
  this.iconDir = getWebfmIconDir();
  this.dir_menu = dir_menu;
  this.file_menu = file_menu;
  //directory cache hashtable (key= directory path, val= directory contents)
  this.cache = new Webfm.ht();
  this.eventListeners = [];

  //Get the number of columns being displayed
  Webfm.numColumns = 0;
  if(Webfm.options.displayColumns.name) {Webfm.numColumns++;}
  if(Webfm.options.displayColumns.modified) {Webfm.numColumns++;}
  if(Webfm.options.displayColumns.size) {Webfm.numColumns++; }
  //if(getWebfmOwnerColumn() && Webfm.options.displayColumns.owner) {Webfm.numColumns++;}
  if(Webfm.options.displayColumns.owner) {Webfm.numColumns++;}

  node = Webfm.ce("div");
  node.setAttribute('id', this.id);
  node.className = class_name;
  this.obj = node;

  elTable = Webfm.ce('table');
  elTableBody = Webfm.ce('tbody');
  //elTableBody.setAttribute('id', this.id + 'body');
  this.body = elTableBody;

  // First Row
  elTr = Webfm.ce('tr');
  elTr.setAttribute('id', 'webfm-top-tr');

  // Refresh Icon
  elTd = Webfm.ce('td');
  elTd.className = 'navi icon';
  elA = Webfm.ce('a');
  elA.setAttribute('href', '#');
  elA.setAttribute('title', Webfm.js_msg.refresh);
  elImg = Webfm.ce('img');
  elImg.setAttribute('src', this.iconDir + '/r.gif');
  elImg.setAttribute('alt', Webfm.js_msg.refresh);
  elA.appendChild(elImg);
  elTd.appendChild(elA);
  elTr.appendChild(elTd);
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { wl.refresh(Webfm.current); Webfm.stopEvent(e); });

  // Breadcrumb trail
  elTd = Webfm.ce('td');
  elTd.colSpan = Webfm.numColumns < 2 ? 2 : Webfm.numColumns;
  elTd.setAttribute('id', 'webfm-bcrumb-td');
  elTd.setAttribute('class', 'navi');

  // Build breadcrumb trail inside span
  elSpan = Webfm.ce('span');
  elSpan.setAttribute('id', this.id + 'bcrumb');
  elTd.appendChild(elSpan);
  elTr.appendChild(elTd);

  elTableBody.appendChild(elTr);

  // Second Row
  elTr = Webfm.ce('tr');
  this.secondRow = elTr;

  // icon column
  elTd = Webfm.ce('td');
  elTd.className = 'head';
  elTr.appendChild(elTd);

  // Sort dir/files column
  if(Webfm.options.displayColumns.name) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2 ) {elTd.colSpan = 2;}
    elTd.className = 'head';
    elA = Webfm.ce('a');
    elA.setAttribute('href', '#');
    elA.setAttribute('title', Webfm.js_msg.sort);
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { wl.sc_n ^= 1; wl.loadList("n"); wl.sortIcon(e, wl.sc_n); Webfm.stopEvent(e); });

    elImg = Webfm.ce('img');
    elImg.setAttribute('alt', Webfm.js_msg.sort);
    elImg.setAttribute('src', this.iconDir + '/down.gif');
    elA.appendChild(elImg);
    elA.appendChild(Webfm.ctn(Webfm.js_msg.column1));
    elTd.appendChild(elA);
    elTr.appendChild(elTd);
  }

  // date/time column
  if(Webfm.options.displayColumns.modified) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2 ) {elTd.colSpan = 2;}
    elTd.className = 'head';
    elA = Webfm.ce('a');
    elA.setAttribute('href', '#');
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { wl.sc_m ^= 1; wl.loadList("m"); wl.sortIcon(e, wl.sc_m); Webfm.stopEvent(e); });

    elImg = Webfm.ce('img');
    elImg.setAttribute('alt', Webfm.js_msg.sort);
    elImg.setAttribute('src', this.iconDir + '/down.gif');
    elA.appendChild(elImg);
    elA.appendChild(Webfm.ctn(Webfm.js_msg.column2));
    elTd.appendChild(elA);
    elTr.appendChild(elTd);
  }

  // size column
  if(Webfm.options.displayColumns.size) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    elTd.className = 'head';
    elA = Webfm.ce('a');
    elA.setAttribute('href', '#');
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { wl.sc_s ^= 1; wl.loadList("s"); wl.sortIcon(e, wl.sc_s); Webfm.stopEvent(e); });

    elImg = Webfm.ce('img');
    elImg.setAttribute('alt', Webfm.js_msg.sort);
    elImg.setAttribute('src', this.iconDir + '/down.gif');
    elA.appendChild(elImg);
    elA.appendChild(Webfm.ctn(Webfm.js_msg.column3));
    elTd.appendChild(elA);
    elTr.appendChild(elTd);
  }

  // owner column
  //if(getWebfmOwnerColumn() && Webfm.options.displayColumns.owner ) {
  if(Webfm.options.displayColumns.owner ) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    elTd.className = 'head';
    elA = Webfm.ce('a');
    elA.setAttribute('href', '#');
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { wl.sc_o ^= 1; wl.loadList("o"); wl.sortIcon(e, wl.sc_o); Webfm.stopEvent(e); });

    elImg = Webfm.ce('img');
    elImg.setAttribute('alt', Webfm.js_msg.sort);
    elImg.setAttribute('src', this.iconDir + '/down.gif');
    elA.appendChild(elImg);
    elA.appendChild(Webfm.ctn(Webfm.js_msg.column4));
    elTd.appendChild(elA);
    elTr.appendChild(elTd);
  }

  elTableBody.appendChild(elTr);

  elTable.appendChild(elTableBody);
  node.appendChild(elTable);
  parent.appendChild(node);
};

Webfm.list.prototype.selectBC = function(event) {
  var el = event.target || window.event.srcElement;
  Webfm.selectDir(el.title);
};

Webfm.list.prototype.listenerfn_bcrumb_click = function(cp) {
  var listenerfn = function(e) {
    cp.selectBC(e);
    Webfm.stopEvent(e);
  };
  return listenerfn;
};

Webfm.list.prototype.bcrumb = function() {
  var cp, i, pth, elA, listener, elSpan, l, adminPrefix, broot, bRoot;
  cp = this;
  pth = [];

  Webfm.clearNodeById(this.id + 'bcrumb');
  elSpan = Webfm.$(this.id + 'bcrumb');

  broot = [];
  if(Webfm.options.breadcrumbRoot) {
    l = this.content.current.indexOf(Webfm.options.breadcrumbRoot );
    adminPrefix = this.content.current.substring(0, l);
    bRoot = adminPrefix + Webfm.options.breadcrumbRoot;
    broot = bRoot.split('/');
    if(broot[0] === '') {
      broot.shift();
    }
    broot.pop();
  }
  for(i = 0; i < this.content.bcrumb.length - 1; i++) {
    pth.push(this.content.bcrumb[i]);
    if(this.content.bcrumb[i] == broot[i]) {
      continue;
    }
    elSpan.appendChild(Webfm.ctn(" / "));
    // No breadcrumb link necessary for current directory
    elA = Webfm.ce('a');
    elA.setAttribute('href', '#');
    // join previous loop iterations to create path for title
    elA.setAttribute('title', "/" + pth.join("/"));
    elA.appendChild(Webfm.ctn(this.content.bcrumb[i]));
    //IE fix
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", Webfm.list.prototype.listenerfn_bcrumb_click(cp));
    elSpan.appendChild(elA);
  }

  elSpan.appendChild(Webfm.ctn(" / "));
  elSpan.appendChild(Webfm.ctn(this.content.bcrumb[i]));
};


Webfm.list.prototype.sortIcon = function (event, up_down) {
  var el = event.target || window.event.srcElement;
  if(el.firstChild) {
    el.firstChild.src = this.iconDir + '/' + (up_down ? "up" : "down") + '.gif';
  }
};

Webfm.list.prototype.refresh = function (path, rename_dir) {
  if(path === null || typeof (path) === 'undefined') {
    path = Webfm.current;
  }
  this.cache.remove(path);
  if(typeof rename_dir != 'undefined') {
    this.rename_dir = rename_dir;
  }
  this.fetch(path);
};

Webfm.list.prototype.fetch = function (curr_dir) {
  var uploadpath, postObj;

  Webfm.alrtObj.msg();
  if(curr_dir || (curr_dir = Webfm.current)) {
    Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
    //update current dir if specific dir selected
    Webfm.current = curr_dir;
    Webfm.dbgObj.dbg('fetch: ', curr_dir);

    if(this.cache.containsKey(Webfm.current)) {
      Webfm.dbgObj.dbg('cache hit: ', Webfm.current);
      this.content = this.cache.get(Webfm.current);
      this.bcrumb();
      this.loadList();
      uploadpath = Webfm.$('edit-webfmuploadpath');
      if(uploadpath) {
        uploadpath.value = Webfm.current;
      }
      Webfm.progressObj.hide();
    } else {
      Webfm.admin = false;
      postObj = { action: encodeURIComponent("read"), param0: encodeURIComponent(curr_dir) };
      Webfm.HTTPPost(this.url, this.callback, this, postObj);
    }
  } else {
    Webfm.dbgObj.dbg(Webfm.js_msg.curdirundef);
  }
};

Webfm.list.prototype.callback = function (string, xmlhttp, cp) {
  var uploadpath, found, i;
  found = false;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    cp.content = Drupal.parseJson(string);
    if(cp.content.status) {
      cp.cache.put(cp.content.current, cp.content);
      //Sets client permissions - server will always validate any action
      Webfm.admin = cp.content.admin;

      cp.bcrumb();
      cp.loadList("n");

      // Insert current directory path into upload form
      uploadpath = Webfm.$('edit-webfmuploadpath');
      if(uploadpath) {
        uploadpath.value = cp.content.current;
        Webfm.dbgObj.dbg('uploadpath: ', uploadpath.value);
      }
      Webfm.current = cp.content.current;
      cp.adminCtl(Webfm.admin);

      if(cp.rename_dir) {
        found = false;
        for(i = 0; i < Webfm.dirListObj.dirrows.length; i++) {
          if(cp.dirrows[i].clickObj.title == "/" + cp.rename_dir) {
            found = true;
            break;
          }
        }
        if(found) {
          Webfm.menuRename(cp.dirrows[i]);
        }
      }
    } else {
      Webfm.alrtObj.str_arr(cp.content.data);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

//build admin icons for create dir and file db insertion
//maintain 4 column table
Webfm.list.prototype.adminCtl = function (admin) {
  var col_span, wl, elTd, elSpan, elA, elImg, listener;

  col_span = Webfm.numColumns < 2 ? 2 : Webfm.numColumns;
  if(admin) {
    if(Webfm.$('webfm-bcrumb-td').colSpan == col_span) {
      wl = this;
      Webfm.$('webfm-bcrumb-td').colSpan = col_span - 1;
      // Create New Directory and allow db insertions
      elTd = Webfm.ce('td');
      elTd.className = "ctls-td";
      elSpan = Webfm.ce('span');
      elSpan.id = this.id + "-ctls";

      elA = Webfm.ce('a');
      elA.title = Webfm.js_msg.newdir;
      elImg = Webfm.ce('img');
      elImg.setAttribute('alt', Webfm.js_msg.newdir);
      elImg.setAttribute('src', this.iconDir + '/dn.gif');
      elA.appendChild(elImg);
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { Webfm.stopEvent(e); wl.mkdir(); });
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "mouseover", function(e) { wl.hover(e, true, 0); });
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "mouseout", function(e) { wl.hover(e, false, 0); });
      elSpan.appendChild(elA);

      elA = Webfm.ce('a');
      elA.title = Webfm.js_msg.addtodb;
      elImg = Webfm.ce('img');
      elImg.setAttribute('alt', Webfm.js_msg.addtodb);
      elImg.setAttribute('src', this.iconDir + '/add_loc.gif');
      elA.appendChild(elImg);
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { Webfm.stopEvent(e); wl.enumLocal(); });
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "mouseover", function(e) { wl.hover(e, true); });
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "mouseout", function(e) { wl.hover(e, false); });
      elSpan.appendChild(elA);

      elA = Webfm.ce('a');
      elA.title = Webfm.js_msg.recursivecaddaddtodb;
      elImg = Webfm.ce('img');
      elImg.setAttribute('alt', Webfm.js_msg.recursivecaddaddtodb);
      elImg.setAttribute('src', this.iconDir + '/add_recur.gif');
      elA.appendChild(elImg);
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { Webfm.stopEvent(e); wl.enumRecur(); });
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "mouseover", function(e) { wl.hover(e, true); });
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "mouseout", function(e) { wl.hover(e, false); });
      elSpan.appendChild(elA);
      elTd.appendChild(elSpan);

      Webfm.$('webfm-top-tr').appendChild(elTd);
    } else {
      Webfm.$('webfm-bcrumb-td').colSpan = col_span - 1;
    }
  } else {
    Webfm.$('webfm-bcrumb-td').colSpan = col_span;
  }
};

//IE does not understand 'this' inside event listener func
Webfm.list.prototype.hover = function (event, state) {
  var el = event.target || window.event.srcElement;
  el.className = state ? 'selected' : '';
};

//Function to create a new directory
Webfm.list.prototype.mkdir = function() {
  Webfm.alrtObj.msg();
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  var postObj = { action: encodeURIComponent("mkdir"), param0: encodeURIComponent(this.content.current) };
  Webfm.HTTPPost(this.url, this.mkdir_callback, this, postObj);
};

Webfm.list.prototype.enumLocal = function() {
  if(Webfm.confirm(Webfm.js_msg.enum_local)) {
    Webfm.insert(this.content.current, "dir");
  }
};

Webfm.list.prototype.enumRecur = function() {
  if(Webfm.confirm(Webfm.js_msg.enum_recur)) {
    Webfm.insert(this.content.current, "recur");
  }
};

Webfm.list.prototype.mkdir_callback = function (string, xmlhttp, cp) {
  var result;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    Webfm.dbgObj.dbg("mkdir data:", result.data);
    if(result.status) {
      cp.refresh(cp.content.current, result.data);
      if(Webfm.dirTreeObj) {
        //we just updated the listing - 2nd var must be false
        Webfm.dirTreeObj.fetch(true, false);
      }
    } else {
      Webfm.alrtObj.str_arr(result.data);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.list.prototype.loadList = function (sortcol) {
  var i, filerow;
  this.c_dir = 0;
  this.c_fil = 0;

  //remove all rows beneath second row of listing table body
  while(this.secondRow.nextSibling) {
    this.body.removeChild(this.secondRow.nextSibling);
  }
  //clear event listeners for old listing
  Webfm.eventUnregister(this.eventListeners);

  // Build directory rows and append to table
  if(this.content.dirs.length) {
    this.dirrows = [];
    //IE hack since dirs have no size and no owner
    if(!(Webfm.browser.isIE && sortcol == "s") && sortcol != "o") {
      this.sortTable(this.content.dirs, sortcol);
    }
    for(i = 0; i < this.content.dirs.length; i++) {
      this.dirrows[i] = new Webfm.dirrow(this.body, this.content.dirs[i], i, this.dd_enable, this.dir_menu, this.eventListeners);
    }
  }
  // Build file rows and append to table
  // type determines file context menu
  if(this.content.files.length) {
    this.sortTable(this.content.files, sortcol);
    for(i = 0; i < this.content.files.length; i++) {
      filerow = new Webfm.filerow(this.body, this.content.files[i], this.type, i, this.dd_enable, this.file_menu, this.eventListeners);
    }
  }
};

Webfm.list.prototype.sortTable = function (arr, key) {
  switch(key) {
    case "o":
      arr.sort(Webfm.sortByOwner);
      if(this.sc_o) {
        arr.reverse();
      }
      break;
    case "s":
      arr.sort(Webfm.sortBySize);
      if(this.sc_s) {
        arr.reverse();
      }
      break;
    case "m":
      arr.sort(Webfm.sortByModified);
      if(this.sc_m) {
        arr.reverse();
      }
      break;
    case "n":
      arr.sort(Webfm.sortByName);
      if(this.sc_n) {
        arr.reverse();
      }
      break;
  }
};

/**
 * Webfm.dirrow constructor
 * 1st param is parent obj
 * 2nd param is dir object
 * 3rd param is unique number to append to id
 * 4th param enables drag and drop
 * 5th param is directory menu array
 * 6th param is event listener array for closure cleanup
 */
Webfm.dirrow = function (parent, dir, index, dd_enable, menu, eventListenerArr) {
  var dr, dc_id, elTr, elTd, elImg, owner, listener, size;
  dr = this;

  this.draggable = dd_enable;
  this.iconDir = getWebfmIconDir();

  //id used for drop container
  dc_id = 'webfm-dirlist' + index;
  elTr = Webfm.ce('tr');
  this.element = elTr;
  this.element.className = 'dirrow';

  elTr.setAttribute('id', dc_id);
  elTr.setAttribute('title', dir.p);
  if(dd_enable && Webfm.admin) {
    //Webfm.draggable must be created after title assigned to set current path
    this.dd = new Webfm.draggable(Webfm.dragCont, elTr, this.element.className);
  } else {
    this.draggable = false;
  }

  elTd = Webfm.ce('td');
  elImg = Webfm.ce('img');
  elImg.setAttribute('src', this.iconDir + '/d.gif');
  elImg.setAttribute('id', dc_id + 'dd');
  elImg.setAttribute('alt', Webfm.js_msg.u_dir);
  this.menu = menu;
  elTd.appendChild(elImg);
  elTr.appendChild(elTd);

  if(Webfm.options.displayColumns.name) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    // Title of link = path
    this.clickObj = Webfm.ce('a');
    this.clickObj.setAttribute('href', '#');
    //title is path
    this.clickObj.setAttribute('title', dir.p);
    this.clickObj.appendChild(Webfm.ctn(dir.n));
    elTd.appendChild(this.clickObj);
    elTr.appendChild(elTd);
  }

  if(Webfm.options.displayColumns.modified) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    elTd.className = 'txt';
    elTd.appendChild(Webfm.ctn(Webfm.convertunixtime(parseInt(dir.m, 10))));
    elTr.appendChild(elTd);
  }

  if(Webfm.options.displayColumns.size) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    elTd.className = 'txt';
    if(dir.s) {
      size = Webfm.size(dir.s);
      elTd.appendChild(Webfm.ctn(size));
    }
    elTr.appendChild(elTd);
  }

  // Add td if owner column enabled
  //if(getWebfmOwnerColumn() && Webfm.options.displayColumns.owner) {
  if(Webfm.options.displayColumns.owner) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    elTd.className = 'txt';
    if(dir.o) {
      owner = Webfm.ce(dir.o);
      elTd.appendChild(Webfm.ctn(owner));
    }
    elTr.appendChild(elTd);
  }

  //mouse event listeners
  if(dd_enable) {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mousedown", function(e) { Webfm.contextMenuObj.hideContextMenu(e); dr.select(e); });
  } else {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "click", function(e) { Webfm.contextMenuObj.hideContextMenu(e); if(Webfm.renameActive === false) { Webfm.selectDir(dr.element.title); } });
  }
  if(this.draggable) {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mouseover", function() { dr.hover(dr.element, true); });
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mouseout", function() { dr.hover(dr.element, false); });
  }
  if(Webfm.browser.isOP) {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mousedown", function(e) { if(e && e.button === 0 && e.altKey === true) { if(Webfm.renameActive === false) { Webfm.contextMenuObj.showContextMenu(e, dr); } Webfm.stopEvent(e); } });
  } else {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "contextmenu", function(e) { if(Webfm.renameActive === false) { Webfm.contextMenuObj.showContextMenu(e, dr); } Webfm.stopEvent(e); });
  }

  parent.appendChild(elTr);
  this.c_dir = this.c_dir + 1;
};

Webfm.dirrow.prototype.hover = function (el, state) {
  if(state) {
    el.className += ' selected';
  } else {
    el.className = el.className.split(' ', 1);
  }
};
Webfm.dirrow.prototype.select = function (event) {
  var cp, rightclick;
  cp = this;

  if(Webfm.renameActive === true) {
      return false;
  }
  event = event || window.event;
  if(event.target || event.srcElement) {
    if(this.clickObj) {
      // Determine mouse button
      rightclick = Webfm.rclick(event);
      if(rightclick) {
        return false;
      }
      setTimeout(function() {
        //if click then no dragging...
        if(Webfm.dragging === false) {
          Webfm.selectDir(cp.element.title);
        }
      }, 200);
    }
    //passthrough
    if(typeof this.dd != "undefined") {
      this.dd.mouseButton(event);
    }
  }
  return false;
};

/**
 * Webfm.filerow constructor
 * 1st param is parent obj
 * 2nd param is fileobject (see desc below)
 * 3rd param is base id name of file row
 * 4th param is unique number to append to id
 * 5th param enables drag and drop
 * 6th param is file menu array
 * 7th param is event listener array for closure cleanup
 *
 * fileobject elements:
 * id -> fid
 * n -> file name
 * p -> path (includes name)
 * s -> file size
 * m -> modified date
 * e -> mimetype extension
 * i -> image file.
 * w -> image width
 * h -> image height
 * un -> file owner user name
 */
Webfm.filerow = function (parent, fileObj, idtype, index, dd_enable, file_menu, eventListenerArr) {
  var fr, elTr, elTd, elImg, size, listener;
  fr = this;

  this.draggable = dd_enable;
  this.iconDir = getWebfmIconDir();
  this.ext = fileObj.e;
  this.filepath = fileObj.p + '/' + fileObj.n;
  this.uid = fileObj.u;
  this.ftitle = null;
  this.funame = fileObj.un;

  if(typeof fileObj.ftitle != "undefined") {
    this.ftitle = fileObj.ftitle;
  }

  elTr = Webfm.ce('tr');
  this.element = elTr;
  elTr.className = idtype + 'row';
  //drag object id used for download type
  if(typeof fileObj.id == "undefined") {
    this.row_id  = 'nodb' + index;
  } else {
    if(fileObj.id === 0) {
      this.row_id = idtype + index;
    } else {
      //TODO: fix - this causes repeat ids for attach rows!
      this.row_id = 'fid' + fileObj.id;
    }
  }
  elTr.setAttribute('id', this.row_id);

  //title of drag object is path for move
  elTr.setAttribute('title', this.filepath);
  if(dd_enable) {
    //Only admins or owner of file can move it
    if(Webfm.admin || fileObj.u == getWebfmUid()) {
      this.dd = new Webfm.draggable(Webfm.dragCont, elTr, elTr.className);
    } else {
      this.draggable = false;
    }
  }

  elTd = Webfm.ce('td');
  elImg = Webfm.ce('img');
  if(fileObj.i) {
    elImg.setAttribute('src', this.iconDir + '/i.gif');
  } else {
    elImg.setAttribute('src', fr.getIconByExt());
  }

  if((typeof fileObj.id == "undefined") || fileObj.id === 0 || fileObj.id === false) {
    // Make icon transparent if file not in db - TODO: fix for IE
    elImg.style.opacity = 0.25;
    elImg.style.filter = "alpha(opacity=25)";
  }

  elImg.setAttribute('alt', Webfm.js_msg.u_file);
  this.menu = file_menu;
  elTd.appendChild(elImg);
  elTr.appendChild(elTd);

  if(Webfm.options.displayColumns.name ) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    this.clickObj = Webfm.ce('a');
    this.clickObj.setAttribute('href', '#');

  if((typeof fileObj.id == "undefined") || fileObj.id === 0 || fileObj.id === false) {
      this.clickObj.setAttribute('title', this.filepath);
  } else {
    if(Webfm.browser.isOP) {
      this.clickObj.setAttribute('href', getBaseUrl() + "\/webfm_send\/" + fileObj.id);
    }
    this.clickObj.setAttribute('title', fileObj.id);
  }

  if(this.ftitle) {
    this.clickObj.appendChild(Webfm.ctn(fileObj.ftitle));
  } else {
    this.clickObj.appendChild(Webfm.ctn(fileObj.n));
  }
  elTd.appendChild(this.clickObj);
  elTr.appendChild(elTd);
}

if(Webfm.options.displayColumns.modified) {
  elTd = Webfm.ce('td');
  if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
  elTd.className = 'txt';
  elTd.appendChild(Webfm.ctn(Webfm.convertunixtime(parseInt(fileObj.m, 10))));
  elTr.appendChild(elTd);
}

if(Webfm.options.displayColumns.size) {
  elTd = Webfm.ce('td');
  if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
  elTd.className = 'txt';
  size = Webfm.size(fileObj.s);
  elTd.appendChild(Webfm.ctn(size));
  elTr.appendChild(elTd);
}

  //owner field to row
  if(Webfm.options.displayColumns.owner) {
  //if(getWebfmOwnerColumn() && Webfm.options.displayColumns.owner) {
    elTd = Webfm.ce('td');
    if(Webfm.numColumns < 2) {elTd.colSpan = 2;}
    elTd.className = 'txt';
    elTd.appendChild(Webfm.ctn(fileObj.un));
    elTr.appendChild(elTd);
  }

  //mouse event listeners
  if(dd_enable) {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mousedown", function(e) { Webfm.contextMenuObj.hideContextMenu(e); fr.select(e); });
  } else {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "click", function(e) { Webfm.contextMenuObj.hideContextMenu(e); if(Webfm.renameActive === false) { Webfm.selectFile(fr.clickObj.title, fr.element); } });
  }
  if(this.draggable) {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mouseover", function() { fr.hover(fr.element, true); });
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mouseout", function() { fr.hover(fr.element, false); });
  }
  if(Webfm.browser.isOP) {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "mouseup", function(e) { if(e && e.button === 0 && e.altKey === true) { if(Webfm.renameActive === false) { Webfm.contextMenuObj.showContextMenu(e, fr); Webfm.stopEvent(e); } } });
  } else {
    listener = Webfm.eventListenerAdd(eventListenerArr, this.element, "contextmenu", function(e) { if(Webfm.renameActive === false) { Webfm.contextMenuObj.showContextMenu(e, fr); } Webfm.stopEvent(e); });
  }

  parent.appendChild(elTr);
  this.c_fil = this.c_fil + 1;
};

Webfm.filerow.prototype.hover = function (el, state) {
  if(state) {
    el.className += ' selected';
  } else {
    el.className = el.className.split(' ', 1);
  }
};

Webfm.filerow.prototype.select = function (event) {
  var cp, rightclick;
  cp = this;

  if(Webfm.renameActive === true) {
    return false;
  }
  event = event || window.event;
  if(event.target || event.srcElement) {
    if(this.clickObj) {
      // Determine mouse button
      rightclick = Webfm.rclick(event);
      if(rightclick) {
        return false;
      }
      setTimeout(function() {
        //if click then no dragging...
        if(Webfm.dragging === false) {
          //element id used for download method (webfm_send||direct http access)
          Webfm.selectFile(cp.clickObj.title, cp.element);
        }
      }, 200);
    }
    //passthrough
    if(typeof this.dd != "undefined") {
      this.dd.mouseButton(event);
    }
  }
  return false;
};

Webfm.filerow.prototype.getIconByExt = function() {
  var ext, last, icon;

  // extension stored in file record of db fails - use pathname
  ext = this.ext;
  if(ext) {
    ext = ext.replace(/\//g, "_").toLowerCase();
  } else {
    ext = this.filepath.toLowerCase();
    last = ext.lastIndexOf(".");
    if(last != -1) {
      // "." found
      ext = ext.slice(last + 1);
    } else {
      ext = "";
    }
  }
  icon = this.iconDir + '/' + (Webfm.icons["e" + ext] ? Webfm.icons["e" + ext] : "f") + '.gif';

  return icon;
};

/*
 * Webfm.treeBuilder constructor
 */
Webfm.treeBuilder = function (parent, root_menu, dir_menu) {
  this.parent = parent;
  this.root_menu = root_menu;
  this.dir_menu = dir_menu;
  this.trees = [];
};

Webfm.treeBuilder.prototype.fetch = function (tree_refresh, list_refresh) {
  var url, postObj;
  url = Webfm.ajaxUrl();

  this.tree_refresh = tree_refresh;
  this.list_refresh = list_refresh;

  Webfm.alrtObj.msg();
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");

  postObj = { action: encodeURIComponent("readtrees") };
  if(tree_refresh) {
    postObj.param0 = encodeURIComponent(true);
  }
  if(Webfm.current) {  // Allow themers to request the current tree.
    postObj.param1 = encodeURIComponent(Webfm.current);
  }
  Webfm.admin = false;
  Webfm.HTTPPost(url, this.callback, this, postObj);
};

Webfm.treeBuilder.prototype.callback = function (string, xmlhttp, cp) {
  var result, i;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    //Webfm.dbgObj.dbg("trees fetch:", Webfm.dump(result));

    if(result.status) {
      if(result.err) {
        Webfm.alrtObj.msg(result.err);
      }
      Webfm.admin = result.admin;
      // build directory trees from php associative array
      for(i in result.tree) {
        // Webfm.dbgObj.dbg("tree" + i, Webfm.dump(result.tree[i]));
        if(!cp.trees[i]) {
          cp.trees[i] = new Webfm.tree(cp.parent, i, cp.root_menu, cp.dir_menu);
        }

        cp.trees[i].fetch(cp.tree_refresh, false);
      }
      Webfm.dirListObj.refresh(result.current);
    } else {
      Webfm.alrtObj.msg(result.err);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.tree_listenerfn_click = function (wt, b) {
  return function(e) { wt.exp(b); Webfm.stopEvent(e); };
};

/**
 * Webfm.tree constructor
 * 1st param is parent node to append this Webfm.tree object
 * 2nd param is index to append to base id of Webfm.tree object
 * 3rd param is root directory menu array
 * 4th param is non-root directory menu array
 */
Webfm.tree = function (parent, treeIdx, root_menu, dir_menu) {
  var wt, node, elA, listener, elImg, elSpan, i, elDiv;
  wt = this;

  this.id = 'dirtree' + treeIdx;
  this.treeIdx = treeIdx;
  this.icondir = getWebfmIconDir();
  this.content = '';
  this.expAllData = [['collapse', 'minus', 'block'], ['expand', 'plus', 'none']];
  // Set tree exp/collapse behaviour on load (0 = expanded, 1 = collapsed)
  this.expAllIndex = 1;
  this.root_menu = root_menu;
  this.dir_menu = dir_menu;
  this.eventListeners = [];

  node = Webfm.ce("div");
  node.setAttribute('id', this.id);
  node.className = 'dirtree';

  //build tree and display
  elA = Webfm.ce('a');
  elA.setAttribute('href', '#');
  elA.setAttribute('title', Webfm.js_msg.refresh);
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { wt.fetch(true, ''); Webfm.stopEvent(e); });

  elImg = Webfm.ce('img');
  elImg.setAttribute('src', this.icondir + '/r.gif');
  elImg.setAttribute('alt', Webfm.js_msg.refresh);
  elA.appendChild(elImg);
  node.appendChild(elA);
  elSpan = Webfm.ce("span");
  elSpan.appendChild(Webfm.ctn('   '));
  elSpan.setAttribute('id', this.id + 'Name');
  node.appendChild(elSpan);

  // Expand/Collapse all folders buttons
  elSpan = Webfm.ce("span");
  elSpan.setAttribute('id', this.id + 'exp');
  for(i = 0; i < 2; i++) {
    elA = Webfm.ce('a');
    elA.setAttribute('href', '#');
    if(i) {
      elA.setAttribute('title', 'expand tree');
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", Webfm.tree_listenerfn_click(wt, 0));
    } else {
      elA.setAttribute('title', 'collapse tree');
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", Webfm.tree_listenerfn_click(wt, 1));
    }
    elImg = Webfm.ce('img');
    elImg.setAttribute('alt', this.expAllData[i][0]);
    elImg.setAttribute('src', this.icondir + '/' + this.expAllData[i][1] + '.gif');
    elA.appendChild(elImg);
    elSpan.appendChild(elA);
  }
  node.appendChild(elSpan);

  //container div for tree
  elDiv = Webfm.ce("div");
  this.treeCont = elDiv;
  node.appendChild(elDiv);

  parent.appendChild(node);
};

Webfm.tree.prototype.fetch = function (tree_refresh, list_refresh) {
  var url, postObj;
  url = Webfm.ajaxUrl();

  // Reset ul count (0=root)
  this.treeUlCounter = 0;
  this.treeNodeCounter = 0;
  this.list_refresh = list_refresh;

  Webfm.alrtObj.msg();
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  Webfm.dbgObj.dbg("tree fetch path:", this.treeIdx);
  postObj = { action: encodeURIComponent("readtree"), param0: encodeURIComponent(this.treeIdx) };
  if(tree_refresh) {
    postObj.param1 = encodeURIComponent(true);
  }
  Webfm.HTTPPost(url, this.callback, this, postObj);
};

Webfm.tree.prototype.callback = function (string, xmlhttp, cp) {
  var treeName, j;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    cp.content = Drupal.parseJson(string);
    // Webfm.dbgObj.dbg("tree fetch:", Webfm.dump(cp.content));

    //clear tree content
    while(cp.treeCont.hasChildNodes()) {
      cp.treeCont.removeChild(cp.treeCont.firstChild);
    }
    //clear event listeners for old tree content
    Webfm.eventUnregister(cp.eventListeners);
    //clear drop container array;
    Webfm.dropContainers = [];

    //update tree name
    treeName = Webfm.$(cp.id + 'Name');
    treeName.removeChild(treeName.firstChild);
    //TODO: Is this break really correct?
    for(j in cp.content.tree) {
      //textnode = last directory of root path
      treeName.appendChild(Webfm.ctn(' ' + j.substring(j.lastIndexOf("/") + 1) + ' ' + Webfm.js_msg.tree));
      break;
    }

    // Recursively build directory tree from php associative array
    cp.buildTreeRecur(cp.content.tree, cp.treeCont, '');
    cp.init();
    if(cp.list_refresh) {
      Webfm.dirListObj.refresh(cp.content.current);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.tree.prototype.getpath = function() {
  return this.content.current;
};

Webfm.tree.prototype.showHideNode = function (event) {
  var collapseIcon, ul;

  event = event || window.event;
  collapseIcon = event.target || event.srcElement;
  if(collapseIcon.style.visibility == 'hidden') {
    return;
  }

  ul = collapseIcon.parentNode.parentNode.getElementsByTagName('ul')[0];
  if(collapseIcon.title == this.expAllData[0][0]) {
    collapseIcon.src = this.icondir + '/' + this.expAllData[1][1] + '.gif';
    collapseIcon.alt = this.expAllData[1][0];
    collapseIcon.title = this.expAllData[1][0];
    ul.style.display = this.expAllData[1][2];
  } else {
    collapseIcon.src = this.icondir + '/' + this.expAllData[0][1] + '.gif';
    collapseIcon.alt = this.expAllData[0][0];
    collapseIcon.title = this.expAllData[0][0];
    ul.style.display = this.expAllData[0][2];
  }
};

Webfm.tree.prototype.buildTreeRecur_listenerfn_click = function (cp) {
  var listenerfn = function(e) { cp.showHideNode(e); Webfm.stopEvent(e); };
  return listenerfn;
};

Webfm.listenerfn_mouseoverout = function (cp, indicator) {
  var listenerfn = function(e) { cp.hover(e, indicator); };
  return listenerfn;
};

Webfm.listenerfn_mouseoverout_dir = function (cp, indicator) {
  var listenerfn = function(e) { cp.hoverDir(e, indicator); };
  return listenerfn;
};

Webfm.tree.prototype.buildTreeRecur = function (content, parent, input_path) {
  var cp, dc_id, elUl, sortDir, i, j, newpath, elLi, elDiv, elImg, listener, treeNode;
  cp = this;

  //php associative array is always a single member array with nested objects
  if(Webfm.isArray(content)) {
      this.buildTreeRecur(content[0], parent, '');
  } else if(Webfm.isObject(content)) {
    if(input_path) {
      input_path += "/";
    }
    elUl = Webfm.ce('ul');

    if(this.treeUlCounter) {
      this.treeUlCounter = this.treeUlCounter + 1;
    } else {
      elUl.className = 'root-list';
      this.treeUlCounter = this.treeUlCounter + 1;
    }
    // sort object here since php does not have a case-sensitive ksort
    sortDir = [];
    for(i in content) {
      if(content.hasOwnProperty(i)) {
        sortDir.push(i);
      }
    }
    if(sortDir.length) {
      sortDir.sort(Webfm.sortByKey);
      for(j = 0; j < sortDir.length; j = j + 1) {
        newpath = input_path + sortDir[j];
        elLi = Webfm.ce('li');
        dc_id = this.id + 'node' + this.treeNodeCounter;
        elLi.setAttribute('id', dc_id);
        elLi.setAttribute('title', newpath);
        elLi.className = "treenode";

        elDiv = Webfm.ce('div');
        elImg = Webfm.ce('img');
        elImg.setAttribute('src', this.icondir + '/' + this.expAllData[this.expAllIndex][1] + '.gif');
        elImg.setAttribute('alt', this.expAllData[this.expAllIndex][0]);
        elImg.setAttribute('title', this.expAllData[this.expAllIndex][0]);
        elDiv.appendChild(elImg);
        elLi.appendChild(elDiv);
        listener = Webfm.eventListenerAdd(this.eventListeners, elImg, "click", Webfm.tree.prototype.buildTreeRecur_listenerfn_click(cp));
        treeNode = new Webfm.treeNode(elDiv, newpath, dc_id, elImg, this.treeNodeCounter ? this.dir_menu : this.root_menu, this.eventListeners);
        listener = Webfm.eventListenerAdd(this.eventListeners, elDiv, "mouseover", Webfm.listenerfn_mouseoverout(cp, true));
        listener = Webfm.eventListenerAdd(this.eventListeners, elDiv, "mouseout", Webfm.listenerfn_mouseoverout(cp, false));

        this.treeNodeCounter = this.treeNodeCounter + 1;
        this.buildTreeRecur(content[sortDir[j]], elLi, newpath);
        elUl.appendChild(elLi);
      }
    }

    // Always show root
    if(elUl.className == 'root-list') {
      elUl.style.display = 'block';
    } else {
      elUl.style.display = this.expAllData[this.expAllIndex][2];
    }

    parent.appendChild(elUl);
  }
};

//IE does not understand 'this' inside event listener func
Webfm.tree.prototype.hover = function (event, state) {
  var el;
  el = event.target || window.event.srcElement;

  if(state) {
    el.className = 'selected';
    el.parentNode.className = 'selected';
    // el.parentNode.className += ' selected';
  } else {
    // var class_names = [];
    // class_names = el.parentNode.className.split(' ');
    // el.parentNode.className = class_names[0];
    el.className = '';
    el.parentNode.className = '';
  }
};

Webfm.tree.prototype.init = function() {
  // Determine if expand/collapse icon is present
  // Create event objects for each element
  var dirItems, subItems, i;
  dirItems = this.treeCont.getElementsByTagName('li');

  if(dirItems.length) {
    for(i = 0; i < dirItems.length; i++) {
      subItems = dirItems[i].getElementsByTagName('ul');
      if(!subItems.length) {
        // Hide collapse icon if no sub-directories
        dirItems[i].getElementsByTagName('img')[0].style.visibility = 'hidden';
      }
    }
  }
};

Webfm.tree.prototype.exp = function (expcol) {
  //clear tree
  while(this.treeCont.hasChildNodes()) {
    this.treeCont.removeChild(this.treeCont.firstChild);
  }

  // Rebuild dirtree ul/li objects from dirtree object
  this.expAllIndex = expcol;
  this.treeUlCounter = 0;
  this.treeNodeCounter = 0;

  this.buildTreeRecur(this.content.tree, this.treeCont, '');
  this.init();
};

Webfm.treeNode = function (parent, path, id, expImg, menu, eventListenerArr) {
  var tn, icondir, elImg, nodeNumPos, root, listener;
  tn = this;
  icondir = getWebfmIconDir();
  root = [];

  this.parent = parent;
  this.element = parent.parentNode;

  this.expClickObj = expImg;
  elImg = Webfm.ce('img');
  elImg.setAttribute('id', id + 'dd');
  elImg.setAttribute('src', icondir + '/d.gif');
  parent.appendChild(elImg);
  this.clickObj = Webfm.ce('a');
  this.clickObj.href = '#';
  //anchor title is path
  this.clickObj.setAttribute('title', path);
  nodeNumPos = this.element.id.indexOf("node") + 4;

  if((this.element.id.substring(nodeNumPos) != "0") && Webfm.admin) {
    // root treenode isn't draggable
    this.dd = new Webfm.draggable(Webfm.dragCont, this.element, this.element.className);
  }

  root = path.split('/');
  //textNode is last directory name of path string (used for root path)
  this.clickObj.appendChild(Webfm.ctn(root[root.length - 1]));
  parent.appendChild(this.clickObj);

  //mouse event listeners
  this.menu = menu;
  if(typeof this.dd != "undefined") {
    listener = Webfm.eventListenerAdd(eventListenerArr, parent, "mousedown", function(e) { Webfm.contextMenuObj.hideContextMenu(e); tn.select(e); });
  } else {
    listener = Webfm.eventListenerAdd(eventListenerArr, parent, "click", function(e) { Webfm.selectDir(tn.clickObj.title); Webfm.stopEvent(e); });
  }
  if(Webfm.browser.isOP) {
    listener = Webfm.eventListenerAdd(eventListenerArr, parent, "mouseup", function(e) { if(e && e.button === 0 && e.altKey === true) { if(Webfm.renameActive === false) { Webfm.contextMenuObj.showContextMenu(e, tn); } Webfm.stopEvent(e); } });
  } else {
    listener = Webfm.eventListenerAdd(eventListenerArr, parent, "contextmenu", function(e) { if(Webfm.renameActive === false) { Webfm.contextMenuObj.showContextMenu(e, tn); } Webfm.stopEvent(e); });
  }
};

Webfm.treeNode.prototype.select = function (event) {
  var cp, rightclick;
  cp = this;

  // disable during rename
  if(Webfm.renameActive === true) {
    return false;
  }
  event = event || window.event;

  switch(event.target || event.srcElement) {
    case this.expClickObj:
      break;

    case this.clickObj:
      // Determine mouse button
      rightclick = Webfm.rclick(event);
      if(rightclick) {
        // oncontextmenu will handle this
        break;
      }

      setTimeout(function() {
        //if click then no dragging...
        if(Webfm.dragging === false) {
          Webfm.selectDir(cp.clickObj.title);
        }
      }, 200);

      if(typeof this.dd != "undefined") {
        this.dd.mouseButton(event);
      }
      break;

    //passthrough
    default:
      if(typeof this.dd != "undefined") {
        this.dd.mouseButton(event);
      }
      break;
  }
  return false;
};

Webfm.selectDir = function (path) {
  Webfm.dirListObj.fetch(path);
};

//File download
Webfm.selectFile = function (path, el, as_file) {
  var fid, sent, pths, pluspath, fullpath, url, cache, i, iframeName, pane;

  //files not in db use file path in tr title for download
  //files inside webfm have 'fidxxx' as title
  fid = null;
  sent = false;
  pths = [];
  pths = el.title.split('/');

  if(el.id.substring(0, 3) == 'fid' || el.id.substring(0, 3) == 'sid') {
    fid = el.id.substring(3);
    fullpath = 'webfm_send/' + path;
    if(as_file) {
      fullpath += '/1';
    }
  } else {
    //replace / with ~ since server uses / as param delimiter
    pluspath = pths.join('~');
    fullpath = 'webfm_send/' + encodeURIComponent(pluspath);
  }

  if(getWebfmCleanUrl()) {
    url = getBaseUrl() + '/' + fullpath;
  } else {
    url = '?q=' + fullpath;
  }

  if(as_file) {
    // Send download/open dialog
    window.location = url;
  } else {
    cache = Webfm.dirListObj.cache.get(Webfm.current);
    for(i in cache.files) {
      // Display downloaded image in iframe
      // check cache files[] array for path match and image type
      if(((cache.files[i].id == fid) || ((cache.files[i].p + '/' + cache.files[i].n) == path)) && cache.files[i].i) {
        // FF needs unique name per iframe - Webfm.zindex guaranteed unique
        // since incremented with each new pane
        iframeName = "dwnld" + Webfm.zindex;
        pane = new Webfm.pane(Webfm.viewCont, pths[pths.length - 1], "webfm-viewFile", null, 200, 200);
        // I hate using innerHTML but IE iframe requires this method:
        pane.content.innerHTML = '<iframe src="' + url + '" style="margin:0;padding:0;width:100%;height:100%"></iframe>';
        if(fid) {
          pane.headerMsg("fid:" + path);
        }

        pane.show();

        sent = true;
        break;
      }
    }
    // Not an image - launch file in new browser instance
    if(!sent) {
      // window.open(url);
      window.location = url;
    }
  }
};

/**
 * Webfm.context constructor
 */
Webfm.context = function (container) {
  Webfm.renameActive = false;
  this.container = container;
  this.eventListeners = this.container.eventListenerArr;
};

Webfm.context.prototype.hideContextMenu = function (event) {
  // Hide context menu and restore document oncontextmenu handler
  this.container.obj.style.visibility = "hidden";
  document.body.oncontextmenu = Webfm.oldOnContextMenu;
};

Webfm.listenerfn_context_mousedown = function (cp, obj) {
  var listenerfn = function(e) { cp.selectMenu(e, obj); cp.hideContextMenu(e); Webfm.stopEvent(e); };
  return listenerfn;
};

//obj is treenode|filerow|dirrow
Webfm.context.prototype.showContextMenu = function (event, obj) {
  var cp, listener, pos, j, elUl, elLi;
  cp = this;
  this.element = obj.element;
  this.clickObj = obj.clickObj;

  //  Webfm.dbgObj.dbg('this.element.title:', this.element.title);
  document.body.oncontextmenu = function() { return false; };
  event = event || window.event;
  pos = Drupal.mousePosition(event);

  // Remove any existing list in our contextMenu.
  this.container.destroy();

  // Build menu ul and append to this.container
  if(obj.menu !== null || typeof obj.menu !== 'undefined' || obj.menu !== false) {
    elUl = Webfm.ce('ul');
    for(j = 0; j < obj.menu.length; j = j + 1) {
      elLi = Webfm.ce('li');
      //Run prepare function and return true if menuElement to appear in menu
      if(typeof obj.menu[j].prepFunc == 'function' && !obj.menu[j].prepFunc(obj)) {
        continue;
      }
      elLi.appendChild(Webfm.ctn(obj.menu[j].desc));
      //menu selection is title of event
      elLi.id = 'webfm-cxtMenu' + j;
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elLi, "mousedown", Webfm.listenerfn_context_mousedown(cp, obj));
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elLi, "mouseover", Webfm.listenerfn_mouseoverout(cp, true));
      listener = Webfm.eventListenerAdd(Webfm.eventListeners, elLi, "mouseout", Webfm.listenerfn_mouseoverout(cp, false));
      elUl.appendChild(elLi);
    }

    this.container.obj.appendChild(elUl);
    this.container.obj.style.visibility = "visible";

    if(pos.x + this.container.obj.offsetWidth > (document.documentElement.offsetWidth - 20)) {
      pos.x = pos.x + (document.documentElement.offsetWidth - (pos.x + this.container.obj.offsetWidth)) - 20;
    }

    this.container.obj.style.left = pos.x + 'px';
    this.container.obj.style.top = pos.y + 'px';

    this.container.obj.style.display = 'block';
    this.container.obj.style.zIndex = Webfm.zindex + 1;
  }
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, document, "mousedown", function(e) { cp.hideContextMenu(e); });

  return false;
};

//IE does not understand 'this' inside event listener func
Webfm.context.prototype.hover = function (event, state) {
  var el = event.target || window.event.srcElement;
  el.className = state ? 'selected' : '';
};

//Call Webfm.menuElement execute function
Webfm.context.prototype.selectMenu = function (event, obj) {
  event = event || window.event;
  obj.menu[(event.target || event.srcElement).id.substring(13)].execFunc(obj);
  return false;
};

Webfm.menuElement = function (desc, execFunc, prepFunc) {
  this.desc = desc;
  this.execFunc = execFunc;
  this.prepFunc = prepFunc;
};

//obj is treenode|filerow|dirrow
Webfm.menuElement.prototype.exec = function(obj) {
  this.execFunc(obj);
};

Webfm.menuRemove = function(obj) {
  var url, path, postObj;
  url = Webfm.ajaxUrl();
  if(typeof obj.ext != "undefined") {
    //directories don't have extension properties
    obj.is_file = true;
  }

  path = obj.element.title;
  obj.parentPath = path.substring(0, path.lastIndexOf("/"));
  if(Webfm.confirm(Webfm.js_msg.confirmdel0 + (obj.is_file ? Webfm.js_msg.file : Webfm.js_msg.dir) + " " + path + (obj.is_file ? "" : Webfm.js_msg.confirmdel1) + "?")) {
    Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
    postObj = { action: encodeURIComponent("delete"), param0: encodeURIComponent(path) };
    Webfm.HTTPPost(url, Webfm.ctxMenuCallback, obj, postObj);
    return false;
  }
};

Webfm.menuMkdir = function(obj) {
  var url, path, postObj;

  url = Webfm.ajaxUrl();
  obj.is_file = false;
  path = obj.element.title;
  obj.parentPath = path;
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  postObj = { action: encodeURIComponent("mkdir"), param0: encodeURIComponent(path) };
  Webfm.HTTPPost(url, Webfm.ctxMenuMkdirCallback, obj, postObj);
};

Webfm.menuRename = function(obj) {
  var listener;

  if(typeof obj.ext != "undefined") {
    //directories don't have extension properties
    obj.is_file = true;
  }
  obj.renInput = Webfm.ce('input');
  obj.renInput.setAttribute('type', 'textfield');
  obj.renInput.value = obj.clickObj.firstChild.nodeValue;
  //clone input element since Webfm.contextMenuObj isn't destroyed on DOM
  obj.tempInput = obj.renInput.cloneNode(true);
  obj.tempInput.setAttribute('autocomplete', 'off'); //FF focus bug
  obj.clickparent = obj.clickObj.parentNode;
  obj.clickparent.replaceChild(obj.tempInput, obj.clickObj);
  //no change (blur) - restore original textNode
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, obj.tempInput, "blur", function(e) { Webfm.renameActive = false; obj.clickparent.replaceChild(obj.clickObj, obj.tempInput); Webfm.stopEvent(e); });
  //listen for enter key up - swap names (illegal names are ignored on server and next list
  //refresh will restore the proper filename)
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, obj.tempInput, "keydown", function(e) { if(Webfm.enter(e) && Webfm.renameActive === true) { Webfm.renameActive = false; Webfm.menuSwapname(obj); this.blur(); Webfm.stopEvent(e); } });
  setTimeout(function() { obj.tempInput.focus(); Webfm.renameActive = true; }, 10);
};

Webfm.menuSearch = function(obj) {
    Webfm.searchObj.createForm(obj.element.title);
};

Webfm.menuSwapname = function(obj) {
  var url, oldpath, newpath, postObj;
  url = Webfm.ajaxUrl();
  oldpath = obj.element.title;

  obj.parentPath = oldpath.substring(0, oldpath.lastIndexOf("/"));
  newpath = obj.parentPath + '/' + obj.tempInput.value;
  postObj = { action: encodeURIComponent("rename"), param0: encodeURIComponent(oldpath), param1: encodeURIComponent(newpath) };
  Webfm.HTTPPost(url, Webfm.ctxMenuCallback, obj, postObj);

  return true;
};

Webfm.menuGetMeta = function(obj) {
  var url, postObj;

  url = Webfm.ajaxUrl();
  // Webfm.dbgObj.dbg("obj.clickObj.title:", obj.clickObj.title);
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  postObj = { action: encodeURIComponent("getmeta"), param0: encodeURIComponent(obj.clickObj.title) };
  Webfm.HTTPPost(url, Webfm.ctxMenuMetaCallback, '', postObj);
};

Webfm.menuAttach = function (obj, ma_fid) {
  var url, fid, i, postObj, attach_arr;
  url = Webfm.ajaxUrl();
  attach_arr = [];

  if(obj === null || typeof obj === 'undefined' || obj === false) {
    fid = ma_fid;
  } else {
    fid = obj.clickObj.title;
  }
  //check that this file is not already attached

  attach_arr = Webfm.$(Webfm.attachFormInput).value.split(',');
  for(i = 0; i < attach_arr.length; i++) {
    if(fid == attach_arr[i]) {
      break;
    }
  }
  if(i == attach_arr.length) {
    Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
    postObj = { action: encodeURIComponent("attachfile"), param0: encodeURIComponent(fid) };
    Webfm.HTTPPost(url, Webfm.ctxMenuAttachCallback, '', postObj);
    Webfm.attach.noAttachments(false);
  }
};

Webfm.menuDetach = function(obj) {
  var path, attach_arr, new_attach_arr, j, i, fid;

  Webfm.alrtObj.msg();
  path = obj.element.title;
  if(Webfm.confirm(Webfm.js_msg.confirmdet + path + "?")) {
    // update table
    obj.element.parentNode.removeChild(obj.element);
    // update form input
    attach_arr = [];
    attach_arr = Webfm.$(Webfm.attachFormInput).value.split(',');
    new_attach_arr = [];
    j = 0;
    // tr elements use 'fid#' in 'title' field
    fid = obj.element.id.substring(3);
    for(i = 0; i < attach_arr.length; i++) {
      if(attach_arr[i] != fid) {
        j = j + 1;
        new_attach_arr[j] = attach_arr[i];
      }
    }
    Webfm.$(Webfm.attachFormInput).value = new_attach_arr.join(',');
    if(!new_attach_arr.length) {
      Webfm.attach.noAttachments(true);
    }
  }
};

Webfm.menuView = function(obj) {
  Webfm.selectFile(obj.clickObj.title, obj.element, false);
};

Webfm.menuDownload = function(obj) {
  Webfm.selectFile(obj.clickObj.title, obj.element, true);
};

Webfm.menuDbRem = function(obj) {
  var path, fid, url, postObj;

  path = obj.element.title;
  //strip 'fid' from front of id
  fid = obj.element.id.substring(3);
  if(Webfm.confirm(Webfm.js_msg.confirmdbrem0 + path + Webfm.js_msg.confirmdbrem1)) {
    url = Webfm.ajaxUrl();
    Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
    postObj = { action: encodeURIComponent("dbrem"), param0: encodeURIComponent(fid) };
    // path for callback must be a directory - not a file
    path = path.substring(0, path.lastIndexOf("/"));
    Webfm.HTTPPost(url, Webfm.dbrem_callback, path, postObj);
  }
  return false;
};

Webfm.menuGetPerm = function(obj) {
  var url, postObj;

  url = Webfm.ajaxUrl();
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");

  postObj = { action: encodeURIComponent("getperm"), param0: encodeURIComponent(obj.clickObj.title) };
  Webfm.HTTPPost(url, Webfm.ctxMenuPermCallback, '', postObj);
};

Webfm.dbrem_callback = function (string, xmlhttp, path) {
  var result;

  Webfm.alrtObj.msg();
  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    Webfm.dbgObj.dbg("dbrem:", Webfm.dump(result));
    if(result.status) {
      Webfm.dirListObj.refresh(path);
    } else {
      if(result.data) {
        Webfm.alrtObj.str_arr(result.data);
      } else {
        Webfm.alrtObj.msg("operation fail");
      }
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.menuInsert = function(obj) {
  Webfm.insert(obj.element.title, "file");
};

Webfm.insert = function (path, type) {
  var url, postObj;
  url = Webfm.ajaxUrl();
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  postObj = { action: encodeURIComponent("insert"), param0: encodeURIComponent(path), param1: encodeURIComponent(type) };
  if(type == "file") {
    // path for callback must be a directory - not a file
    path = path.substring(0, path.lastIndexOf("/"));
  }
  Webfm.HTTPPost(url, Webfm.insert_callback, path, postObj);
  return false;
};
Webfm.insert_callback = function (string, xmlhttp, path) {
  var result;

  Webfm.alrtObj.msg();
  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    Webfm.dbgObj.dbg("insert:", Webfm.dump(result));
    if(result.status) {
      //if success, update fetch
      if(result.data.cnt) {
        Webfm.dirListObj.refresh(path);
        Webfm.alrtObj.msg(result.data.cnt + Webfm.js_msg.inserted);
      }
      if(result.data.errcnt) {
        Webfm.alrtObj.msg(result.data.errcnt + Webfm.js_msg.notinserted);
        Webfm.alrtObj.str_arr(result.data.err);
      }
    } else if(result.data.err) {
      Webfm.alrtObj.str_arr(result.data.err);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.generateFileHref  = function (obj, url) {
  var title, string;
  title = '';

  if(typeof url == 'undefined') {
    url = getBaseUrl();
  }

  if(typeof obj.ftitle != "undefined" && obj.ftitle !== null && obj.ftitle.length) {
    title = obj.ftitle;
  } else {
    title = obj.element.title.substring(obj.element.title.lastIndexOf("/") + 1);
  }

  if(getWebfmCleanUrl()) {
    string = "<a href=\"" + url + "\/webfm_send\/" + obj.element.id.substring(3) + "\">" + title + "</a>";
  } else {
    string = "<a href=\"" + url + "\/?q=webfm_send\/" + obj.element.id.substring(3) + "\">" + title + "</a>";
  }
  return string;
};

Webfm.menuPasteHref = function(obj) {
  var fileHref, myField, startPos, endPos, sel;

  fileHref = Webfm.generateFileHref(obj, Drupal.settings.basePath.replace(/\/$/, ''));
  myField = Webfm.lastarea;

  //IE support
  if(document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = fileHref;
  }
  //other browsers
  else if(myField.selectionStart || myField.selectionStart == '0') {
    startPos = myField.selectionStart;
    endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos) + fileHref + myField.value.substring(endPos, myField.value.length);
  } else {
    myField.value += fileHref;
  }
};

Webfm.menuAdmin = function() {
  return Webfm.admin;
};

Webfm.menuFileUid = function(obj) {
  //determine if we are the owner of this file
  return ((Webfm.admin || obj.uid == getWebfmUid()) ? true : false);
};

Webfm.menuRenFileUid = function(obj) {
  if(Webfm.menuFileUid(obj)) {
    // Determine if name is a metadata title
    return (obj.ftitle === null);
  }
  return false;
};

Webfm.menuFilePerm = function(obj) {
  // object must be file in db with user access
  if(Webfm.menuFidVal(obj)) {
    return Webfm.menuFileUid(obj);
  }
  return false;
};

Webfm.menuAdminFidVal = function(obj) {
  if(Webfm.admin) {
    return Webfm.menuFidVal(obj);
  }
  return false;
};

Webfm.menuAdminNoFidVal = function(obj) {
  if(Webfm.admin) {
    return Webfm.menuNoFidVal(obj);
  }
  return false;
};

//menu prepFunc to determine if filerow has 'fid' as first 3 letters of id
Webfm.menuFidVal = function(obj) {
  if(obj.element.id.substring(0, 3) == 'fid') {
    return true;
  }
  return false;
};

Webfm.menuNoFidVal = function(obj) {
  if(obj.element.id.substring(0, 3) != 'fid') {
    return true;
  }
  return false;
};

Webfm.confirm = function (text) {
  var agree = confirm(text);
  return agree ? true : false;
};

/**
 * Context menu callbacks
 */
Webfm.ctxMenuAttachCallback = function (string, xmlhttp, cp) {
  var result, filerow, elInput;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    // Webfm.dbgObj.dbg("attach:", Webfm.dump(result));
    if(result.status) {
      Webfm.admin = result.admin;
      filerow = new Webfm.filerow(Webfm.attachObj.body, result.data, 'attach', '', true, Webfm.menuHT.get('det'), Webfm.attachObj.eventListeners);
      elInput = Webfm.$(Webfm.attachFormInput);
      elInput.setAttribute('value', (elInput.getAttribute('value') ? elInput.getAttribute('value') + ',' : '') + result.data.id);
    } else {
      Webfm.alrtObj.msg(result.data);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.ctxMenuCallback = function (string, xmlhttp, obj, mkdir_flag) {
  var result;

  Webfm.progressObj.hide();
  Webfm.alrtObj.msg();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    // Webfm.dbgObj.dbg("context:", Webfm.dump(result));
    // Webfm.dbgObj.dbg("obj:", obj.droppath);
    if(result.status) {
      if(!obj.is_file && Webfm.dirTreeObj) {
        Webfm.dirTreeObj.fetch(true, false);
      }
      //if success, flush cache for updated fetch
      if(typeof mkdir_flag != "undefined") {
        Webfm.dirListObj.refresh(obj.parentPath, result.data);
      } else {
        Webfm.dirListObj.refresh(obj.parentPath);
      }
    } else if(result.data) {
      Webfm.alrtObj.str_arr(result.data);
    } else {
      Webfm.alrtObj.msg("operation fail");
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.ctxMenuMkdirCallback = function (string, xmlhttp, obj) {
    var mkdir_flag = true;
    // fourth var to signal the listing to rename the new directory
    Webfm.ctxMenuCallback(string, xmlhttp, obj, mkdir_flag);
};

Webfm.ctxMenuMetaCallback = function (string, xmlhttp, obj) {
  var result;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    // Webfm.dbgObj.dbg("meta result:", Webfm.dump(result));
    if(result.status) {
      Webfm.metaObj.createForm(result.data);
    } else {
      Webfm.alrtObj.msg(result.data);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

Webfm.ctxMenuPermCallback = function (string, xmlhttp, obj) {
  var result;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    // Webfm.dbgObj.dbg("perm result:", Webfm.dump(result));
    if(result.status) {
      Webfm.permObj.createForm(result.data);
    } else {
      Webfm.alrtObj.msg(result.data);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

/**
 * Webfm.perm constructor
 * 1st param is popup container obj
 * 2nd param is default startup width
 * 2nd param is default startup height
 */
Webfm.perm = function (container, width, height) {
  var elDiv, elForm, elTable, elTBody, elControls;

  elDiv = Webfm.ce('div');
  elDiv.setAttribute('id', 'webfm-perm-form');

  elForm = Webfm.ce('form');
  elDiv.appendChild(elForm);

  elTable = Webfm.ce('table');
  elForm.appendChild(elTable);

  elTBody = Webfm.ce('tbody');
  elTable.appendChild(elTBody);

  elControls = Webfm.ce('div');
  elForm.appendChild(elControls);

  this.obj = elDiv;
  this.container = container;
  this.form = elForm;
  this.tbody = elTBody;
  this.controls = elControls;
  this.width = width;
  this.height = height;
  this.eventListeners = this.container.eventListenerArr;
};

Webfm.perm.prototype.createForm = function (data) {
  this.data = data;
  this.permit = (Webfm.admin || this.data.u == getWebfmUid()) ? true : false;
  //clear any permissions info
  this.resetForm();
  //create new pane to house this perm object
  this.pane = new Webfm.pane(this.container, Webfm.js_msg.perm, "webfm-permPane", this.obj, this.width, this.height);
  //create permissions checkboxes
  this.fillFormData();
  //create controls if owner has rights to file
  if(this.permit) {
    this.buildFormControls();
  } else {
    //put read-only indicator in pane header
    this.pane.headerMsg("read-only");
  }
};

Webfm.perm.prototype.resetForm = function() {
  var tbody, controls;
  tbody = this.tbody;
  controls = this.controls;

  while(tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  while(controls.hasChildNodes()) {
    controls.removeChild(controls.firstChild);
  }
};

Webfm.perm.prototype.fillFormData = function() {
  var elTr, elTd, i, j, check, elInput;

  for(j in this.data) {
    if(j != "p") {
      elTr = Webfm.ce('tr');

      // label td
      elTd = Webfm.ce('td');
      elTd.appendChild(Webfm.ctn(Webfm.permInfoHT.get(j) + ': '));
      elTr.appendChild(elTd);

      // info td
      elTd = Webfm.ce('td');
      elTd.appendChild(Webfm.ctn(this.data[j]));
      elTr.appendChild(elTd);

      this.tbody.appendChild(elTr);
    }
  }
  // Webfm.permKey keys correspond to permission bitfields
  for(i in Webfm.permKey) {
    elTr = Webfm.ce('tr');

    // label td
    elTd = Webfm.ce('td');
    elTd.appendChild(Webfm.ctn(Webfm.permHT.get(Webfm.permKey[i]) + ': '));
    elTr.appendChild(elTd);

    // checkbox td
    elTd = Webfm.ce('td');
    // use bitwise operator to determine permission bits
    check = (parseInt(Webfm.permKey[i], 10) & parseInt(this.data.p, 10)) > 0;
    if(this.permit) {
      elInput = Webfm.ce('input');
      elInput.setAttribute('type', 'checkbox');
      // checkbox name is used to build the new permission value
      elInput.setAttribute('name', Webfm.permKey[i]);
      if(check) {
        elInput.setAttribute('checked', check);
      }
      elTd.appendChild(elInput);
    } else {
      elTd.appendChild(Webfm.ctn(check ? "True" : "False"));
    }
    elTr.appendChild(elTd);

    this.tbody.appendChild(elTr);
  }
};

//build perm control buttons
Webfm.perm.prototype.buildFormControls = function() {
  var cp, submitButton, listener, resetButton;
  cp = this;

  submitButton = Webfm.ce('input');
  submitButton.setAttribute('type', 'button');
  submitButton.setAttribute('value', Webfm.js_msg.submit);
  submitButton.className = "perm-button";
  listener = Webfm.eventListenerAdd(cp.eventListeners, submitButton, "click", function(e) { if(cp.submitPerm()) { cp.container.destroy(); } Webfm.stopEvent(e); });
  this.controls.appendChild(submitButton);

  resetButton = Webfm.ce('input');
  resetButton.setAttribute('type', 'button');
  resetButton.setAttribute('value', Webfm.js_msg.reset);
  resetButton.className = "perm-button";
  listener = Webfm.eventListenerAdd(cp.eventListeners, resetButton, "click", function(e) { cp.createForm(cp.data); Webfm.stopEvent(e); });
  this.controls.appendChild(resetButton);
};

Webfm.perm.prototype.submitPerm = function() {
  var url, inputs, output, i, postObj;
  url = Webfm.ajaxUrl();
  inputs = [];
  output = 0;

  inputs = this.tbody.getElementsByTagName('input');
  for(i = 0; i < inputs.length; i++) {
    // Build permission val from checkbox name
    if(inputs[i].checked) {
      output += parseInt(inputs[i].name, 10);
    }
  }

  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  postObj = { action: encodeURIComponent("putperm"), param0: encodeURIComponent(this.data.id), param1: encodeURIComponent(output)};
  Webfm.HTTPPost(url, this.submitPermcallback, this, postObj);
};

Webfm.perm.prototype.submitPermcallback = function (string, xmlhttp, obj) {
  var result;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    if(result.status) {
      //put confirmed result back into this.data for proper 'reset'
      obj.data.p = result.data.perm;
      // Webfm.dbgObj.dbg('new perm :', obj.data["p"]);
    }
    obj.pane.headerMsg(result.msg);
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

/**
 * Webfm.metadata constructor
 * 1st param is popup container obj
 * 2nd param is default startup width
 * 2nd param is default startup height
 */
Webfm.metadata = function (container, width, height) {
  var elDiv, elForm, elTable, elTBody, elControls;

  elDiv = Webfm.ce('div');
  elDiv.setAttribute('id', 'webfm-meta-form');

  elForm = Webfm.ce('form');
  elDiv.appendChild(elForm);

  elTable = Webfm.ce('table');
  elForm.appendChild(elTable);

  elTBody = Webfm.ce('tbody');
  elTable.appendChild(elTBody);

  elControls = Webfm.ce('div');
  elForm.appendChild(elControls);

  this.obj = elDiv;
  this.container = container;
  this.form = elForm;
  this.tbody = elTBody;
  this.controls = elControls;
  this.fid = null;
  this.width = width;
  this.height = height;
  this.eventListeners = this.container.eventListenerArr;
};

Webfm.metadata.prototype.createForm = function (data) {
  this.data = data;
  //clear any metadata info
  this.resetForm();
  //create new pane to house this metadata object
  this.pane = new Webfm.pane(this.container, Webfm.js_msg.metadata, "webfm-metaPane", this.obj, this.width, this.height);
  //create metadata fields
  this.fillFormData();
  //create controls if owner has rights to file
  if(this.fid) {
    this.buildFormControls();
  } else {
    //put read-only indicator in pane header
    this.pane.headerMsg("read-only");
  }
};

Webfm.metadata.prototype.resetForm = function() {
  var tbody, controls;

  tbody = this.tbody;
  while(tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  controls = this.controls;
  while(controls.hasChildNodes()) {
    controls.removeChild(controls.firstChild);
  }
  this.fid = null;
};

Webfm.metadata.prototype.fillFormData = function() {
  var i, meta, elTr, elTd, elInput, elTextArea;

  if(typeof this.data.id != "undefined") {
      this.fid = this.data.id;
  }
  for(i in this.data) {
    meta = Webfm.metadataHT.get(i);
    elTr = Webfm.ce('tr');

    // label td
    elTd = Webfm.ce('td');
    elTd.appendChild(Webfm.ctn(meta.desc + ': '));
    elTr.appendChild(elTd);

    // info td
    elTd = Webfm.ce('td');
    if(this.fid && meta.edit) {
      if(meta.size == 256) {
        // textarea
        elTextArea = Webfm.ce('textarea');
        elTextArea.setAttribute('name', i);
        elTextArea.cols = "40";
        elTextArea.rows = "4";
        elTextArea.value = decodeURI(this.data[i]);
        elTd.appendChild(elTextArea);
      } else {
        // textfield
        elInput = Webfm.ce('input');
        elInput.setAttribute('type', 'textfield');
        elInput.setAttribute('name', i);
        elInput.setAttribute('size', '40');
        elInput.setAttribute('value', decodeURI(this.data[i]));
        elTd.appendChild(elInput);
      }
    } else {
      elTd.appendChild(Webfm.ctn(decodeURI(this.data[i])));
    }
    elTr.appendChild(elTd);

    // validation td
    elTd = Webfm.ce('td');
    elTd.appendChild(Webfm.ctn(String.fromCharCode(160))); //&nbsp;
    elTr.appendChild(elTd);

    this.tbody.appendChild(elTr);
  }
};

//build metadata control buttons
Webfm.metadata.prototype.buildFormControls = function() {
  var cp, submitButton, listener, resetButton;
  cp = this;

  submitButton = Webfm.ce('input');
  submitButton.setAttribute('type', 'button');
  submitButton.setAttribute('value', Webfm.js_msg.submit);
  submitButton.className = "meta-button";
  listener = Webfm.eventListenerAdd(cp.eventListeners, submitButton, "click", function(e) { if(cp.submitMeta()) { cp.container.destroy(); } Webfm.stopEvent(e); });
  this.controls.appendChild(submitButton);

  resetButton = Webfm.ce('input');
  resetButton.setAttribute('type', 'button');
  resetButton.setAttribute('value', Webfm.js_msg.reset);
  resetButton.className = "meta-button";
  listener = Webfm.eventListenerAdd(cp.eventListeners, resetButton, "click", function(e) { cp.createForm(cp.data); Webfm.stopEvent(e); });
  this.controls.appendChild(resetButton);
};

//Validate the length of input
Webfm.metadata.prototype.validateMetaInput = function (elInput) {
  var len, data, err_msg;

  len = Webfm.metadataHT.get(elInput.name).size;
  //Webfm.dbgObj.dbg("validateMetaInput", elInput.name);
  if(len < 256) {
    data = Webfm.trim(elInput.value);
    if(data.length > len) {
      // Append error msg to validation td
      err_msg = Webfm.ctn(Webfm.js_msg.lengtherr);
      elInput.parentNode.nextSibling.style.color = 'red';
      elInput.parentNode.nextSibling.appendChild(err_msg);
      setTimeout(function() { elInput.focus(); }, 10);
      return false;
    } else {
      // Remove any contents of validation td
      while(elInput.parentNode.nextSibling.hasChildNodes()) {
        elInput.parentNode.nextSibling.removeChild(elInput.parentNode.nextSibling.firstChild);
      }
    }
  }
  return true;
};

Webfm.metadata.prototype.submitMeta = function() {
  var url, inputs, arr, textareas, input_num, i, postObj;
  url = Webfm.ajaxUrl();
  inputs = [];
  arr = [];
  textareas = [];

  inputs = this.tbody.getElementsByTagName('input');
  textareas = this.tbody.getElementsByTagName('textarea');

  input_num = inputs.length;

  for(i = 0; i < input_num; i++) {
    if(!this.validateMetaInput(inputs[i])) {
      break;
    }
  }

  // All fields validated
  // TODO: Data format needs to be reworked (json?)
  if(i == input_num) {
    this.output = "";
    for(i = 0; i < input_num; i++) {
      this.output += encodeURIComponent(inputs[i].name) + ":" + encodeURIComponent(Webfm.trim(inputs[i].value)) + ",";
    }
    for(i = 0; i < textareas.length; i++) {
      this.output += encodeURIComponent(textareas[i].name) + ":" + encodeURIComponent(Webfm.trim(textareas[i].value)) + ",";
    }
    if(this.output.length) {
      Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
      //strip off final comma
      this.output = this.output.substring(0, this.output.length - 1);
      postObj = { action: encodeURIComponent("putmeta"), param0: encodeURIComponent(this.fid), param1: encodeURIComponent(this.output)};
      Webfm.HTTPPost(url, this.submitMetacallback, this, postObj);
    }
  } else {
    alert(Webfm.js_msg.fix_input);
  }
  return false;
};

Webfm.metadata.prototype.submitMetacallback = function (string, xmlhttp, obj) {
  var params, result, i, key, val;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    // Webfm.dbgObj.dbg('submitMetacallback: ', Webfm.dump(result));
    if(result.status) {
      //update data for reset button
      params = [];
      params = obj.output.split(',');
      for(i = 0; i < params.length; i++) {
        key = params[i].substring(0, params[i].indexOf(":"));
        val = params[i].substring(params[i].indexOf(":") + 1);
        obj.data[key] = val;
      }
    }
    obj.pane.headerMsg(result.data);
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

//Trim leading/trailing whitespace off string
Webfm.trim = function (str) {
  return str.replace(/^\s+|\s+$/g, '');
};

/*
 * Webfm.attach constructor
 * param is parentId from hook_form_alter
 */
Webfm.attach = function (parentId) {
  var wa, elTable, elTableBody, elTr, elTd;
  wa = this;
  this.id = parentId;
  this.attached = '';
  this.eventListeners = [];

  elTable = Webfm.ce('table');
  elTableBody = Webfm.ce('tbody');
  //attached file rows are appended to this div
  this.body = elTableBody;

  //Header
  elTr = Webfm.ce('tr');

  // icon column
  elTd = Webfm.ce('td');
  elTd.className = 'head';
  elTr.appendChild(elTd);

  // Sort dir/files column
  elTd = Webfm.ce('td');
  elTd.className = 'head';
  elTd.appendChild(Webfm.ctn(Webfm.js_msg.attachtitle));
  elTr.appendChild(elTd);

  // date/time column
  elTd = Webfm.ce('td');
  elTd.className = 'head';
  elTd.appendChild(Webfm.ctn(Webfm.js_msg.column2));
  elTr.appendChild(elTd);

  // file size column
  elTd = Webfm.ce('td');
  elTd.className = 'head';
  elTd.appendChild(Webfm.ctn(Webfm.js_msg.column3));
  elTr.appendChild(elTd);

  // owner column
  elTd = Webfm.ce('td');
  elTd.className = 'head';
  elTd.appendChild(Webfm.ctn(Webfm.js_msg.column4));
  elTr.appendChild(elTd);

  elTableBody.appendChild(elTr);
  elTable.appendChild(elTableBody);
  Webfm.$(parentId).appendChild(elTable);
};

//Turn on/off no attachments display as needed.
Webfm.attach.noAttachments = function (show) {
  if(show) {
    $('#webfm-attach').append( '<div id="webfm-no-attachments">' + Webfm.js_msg.noattachments + '</div>');
  } else {
    $('#webfm-no-attachments').remove();
  }
};

Webfm.attach.prototype.fetch = function() {
  var url, node_url, postObj, fids;

  url = Webfm.ajaxUrl();

  // action attribute of node-edit form contains the node number
  if(Webfm.$('node-form')) {
    node_url = Webfm.$('node-form').action;
  }
  if(Webfm.$('comment-form')) {
    node_url = Webfm.$('comment-form').action;
  }
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  postObj = { action: encodeURIComponent("attach"), param0: encodeURIComponent(node_url) };
  // If we are in a preview/validate, the fids are still stored in the form.
  // Pass them to webfm_ajax to reload them.
  fids = Webfm.$(Webfm.attachFormInput).value;
  if(fids.length !== 0) {
    postObj.param1 = encodeURIComponent(fids);
  }
  Webfm.HTTPPost(url, this.callback, this, postObj);
};

Webfm.attach.prototype.callback = function (string, xmlhttp, obj) {
  var result, elInput, attach_arr, i, filerow, j;

  Webfm.progressObj.hide();

  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    //   Webfm.dbgObj.dbg("attach.fetch:", Webfm.dump(result));
    if(result.status) {
      if(result.data.length) {
        Webfm.admin = result.admin;
        elInput = Webfm.$(Webfm.attachFormInput);

        attach_arr = [];
        attach_arr = Webfm.$(Webfm.attachFormInput).value.split(',');
        for(i = 0; i < result.data.length; i++) {
          filerow = new Webfm.filerow(obj.body, result.data[i], 'attach', '', true, Webfm.menuHT.get('det'), obj.eventListeners);
          // Don't add if it already exists.
          // Note that values are kept in the form for preview/failed validate.
          for(j = 0; j < attach_arr.length; j = j + 1) {
            if(result.data[i].id == attach_arr[j]) {
              break;
            }
          }
          if(j == attach_arr.length) {
            elInput.setAttribute('value', (elInput.getAttribute('value') ? elInput.getAttribute('value') + ',' : '') + result.data[i].id);
          }
        }
      } else {
        Webfm.attach.noAttachments(true);
      }
    } else {
      Webfm.alrtObj.msg(result.data);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

/**
 * Webfm.search constructor
 * 1st param is popup container obj
 * 2nd param is default startup width
 * 2nd param is default startup height
 */
Webfm.search = function (container, width, height) {
  var elDiv, elForm, elResults;

  elDiv = Webfm.ce('div');
  elDiv.setAttribute('id', 'webfm-search');

  elForm = Webfm.ce('form');
  elDiv.appendChild(elForm);

  elResults = Webfm.ce('div');
  elDiv.appendChild(elResults);

  this.obj = elDiv;
  this.container = container;
  this.form = elForm;
  this.results = elResults;
  this.width = width;
  this.height = height;
  this.iconDir = getWebfmIconDir();
  this.eventListeners = this.container.eventListenerArr;
};

Webfm.search.prototype.resetForm = function() {
  var form = this.form;
  while(form.hasChildNodes()) {
    form.removeChild(form.firstChild);
  }
};
Webfm.search.prototype.resetResults = function() {
  var results = this.results;
  while(results.hasChildNodes()) {
    results.removeChild(results.firstChild);
  }
};

Webfm.search.prototype.createForm = function (source) {
  var cp, pane, elInput, listener, searchButton;

  cp = this;
  this.source = source;
  //clear any metadata info
  this.resetForm();
  cp.resetResults();
  //create new pane to house this metadata object
  pane = new Webfm.pane(this.container, Webfm.js_msg.searchtitle, "webfm-searchPane", this.obj, this.width, this.height);
  //put search path in header
  pane.headerMsg(source);
  //create search fields
  elInput = Webfm.ce('input');
  elInput.setAttribute('type', 'textfield');
  elInput.setAttribute('size', '30');
  setTimeout(function() { elInput.focus(); }, 10);
  listener = Webfm.eventListenerAdd(this.eventListeners, elInput, "keydown", function(e) { if(Webfm.enter(e)) { cp.submit(elInput.value); elInput.blur(); Webfm.stopEvent(e); } });
  this.form.appendChild(elInput);

  searchButton = Webfm.ce('input');
  searchButton.setAttribute('type', 'button');
  searchButton.setAttribute('value', Webfm.js_msg.search);
  listener = Webfm.eventListenerAdd(this.eventListeners, searchButton, "click", function(e) { cp.submit(elInput.value); Webfm.stopEvent(e); });
  this.form.appendChild(searchButton);
  pane.show();
};

Webfm.search.prototype.submit = function (value) {
  var url, postObj;

  url = Webfm.ajaxUrl();
  Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
  postObj = { action: encodeURIComponent("search"), param0: encodeURIComponent(this.source), param1: encodeURIComponent(value) };
  Webfm.HTTPPost(url, this.callback, this, postObj);
};

Webfm.listenerfn_search_click_dir = function (cp) {
  var listenerfn = function(e) { cp.selectDir(e); Webfm.stopEvent(e); };
  return listenerfn;
};

Webfm.listenerfn_search_click = function (cp) {
  var listenerfn = function(e) { cp.selectFile(e); Webfm.stopEvent(e); };
  return listenerfn;
};


Webfm.search.prototype.callback = function (string, xmlhttp, cp) {
  var result, searchList, i, elLi, elImg, listener, elA, no_match;

  Webfm.progressObj.hide();
  if(xmlhttp.status == 200) {
    cp.resetResults();

    //build ul of search results
    result = Drupal.parseJson(string);
    if(result.files.length) {
      searchList = Webfm.ce('ul');
      for(i = (result.files.length - 1); i >= 0; i = i - 1) {
        elLi = Webfm.ce('li');

        elImg = Webfm.ce('img');
        elImg.setAttribute('src', cp.iconDir + '/d.gif');
        elImg.setAttribute('alt', Webfm.js_msg.u_dir);
        //title is path to directory
        elImg.setAttribute('title', result.files[i].p);
        listener = Webfm.eventListenerAdd(cp.eventListeners, elImg, "click",  Webfm.listenerfn_search_click_dir(cp));
        listener = Webfm.eventListenerAdd(cp.eventListeners, elImg, "mouseover", Webfm.listenerfn_mouseoverout_dir(cp, true));
        listener = Webfm.eventListenerAdd(cp.eventListeners, elImg, "mouseout", Webfm.listenerfn_mouseoverout_dir(cp, false));
        elLi.appendChild(elImg);

        elLi.appendChild(Webfm.ctn('  '));

        elA = Webfm.ce('a');
        elA.setAttribute('href', '#');
        if(result.files[i].id) {
          //first three letters of id must be 'sid' for selectFile
          //tooltip indicates if file is downloadable
          elA.setAttribute('id', 'sid' + result.files[i].id);
          elA.setAttribute('title', Webfm.js_msg.filedwld);
          listener = Webfm.eventListenerAdd(cp.eventListeners, elA, "click", Webfm.listenerfn_search_click(cp));
        } else {
          elA.setAttribute('title', Webfm.js_msg.nofiledwld);
        }
        elA.appendChild(Webfm.ctn(result.files[i].n));
        elLi.appendChild(elA);

        searchList.appendChild(elLi);
      }
      cp.results.appendChild(searchList);
    } else {
      no_match = Webfm.ctn(Webfm.js_msg.nomatch);
      cp.results.style.color = 'red';
      cp.results.appendChild(no_match);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

//IE does not understand 'this' inside event listener func
Webfm.search.prototype.hoverDir = function (event, state) {
  var el = event.target || window.event.srcElement;
  el.src = this.iconDir + (state ? '/open.gif' : '/d.gif');
};

Webfm.search.prototype.selectDir = function (event) {
  var el = event.target || window.event.srcElement;
  Webfm.selectDir(el.title);
};
Webfm.search.prototype.selectFile = function (event) {
  var el = event.target || window.event.srcElement;
  Webfm.selectFile(el.id.substring(3), el, true);
};

/*
 * debug constructor
 * 1st param is popup container obj
 * 2nd param is default startup width
 * 2nd param is default startup height
 */
Webfm.debug = function (container, width, height) {
  var dbgButton, cp, cacheCont, report, listener;
  dbgButton = '';

  //id from webfm_main()
  dbgButton = Webfm.$("webfm-debug-link");
  this.enable = dbgButton;
  if(dbgButton) {
    this.container = container;
    this.eventListeners = this.container.eventListenerArr;
    this.width = width;
    this.height = height;
    cp = this;

    //create cache popup
    cacheCont = new Webfm.popup("webfm-cacheCont");
    this.cacheCont = cacheCont;

    report = Webfm.ce('div');
    this.report = report;

    //attach popup creation to [debug] link
    listener = Webfm.eventListenerAdd(Webfm.eventListeners, dbgButton, "click", function() { cp.show(); });
  }
};

Webfm.debug.prototype.dbg = function (title, msg) {
  var elSpan, elBr;

  if(this.enable) {
    //put latest msg at top (less scrolling)
    elBr = Webfm.ce('br');
    this.report.insertBefore(elBr, this.report.firstChild);
    if(msg) {
      this.report.insertBefore(Webfm.ctn(msg), this.report.firstChild);
    }
    if(title) {
      elSpan = Webfm.ce('span');
      elSpan.className = 'g';
      elSpan.appendChild(Webfm.ctn(title));
      this.report.insertBefore(elSpan, this.report.firstChild);
    }
  }
};

Webfm.debug.prototype.clear = function() {
  if(this.enable) {
    Webfm.alrtObj.msg();
    while(this.report.hasChildNodes()) {
      this.report.removeChild(this.report.firstChild);
    }
    this.cacheCont.destroy();
  }
};

Webfm.debug.prototype.show = function() {
  var elDiv, pane, cp, elControls, elClear, listener, elCache, report;

  if(this.enable) {
    elDiv = Webfm.ce('div');
    elDiv.setAttribute('id', 'webfm-debug');
    this.obj = elDiv;

    //create new pane to house this metadata object
    pane = new Webfm.pane(this.container, Webfm.js_msg.debugtitle, "webfm-debugPane", this.obj, this.width, this.height);

    cp = this;
    elControls = Webfm.ce('div');
    this.controls = elControls;

    elClear = Webfm.ce('input');
    elClear.setAttribute('type', 'button');
    elClear.setAttribute('value', Webfm.js_msg.clear);
    elClear.className = "dbg-button";
    listener = Webfm.eventListenerAdd(this.eventListeners, elClear, "click", function() { cp.clear(); });
    this.controls.appendChild(elClear);

    elCache = Webfm.ce('input');
    elCache.setAttribute('type', 'button');
    elCache.setAttribute('value', Webfm.js_msg.cache);
    elCache.className = "dbg-button";
    listener = Webfm.eventListenerAdd(this.eventListeners, elCache, "click", function(e) { cp.showCache(); Webfm.stopEvent(e); });
    this.controls.appendChild(elCache);
    this.obj.appendChild(elControls);

    report = this.report;
    this.obj.appendChild(report);
  }
};

Webfm.debug.prototype.showCache = function() {
  var dump, pane;

  if(this.enable) {
    //create new pane to house this metadata object
    dump = Webfm.ctn(Webfm.dump(Webfm.dirListObj.cache.dump()));
    pane = new Webfm.pane(this.cacheCont, Webfm.js_msg.cachetitle, "webfm-cachePane", dump, this.width, this.height);
    pane.show();
  }
};

/**
 * Progress indicator
 */
Webfm.progress = function (parent, id) {
  var elSpan = Webfm.ce('span');

  this.id = id;
  this.flag = false;
  elSpan.setAttribute('id', this.id);
  parent.appendChild(elSpan);
};

Webfm.progress.prototype.hide = function() {
  if(this.flag) {
    this.flag = false;
    Webfm.clearNodeById(this.id);
  }
};

Webfm.progress.prototype.show = function (x, y) {
  var prog, elSpan;

  if(!this.flag) {
    this.flag = true;
    prog = Webfm.$(this.id);
    elSpan = Webfm.ce('span');
    elSpan.style.backgroundColor = y;
    elSpan.appendChild(Webfm.ctn(x));
    prog.appendChild(elSpan);
    prog.style.visibility = 'visible';
  }
};

/**
 * Alert indicator
 */
Webfm.alert = function (parent, id) {
  var elDiv;
  this.id = id;

  elDiv = Webfm.ce('div');
  this.node = elDiv;
  elDiv.setAttribute('id', id);
  parent.appendChild(elDiv);
};

Webfm.alert.prototype.msg = function (msg) {
  var elSpan;

  if(!msg) {
    Webfm.clearNodeById(this.id);
  } else {
    elSpan = Webfm.ce('span');
    elSpan.className = 'alertspan';
    elSpan.appendChild(Webfm.ctn(msg));
    this.node.appendChild(elSpan);
    this.lf();
  }
};

Webfm.alert.prototype.lf = function() {
  var elBr = Webfm.ce('br');
  this.node.appendChild(elBr);
};

/*
 * Display an array of strings alert
 */
Webfm.alert.prototype.str_arr = function (arr) {
  var i;

  if(typeof arr == 'function') {
    return;
  } else if(Webfm.isArray(arr)) {
    for(i = 0; i < arr.length; i++) {
      this.str_arr(arr[i]);
    }
  }

  if(typeof arr == 'string') {
    this.msg(arr);
  }
};

/**
 * Webfm.popup constructor
 */
Webfm.popup = function (Id) {
  var elDiv;
  this.id = Id;

  elDiv = Webfm.ce('div');
  elDiv.id = Id; //id for css
  elDiv.style.cssText = 'position:absolute;display:none;';
  document.body.appendChild(elDiv);
  this.obj = elDiv;

  //vars used for storing position info for contained object (pane)
  this.width = null;
  this.content_height = null;
  this.top = null;
  this.left = null;
  this.eventListenerArr = [];
};

Webfm.popup.prototype.getScrollY = function() {
  var scrY = 0;

  if(typeof window.pageYOffset == 'number') {
    scrY = window.pageYOffset;
  } else if(document.body && document.body.scrollTop) {
    scrY = document.body.scrollTop;
  } else if(document.documentElement && document.documentElement.scrollTop) {
    scrY = document.documentElement.scrollTop;
  }
  return scrY;
};
Webfm.popup.prototype.getObjectOffset = function (event, element, comp) {
  var objPos, mousePos;

  objPos = this.objPosition(element, comp);
  mousePos = Drupal.mousePosition(event);

  return {x: mousePos.x - objPos.x, y: mousePos.y - objPos.y};
};

Webfm.popup.prototype.objPosition = function (element, comp) {
  var curleft, curtop;
  curleft = 0;
  curtop = 0;

  if(element.offsetParent) {
    do {
      curleft += element.offsetLeft;
      curtop += element.offsetTop;
    } while(element = element.offsetParent); // jslint identifies this as an error - it is not!
  }

  // IE must compensate for relative positioning in css
  if(Webfm.browser.isIE && comp) {
    curleft += parseInt(getWebfmIEListOffset(), 10);
    if(comp == 'tree') {
      curleft += parseInt(getWebfmIETreeOffset(), 10);
    }
  }

  return { x: curleft, y: curtop };
};

Webfm.popup.prototype.destroy = function() {
  //cleanup event closures for this popup
  Webfm.eventUnregister(this.eventListenerArr);

  while(this.obj.hasChildNodes()) {
    this.obj.removeChild(this.obj.firstChild);
  }

  document.onmousemove = null;
  document.onmouseup = null;
  this.obj.style.display = 'none';
};
Webfm.popup.prototype.isEmpty = function() {
    return (!this.obj.hasChildNodes());
};

/**
 * Webfm.pane constructor
 * 1st param is popup container obj
 * 2nd param is title displayed in pane header
 * 3rd param is this obj id
 * 4th param is content appended to this obj content div
 * 5th param is default startup width
 * 6th param is default startup height
 */
Webfm.pane = function (popupCont, title, paneId, content, paneWidth, contentHeight) {
  var cp, body_scroll_top, body_height, body_scroll_left, body_width, iconDir, pane, header, elTitle, elMsg, elA, listener, elImg, contentContainer, footer, elResize;
  cp = this;
  this.popupCont = popupCont;

  body_scroll_top = this.popupCont.getScrollY();
  body_height = Webfm.browser.isIE ? document.documentElement.clientHeight : window.innerHeight;
  // locate pane in centre of screen only if drag container not already in use
  if((!popupCont.width) ||
     (!popupCont.content_height) ||
     (!popupCont.top) ||
     (!popupCont.left)) {
    body_scroll_left = Webfm.browser.isIE ? document.documentElement.scrollLeft : window.pageXOffset;
    body_width = Webfm.browser.isIE ? document.documentElement.clientWidth : window.innerWidth;

    this.popupCont.width = paneWidth;
    this.popupCont.content_height = contentHeight;
    this.popupCont.top = body_scroll_top + (body_height - contentHeight) / 2;
    this.popupCont.left = body_scroll_left + (body_width - paneWidth) / 2;
  }

  //Compensate pane position for vertical scroll that places it out of view
  if((body_scroll_top + body_height) < this.popupCont.top) {
    this.popupCont.top = body_scroll_top + (body_height - contentHeight) / 2;
  }
  if((body_scroll_top) > this.popupCont.top + this.popupCont.content_height) {
    this.popupCont.top = body_scroll_top + (body_height - contentHeight) / 2;
  }

  // Set top of drag popup and empty any contents
  this.popupCont.obj.style.top  = this.popupCont.top + "px";
  this.popupCont.obj.style.left = this.popupCont.left + "px";
  this.popupCont.destroy();

  // Pane container div
  iconDir = getWebfmIconDir();
  pane = Webfm.ce('div');
  this.pane = pane;
  pane.id = paneId;
  pane.className = "webfm-pane";
  pane.style.width = this.popupCont.width + "px";
  this.popupCont.obj.appendChild(this.pane);

  // pane header
  header = Webfm.ce('div');
  this.header = header;
  header.id = pane.id + '-header';
  header.className = "webfm-pane-header";

  elTitle = Webfm.ce('div');
  elTitle.appendChild(Webfm.ctn(title));
  elTitle.className = "webfm-pane-title";
  header.appendChild(elTitle);

  elMsg = Webfm.ce('div');
  this.msg = elMsg;
  elMsg.className = "webfm-pane-msg";
  header.appendChild(elMsg);
  cp = this;
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, header, "mousedown", function(e) { cp.dragStart(e, 1); });

  elA = Webfm.ce('a');
  elA.setAttribute('href', '#');
  elA.setAttribute('title', Webfm.js_msg.close);
  elA.className = "webfm-pane-close";

  elImg = Webfm.ce('img');
  elImg.setAttribute('src', iconDir + '/x.gif');
  elImg.setAttribute('alt', Webfm.js_msg.close);
  elA.appendChild(elImg);
  header.appendChild(elA);
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, elA, "click", function(e) { cp.popupCont.destroy(); Webfm.stopEvent(e); });
  pane.appendChild(header);

  // pane content
  contentContainer = Webfm.ce('div');
  this.content = contentContainer;
  contentContainer.id = pane.id + '-content';
  contentContainer.className = "webfm-pane-content";
  contentContainer.style.height = this.popupCont.content_height + "px";
  pane.appendChild(contentContainer);

  // pane footer
  footer = Webfm.ce('div');
  this.footer = footer;
  footer.className = "webfm-pane-footer";

  elResize = Webfm.ce('a');
  elResize.setAttribute('href', '#');
  elResize.setAttribute('title', Webfm.js_msg.resize);
  elResize.className = "webfm-pane-resize";
  elImg = Webfm.ce('img');
  elImg.setAttribute('src', iconDir + '/resize.gif');
  elImg.setAttribute('alt', Webfm.js_msg.resize);
  elResize.appendChild(elImg);
  footer.appendChild(elResize);
  listener = Webfm.eventListenerAdd(Webfm.eventListeners, elResize, "mousedown", function(e) { cp.dragStart(e, 0); });
  pane.appendChild(footer);

  if(content) {
    this.fill(content);
  }
};

Webfm.pane.prototype.dragStart = function (event, move) {
  var cp;
  cp = this;

  Webfm.dragging = true;
  event = event || window.event;

  // Hide content - mousing over visible iframe can cause problems
  this.content.style.visibility = "hidden";
  this.popupCont.obj.style.zIndex = Webfm.zindex + 1;
  if(move == 1) {
    //Offset of cursor position form top/left corner of drag object on mousedown
    this.offset = this.popupCont.getObjectOffset(event, this.header);
    document.onmousemove = function(e) { cp.drag(e); };
    document.onmouseup = function(e) { cp.dragEnd(e); };
    this.drag(event);
  } else {
    //Start position of cursor on mousedown
    this.initPos = Drupal.mousePosition(event);
    //Start width and height of pane content on mousedown
    this.width = parseInt(this.pane.offsetWidth, 10);
    this.height = parseInt(this.content.offsetHeight, 10);
    document.onmousemove = function(e) { cp.resize(e); };
    document.onmouseup = function(e) { cp.resizeEnd(e); };
    Webfm.scrollVal = this.popupCont.getScrollY();
    this.resize(event);
  }
};

Webfm.pane.prototype.drag = function (event) {
  var pos, x, y, scroll;

  event = event || window.event;
  pos = Drupal.mousePosition(event);
  x = pos.x - this.offset.x;
  y = pos.y - this.offset.y;
  scroll = this.popupCont.getScrollY();//Scroll page if near top or bottom edge.  Hardcoded values

  if(typeof window.innerHeight == 'number') {
    if(pos.y > (window.innerHeight + scroll - 35)) {
      window.scrollBy(0, 20);
    } else if(pos.y  - scroll < (25)) {
      window.scrollBy(0, -20);
    }
  } else if(document.documentElement && document.documentElement.clientHeight) {
    if(pos.y > (document.documentElement.clientHeight + scroll - 35)) {
      window.scrollBy(0, 20);
    } else if(pos.y  - scroll < (25)) {
      window.scrollBy(0, -20);
    }
  }

  // Move our drag container to wherever the mouse is (adjusted by mouseOffset)
  this.popupCont.obj.style.top  = y + 'px';
  this.popupCont.obj.style.left = x + 'px';

  // Prevent selection of textnodes
  Webfm.stopEvent(event);
};

Webfm.pane.prototype.resize = function (event) {
  var pos, x, y;

  event = event || window.event;

  // Calculate distance from start position
  pos = Drupal.mousePosition(event);
  x = this.width + (pos.x - this.initPos.x);
  y = this.height + (pos.y - this.initPos.y);

  // Adjust pane width and height css with min size constraint
  this.pane.style.width = Math.max(x, 100) + "px";
  this.content.style.height = Math.max(y, 100) + "px";

  // Prevent selection of textnodes
  Webfm.stopEvent(event);
};

Webfm.pane.prototype.dragEnd = function (event) {
  // Store popup container top/left position global vars
  this.popupCont.top  = parseInt(this.popupCont.obj.style.top, 10);
  this.popupCont.left = parseInt(this.popupCont.obj.style.left, 10);
  this.end(event);
};

Webfm.pane.prototype.resizeEnd = function (event) {
  // Store popup container width/height size global vars
  this.popupCont.width = parseInt(this.pane.style.width, 10);
  this.popupCont.content_height = parseInt(this.content.style.height, 10);
  this.end(event);
  // counter browser scrolling
  setTimeout(function() { window.scrollTo(0, Webfm.scrollVal); }, 1);
};

Webfm.pane.prototype.end = function (event) {
  this.content.style.visibility = "visible";
  Webfm.dragging = false;
  document.onmousemove = null;
  document.onmouseup = null;
  Webfm.stopEvent(event);
};

Webfm.pane.prototype.headerMsg = function (string) {
  while(this.msg.hasChildNodes()) {
    this.msg.removeChild(this.msg.firstChild);
  }
  this.msg.appendChild(Webfm.ctn(string));
};

Webfm.pane.prototype.fill = function (content) {
  if(content) {
    this.content.appendChild(content);
  }
  this.show();
};

Webfm.pane.prototype.clear = function() {
  while(this.content.hasChildNodes()) {
    this.content.removeChild(this.content.firstChild);
  }
  while(this.msg.hasChildNodes()) {
    this.msg.removeChild(this.content.firstChild);
  }
};

Webfm.pane.prototype.hide = function() {
  this.popupCont.obj.style.display = 'none';
};

Webfm.pane.prototype.show = function() {
  this.popupCont.obj.style.zIndex = Webfm.zindex + 1;
  this.popupCont.obj.style.display = 'block';
};

/**
 * Webfm.draggable constructor
 */
Webfm.draggable = function (popupCont, element, d_class) {
  this.dragCont = popupCont;
  this.element = element;
  this.curpath = element.title;
  this.isTree = d_class.substring(0, 4) == 'tree';
  this.isDir = (d_class == 'dirrow') || this.isTree;
  this.isAttach = d_class == 'attachrow';
  this.icondir = getWebfmIconDir();
  this.comp = this.isTree ? 'tree' : 'list';
};

Webfm.draggable.prototype.mouseButton = function (event) {
  var rightclick;

  event = event || window.event;

  // Determine mouse button
  rightclick = Webfm.rclick(event);
  if(!rightclick && event.altKey === false) {
    this.dragStart(event);
  }
};

Webfm.draggable.prototype.dragStart = function (event) {
  var cp;

  Webfm.dragging = true;
  // Destroy all contents in popup container.
  this.dragCont.destroy();

  cp = this;
  document.onmousemove = function(e) { cp.drag(e); };
  document.onmouseup = function(e) { cp.dragEnd(e); };

  // Make transparent
  this.element.style.opacity = 0.5;

  // Process
  this.drag(event);
};

Webfm.draggable.prototype.drag = function (event) {
  var cp, elDiv, dirListRows, dirListCont, k, class_names, droptarget, cont_pos, skip, droppath, curtemp, droptemp, children, dirTreeCont, j, pos, x, y, scroll, container, att_table_body, attachRows, prevNode, nextNode, curr, i, att_pos;

  cp = this;
  event = event || window.event;

  //Build Webfm.dropContainers array
  //The dragStart flag ensures that the following executes once only at the
  //beginning of a drag-drop
  if(!Webfm.dragStart) {
    Webfm.dragStart = true;

    //copy dragged element into drag container and make visible
    this.offset = this.dragCont.getObjectOffset(event, this.element, this.comp);
    if(Webfm.browser.isIE && !this.isTree) {
      /* IE cannot clone table rows */
      elDiv = Webfm.ce('div');
      elDiv.setAttribute('id', 'webfm-ieDD');
      elDiv.appendChild(this.element.getElementsByTagName('img')[0].cloneNode(false));
      elDiv.appendChild(this.element.getElementsByTagName('a')[0].firstChild.cloneNode(false));
      this.dragCont.obj.appendChild(elDiv);
    } else {
      this.dragCont.obj.appendChild(this.element.cloneNode(true));
    }
    this.dragCont.obj.style.display = 'block';
    this.dragCont.obj.style.zIndex = Webfm.zindex + 1;

    Webfm.dropContainers = [];

    // Build list drop container array
    if(!this.isAttach) {
      dirListRows = Webfm.dirListObj.obj.getElementsByTagName('tr');
      dirListCont = [];
      for(k = 0; k < dirListRows.length; k = k + 1) {
        if(dirListRows[k].className == 'dirrow') {
          dirListCont.push(dirListRows[k]);
        }
      }
      if(dirListCont.length) {
        for(i = 0; i < dirListCont.length; i++) {
          // DragDrop element is folder icon

          droptarget = dirListCont[i];
          cont_pos = this.dragCont.objPosition(droptarget, this.comp);
          skip = false;
          droppath = dirListCont[i].title;
          if(this.curpath == droppath) {
            continue;
          }
          if(this.isTree) {
            curtemp = [];
            curtemp = this.curpath.split('/');
            droptemp = [];
            droptemp = droppath.split('/');
            // Test if drop path is beneath the drag path
            for(j = 0; j < curtemp.length; j = j + 1) {
              if(curtemp[j] != droptemp[j]) {
                break;
              }
            }
            if(j == curtemp.length) {
              skip = true;
            } else {
              // Test if drop path is directly above drag path (already a subdir)
              for(j = 0; j < droptemp.length; j = j + 1) {
                if(curtemp[j] != droptemp[j]) {
                  break;
                }
              }
              if((j == droptemp.length) && (curtemp.length == j + 1)) {
                skip = true;
              }
            }
          }
          if(skip === false) {
            // Valid drop container
            container = { id: dirListCont[i].id, x: cont_pos.x, y: cont_pos.y, w: droptarget.offsetWidth, h: droptarget.offsetHeight };
            Webfm.dropContainers.push(container);
          }
        }
      }

      dirTreeCont = '';
      dirTreeCont = Webfm.$("webfm-tree");
      if(dirTreeCont) {
        //reuse var for container list
        dirTreeCont = Webfm.$("webfm-tree").getElementsByTagName('li');
        if(dirTreeCont.length) {
          // Build tree drop container array
          for(i = 0; i < dirTreeCont.length; i++) {
            // DragDrop element is folder icon
            droptarget = dirTreeCont[i].getElementsByTagName('div')[0];
            cont_pos = this.dragCont.objPosition(droptarget, this.comp);
            skip = false;

            if(this.isTree) {
              // Prevent a directory drop onto itself or its direct parent li (already a sub-directory)
              if((dirTreeCont[i] != this.element) && (dirTreeCont[i] != this.element.parentNode.parentNode)) {
                children = this.element.getElementsByTagName('li');
                // Prevent a directory drop into a sub-directory
                for(j = 0; j < children.length; j = j + 1) {
                  if(children[j] == dirTreeCont[i]) {
                    skip = true;
                  }
                }
              } else {
                skip = true;
              }
            } else {
              droppath = dirTreeCont[i].title;
              // A regex would be preferable here
              if(this.curpath != droppath) {
                curtemp = [];
                curtemp = this.curpath.split('/');
                droptemp = [];
                droptemp = droppath.split('/');
                // Test if drop path is beneath the drag path
                for(j = 0; j < curtemp.length; j = j + 1) {
                  if(curtemp[j] != droptemp[j]) {
                    break;
                  }
                }

                if(j == curtemp.length) {
                  skip = true;
                } else {
                  // Test if drop path is directly above drag path (already a subdir)
                  for(j = 0; j < droptemp.length; j = j + 1) {
                    if(curtemp[j] != droptemp[j]) {
                      break;
                    }
                  }
                  if((j == droptemp.length) && (curtemp.length == j + 1)) {
                    skip = true;
                  }
                }
              } else {
                skip = true;
              }
            }

            if(skip === false) {
              // Valid drop container - add to array of drop containers
              container = { id: dirTreeCont[i].id, x: cont_pos.x, y: cont_pos.y, w: droptarget.offsetWidth, h: droptarget.offsetHeight };
              Webfm.dropContainers.push(container);
            }
          }
        }
      }
    } else {
      // attachment container is attach table body
      droptarget = Webfm.attachObj.body;
      cont_pos = this.dragCont.objPosition(droptarget, this.comp);
      Webfm.attachContainer = { x: cont_pos.x, y: cont_pos.y, w: droptarget.offsetWidth, h: droptarget.offsetHeight };
    }
  }

  pos = Drupal.mousePosition(event);
  x = pos.x; //- this.offset.x;
  y = pos.y; // - this.offset.y;
  scroll = this.dragCont.getScrollY();//Scroll page if near top or bottom edge.  Hardcoded values

  if(typeof window.innerHeight == 'number') {
    if(pos.y > (window.innerHeight + scroll - 35)) {
      window.scrollBy(0, 20);
    } else if(pos.y  - scroll < (25)) {
      window.scrollBy(0, -20);
    }
  } else if(document.documentElement && document.documentElement.clientHeight) {
    if(pos.y > (document.documentElement.clientHeight + scroll - 35)) {
      window.scrollBy(0, 20);
    } else if(pos.y  - scroll < (25)) {
      window.scrollBy(0, -20);
    }
  }

  // move our drag container to wherever the mouse is (adjusted by mouseOffset)
  this.dragCont.obj.style.top  = y + 'px';
  this.dragCont.obj.style.left = x + 'px';

  if(!this.isAttach) {
    Webfm.activeDropCont = null;
    if(Webfm.dropContainers.length) {
      // Compare mouse position to every drop container
      for(i = 0; i < Webfm.dropContainers.length; i++) {
        if((Webfm.dropContainers[i].x < pos.x) &&
           (Webfm.dropContainers[i].y < pos.y) &&
           ((Webfm.dropContainers[i].w + Webfm.dropContainers[i].x) > pos.x) &&
           ((Webfm.dropContainers[i].h + Webfm.dropContainers[i].y) > pos.y)) {
          // Found a valid drop container - Highlight selection
          Webfm.activeDropCont = Webfm.$(Webfm.dropContainers[i].id);
          Webfm.$(Webfm.dropContainers[i].id + 'dd').src = this.icondir + '/open.gif';
          Webfm.$(Webfm.dropContainers[i].id).className += ' selected';
        } else {
          // De-highlight container
          Webfm.$(Webfm.dropContainers[i].id + 'dd').src = this.icondir + '/d.gif';
          class_names  = [];
          class_names = Webfm.$(Webfm.dropContainers[i].id).className.split(' ');
          Webfm.$(Webfm.dropContainers[i].id).className = class_names[0];
        }
      }
    }
  } else {
    // Ignore all movement outside of the attach table
    if((Webfm.attachContainer.x < pos.x) &&
       (Webfm.attachContainer.y < pos.y) &&
       ((Webfm.attachContainer.w + Webfm.attachContainer.x) > pos.x) &&
       ((Webfm.attachContainer.h + Webfm.attachContainer.y) > pos.y))
    {
      // In attach container
      att_table_body = Webfm.attachObj.body;
      attachRows = att_table_body.getElementsByTagName('TR');
      prevNode = '';
      nextNode = '';
      curr = false;
      // Start at 1 since first row is header
      for(i = 1; i < attachRows.length; i++) {
        if(this.element.id != attachRows[i].id) {
          att_pos = this.dragCont.objPosition(attachRows[i], this.comp);

          if((att_pos.y + (attachRows[i].offsetHeight / 2)) < pos.y) {
            if(curr === true) {
              prevNode = attachRows[i];
            }
          } else if((att_pos.y + (attachRows[i].offsetHeight / 2)) > pos.y) {
            if(curr === false) {
              nextNode = attachRows[i];
            }
          }
        } else {
          curr = true;
        }
      }
      if(prevNode) {
        att_table_body.insertBefore(prevNode, this.element);
      } else if(nextNode) {
        att_table_body.insertBefore(this.element, nextNode);
      }
    }
  }

  //prevent selection of textnodes
  Webfm.stopEvent(event);
};

Webfm.draggable.prototype.dragEnd = function (event) {
  var class_names, url, postObj, elInput, attachRows, i, fid;

  event = event || window.event;

  // Restore opacity
  this.element.style.opacity = 1.0;
  Webfm.dragging = false;
  Webfm.dragStart = false;
  this.dragCont.obj.style.display = 'none';
  Webfm.stopEvent(event);

  if(!this.isAttach) {
    // Move dragged object if a valid drop container
    if(Webfm.activeDropCont) {
      this.droppath = Webfm.activeDropCont.title;
      // De-highlight container
      Webfm.$(Webfm.activeDropCont.id + 'dd').src = this.icondir + '/d.gif';
      class_names = [];
      class_names = Webfm.activeDropCont.className.split(' ');
      Webfm.activeDropCont.className = class_names[0];
      url = Webfm.ajaxUrl();
      Webfm.progressObj.show(Webfm.js_msg.work,  "blue");
      postObj = { action: encodeURIComponent("move"), param0: encodeURIComponent(this.curpath), param1: encodeURIComponent(this.droppath) };
      Webfm.HTTPPost(url, this.callback, this, postObj);
      Webfm.activeDropCont = null;
    }
  } else {
    // Put the current order of attachments into the form in preparation for submit
    elInput = Webfm.$('edit-attachlist');
    attachRows = Webfm.attachObj.body.getElementsByTagName('tr');
    elInput.setAttribute('value', '');
    // Ignore 1st row (header)
    for(i = 1; i < attachRows.length; i++) {
      fid = attachRows[i].id.substring(3);
      elInput.setAttribute('value', (elInput.getAttribute('value') ? elInput.getAttribute('value') + ',':'') + fid);
    }
  }

  // Empty drag container + uncapture mouse.
  document.onmousemove = null;
  document.onmouseup = null;
  this.dragCont.destroy();
};

Webfm.draggable.prototype.callback = function (string, xmlhttp, cp) {
  var result;

  Webfm.progressObj.hide();
  Webfm.alrtObj.msg();
  if(xmlhttp.status == 200) {
    result = Drupal.parseJson(string);
    //Webfm.dbgObj.dbg("move result:", Webfm.dump(result));
    if(result.status) {
      //flush cache for target dir and source dir of object
      Webfm.dirListObj.cache.remove(cp.droppath);
      Webfm.dirListObj.cache.remove(cp.curpath.substring(0, cp.curpath.lastIndexOf("/")));
      //update tree if directory is moved
      if(cp.isDir) {
        Webfm.dirTreeObj.fetch(true);
      }
      if(!cp.isTree) {
        //listing draggable - update current listing by removing dropped item
        cp.element.parentNode.removeChild(cp.element);
      } else {
        //tree draggable - update target directory
        Webfm.dirListObj.fetch(cp.droppath);
      }
    }
    if(result.data) {
      Webfm.alrtObj.str_arr(result.data);
    } else {
      Webfm.alrtObj.msg(Webfm.js_msg.moveerr);
    }
  } else {
    Webfm.alrtObj.msg(Webfm.js_msg.ajaxerr);
  }
};

/**
 * Event Handler adapted from http://ajaxcookbook.org (Creative Commons Attribution 2.5)
 */
Webfm.eventListenerAdd = function (listener_arr, instance, eventName, listener) {
  var listenerFn, event;
  listenerFn = listener;

  if(instance.addEventListener) {
    instance.addEventListener(eventName, listenerFn, false);
  } else if(instance.attachEvent) {
    listenerFn = function() { listener(window.event); };
      instance.attachEvent("on" + eventName, listenerFn);
  } else {
    throw new Error("Event registration not supported");
  }
  event = {
    instance: instance,
    name: eventName,
    listener: listenerFn
  };
  listener_arr.push(event);

  return event;
};

Webfm.eventListenerRemove = function (event, listener_arr) {
  var i, instance;
  i = 0;
  instance = event.instance;

  if(instance.removeEventListener) {
    instance.removeEventListener(event.name, event.listener, false);
  } else if(instance.detachEvent) {
    instance.detachEvent("on" + event.name, event.listener);
  }

  for(i = 0; i < listener_arr.length; i++) {
    if(listener_arr[i] == event) {
      listener_arr.splice(i, 1);
      break;
    }
  }
};

//remove local event listeners
Webfm.eventUnregister = function (listener_arr) {
  while(listener_arr.length > 0) {
    Webfm.eventListenerRemove(listener_arr[0], listener_arr);
  }
  listener_arr = [];
};

//remove global events at window.onunload
Webfm.eventUnregisterWebfm = function() {
  while(Webfm.eventListeners.length > 0) {
    Webfm.eventListenerRemove(Webfm.eventListeners[0], Webfm.eventListeners);
  }
  Webfm.eventListeners = [];
};

/**
 * Helper Functions
 */
Webfm.$ = function (id) {
  return document.getElementById(id);
};

Webfm.ctn = function (textNodeContents) {
  var textNode = document.createTextNode(textNodeContents);
  return textNode;
};

Webfm.ce = function (elementName) {
  var element;
  elementName = elementName.toLowerCase();
  element = document.createElement(elementName);
  return element;
};

/**
 * Creates an HTTP POST request and sends the response to the callback function
 *
 * Note: passing null or undefined for 'object' makes the request fail in Opera 8.
 *       Pass an empty string instead.
 */
Webfm.HTTPPost = function (uri, callbackFunction, callbackParameter, object) {
  var xmlHttp, bAsync, toSend, i;
  bAsync = true;
  toSend = '';

  if(window.XMLHttpRequest) {
    // If IE7, Mozilla, Safari, etc: Use native object
    xmlHttp = new XMLHttpRequest();
  } else {
    if(window.ActiveXObject) {
      // ...otherwise, use the ActiveX control for IE5.x and IE6
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }

  if(!callbackFunction) {
    bAsync = false;
  }

  xmlHttp.open('POST', uri, bAsync);

  if(typeof object == 'object') {
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    for(i in object) {
      toSend += (toSend ? '&' : '') + i + '=' + encodeURIComponent(object[i]);
    }
  } else {
    toSend = object;
  }

  xmlHttp.send(toSend);

  if(bAsync) {
    xmlHttp.onreadystatechange = function() {
      if(xmlHttp.readyState == 4) {
        callbackFunction(Webfm.trim(xmlHttp.responseText), xmlHttp, callbackParameter);
      }
    };
    return xmlHttp;
  } else {
    return Webfm.trim(xmlHttp.responseText);
  }
};

/**
 * Prevents an event from propagating.
 */
Webfm.stopEvent = function (event) {
  event = event || window.event;
  if(event.preventDefault) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.returnValue = false;
    event.cancelBubble = true;
  }
};

//the getModUrl() is used by contrib modules for custom ajax
Webfm.ajaxUrl = function() {
  var path = getBaseUrl() + "/?q=";
  path += (typeof getModUrl == "undefined") ? "webfm_js" : getModUrl();
  return path;
};

//Empty all child nodes
Webfm.clearNodeById = function (elementId) {
  var node = Webfm.$(elementId);
  while(node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
};

//Sort methods
Webfm.sortByName = function (a, b) {
  var x, y;

  if(typeof a.ftitle != "undefined") {
    x = a.ftitle.toLowerCase();
  } else {
    x = a.n.toLowerCase();
  }

  if(typeof b.ftitle != "undefined") {
    y = b.ftitle.toLowerCase();
  } else {
    y = b.n.toLowerCase();
  }
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};
Webfm.sortBySize = function (a, b) {
  var x, y;

  x = parseInt(parseFloat(a.s), 10);
  y = parseInt(parseFloat(b.s), 10);
  return x - y;
};
Webfm.sortByModified = function (a, b) {
  var x, y;

  x = a.m;
  y = b.m;
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};
Webfm.sortByOwner = function (a, b) {
  var x, y;

  if(typeof a.funame != "undefined") {
    x = a.funame.toLowerCase();
  } else {
    x = a.un.toLowerCase();
  }

  if(typeof b.funame != "undefined") {
    y = b.funame.toLowerCase();
  } else {
    y = b.un.toLowerCase();
  }
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};
Webfm.sortByKey = function (a, b) {
  var x, y;

  x = a.toLowerCase();
  y = b.toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

//Build date stamp
Webfm.convertunixtime = function (unixtime) {
  var c_date, c_min, c_hours, c_day, c_mon, c_year, format;
  // unix date format doesn't have millisec component
  c_date = new Date(unixtime * 1000);

  c_min = c_date.getMinutes();
  c_hours = c_date.getHours();
  c_day = c_date.getDate();
  c_mon = c_date.getMonth() + 1;
  c_year = c_date.getFullYear();

  c_min = Webfm.doubleDigit(c_min);
  c_hours = Webfm.doubleDigit(c_hours);
  c_day = Webfm.doubleDigit(c_day);
  c_mon = Webfm.doubleDigit(c_mon);

  if(c_year > 1999) {
    c_year -= 2000;
  } else {
    c_year -= 1900;
  }
  c_year = Webfm.doubleDigit(c_year);

  // Get day/month order from db variable
  format = getWebfmDateFormat();
  if(format == 1) {
    return c_day + "/" + c_mon + "/" + c_year + " " + c_hours + ":" + c_min;
  } else {
    return c_mon + "/" + c_day + "/" + c_year + " " + c_hours + ":" + c_min;
  }
};

Webfm.doubleDigit = function (num) {
  return (num < 10) ? "0" + num : num;
};

Webfm.size = function (sz) {
  var size, units;

  size = sz;
  if(size < 1024) {
    units = " B";
  } else {
    size = parseInt(size >> 10, 10);
    if(size < 1024) {
      units = " KB";
    } else {
      size = parseInt(size >> 10, 10);
      if(size < 1024) {
        units = " MB";
      } else {
        size = parseInt(size >> 10, 10);
        if(size < 1024) {
          units = " GB";
        } else {
          size = parseInt(size >> 10, 10);
          units = " TB";
        }
      }
    }
  }
  return size + units;
};

Webfm.enter = function (event) {
  var code;

  event = event || window.event;
  if(event.keyCode) {
    code = event.keyCode;
  } else if(event.which) {
    code = event.which;
  }
  return (code == 13) ? true : false;
};

Webfm.rclick = function (event) {
  var rightclick;

  if(event.which) {
    rightclick = (event.which == 3);
  } else {
    if(event.button) {
      rightclick = (event.button == 2);
    }
  }
  return rightclick;
};

//Dump debug function
//return a string version of a thing, without name.
//calls recursive function to actually traverse content.
Webfm.dump = function (content, txt_arr) {
  if(txt_arr == 'undefined') {
    txt_arr = false;
  }
  return Webfm.dumpRecur(content, 0, true, txt_arr) + "\n";
};

//recursive function traverses content, returns string version of thing
//content: what to dump.
//indent: how far to indent.
//neednl: true if need newline, false if not
Webfm.dumpRecur = function (content, indent, neednl, txt_arr) {
  var out, inside, i;
  out = "";

  if(typeof content == 'function') {
    return 'function';
  } else if(Webfm.isArray(content)) {  // handle real arrays in brackets
    if(neednl) {
      out += "\n" + Webfm.dumpSpaces(indent);
    }
    if(!txt_arr) {
      out += "[ ";
    }

    inside = false;
    for(i = 0; i < content.length; i++) {
      if(inside) {
        out += " \n" + Webfm.dumpSpaces(indent + 1);
      } else {
        inside = true;
      }
      out += Webfm.dumpRecur(content[i], indent + 1, false, txt_arr);
    }
    out += "\n" + Webfm.dumpSpaces(indent);
    if(!txt_arr) {
      out += "]";
    }
  } else if(Webfm.isObject(content)) {   // handle objects by association
    if(neednl) {
      out += "\n" + Webfm.dumpSpaces(indent);
    }
    if(!txt_arr) {
      out += "{ ";
    }
    inside = false;
    for(i in content) {
      if(content.hasOwnProperty(i)) {
        if(inside) {
          out += " \n" + Webfm.dumpSpaces(indent + 1);
        } else {
          inside = true;
        }
        out += "'" + i + "':" + Webfm.dumpRecur(content[i], indent + 1, true, txt_arr);
      }
    }
    out += "\n" + Webfm.dumpSpaces(indent);
    if(!txt_arr) {
      out += "}";
    }
  } else if(typeof content == 'string') {
    out += "'" + content + "'";
  } else {
    out += content;
  }
  return out;
};

//print n groups of two spaces for indent
Webfm.dumpSpaces = function (n) {
  var out, i;
  out = '';
  for(i = 0; i < n; i++) {
    out += '  ';
  }
  return out;
};

Webfm.isArray = function (array) {
  return (array && array.constructor == Array);
};
Webfm.isObject = function (object) {
  return (object && object.constructor == Object);
};

//Unregister all global listener events
window.onunload = Webfm.eventUnregisterWebfm;

///////////////////////////////////////////////////////ADD IN LEGACY DRUPAL JS FUNCTIONS USED BY WEBFM////////////////////////////////////////////////
/**
 * Redirects a button's form submission to a hidden iframe and displays the result
 * in a given wrapper. The iframe should contain a call to
 * window.parent.iframeHandler() after submission.
 */
Drupal.redirectFormButton = function (uri, button, handler) {
  var action, target, response, iframe;

  // Trap the button
  button.onmouseover = button.onfocus = function() {
    button.onclick = function() {
      // Create target iframe
      Drupal.createIframe();

      // Prepare variables for use in anonymous function.
      button = this;
      action = button.form.action;
      target = button.form.target;

      // Redirect form submission to iframe
      this.form.action = uri;
      this.form.target = 'redirect-target';

      handler.onsubmit();

      // Set iframe handler for later
      window.iframeHandler = function() {
        iframe = $('#redirect-target').get(0);
        // Restore form submission
        button.form.action = action;
        button.form.target = target;

        // Get response from iframe body
        try {
          response = (iframe.contentWindow || iframe.contentDocument || iframe).document.body.innerHTML;
          // Firefox 1.0.x hack: Remove (corrupted) control characters
          response = response.replace(/[\f\n\r\t]/g, ' ');
          if(window.opera) {
            // Opera-hack: it returns innerHTML sanitized.
            response = response.replace(/&quot;/g, '"');
          }
        } catch (e) {
          response = null;
        }
        response = Drupal.parseJson(response);
        // Check response code
        if(response.status === 0) {
          handler.onerror(response.data);
          return;
        }
        handler.oncomplete(response.data);

        return true;

      };

      return true;
    };
  };
  button.onmouseout = button.onblur = function() {
    button.onclick = null;
  };
};

/**
 * Create an invisible iframe for form submissions.
 */
Drupal.createIframe = function() {
  var div, iframe;

  if($('#redirect-holder').size()) {
    return;
  }

  // Note: some browsers require the literal name/id attributes on the tag,
  // some want them set through JS. We do both.
  window.iframeHandler = function() {};

  div = document.createElement('div');
  div.id = 'redirect-holder';
  $(div).html('<iframe name="redirect-target" id="redirect-target" class="redirect" onload="window.iframeHandler();"></iframe>');
  iframe = div.firstChild;
  $(iframe).attr({
    name: 'redirect-target',
    id: 'redirect-target'
  });
  $(iframe).css({
    position: 'absolute',
    height: '1px',
    width: '1px',
    visibility: 'hidden'
  });
  $('body').append(div);
};

/**
 * Delete the invisible iframe
 */
Drupal.deleteIframe = function() {
  $('#redirect-holder').remove();
};

/**
 *  Returns the position of the mouse cursor based on the event object passed
 */
Drupal.mousePosition = function(e) {
  if(Webfm.browser.isIE)
  {
    return { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
  } else {
    return { x: e.pageX, y: e.pageY };
  }
};