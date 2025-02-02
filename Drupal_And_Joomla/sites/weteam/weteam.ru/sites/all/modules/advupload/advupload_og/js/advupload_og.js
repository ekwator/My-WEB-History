/**
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 * javascript for normal plupload initialization
 */
(function($) {
  $(document).ready(function(){
    $('#edit-node-og-groups').change(function(){
      $('#node-og-groups-string').val($('#edit-node-og-groups').val() );
    });
    $('div.form-item div.form-checkboxes.og-audience label.option input.form-checkbox.og-audience').change(function(){
      var obj = $('div.form-item div.form-checkboxes.og-audience label.option input.form-checkbox.og-audience');
      var length = obj.length;
      var i = 0;
      var str = '';
      for(i = 0; i < length; i++){
         if(obj[i].checked) str = str + ( (str=='') ? '' : ',') + obj[i].value;
      }
      $('#node-og-groups-string').val(str);
    });
    $('#edit-node-og-public').change(function(){
      $('#node-og-public-string').val(
        $('#edit-node-og-public').attr('checked') ? '1' : '0'
      );
    });
  });
}) (jQuery);
