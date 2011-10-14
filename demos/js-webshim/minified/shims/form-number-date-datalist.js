jQuery.webshims.register("forms-ext",function(c,e){(function(){var a=e.validityMessages,f=function(a,d){c.each(d,function(c,d){a[c]?typeof d=="object"&&f(a[c],d):a[c]=d})},d={typeMismatch:{number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},
stepMismatch:"Invalid input."},b={typeMismatch:{number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}"};
["date","time","datetime-local"].forEach(function(a){d.rangeUnderflow[a]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(a){d.rangeOverflow[a]="Value must be at or before {%max}."});["date","time","datetime-local"].forEach(function(a){b.rangeUnderflow[a]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(a){b.rangeOverflow[a]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});
f(a.en,d);f(a.de,b)})();if(!Modernizr.input.valueAsNumberSet||!Modernizr.input.valueAsDate){e.getStep=function(a,f){var d=c.attr(a,"step");if(d==="any")return d;f=f||m(a);if(!g[f]||!g[f].step)return d;d=b.number.asNumber(d);return(!isNaN(d)&&d>0?d:g[f].step)*g[f].stepScaleFactor};e.addMinMaxNumberToCache=function(a,c,d){a+"AsNumber"in d||(d[a+"AsNumber"]=g[d.type].asNumber(c.attr(a)),isNaN(d[a+"AsNumber"])&&a+"Default"in g[d.type]&&(d[a+"AsNumber"]=g[d.type][a+"Default"]))};var k=parseInt("NaN",10),
g=e.inputTypes,i=function(a){return typeof a=="number"||a&&a==a*1},n=function(a){return Modernizr.input.valueAsNumber&&c('<input type="'+a+'" />').prop("type")===a},m=function(a){return(a.getAttribute("type")||"").toLowerCase()},j=e.addMinMaxNumberToCache,o=function(a,c){a=""+a;c-=a.length;for(var d=0;d<c;d++)a="0"+a;return a};if(!Modernizr.input.valueAsNumber||!Modernizr.input.valueAsDate)e.addValidityRule("stepMismatch",function(a,c,d){if(c==="")return!1;if(!("type"in d))d.type=m(a[0]);if(d.type==
"date")return!1;var b=!1;if(g[d.type]&&g[d.type].step){if(!("step"in d))d.step=e.getStep(a[0],d.type);if(d.step=="any")return!1;if(!("valueAsNumber"in d))d.valueAsNumber=g[d.type].asNumber(c);if(isNaN(d.valueAsNumber))return!1;j("min",a,d);a=d.minAsNumber;isNaN(a)&&(a=g[d.type].stepBase||0);b=Math.abs((d.valueAsNumber-a)%d.step);b=!(b<=1.0E-7||Math.abs(b-d.step)<=1.0E-7)}return b}),[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){e.addValidityRule(a.name,
function(c,d,b){var e=!1;if(d==="")return e;if(!("type"in b))b.type=m(c[0]);if(g[b.type]&&g[b.type].asNumber){if(!("valueAsNumber"in b))b.valueAsNumber=g[b.type].asNumber(d);if(isNaN(b.valueAsNumber))return!1;j(a.attr,c,b);if(isNaN(b[a.attr+"AsNumber"]))return e;e=b[a.attr+"AsNumber"]*a.factor<b.valueAsNumber*a.factor-1.0E-7}return e})}),e.reflectProperties(["input"],["max","min","step"]);var p=e.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var a=m(this);return g[a]&&g[a].asNumber?
g[a].asNumber(c.prop(this,"value")):k},set:function(a){var b=m(this);g[b]&&g[b].numberToString?isNaN(a)?c.prop(this,"value",""):(b=g[b].numberToString(a),b!==!1?c.prop(this,"value",b):e.warn("INVALID_STATE_ERR: DOM Exception 11")):p.prop._supset&&p.prop._supset.call(this,arguments)}}}),q=e.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var a=m(this);return g[a]&&g[a].asDate&&!g[a].noAsDate?g[a].asDate(c.prop(this,"value")):q.prop._supget&&q.prop._supget.call(this)},set:function(a){var b=
m(this);if(g[b]&&g[b].dateToString&&!g[b].noAsDate){if(a===null)return c.prop(this,"value",""),"";b=g[b].dateToString(a);if(b!==!1)return c.prop(this,"value",b),b;else e.warn("INVALID_STATE_ERR: DOM Exception 11")}else return q.prop._supset&&q.prop._supset(this,arguments)||null}}}),b={number:{mismatch:function(a){return!i(a)},step:1,stepScaleFactor:1,asNumber:function(a){return i(a)?a*1:k},numberToString:function(a){return i(a)?a:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(a){if(!a||
!a.split||!/\d$/.test(a))return!0;var b=a.split(/\u002D/);if(b.length!==3)return!0;var d=!1;c.each(b,function(a,c){if(!(i(c)||c&&c=="0"+c*1))return d=!0,!1});if(d)return d;if(b[0].length!==4||b[1].length!=2||b[1]>12||b[2].length!=2||b[2]>33)d=!0;return a!==this.dateToString(this.asDate(a,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,c){return!c&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,c){var b=k;if(c||!this.mismatch(a))a=a.split(/\u002D/),b=Date.UTC(a[0],a[1]-
1,a[2]);return b},numberToString:function(a){return i(a)?this.dateToString(new Date(a*1)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+o(a.getUTCMonth()+1,2)+"-"+o(a.getUTCDate(),2):!1}},time:{mismatch:function(a,b){if(!a||!a.split||!/\d$/.test(a))return!0;a=a.split(/\u003A/);if(a.length<2||a.length>3)return!0;var d=!1,e;a[2]&&(a[2]=a[2].split(/\u002E/),e=parseInt(a[2][1],10),a[2]=a[2][0]);c.each(a,function(a,c){if(!(i(c)||c&&c=="0"+c*1)||c.length!==2)return d=!0,!1});
if(d)return!0;if(a[0]>23||a[0]<0||a[1]>59||a[1]<0)return!0;if(a[2]&&(a[2]>59||a[2]<0))return!0;if(e&&isNaN(e))return!0;e&&(e<100?e*=100:e<10&&(e*=10));return b===!0?[a,e]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var c=k,a=this.mismatch(a,!0);a!==!0&&(c=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0),a[1]&&(c+=a[1]));return c},dateToString:function(a){if(a&&a.getUTCHours){var c=o(a.getUTCHours(),2)+":"+o(a.getUTCMinutes(),
2),b=a.getSeconds();b!="0"&&(c+=":"+o(b,2));b=a.getUTCMilliseconds();b!="0"&&(c+="."+o(b,3));return c}else return!1}},"datetime-local":{mismatch:function(a,c){if(!a||!a.split||(a+"special").split(/\u0054/).length!==2)return!0;a=a.split(/\u0054/);return g.date.mismatch(a[0])||g.time.mismatch(a[1],c)},noAsDate:!0,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var c=k,b=this.mismatch(a,!0);b!==!0&&(a=a.split(/\u0054/)[0].split(/\u002D/),c=Date.UTC(a[0],a[1]-
1,a[2],b[0][0],b[0][1],b[0][2]||0),b[1]&&(c+=b[1]));return c},dateToString:function(a,c){return g.date.dateToString(a)+"T"+g.time.dateToString(a,c)}}};(!Modernizr.input.valueAsNumberSet||!n("number"))&&e.addInputType("number",b.number);(!Modernizr.input.valueAsNumberSet||!n("range"))&&e.addInputType("range",c.extend({},b.number,b.range));(!Modernizr.input.valueAsNumberSet||!n("date"))&&e.addInputType("date",b.date);(!Modernizr.input.valueAsNumberSet||!n("time"))&&e.addInputType("time",c.extend({},
b.date,b.time));(!Modernizr.input.valueAsNumberSet||!n("datetime-local"))&&e.addInputType("datetime-local",c.extend({},b.date,b.time,b["datetime-local"]))}});
jQuery.webshims.ready("forms-ext dom-support",function(c,e,k,g){var i=e.triggerInlineForm,n=Modernizr.inputtypes,m=function(){var a={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},c=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(b,d){var e,f,r;f="width";c&&(f=a[b.css(c)]||f);e=b[f]();f=f=="width";if(e){var h=parseInt(d.css("marginLeft"),10)||0,s=d.outerWidth();(r=parseInt(b.css("marginRight"),10)||0)&&b.css("marginRight",0);h<=s*-1?(d.css("marginRight",
Math.floor(Math.abs(s+h)+r)),b.css("paddingRight",(parseInt(b.css("paddingRight"),10)||0)+Math.abs(h)),f&&b.css("width",Math.floor(e+h))):(d.css("marginRight",r),b.css("width",Math.floor(e-h-s)))}}}(),j=c.webshims.cfg["forms-ext"],o={dateFormat:"yy-mm-dd"},p,q=c([]),b,a=function(b,d){c("input",b).add(d.filter("input")).each(function(){var b=c.prop(this,"type");if(a[b]&&!e.data(this,"shadowData"))a[b](c(this))})},f=function(a,b){if(j.lazyDate){var l=c.data(a[0],"setDateLazyTimer");l&&clearTimeout(l);
c.data(a[0],"setDateLazyTimer",setTimeout(function(){a.datepicker("setDate",b);c.removeData(a[0],"setDateLazyTimer");a=null},0))}else a.datepicker("setDate",b)};if(j.lazyDate===void 0)try{j.lazyDate=c.browser.msie&&e.browserVersion<9||c(k).width()<500&&c(k).height()<500}catch(d){}a.common=function(a,d,l){Modernizr.formvalidation&&a.bind("firstinvalid",function(a){clearTimeout(p);b||(p=setTimeout(function(){!b&&!a.isInvalidUIPrevented()&&e.validityAlert.showFor(a.target)},20))});var f=a.attr("id"),
f={css:{marginRight:a.css("marginRight"),marginLeft:a.css("marginLeft")},outerWidth:a.outerWidth(),label:f?c('label[for="'+f+'"]',a[0].form):q},h=e.getID(f.label);d.addClass(a[0].className);e.addShadowDom(a,d,{data:l||{},shadowFocusElement:c("input.input-datetime-local-date, span.ui-slider-handle",d)[0],shadowChilds:c("input, span.ui-slider-handle",d)});a.after(d).hide();a[0].form&&c(a[0].form).bind("reset",function(c){c.originalEvent&&!c.isDefaultPrevented()&&setTimeout(function(){a.prop("value",
a.prop("value"))},0)});d.length==1&&!c("*",d)[0]&&(d.attr("aria-labeledby",h),f.label.bind("click",function(){d.focus();return!1}));return f};Modernizr.formvalidation&&["input","form"].forEach(function(a){var c=e.defineNodeNameProperty(a,"checkValidity",{prop:{value:function(){b=!0;var a=c.prop._supvalue.apply(this,arguments);b=!1;return a}}})});if(!n["datetime-local"]||j.replaceUI){var h=[0.595,0.395],t=[0.565,0.425],v=!c.browser.msie||e.browserVersion>6?0:0.45,w=function(a,b,d,f){var h,i,r=function(){u.dpDiv.unbind("mousedown.webshimsmousedownhandler");
i=h=!1},u=b.bind("focusin",function(){r();u.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",function(){h=!0})}).bind("focusout blur",function(a){h&&(i=!0,a.stopImmediatePropagation())}).datepicker(c.extend({onClose:function(){i&&g.activeElement!==b[0]?(r(),b.trigger("focusout"),b.triggerHandler("blur")):r()}},o,j.datepicker,a.data("datepicker"))).bind("change",d).data("datepicker");u.dpDiv.addClass("input-date-datepicker-control");f&&e.triggerDomUpdate(f[0]);
["disabled","min","max","value","step"].forEach(function(c){var b=a.prop(c);b!==""&&(c!="disabled"||!b)&&a.prop(c,b)});return u};a["datetime-local"]=function(b){if(c.fn.datepicker){var d=c('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),l=this.common(b,d,a["datetime-local"].attrs),f=c("input.input-datetime-local-date",d),e=w(b,f,function(l){var e=f.prop("value")||"",s="";if(j.lazyDate){var h=
c.data(f[0],"setDateLazyTimer");h&&(clearTimeout(h),c.removeData(f[0],"setDateLazyTimer"))}if(e){s=c("input.input-datetime-local-time",d).prop("value")||"00:00";try{e=(e=c.datepicker.parseDate(f.datepicker("option","dateFormat"),e))?c.datepicker.formatDate("yy-mm-dd",e):f.prop("value")}catch(g){e=f.prop("value")}}a["datetime-local"].blockAttr=!0;b.prop("value",!e&&!s?"":e+"T"+s);a["datetime-local"].blockAttr=!1;l.stopImmediatePropagation();i(b[0],"input");i(b[0],"change")},d);c("input.input-datetime-local-time",
d).bind("change",function(d){var l=c.prop(this,"value"),e=["",""];if(l){e=b.prop("value").split("T");if(e.length<2||!e[0])e[0]=c.datepicker.formatDate("yy-mm-dd",new Date);if(e[1]=l)try{f.prop("value",c.datepicker.formatDate(f.datepicker("option","dateFormat"),c.datepicker.parseDate("yy-mm-dd",e[0])))}catch(x){}}e=!e[0]&&!e[1]?"":e.join("T");a["datetime-local"].blockAttr=!0;b.prop("value",e);a["datetime-local"].blockAttr=!1;d.stopImmediatePropagation();i(b[0],"input");i(b[0],"change")});d.attr("aria-labeledby",
l.label.attr("id"));l.label.bind("click",function(){f.focus();return!1});if(l.css&&(d.css(l.css),l.outerWidth)){d.outerWidth(l.outerWidth);var l=d.width(),g=e.trigger[0]?h:t;f.outerWidth(Math.floor(l*g[0]-v),!0);c("input.input-datetime-local-time",d).outerWidth(Math.floor(l*g[1]-v),!0);e.trigger[0]&&m(f,e.trigger)}}};a["datetime-local"].attrs={disabled:function(a,b,d){c("input.input-datetime-local-date",b).prop("disabled",!!d);c("input.input-datetime-local-time",b).prop("disabled",!!d)},step:function(a,
b,d){c("input.input-datetime-local-time",b).attr("step",d)},min:function(a,b,d){if(d){d=d.split?d.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);c("input.input-datetime-local-date",b).datepicker("option","minDate",d)},max:function(a,b,d){if(d){d=d.split?d.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",d[0])}catch(e){d=!1}}d||(d=null);c("input.input-datetime-local-date",b).datepicker("option","maxDate",d)},value:function(b,d,e){var h;if(e){e=e.split?e.split("T"):
[];try{h=c.datepicker.parseDate("yy-mm-dd",e[0])}catch(g){h=!1}}h?(a["datetime-local"].blockAttr||f(c("input.input-datetime-local-date",d),h),c("input.input-datetime-local-time",d).prop("value",e[1]||"00:00")):(c("input.input-datetime-local-date",d).prop("value",e[0]||""),c("input.input-datetime-local-time",d).prop("value",e[1]||""))}};a.date=function(b){if(c.fn.datepicker){var d=c('<input class="input-date" type="text" />'),e=this.common(b,d,a.date.attrs),f=w(b,d,function(e){a.date.blockAttr=!0;
var f;if(j.lazyDate){var l=c.data(d[0],"setDateLazyTimer");l&&(clearTimeout(l),c.removeData(d[0],"setDateLazyTimer"))}try{f=(f=c.datepicker.parseDate(d.datepicker("option","dateFormat"),d.prop("value")))?c.datepicker.formatDate("yy-mm-dd",f):d.prop("value")}catch(h){f=d.prop("value")}b.prop("value",f);a.date.blockAttr=!1;e.stopImmediatePropagation();i(b[0],"input");i(b[0],"change")});e.css&&(d.css(e.css),e.outerWidth&&d.outerWidth(e.outerWidth),f.trigger[0]&&m(d,f.trigger))}};a.date.attrs={disabled:function(a,
b,d){c.prop(b,"disabled",!!d)},min:function(a,b,d){try{d=c.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&c(b).datepicker("option","minDate",d)},max:function(a,b,d){try{d=c.datepicker.parseDate("yy-mm-dd",d)}catch(e){d=!1}d&&c(b).datepicker("option","maxDate",d)},value:function(b,d,e){if(!a.date.blockAttr){try{var h=c.datepicker.parseDate("yy-mm-dd",e)}catch(g){h=!1}h?f(c(d),h):c.prop(d,"value",e)}}}}if(!n.range||j.replaceUI)a.range=function(b){if(c.fn.slider){var d=c('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),
e=this.common(b,d,a.range.attrs);c("span",d).attr("aria-labeledby",e.label.attr("id"));e.label.bind("click",function(){c("span",d).focus();return!1});e.css&&(d.css(e.css),e.outerWidth&&d.outerWidth(e.outerWidth));d.slider(c.extend({},j.slider,b.data("slider"),{slide:function(c,d){if(c.originalEvent)a.range.blockAttr=!0,b.prop("value",d.value),a.range.blockAttr=!1,i(b[0],"input"),i(b[0],"change")}}));["disabled","min","max","step","value"].forEach(function(a){var d=b.attr(a),e;a=="value"&&!d&&(e=b.getShadowElement())&&
(d=(c(e).slider("option","max")-c(e).slider("option","min"))/2);d!=null&&b.attr(a,d)})}},a.range.attrs={disabled:function(a,b,d){d=!!d;c(b).slider("option","disabled",d);c("span",b).attr({"aria-disabled":d+"",tabindex:d?"-1":"0"})},min:function(a,b,d){d=d?d*1||0:0;c(b).slider("option","min",d);c("span",b).attr({"aria-valuemin":d})},max:function(a,b,d){d=d||d===0?d*1||100:100;c(b).slider("option","max",d);c("span",b).attr({"aria-valuemax":d})},value:function(b,d,e){e=c(b).prop("valueAsNumber");isNaN(e)||
(a.range.blockAttr||c(d).slider("option","value",e),c("span",d).attr({"aria-valuenow":e,"aria-valuetext":e}))},step:function(a,b,d){d=d&&c.trim(d)?d*1||1:1;c(b).slider("option","step",d)}};if(Modernizr.input.valueAsNumberSet&&Modernizr.input.valueAsDate&&(j.replaceUI||!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))k=function(){e.data(this,"hasShadow")&&c.prop(this,"value",c.prop(this,"value"))},e.onNodeNamesPropertyModify("input","valueAsNumber",k),e.onNodeNamesPropertyModify("input",
"valueAsDate",k);c.each(["disabled","min","max","value","step"],function(a,c){e.onNodeNamesPropertyModify("input",c,function(a){var b=e.data(this,"shadowData");if(b&&b.data&&b.data[c]&&b.nativeElement===this)b.data[c](this,b.shadowElement,a)})});if(!j.availabeLangs)j.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");
k=function(){c.datepicker&&(e.activeLang({langObj:c.datepicker.regional,module:"forms-ext",callback:function(a){c("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",c.extend(o,a,j.datepicker))}}),c(g).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};c(g).bind("jquery-uiReady.langchange input-widgetsReady.langchange",k);k();(function(){if(!Modernizr.input.valueAsNumber){var a=e.modules["forms-ext"].options,b=e.inputTypes,d=function(a,d,f){f=
f||{};if(!("type"in f))f.type=c.prop(a,"type");if(!("step"in f))f.step=e.getStep(a,f.type);if(!("valueAsNumber"in f))f.valueAsNumber=b[f.type].asNumber(c.prop(a,"value"));var h=f.step=="any"?b[f.type].step*b[f.type].stepScaleFactor:f.step;e.addMinMaxNumberToCache("min",c(a),f);e.addMinMaxNumberToCache("max",c(a),f);if(isNaN(f.valueAsNumber))f.valueAsNumber=b[f.type].stepBase||0;f.step!=="any"&&(a=Math.round((f.valueAsNumber-(f.minAsnumber||0))%f.step*1E7)/1E7)&&Math.abs(a)!=f.step&&(f.valueAsNumber-=
a);a=f.valueAsNumber+h*d;!isNaN(f.minAsNumber)&&a<f.minAsNumber?a=f.valueAsNumber*d<f.minAsNumber?f.minAsNumber:isNaN(f.maxAsNumber)?Number.MAX_VALUE:f.maxAsNumber:!isNaN(f.maxAsNumber)&&a>f.maxAsNumber&&(a=f.valueAsNumber*d>f.maxAsNumber?f.maxAsNumber:isNaN(f.minAsNumber)?Number.MIN_VALUE:f.minAsNumber);return Math.round(a*1E7)/1E7};e.modules["forms-ext"].getNextStep=d;var f=function(a,f,e){if(!a.disabled&&!a.readOnly&&!c(e).hasClass("step-controls")&&(c.prop(a,"value",b[f].numberToString(d(a,c(e).hasClass("step-up")?
1:-1,{type:f}))),c(a).unbind("blur.stepeventshim"),i(a,"input"),g.activeElement)){if(g.activeElement!==a)try{a.focus()}catch(h){}setTimeout(function(){if(g.activeElement!==a)try{a.focus()}catch(b){}c(a).one("blur.stepeventshim",function(){i(a,"change")})},0)}};if(a.stepArrows){var h={set:function(){var a=e.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};e.onNodeNamesPropertyModify("input","disabled",h);e.onNodeNamesPropertyModify("input",
"readonly",c.extend({},h))}var t={38:1,40:-1};e.addReady(function(h,g){a.stepArrows&&c("input",h).add(g.filter("input")).each(function(){var h=c.prop(this,"type");if(b[h]&&b[h].asNumber&&a.stepArrows&&!(a.stepArrows!==!0&&!a.stepArrows[h]||c(this).hasClass("has-step-controls"))){var g=this,j=c('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(this).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){f(g,
h,a.target);return!1}).bind("mousepressstart mousepressend",function(a){c(a.target)[a.type=="mousepressstart"?"addClass":"removeClass"]("mousepress-ui")}),n=c(this).addClass("has-step-controls").attr({readonly:this.readOnly,disabled:this.disabled,autocomplete:"off",role:"spinbutton"}).bind(c.browser.msie?"keydown":"keypress",function(a){if(!this.disabled&&!this.readOnly&&t[a.keyCode])return c.prop(this,"value",b[h].numberToString(d(this,t[a.keyCode],{type:h}))),i(this,"input"),!1});e.data(this,"step-controls",
j);a.calculateWidth&&(m(n,j),j.css("marginTop",(n.outerHeight()-j.outerHeight())/2))}})})}})();e.addReady(function(b,d){c(g).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",function(){(c.datepicker||c.fn.slider)&&a(b,d);c.datepicker&&c.fn.slider?c(g).unbind(".initinputui"):e.modules["input-widgets"].src||e.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});
jQuery.webshims.ready("dom-support forms",function(c,e,k,g,i){e.propTypes.element=function(g){e.createPropDefault(g,"attr");if(!g.prop)g.prop={get:function(){var e=g.attr.get.call(this);e&&(e=c("#"+e)[0])&&g.propNodeName&&!c.nodeName(e,g.propNodeName)&&(e=null);return e||null},writeable:!1}};(function(){if(!Modernizr.datalist){var n=0,m={submit:1,button:1,reset:1,hidden:1,range:1,date:1},j=c.browser.msie&&parseInt(c.browser.version,10)<7,o={},p=function(b){if(!b)return[];if(o[b])return o[b];var a;
e.ready("json-storage",function(){try{a=JSON.parse(localStorage.getItem("storedDatalistOptions"+b))}catch(c){}o[b]=a||[]});return a||[]},q={_create:function(b){if(!m[(b.input.getAttribute("type")||"").toLowerCase()||b.input.type]){var a=b.datalist,e=c.data(b.input,"datalistWidget");if(a&&e&&e.datalist!==a)e.datalist=a,e.id=b.id,e._resetListCached();else if(a){if(!(e&&e.datalist===a)){n++;var d=this;this.timedHide=function(){clearTimeout(d.hideTimer);d.hideTimer=setTimeout(c.proxy(d,"hideList"),9)};
this.datalist=a;this.id=b.id;this.hasViewableData=!0;this._autocomplete=c.attr(b.input,"autocomplete");c.data(b.input,"datalistWidget",this);this.shadowList=c('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=b.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",function(a){var b=c("li:not(.hidden-item)",d.shadowList),e=a.type=="mousedown"||a.type=="click";d.markItem(b.index(a.target),e,b);a.type==
"click"&&d.hideList();return a.type!="mousedown"}).bind("focusout",this.timedHide);b.input.setAttribute("autocomplete","off");c(b.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",c.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(a){var b=a.keyCode;if(b==40&&!d.showList())return d.markItem(d.index+1,!0),!1;if(d.isListVisible){if(b==38)return d.markItem(d.index-1,!0),!1;if(!a.shiftKey&&(b==33||b==36))return d.markItem(0,!0),!1;if(!a.shiftKey&&(b==34||b==35))return a=
c("li:not(.hidden-item)",d.shadowList),d.markItem(a.length-1,!0,a),!1;if(b==13||b==27)return b==13&&(a=c("li.active-item:not(.hidden-item)",d.shadowList),a[0]&&(c.prop(d.input,"value",a.attr("data-value")),c(d.input).triggerHandler("updateInput"))),d.hideList(),!1}}).bind("focus.datalistWidget",function(){c(this).hasClass("list-focus")&&d.showList()}).bind("blur.datalistWidget",this.timedHide);c(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",c.proxy(this,
"_resetListCached"));this._resetListCached();b.input.form&&b.input.id&&c(b.input.form).bind("submit.datalistWidget"+b.input.id,function(){var a=c.prop(b.input,"value");d.storedOptions=p(b.input.name||b.input.id);if(a&&d.storedOptions.indexOf(a)==-1){d.storedOptions.push(a);var a=b.input.name||b.input.id,e=d.storedOptions;if(a){e=e||[];try{localStorage.setItem("storedDatalistOptions"+a,JSON.stringify(e))}catch(f){}}}});c(k).bind("unload",function(){d.destroy()})}}else e&&e.destroy()}},destroy:function(){var b=
c.attr(this.input,"autocomplete");c(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();c(g).unbind(".datalist"+this.id);this.input.form&&this.input.id&&c(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");b===i?this.input.removeAttribute("autocomplete"):c(this.input).attr("autocomplete",b)},_resetListCached:function(b){var a=this;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";if(!this.updateTimer)this.updateTimer=
setTimeout(function(){a.updateListOptions(b&&g.activeElement==a.input);a=null},0)},updateListOptions:function(b){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:c.curCSS(this.input,"fontSize"),fontFamily:c.curCSS(this.input,"fontFamily")});for(var a=[],e=[],d=[],g,i=c("option",this.datalist),k=0,m=c("option",this.datalist).length;k<m;k++){g=i[k];if(g.disabled)return;g={value:c(g).val()||"",text:c.trim(c.attr(g,"label")||g.textContent||g.innerText||
c.text([g])||""),className:g.className||"",style:c.attr(g,"style")||""};if(!g.text)g.text=g.value;e[k]=g.value;d[k]=g}this.storedOptions=p(this.input.name||this.input.id);this.storedOptions.forEach(function(a){e.indexOf(a)==-1&&d.push({value:a,text:a,className:"",style:""})});d.forEach(function(b,c){var d=b.value.indexOf('"')!=-1?"'"+b.value+"'":'"'+b.value+'"';a[c]="<li data-value="+d+' class="'+b.className+'" style="'+b.style+'" tabindex="-1" role="listitem">'+b.text+"</li>"});this.arrayOptions=
d;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+a.join("\n")+"</ul>");c.fn.bgIframe&&j&&this.shadowList.bgIframe();(b||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(){var b=c.prop(this.input,"value").toLowerCase();if(!(b===this.lastUpdatedValue||this.lastUnfoundValue&&b.indexOf(this.lastUnfoundValue)===0)){this.lastUpdatedValue=b;var a=!1,e=c("li",this.shadowList);b?this.arrayOptions.forEach(function(d,g){if(!("lowerText"in
d))d.lowerText=d.text.toLowerCase(),d.lowerValue=d.value.toLowerCase();d.lowerText.indexOf(b)!==-1||d.lowerValue.indexOf(b)!==-1?(c(e[g]).removeClass("hidden-item"),a=!0):c(e[g]).addClass("hidden-item")}):(e.removeClass("hidden-item"),a=!0);(this.hasViewableData=a)?this.showList():(this.lastUnfoundValue=b,this.hideList())}},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return!1;var b=this,a=c(this.input).offset();
a.top+=c(this.input).outerHeight();a.width=c(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);j&&(this.shadowList.css("height","auto"),this.shadowList.height()>250&&this.shadowList.css("height",220));this.shadowList.css(a).addClass("datalist-visible");this.isListVisible=!0;c(g).bind("mousedown.datalist"+this.id+" focusin.datalist"+this.id,function(a){a.target===b.input||b.shadowList[0]===a.target||c.contains(b.shadowList[0],
a.target)?(clearTimeout(b.hideTimer),setTimeout(function(){clearTimeout(b.hideTimer)},0)):b.timedHide()});return!0},hideList:function(){if(!this.isListVisible)return!1;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=!1;c(this.input).removeAttr("aria-activedescendant");c(g).unbind(".datalist"+this.id);return!0},scrollIntoView:function(b){var a=c("> ul",this.shadowList),e=b.position();e.top-=
(parseInt(a.css("paddingTop"),10)||0)+(parseInt(a.css("marginTop"),10)||0)+(parseInt(a.css("borderTopWidth"),10)||0);e.top<0?this.shadowList.scrollTop(this.shadowList.scrollTop()+e.top-2):(e.top+=b.outerHeight(),b=this.shadowList.height(),e.top>b&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(e.top-b)+2))},markItem:function(b,a,e){e=e||c("li:not(.hidden-item)",this.shadowList);if(e.length)b<0?b=e.length-1:b>=e.length&&(b=0),e.removeClass("active-item"),this.shadowList.addClass("list-item-active"),
e=e.filter(":eq("+b+")").addClass("active-item"),a&&(c.prop(this.input,"value",e.attr("data-value")),c.attr(this.input,"aria-activedescendant",c.webshims.getID(e)),c(this.input).triggerHandler("updateInput"),this.scrollIntoView(e)),this.index=b}};(function(){e.defineNodeNameProperties("input",{list:{attr:{get:function(){var b=e.contentAttr(this,"list");return b==null?i:b},set:function(b){e.contentAttr(this,"list",b);e.objectCreate(q,i,{input:this,id:b,datalist:c.prop(this,"list")})}},initAttr:!0,
reflect:!0,propType:"element",propNodeName:"datalist"},selectedOption:{prop:{writeable:!1,get:function(){var b=c.prop(this,"list"),a=null,e;if(!b)return a;e=c.attr(this,"value");if(!e)return a;b=c.prop(b,"options");if(!b.length)return a;c.each(b,function(b,g){if(e==c.prop(g,"value"))return a=g,!1});return a}}},autocomplete:{attr:{get:function(){var b=c.data(this,"datalistWidget");return b?b._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(b){var a=
c.data(this,"datalistWidget");a?(a._autocomplete=b,b=="off"&&a.hideList()):"autocomplete"in this?this.autocomplete=b:this.setAttribute("autocomplete",b)}}}});e.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var b=c("select",this);return b[0]?b[0].options:[]}}});e.addReady(function(b,a){a.filter("select, option").each(function(){var a=this.parentNode,b=c.nodeName(a,"datalist");if(a&&!b)a=a.parentNode,b=c.nodeName(a,"datalist");a&&b&&c(a).triggerHandler("updateDatalist")})})})()}})();
e.modules["forms-ext"].src=="form-datalist"?e.isReady("forms-ext",!0):setTimeout(function(){e.isReady("forms-ext")||(e.warn("setting forms-ext ready from datalist"),e.isReady("forms-ext",!0))},9)});