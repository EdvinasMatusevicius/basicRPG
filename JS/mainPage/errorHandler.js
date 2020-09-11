var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var errorMsgReg = url.searchParams.get("error");
var errorMsgLog = url.searchParams.get("errorin");

// Tavo tikrinimas
if (errorMsgReg != null){
// URLSearchParams.delete("error"); 
$('.js-register-collapse').collapse();}
if (errorMsgLog != null){
// URLSearchParams.delete("errorin"); 
$('.js-log-in-collapse').collapse();}