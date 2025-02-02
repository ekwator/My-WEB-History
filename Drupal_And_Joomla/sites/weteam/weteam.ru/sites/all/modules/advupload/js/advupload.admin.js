/**
 * (c) Ilya V. Azarov, 2011. Advanced image upload module for images/multimedia/etc.
 * javascript admin area pages
 */
(function($) {
  $(document).ready(function(){
    var checks = $('#advupload-node-settings fieldset input.form-checkbox');
    var i = 0;
    var id;
    for(i = 0; i < checks.length; i++) {
      if(checks[i].checked){
      }else{
        id = checks[i].id + '-fieldname';
        $('#' + id).removeAttr("enabled");
        $('#' + id).attr('disabled', 'disabled');
        id = checks[i].id + '-uploadtype';
        $('#' + id).removeAttr("enabled");
        $('#' + id).attr('disabled', 'disabled');
      }
    }
    $('#advupload-node-settings fieldset input.form-checkbox').click(function(){
      var id;
      id = this.id + '-fieldname';
      if(this.checked){
        $('#' + id).removeAttr("disabled");
        $('#' + id).attr("enabled","enabled");
      }else{
        $('#' + id).removeAttr("enabled");
        $('#' + id).attr('disabled', 'disabled');
      }
      id = this.id + '-uploadtype';
      if(this.checked){
        $('#' + id).removeAttr("disabled");
        $('#' + id).attr("enabled","enabled");
      }else{
        $('#' + id).removeAttr("enabled");
        $('#' + id).attr('disabled', 'disabled');
      }
    });
  });
}) (jQuery);
