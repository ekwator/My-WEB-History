/**
 * Submodule for advanced upload pages, to add node information form 
 * with textarea for short body description text and select form components for current 
 * node taxonomy tags clicking set info button
 * Javascript to allow edit node info
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 */
(function($) {
  Drupal = Drupal || {};
  /*
   * Modal frame definition
   */
  $.fn.advupload_nodeinfo_modalframe = function(options) {
    var defaults = {  
      animation: 'fadeAndPop', 
      animationspeed: 300,
      closeonbackgroundclick: true,
      dismissmodalclass: 'close-modal',
    };
    var options = $.extend({}, defaults, options);
    return this.each(function() {
      var modal = $(this),
      topMeasure  = - Math.floor(modal.height() / 2.5),
      topOffset = modal.height() + topMeasure,
      locked = false,
      modalBG = $('.advupload-nodeinfo-modal-bg');
      if(modalBG.length == 0) {
        modalBG = $('<div class="advupload-nodeinfo-modal-bg" />').insertAfter(modal);
      }
      modal.bind('advupload-nodeinfo-modal:open', function () {
        modalBG.unbind('click.modalEvent');
        modalBG.css('height', $('body').height() );
        $('.' + options.dismissmodalclass).unbind('click.modalEvent');
        if(!locked) {
          lockModal();
          if(options.animation == "fadeAndPop") {
            modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
            modalBG.fadeIn(options.animationspeed/2);
            modal.animate({
              "top": $(document).scrollTop()+topMeasure + 'px',
              "opacity" : 1
            }, options.animationspeed,unlockModal());					
          }
          if(options.animation == "fade") {
            modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
            modalBG.fadeIn(options.animationspeed/2);
            modal.animate({
              "opacity" : 1
            }, options.animationspeed,unlockModal());					
          } 
          if(options.animation == "none") {
            modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
            modalBG.css({"display":"block"});	
            unlockModal();
          }
        }
        modal.unbind('advupload-nodeinfo-modal:open');
      }); 	
      modal.bind('advupload-nodeinfo-modal:close', function () {
        if(!locked) {
          lockModal();
          if(options.animation == "fadeAndPop") {
            modalBG.fadeOut(options.animationspeed);
            modalBG.css({'display' : 'none'});
            modal.animate(
              {
                "top":  $(document).scrollTop()-topOffset + 'px',
                "opacity" : 0
              }, 
              options.animationspeed/2,
              function() {
                modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
                unlockModal();
              }
            );
          }  	
          if(options.animation == "fade") {
            modalBG.fadeOut(options.animationspeed);
            modalBG.css({'display' : 'none'});
            modal.animate(
              {
                "opacity" : 0
              }, 
              options.animationspeed, 
              function() {
                modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
                unlockModal();
              }
            );			
          }  	
          if(options.animation == "none") {
            modal.css({'visibility' : 'hidden', 'top' : topMeasure});
            modalBG.css({'display' : 'none'});	
          }		
        }
        modal.unbind('advupload-nodeinfo-modal:close');
      });
      modal.trigger('advupload-nodeinfo-modal:open')

      var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
        modal.trigger('advupload-nodeinfo-modal:close')
      });

      if(options.closeonbackgroundclick) {
        modalBG.css({"cursor":"pointer"})
        modalBG.bind('click.modalEvent', function () {
          modal.trigger('advupload-nodeinfo-modal:close')
        });
      }
      
      $(window).keyup(function(e) {
        if(e.which===27){ 
          modal.trigger('advupload-nodeinfo-modal:close'); 
        } // 27 is the keycode for the Escape key
      });
      function unlockModal() { 
        locked = false;
      }
      function lockModal() {
        locked = true;
      }
    });
  }
  /*
   * End of modal frame definition
   */
  
  /*
   * Main object with set of functions for work
   */
  Drupal.advupload_nodeinfo = {
    /*
     * Close modal frame
     */
    ModalFrameClose : function() {
      $('#advupload-nodeinfo-modal').trigger('advupload-nodeinfo-modal:close');
    },
    /*
     * Pull data for given file back to modal window if exists
     */
    ModalFramePullData : function(fileid) {
      var hiddenblockid = '#advupload-nodeinfo-file-' + fileid;
      $('#advupload_nodeinfo_title_input').val($('#node-title-for-' + fileid).val() );
      $(hiddenblockid + ' input').each(function() {
        var fileid = $('#advupload-nodeinfo-modal').attr('fileid');
        var newid = this.id.replace('-' + fileid, ''); 
        if(newid == 'advupload_nodeinfo_title_input') {
        } else{
          $('#' + newid).val($(this).val() );
        }
      });
    },
    /*
     * Fires on submit click in the modal frame
     */
    ModalFrameSubmitClick : function() {
      var fileid = $('#advupload-nodeinfo-modal').attr('fileid');
      var hiddenblockid = '#advupload-nodeinfo-file-' + fileid;
      $(hiddenblockid).empty();
      $('#advupload-nodeinfo-modal input, #advupload_nodeinfo_body_input, #advupload-nodeinfo-modal select').each(
        function(i) {
          var fileid = $('#advupload-nodeinfo-modal').attr('fileid');
          var hiddenblockid = '#advupload-nodeinfo-file-' + fileid;
          var newid = this.id + '-' + fileid;
          $(hiddenblockid).append(
            '<input id="' + newid + '" + name="' 
            + newid + '-button" type="hidden" value="" >'
          );
          $('#' + newid).val($(this).val() );
          if(this.id == 'advupload_nodeinfo_title_input') {
            $('#node-title-for-' + fileid).val($(this).val()  );
          }
        }
      );
      $('#advupload-nodeinfo-modal').removeAttr('fileid');
      Drupal.advupload_nodeinfo.ModalFrameClose();
      return false;
    },
    /*
     * Clean all inputs for work
     */
    ModalFrameCleanup : function() {
      $('#advupload-nodeinfo-modal input').val('').removeAttr('disabled');
      $('#advupload_nodeinfo_body_input').val('').removeAttr('disabled');
      $('#advupload-nodeinfo-modal select option').removeAttr('selected').removeAttr('disabled');
      $('#advupload_nodeinfo_submit').val(Drupal.t('Set values') );
      $('#advupload_nodeinfo_submit').unbind('click');
    },
    /*
     * Set different events for the modal frame
     */
    ModalFrameEventSet : function() {
      $('#advupload_nodeinfo_submit').click(Drupal.advupload_nodeinfo.ModalFrameSubmitClick);
    },
    AddInfoClick : function() {
      var fileid = this.id.replace('advupload-nodeinfo-', '');
      $('#advupload-nodeinfo-modal').attr('fileid', fileid);
      // initialize it's inputs if there was info for file already entered
      $('#advupload-nodeinfo-modal').advupload_nodeinfo_modalframe();
      Drupal.advupload_nodeinfo.ModalFrameCleanup();
      Drupal.advupload_nodeinfo.ModalFramePullData(fileid);
      Drupal.advupload_nodeinfo.ModalFrameEventSet();
      return false;
    },
    
    buttonPreventClick : function() {
      return false;
    },
    
    MainFormUnbindEvents : function() {
      $('#advupload-uploader input.advupload-nodeinfo-button').unbind(
        'click',
        Drupal.advupload_nodeinfo.AddInfoClick
      );
      $('#advupload-uploader input.advupload-nodeinfo-button').click(
        Drupal.advupload_nodeinfo.buttonPreventClick
      );
    },
    
    MainFormBindEvents : function() {
      $('#advupload-uploader input.advupload-nodeinfo-button').click(
        Drupal.advupload_nodeinfo.AddInfoClick
      );
    },
    /*
     * Fires when we're going upload file
     */
    uploader_UploadFile : function(up, file) {
      var fileid = file.id;
      var hiddenblockid = '#advupload-nodeinfo-file-' + fileid;
      var inputs = $(hiddenblockid + ' input').get();
      if(inputs.length > 0) {
        var additions = new Array();
        for ( var i in inputs ) {
          var id = inputs[i].id.replace('-' + fileid, '');
          var newid = 'node_' + id;
          additions[newid] = inputs[i].value;
        }
        $.extend(up.settings.multipart_params, additions);
      } else {
        var reg = /^node_advupload_nodeinfo/i;
        for ( var i in up.settings.multipart_params ) {
          var str = '' + i;
          if (str.match(reg) ) {
            delete up.settings.multipart_params[i];
          }
        }
      }
    },
    /*
     * When file added and rendered in list we add button to additional components
     */
    refresh_buttons_in_list : function(up) {
      Drupal.advupload_nodeinfo.MainFormUnbindEvents();
      for (i in up.files ){
        if( $('#advupload-nodeinfo-' + up.files[i].id).length == 0) {
          $('#advupload-uploader #' + up.files[i].id + ' div.plupload_additional_values').prepend(
            '<input type="button" id="advupload-nodeinfo-' 
            + up.files[i].id +'" rel="' + up.files[i].id 
            + '" name="advupload-nodeinfo-button-' + up.files[i].id
            + '" class="advupload-nodeinfo-button" value="" >'
            + '<div class="advupload-nodeinfo-hidden-params"></div>'
          );
          $('#advupload-nodeinfo-' + up.files[i].id).val(Drupal.t('Add node info') );
        }
      }
      Drupal.advupload_nodeinfo.MainFormBindEvents();
    },
    uploader_QueueChanged : function(up) {
      var items = $('#advupload-nodeinfo-hiddens div').get();
      // check files were deleted
      for(var key in items) {
        var fileid = items[key].id.replace('advupload-nodeinfo-file-', '');
        var exists = false;
        for(var key1 in up.files) {
          exists = exists || (up.files[key1].id == items[key] );
        }
        if(!exists) $(items[key]).remove();
      }
      // check items need to add
      for(var key in up.files) {
        if($('#advupload-nodeinfo-file-' + up.files[key].id).length == 0) {
          $('#advupload-nodeinfo-hiddens').append(
            '<div id="advupload-nodeinfo-file-' + up.files[key].id
              + '"></div>'
          );
        }
      }
      Drupal.advupload_nodeinfo.refresh_buttons_in_list(up);
    },
    uploader_StateChanged: function(up) {
      Drupal.advupload_nodeinfo.refresh_buttons_in_list(up);
    },
    uploader_Refresh : function(up) {
      Drupal.advupload_nodeinfo.refresh_buttons_in_list(up);
    },
    /*
     * Waits for uploader ready and setup initial structures
     */
    waitForUploaderReady : function() {
      // wait until uploader structures will be ready to bind own events AFTER initial events
      // will be added
      if(
        ('undefined' == typeof(Drupal.advupload.advupload_ready) )
        || (!Drupal.advupload.advupload_ready)
      ) {
        setTimeout(Drupal.advupload_nodeinfo.waitForUploaderReady, 10);
        return false;
      }
      $('#advupload-uploader-hook-interface').append('<div id="advupload-nodeinfo-hiddens"></div>');
      var up = $('#advupload-uploader').advupload_pluploadQueue();
      up.bind('QueueChanged', Drupal.advupload_nodeinfo.uploader_QueueChanged);
      up.bind('UploadFile', Drupal.advupload_nodeinfo.uploader_UploadFile);
      up.bind('StateChanged',  Drupal.advupload_nodeinfo.uploader_StateChanged);
      up.bind('Refresh', Drupal.advupload_nodeinfo.uploader_StateChanged);
      //up.bind('BeforeUpload', Drupal.advimage_up.uploader_BeforeUpload);
      //up.bind('UploadComplete', Drupal.advimage_up.uploader_UploadComplete);
      return true;
    }
  }
  Drupal.behaviors  = Drupal.behaviors || {};
  Drupal.behaviors.advupload_nodeinfo = function (context) {
    Drupal.advupload_nodeinfo.waitForUploaderReady();
  }
}) (jQuery);
