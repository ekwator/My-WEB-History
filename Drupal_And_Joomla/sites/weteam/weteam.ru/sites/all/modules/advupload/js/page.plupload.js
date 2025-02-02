/**
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 * javascript for normal plupload initialization
 */
(function($) {
  Drupal = Drupal || {};
  Drupal.advupload = Drupal.advupload || {};
  Drupal.advupload.plupload_i18n = Drupal.advupload.plupload_i18n || {
    'Select files' : Drupal.t('Select files'),
    'Add files to the upload queue and click the start button.' : Drupal.t('Add files to the upload queue and click the start button.'),
    'Filename' : Drupal.t('Filename'),
    'Status' : Drupal.t('Status'),
    'Size' : Drupal.t('Size'),
    'Add files' : Drupal.t('Add files'),
    'Stop current upload' : Drupal.t('Stop current upload'),
    'Start upload' : Drupal.t('Start upload'),
    'Start uploading queue' : Drupal.t('Start uploading queue'),
    'Drag files here.' : Drupal.t('Drag files here.'),
    'Node title' : Drupal.t('Node title'),
    'Error: File too large: ' :  Drupal.t('Error: File too large: '),
    'Error: Invalid file extension: ' : Drupal.t("Error: Invalid file extension: "),
    'Unsupported usage of module' : Drupal.t('Unsupported usage of module'),
  };
  // multinode upload type strucrures
  Drupal.advupload.advupload_ready = false;
  Drupal.advupload.multinode = Drupal.advupload.multinode || {};
  Drupal.advupload.multinode.loaded_files_nids = new Array();
  Drupal.advupload.multinode.loaded_files_nodestructures = new Array();
  Drupal.advupload._whileremoving = false;
  // onenode structures we need
  Drupal.advupload.onenode = Drupal.advupload.onenode || {};
  // there is nothing for now - later must be object like 
  // {nid:12345, html : '<h2 ....', url: 'http://....'}
  Drupal.advupload.onenode.nodestruct = undefined;
  // this array will be extended via module_invoke_all('advupload_pages', $type, $uptype);
  // Drupal.settings.advupload.moduleformvalues = Drupal.advupload.moduleformvalues
  Drupal.advupload.multinodeMethods = {
    plupload_error : function(up, err) {
      var file = null;
      Drupal.advupload.multinodeMethods.makePluploaderStop(up, err.message, err.file);
    },
    makePluploaderStop : function(up, errormessage, file){
      var i = 0;
      up.stop();
      up.refresh();
      for (i in up.files) {
        if ( up.files[i].id == file.id ) {
          up.files[i].status = 1;
          $('#' +file.id).removeClass('plupload_done');
          $('#' +file.id).addClass('plupload_delete');
        }
      }
      $('#advupload-uploader span.plupload_upload_status').hide();
      $('#advupload-uploader div.plupload_buttons').show();
      $('#advupload-uploader a.plupload_button.plupload_add').addClass('plupload_disabled').click(function () {return false;} );
      $('#advupload-uploader a.plupload_button.plupload_start').removeClass('plupload_disabled');
      $('#advupload-uploader a.plupload_button.plupload_start').text(Drupal.t('Restart upload') );
      alert(errormessage + "\n" + Drupal.t("Also you can just press upload again button") );
    },
    runJsonNode : function(data){
      d = eval('(' + data + ')');
      if(typeof(d.result) != 'undefined') 
        Drupal.advupload.multinode.loaded_files_nodestructures[Drupal.advupload.multinode.loaded_files_nodestructures.length] = d.result;
    },
    ajaxLoadNodeDashBoard : function(nid, newtokenvalue){
      var url1 = Drupal.settings.advupload.plupload.node_json_url 
            + "?nid=" + nid
            + "&token=" + Drupal.settings.advupload.plupload.drupal_token_name
            + "&token_value=" + newtokenvalue;
      $.ajax({
        url: url1,
        success: Drupal.advupload.multinodeMethods.runJsonNode,
        async:false
      });
    },
    runOnComplete : function(up, was_error){
      if(Drupal.advupload.multinode.loaded_files_nodestructures.length){
        $('#advupload-uploader-input-values').hide();
        $('#advupload-uploader').hide(20);
        $('#advupload-messages').html(
          '<span class="advupload-success">' 
          + Drupal.t('Files were successfully uploaded') 
          + '</span>'
        );
        $('#advupload-uploader-additional-own').append('<h3>' + Drupal.t('Nodes were created:') + '</h3>');
      }
      for(var i in Drupal.advupload.multinode.loaded_files_nodestructures){
        $('#advupload-uploader-additional-own').append(Drupal.advupload.multinode.loaded_files_nodestructures[i].html);
      }
      if(Drupal.advupload.multinode.loaded_files_nodestructures.length == 1){
        $(location).attr('href', Drupal.advupload.multinode.loaded_files_nodestructures[0].url);
      }
    },
    // here go methods intended for plupload multiform - they will be with plupload_ prefix
    plupload_FilesAdded : function(up, files){
      if(Drupal.advupload._whileremoving) return;
      if(Drupal.settings.advupload.drupal_max_total_upload_size){
        var size_sum = 0;
        for(var i in up.files) if(!up.files[i].loaded) size_sum += up.files[i].size;
        if(size_sum > Drupal.settings.advupload.drupal_max_total_upload_size){
          Drupal.advupload._whileremoving = true;
          while(
            (size_sum > Drupal.settings.advupload.drupal_max_total_upload_size)
            && (i >= 0)
          ) {
            size_sum = 0;
            for(var j in up.files) if(!up.files[j].loaded) size_sum += up.files[j].size;
            up.removeFile(up.files[i] );
            i --;
          }
          Drupal.advupload._whileremoving = false;
          alert(
            Drupal.t('Can not add files with total size of files is more than maximum  total upload size') 
            + "\n"
            + Drupal.t('That\'s why some files were removed from the end of the form')
          );
        }
      }
    },
    plupload_UploadFile : function(up, file) {
      var arr;
      arr = {file_size : file.size};
      $.extend(
        $('#advupload-uploader').advupload_pluploadQueue().settings.multipart_params,
        arr
      );
      delete arr;
      if(Drupal.settings.advupload.plupload.uploadtype == 'multinode')
      if($('#' + file.id + ' input.node-title').length){
        var str = $('#' + file.id + ' input.node-title').val();
        arr = {drupal_node_title :  str};
        $.extend(
          $('#advupload-uploader').advupload_pluploadQueue().settings.multipart_params,
          arr
        );
        delete arr;
        $('#' + file.id + ' input.node-title').attr('disabled', 'disabled');
      }
      
      // this fields will be necessary to both multi- and  one node upload types
      var fields = $('#advupload-uploader-input-values input'); 
      if(fields.length > 0){
        for(var i = 0; i <fields.length; i ++ ){
          if( (typeof(fields[i].name) != 'undefined')  && (typeof(fields[i].value) != 'undefined') ){
            arr[fields[i].name] = fields[i].value;
          }
        }
        $.extend($('#advupload-uploader').advupload_pluploadQueue().settings.multipart_params, arr);
      }
      // when upload started user cannot write there
      $('#advupload-uploader-input-values input').attr('disabled', 'disabled');
      delete arr;
    },
    plupload_FileUploaded : function(up, file, r) {
      var response = undefined;
      if ( (typeof(r) == 'object') && (typeof(r.response) == 'string') ) {
        try{
          response = Drupal.parseJson(r.response);
        } catch(e) {
        }
      }
      if ( typeof(response.error) == 'object' ) if ( response.error.code >= 800) {
        file.status = plupload.FAILED;
        alert(Drupal.t('Error uploading file ') + file.name + '. ' + Drupal.t('Server response: ') + response.error.message);
      }
      if ( (typeof(response.result) != 'undefined') && (response.result == 'success') ) {
        Drupal.advupload.multinode.loaded_files_nids[Drupal.advupload.multinode.loaded_files_nids.length] = response.data.nid;
        Drupal.advupload.multinodeMethods.ajaxLoadNodeDashBoard(response.data.nid, response.data.newtokenvalue);
      } else {
        Drupal.advupload.multinodeMethods.makePluploaderStop(
          up,
          Drupal.t(
            'There was wrong response from the server. That\'s why some files cannot be uploaded. Refresh page and try again or contact site administrator'
          ),
          file
        );
      }
      if(up.total.uploaded == up.files.length){
        // add cleanup. links to added nodes, etc
        Drupal.advupload.multinodeMethods.runOnComplete();
      }
    },
    plupload_ChunkUploaded : function(up, file, r){
      var response = undefined;
      if( (typeof(r) == 'object') && (typeof(r.response) == 'string') ) {
        try {
          response = Drupal.parseJson(r.response);
        } catch (e) {
        }
      }
      if(typeof(response) != 'undefined'){
        var code = 0;
        if(typeof(response.error) == 'object'){
          code = response.error.code;
          if(code < 800){ // blocking errors, e.g/ system errors/hacks
            response.error.file = file;
            // !!! later make more pleasant messages
            var errmessage = Drupal.t(
              'There was wrong response from the server. That\'s why some files cannot be uploaded. Refresh page and try again or contact site administrator.'
            );
            if(typeof(response.error.message) != 'undefined') 
              errmessage = errmessage + Drupal.t(' Additional information from server: ') + response.error.message + ' ';
            errmessage = errmessage + Drupal.t('Error occured while uploading following file: ') + file.name;
            Drupal.advupload.multinodeMethods.makePluploaderStop(up, errmessage, file);
          }
        }else{
          // NORMAL PROCESSING - NOTHING HERE - GO TO QUEUE CHANGE
        }
        delete response;
      }else Drupal.advupload.multinodeMethods.makePluploaderStop(
        up,
        Drupal.t(
          'There was wrong response from the server. That\'s why some files cannot be uploaded. Refresh page and try again or contact site administrator'
        ),
        file
      );
    },
  }
  // all the same event methods as in previous file -  as for plupload library API
  Drupal.advupload.onenodeMethods = Drupal.advupload.onenodeMethods || {
   runOnComplete : function(up, was_error){
      if(Drupal.advupload.multinode.loaded_files_nodestructures.length){
        $('#advupload-uploader-input-values').hide();
        $('#advupload-uploader').hide(20);
        $('#advupload-messages').html(
          '<span class="advupload-success">' 
          + Drupal.t('Files were successfully uploaded') 
          + '</span>'
        );
        $('#advupload-uploader-additional-own').append('<h3>' + Drupal.t('Node was created:') + '</h3>');
      }
      for(var i in Drupal.advupload.multinode.loaded_files_nodestructures){
        $('#advupload-uploader-additional-own').append(Drupal.advupload.onenode.nodestruct.html);
      }
      // go to that new node 
      $(location).attr('href', Drupal.advupload.onenode.nodestruct.url);
    },
    // arguments already in Drupal.advupload.onenode.nodestruct - values saving there too
    runJsonNode : function(data){
      d = eval('(' + data + ')');
      if(typeof(d.result) != 'undefined') {
        $.extend(Drupal.advupload.onenode.nodestruct, d.result);
        // we have values to extend plupload settings now.
        var arr = {
          advupload_nid : Drupal.advupload.onenode.nodestruct.nid,
          advupload_nid_token : Drupal.advupload.onenode.nodestruct.token,
          advupload_nid_token_value : Drupal.advupload.onenode.nodestruct.newtokenvalue
        }
        $.extend($('#advupload-uploader').advupload_pluploadQueue().settings.multipart_params, arr);
        delete arr;
      }
    },
    ajaxLoadNodeDashBoard : function(){
      var url1 = Drupal.settings.advupload.plupload.node_json_url 
            + "?nid=" + Drupal.advupload.onenode.nodestruct.nid
            + "&token=" + Drupal.settings.advupload.plupload.drupal_token_name
            + "&token_value=" + Drupal.advupload.onenode.nodestruct.newtokenvalue;
      $.ajax({
        url: url1,
        success: Drupal.advupload.onenodeMethods.runJsonNode,
        async:false
      });
    },
    // some calls are the very same as for multinode mechanism
    plupload_UploadFile : function(up, file) { 
      // all there is too similar, baby
      Drupal.advupload.multinodeMethods.plupload_UploadFile(up, file);
      if(typeof(Drupal.advupload.onenode.nodestruct) != 'undefined'){
        // add parameters to the next call
        var arr = {
          advupload_nid : Drupal.advupload.onenode.nodestruct.nid,
          advupload_nid_token : Drupal.advupload.onenode.nodestruct.token,
          advupload_nid_token_value : Drupal.advupload.onenode.nodestruct.newtokenvalue
        }
        $.extend($('#advupload-uploader').advupload_pluploadQueue().settings.multipart_params, arr);
        delete arr;
      }
    },
    plupload_error :  Drupal.advupload.multinodeMethods.plupload_error,
    plupload_ChunkUploaded : Drupal.advupload.multinodeMethods.plupload_ChunkUploaded,
    plupload_FilesAdded : Drupal.advupload.multinodeMethods.plupload_FilesAdded,
    plupload_FileUploaded : function(up, file, r) {
      var response;
      if( (typeof(r) == 'object') && (typeof(r.response) == 'string') ) response = eval('(' + r.response + ')');
      if( typeof(response.error) == 'object' ) if ( response.error.code >= 800){
        file.status = plupload.FAILED;
        alert(Drupal.t('Error uploading file ') + file.name + '. ' + Drupal.t('Server response: ') + response.error.message);
      }
      if( 
        (typeof(response.result) != 'undefined') 
        && (response.result == 'success') 
        && (typeof(Drupal.advupload.onenode.nodestruct) == 'undefined')
      ){
        Drupal.advupload.onenode.nodestruct = {
          nid : response.data.nid, 
          token : Drupal.settings.advupload.plupload.drupal_token_name,
          newtokenvalue : response.data.newtokenvalue,
        };
        Drupal.advupload.onenodeMethods.ajaxLoadNodeDashBoard();
      }
      if( (typeof(response) == 'undefined') ) Drupal.advupload.multinodeMethods.makePluploaderStop(
        up,
        Drupal.t(
          'There was wrong response from the server. That\'s why some files cannot be uploaded. Refresh page and try again or contact site administrator'
        ),
        file
      );
      if(up.total.uploaded == up.files.length){
        // add cleanup. links to added nodes, etc
        Drupal.advupload.onenodeMethods.runOnComplete();
      }
    },
  }
  Drupal.behaviors  = Drupal.behaviors || {};
  Drupal.behaviors.advupload = function(context){
    plupload.addI18n(Drupal.advupload.plupload_i18n);
    $('#advupload-uploader').advupload_pluploadQueue({ 
      // main settings we can preconfigure - see http://plupload.com/documentation.php
      runtimes : Drupal.settings.advupload.plupload.runtimes,
      url : Drupal.settings.advupload.plupload.url,
      max_file_size : Drupal.settings.advupload.plupload.max_filesize_per_file 
        // that's if fucking awful - we will limit that to 2GB
        //(cause PHP+drupal API anyway do not work with larger sizes on i386
        ? Drupal.settings.advupload.plupload.max_filesize_per_file : 2147483648,
      chunk_size : Drupal.settings.advupload.plupload.chunk_size,
      filters : Drupal.settings.advupload.plupload.filters,
      flash_swf_url : Drupal.settings.advupload.plupload.flash_swf_url,
      silverlight_xap_url : Drupal.settings.advupload.plupload.silverlight_xap_url,
      // other settings - interface lulz
      multipart : true,
      multipart_params : {
        token_name : Drupal.settings.advupload.plupload.drupal_token_name,
        token_value : Drupal.settings.advupload.plupload.drupal_token_value,
      },
      drupal_max_total_upload_size: Drupal.settings.advupload.drupal_max_total_upload_size
    });
    var methodobject; // object which contains standard plupload_* event methods 
    
    if(Drupal.settings.advupload.plupload.uploadtype == 'multinode') methodobject = Drupal.advupload.multinodeMethods;
    else if(Drupal.settings.advupload.plupload.uploadtype == 'onenode') methodobject = Drupal.advupload.onenodeMethods;
    if(Drupal.settings.advupload.plupload.uploadtype == 'onenode'){
      $('#advupload-uploader-input-values-own').append('<h2 class="title">' + Drupal.t('Node values to upload files') + '</h2>');
      $('#advupload-uploader-input-values-own').append(
        '<dl class="advupload-values"><dt>' + Drupal.t('Node title') + 
        '</dt><dd><input type="text" class="node-title" id="node-title" name="drupal_node_title" value="" /></dd></dl>'
      );
    }
    var actionsobject = (Drupal.settings.advupload.plupload.uploadtype == 'multinode') ?
      Drupal.advupload.multinodeMethods : Drupal.advupload.onenodeMethods;
    var up = $('#advupload-uploader').advupload_pluploadQueue();
    up.bind('FilesAdded', actionsobject.plupload_FilesAdded);
    up.bind('UploadFile', actionsobject.plupload_UploadFile);
    up.bind('FileUploaded', actionsobject.plupload_FileUploaded);
    up.bind('ChunkUploaded', actionsobject.plupload_ChunkUploaded);
    up.bind('Error', actionsobject.plupload_error);
    if( 
      (typeof(Drupal.settings.advupload.plupload.filters[0] ) == 'undefined')
      || (Drupal.settings.advupload.plupload.filters[0].extensions == '')
    ) {
      alert(Drupal.t("Please set up allowed extensionf for used filefield correctly or tell about that error to your site administator,\n cause file upload will not work correctly") );
    }
    Drupal.advupload.advupload_ready = true;
  };
}) (jQuery);
