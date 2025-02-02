function disknodeCallback(in_target, in_maxfiles, in_fburl) {
  this.target = in_target;
  if (in_maxfiles == 0) {
  	in_maxfiles = 1;
  }
  this.maxfiles = in_maxfiles;
  this.filebrowserUrl = in_fburl;
  this.lastValue = "";
};

disknodeCallback.prototype.add = function(val) {
  if (this.target) {
    this.lastValue = val;
    if (this.maxfiles != 1) {
      // find duplicates and max
      var curlist = this.target.value.split('\n');
      for (i = 0; i < curlist.length; i++) {
        // duplicate
        curlist[i] = curlist[i].replace( /(^\s+)/g, "" ); // trim leading
        curlist[i] = curlist[i].replace( /(\s+$)/g, "" ); // trim trailing
        if (curlist[i] == "") { // empty line
          curlist.splice(i, 1);
          i--;
          continue;
        }
        if (curlist[i] == val) return true;
      }
      curlist[i] = val;
      this.target.value = curlist.join('\n');
    }
    else {
      this.target.value = val;
    }
    return true;
  }
  return false;
};

disknodeCallback.prototype.getLastValue = function() {
  return this.lastValue;
}

disknodeCallback.prototype.openWindow = function() {
  if (this.filebrowser && !this.filebrowser.closed) {
    this.filebrowser.focus();
    return;
  }
  this.filebrowser = window.open(this.filebrowserUrl+'&selection='+disknodeFiles.getLastValue(), 'filebrowser', 'width=640, height=640, resizable=yes, scrollbars=yes');
}