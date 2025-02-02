//===============================
// Kayako LiveResponse
// Copyright (c) 2001-2012
// http://www.kayako.com
// License: http://www.kayako.com/license.txt
//===============================

var sessionid_3zcps9re = "zj7fkifl6e5cdj7imx9k9jzfh7c3mlip";
var country_3zcps9re = "";
var countrycode_3zcps9re = "";
var hasnotes_3zcps9re = "";
var campaignid_3zcps9re = "";
var campaigntitle_3zcps9re = "";
var isfirsttime_3zcps9re = 1;
var timer_3zcps9re = 0;
var imagefetch_3zcps9re = 4;
var updateurl_3zcps9re = "";
var screenHeight = window.screen.availHeight;
var screenWidth = window.screen.availWidth;
var colorDepth = window.screen.colorDepth;
var timeNow = new Date();
var referrer = escape(document.referrer);
var windows, mac, linux;
var ie, op, moz, misc, browsercode, browsername, browserversion, operatingsys;
var dom, ienew, ie4, ie5, ie6, moz_rv, moz_rv_sub, ie5mac, ie5xwin, opnu, op4, op5, op6, op7, saf, konq;
var appName, appVersion, userAgent;
var appname = navigator.appName;
var appVersion = navigator.appVersion;
var userAgent = navigator.userAgent;
var dombrowser = "default";
var isChatRunning_3zcps9re = 0;
var title = document.title;
var proactiveImageUse_3zcps9re = new Image();
windows = (appVersion.indexOf('Win') != -1);
mac = (appVersion.indexOf('Mac') != -1);
linux = (appVersion.indexOf('Linux') != -1);
if (!document.layers) {
	dom = (document.getElementById ) ? document.getElementById : false;
} else {
	dom = false;
}
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement &&
      ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
winH = myHeight;
winW = myWidth;
misc=(appVersion.substring(0,1) < 4);
op=(userAgent.indexOf('Opera') != -1);
moz=(userAgent.indexOf('Gecko') != -1);
ie=(document.all && !op);
saf=(userAgent.indexOf('Safari') != -1);
konq=(userAgent.indexOf('Konqueror') != -1);

if (op) {
	op_pos = userAgent.indexOf('Opera');
	opnu = userAgent.substr((op_pos+6),4);
	op5 = (opnu.substring(0,1) == 5);
	op6 = (opnu.substring(0,1) == 6);
	op7 = (opnu.substring(0,1) == 7);
} else if (moz){
	rv_pos = userAgent.indexOf('rv');
	moz_rv = userAgent.substr((rv_pos+3),3);
	moz_rv_sub = userAgent.substr((rv_pos+7),1);
	if (moz_rv_sub == ' ' || isNaN(moz_rv_sub)) {
		moz_rv_sub='';
	}
	moz_rv = moz_rv + moz_rv_sub;
} else if (ie){
	ie_pos = userAgent.indexOf('MSIE');
	ienu = userAgent.substr((ie_pos+5),3);
	ie4 = (!dom);
	ie5 = (ienu.substring(0,1) == 5);
	ie6 = (ienu.substring(0,1) == 6);
}

if (konq) {
	browsercode = "KO";
	browserversion = appVersion;
	browsername = "Konqueror";
} else if (saf) {
	browsercode = "SF";
	browserversion = appVersion;
	browsername = "Safari";
} else if (op) {
	browsercode = "OP";
	if (op5) {
		browserversion = "5";
	} else if (op6) {
		browserversion = "6";
	} else if (op7) {
		browserversion = "7";
	} else {
		browserversion = appVersion;
	}
	browsername = "Opera";
} else if (moz) {
	browsercode = "MO";
	browserversion = appVersion;
	browsername = "Mozilla";
} else if (ie) {
	browsercode = "IE";
	if (ie4) {
		browserversion = "4";
	} else if (ie5) {
		browserversion = "5";
	} else if (ie6) {
		browserversion = "6";
	} else {
		browserversion = appVersion;
	}
	browsername = "Internet Explorer";
}

if (windows) {
	operatingsys = "Windows";
} else if (linux) {
	operatingsys = "Linux";
} else if (mac) {
	operatingsys = "Mac";
} else {
	operatingsys = "Unkown";
}

if (document.getElementById)
{
	dombrowser = "default";
} else if (document.layers) {
	dombrowser = "NS4";
} else if (document.all) {
	dombrowser = "IE4";
}

function browserObject_3zcps9re(objid)
{
	if (dombrowser == "default")
	{
		return document.getElementById(objid);
	} else if (dombrowser == "NS4") {
		return document.layers[objid];
	} else if (dombrowser == "IE4") {
		return document.all[objid];
	}
}

function doRand_3zcps9re()
{
	var num;
	now=new Date();
	num=(now.getSeconds());
	num=num+1;
	return num;
}

function getCookie_3zcps9re(name) {
	var crumb = document.cookie;
	var index = crumb.indexOf(name + "=");
	if (index == -1) return null;
	index = crumb.indexOf("=", index) + 1;
	var endstr = crumb.indexOf(";", index);
	if (endstr == -1) endstr = crumb.length;
	return unescape(crumb.substring(index, endstr));
}

function deleteCookie_3zcps9re(name) {
	var expiry = new Date();
	document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT" +  "; path=/";
}

function elapsedTime_3zcps9re()
{
	if (timer_3zcps9re < 3600)
	{
		timer_3zcps9re++;
		imagefetch_3zcps9re++;

		if (imagefetch_3zcps9re > 5) {
			imagefetch_3zcps9re = 0;
			doStatusLoop_3zcps9re();
		}

		setTimeout("elapsedTime_3zcps9re();", 1000);
	}
}

function doStatusLoop_3zcps9re() {
	date1 = new Date();
	updateurl_3zcps9re = "https://support.ihc.ru/visitor/index.php?_m=livesupport&_a=updatefootprint&time="+date1.getTime()+"&rand="+doRand_3zcps9re()+"&url="+encodeURIComponent(window.location)+"&isfirsttime="+encodeURIComponent(isfirsttime_3zcps9re)+"&sessionid="+encodeURIComponent(sessionid_3zcps9re)+"&referrer="+encodeURIComponent(document.referrer)+"&resolution="+encodeURIComponent(screenWidth+"x"+screenHeight)+"&colordepth="+encodeURIComponent(colorDepth)+"&platform="+encodeURIComponent(navigator.platform)+"&appversion="+encodeURIComponent(navigator.appVersion)+"&appname="+encodeURIComponent(navigator.appName)+"&browsercode="+encodeURIComponent(browsercode)+"&browserversion="+encodeURIComponent(browserversion)+"&browsername="+encodeURIComponent(browsername)+"&operatingsys="+encodeURIComponent(operatingsys)+"&pagetitle="+encodeURIComponent(title)+"&country="+encodeURIComponent(country_3zcps9re)+"&countrycode="+encodeURIComponent(countrycode_3zcps9re)+"&hasnotes="+encodeURIComponent(hasnotes_3zcps9re)+"&campaignid="+encodeURIComponent(campaignid_3zcps9re)+"&campaigntitle="+encodeURIComponent(campaigntitle_3zcps9re);
//	alert(updateurl);

	proactiveImageUse_3zcps9re = new Image();
	proactiveImageUse_3zcps9re.onload = imageLoaded_3zcps9re;
	proactiveImageUse_3zcps9re.src = updateurl_3zcps9re;

//	window.location.href = updateurl_3zcps9re;

	isfirsttime_3zcps9re = 0;
}

function startChat_3zcps9re(proactive)
{
	isChatRunning_3zcps9re = 1;

	docWidth = (winW-500)/2;
	docHeight = (winH-480)/2;

	chatwindow = window.open("https://support.ihc.ru/visitor/index.php?_m=livesupport&_a=startclientchat&sessionid="+sessionid_3zcps9re+"&proactive="+proactive+"&departmentid=2&randno="+doRand_3zcps9re()+"&fullname=a73460&email=info%40rang.su","customerchat"+doRand_3zcps9re(), "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=0,resizable=1,width=500,height=480,left="+docWidth+",top="+docHeight);

	hideProactiveChatData_3zcps9re();
}

function imageLoaded_3zcps9re() {
	if (!proactiveImageUse_3zcps9re)
	{
		return;
	}
	proactiveAction = proactiveImageUse_3zcps9re.width;

	if (proactiveAction == 3)
	{
		doProactiveForced_3zcps9re();
	} else if (proactiveAction == 4) {
		displayProactiveChatData_3zcps9re();
	} else {
	}
}

function writeProactiveRequestData_3zcps9re()
{
	docWidth = (winW-450)/2;
	docHeight = (winH-400)/2;
	classData = "DISPLAY: none; FLOAT: left; POSITION: absolute; TOP:"+docHeight+"px; LEFT:"+docWidth+"px; WIDTH: 450px; HEIGHT: 400px; Z-INDEX: 1500;";
	writedata = "<style type=\"text/css\"> <!-- #proactivechatdiv_3zcps9re { "+classData+" } --> </style>";
	writedata += "<div id=\"proactivechatdiv_3zcps9re\" style=\""+classData+"\">";
	writedata += "<table width=\"450\" height=\"200\"  border=\"0\" cellpadding=\"1\" cellspacing=\"0\">  <tr>    <td bgcolor=\"#3894E5\"><table width=\"450\" height=\"200\"  border=\"0\" cellpadding=\"0\" cellspacing=\"0\">      <tr>        <td align=\"left\" valign=\"top\" bgcolor=\"#EDF4FF\"><table width=\"100%\"  border=\"0\" cellpadding=\"0\" cellspacing=\"0\">          <tr bgcolor=\"#FFFFFF\">            <td height=\"29\" colspan=\"2\" align=\"center\" valign=\"top\"><img src=\"https://support.ihc.ru/themes/client_default/supportsuite.gif\"></td>          </tr>          <tr align=\"center\" bgcolor=\"#3894E5\">            <td height=\"1\" colspan=\"2\" valign=\"top\"><img src=\"https://support.ihc.ru/themes/client_default/space.gif\" width=\"1\" height=\"1\"></td>          </tr>          <tr align=\"center\">            <td colspan=\"2\" valign=\"top\"><font size=\"2\" face=\"Verdana, Arial, Helvetica, sans-serif\"><br>              <br>              Требуется помощь? Нажмите &quot;Войти в чат&quot; чтобы поговорить с оператором в прямом эфире.<br>              <br>              </font><br>              <br></td>          </tr>          <tr>            <td width=\"47%\" align=\"center\" valign=\"top\"><a href=\"javascript:doProactiveRequest_3zcps9re();\"><font color=\"#FF3300\" size=\"4\" face=\"Trebuchet MS, Verdana, Arial, Helvetica, sans-serif\">Войти в чат</font></a> </td>            <td width=\"53%\" align=\"center\" valign=\"top\"><a href=\"javascript:closeProactiveRequest_3zcps9re();\"><font color=\"#6666FF\" size=\"4\" face=\"Trebuchet MS, Verdana, Arial, Helvetica, sans-serif\">Нет, спасибо!</a></font></td>          </tr>        </table></td>      </tr>    </table></td>  </tr></table>";
	writedata += "</div>";
	document.write(writedata);
	//var newItem = document.createElement("SPAN");
	//document.body.appendChild(newItem);
	//newItem.innerHTML = writedata;
}

function displayProactiveChatData_3zcps9re()
{
	writeObj = browserObject_3zcps9re("proactivechatdiv_3zcps9re");
	if (writeObj)
	{
		docWidth = (winW-450)/2;
		docHeight = (winH-400)/2;
		writeObj.top = docWidth;
		writeObj.left = docHeight;
	}
	switchDisplay_3zcps9re("proactivechatdiv_3zcps9re");
}

function hideProactiveChatData_3zcps9re()
{
	hideDisplay_3zcps9re("proactivechatdiv_3zcps9re");
}

function doProactiveForced_3zcps9re()
{
	switchDisplay_3zcps9re("proactivechatdiv_3zcps9re");
	startChat_3zcps9re("6");
}

function doProactiveRequest_3zcps9re()
{
	startChat_3zcps9re("4");
}

function closeProactiveRequest_3zcps9re()
{
	rejectProactive = new Image();
	date1 = new Date();
	rejectProactive.src = "https://support.ihc.ru/visitor/index.php?_m=livesupport&_a=resetproactivestatus&time="+date1.getTime()+"&rand="+doRand_3zcps9re()+"&sessionid="+sessionid_3zcps9re;

	hideProactiveChatData_3zcps9re();
}

function switchDisplay_3zcps9re(objid)
{
	result = browserObject_3zcps9re(objid);
	if (!result)
	{
		return;
	}

	if (result.style.display == "none")
	{
		result.style.display = "block";
	} else {
		result.style.display = "none";
	}
}

function hideDisplay_3zcps9re(objid)
{
	result = browserObject_3zcps9re(objid);
	if (!result)
	{
		return;
	}

	result.style.display = "none";
}

function resetChatStatus_3zcps9re()
{
	isChatRunning_3zcps9re = 0;
}

function runURL_3zcps9re(url)
{
	runURLImg = new Image();
	date1 = new Date();
	runURLImg.src = url;
}

writeProactiveRequestData_3zcps9re();
elapsedTime_3zcps9re();
document.write("");
