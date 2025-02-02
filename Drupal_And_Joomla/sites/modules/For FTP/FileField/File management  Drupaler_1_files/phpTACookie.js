function writePhpTACookie() {
date=new Date;
date.setMonth(date.getMonth()+1);
var name = "phpTA_resolution";
var value = screen.width +"x"+ screen.height;
var domain = "drupaler.ru";
var path= "/";
document.cookie=name+"="+escape(value)+"; expires="+date.toGMTString()+"; path="+path+"; domain="+domain;}
window.onload=writePhpTACookie();
