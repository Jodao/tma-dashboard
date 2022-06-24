"use strict";(self.webpackChunktma_dashboard=self.webpackChunktma_dashboard||[]).push([[206],{6117:function(e,t,n){var r=n(1413),a=n(885),o=n(2791),i=n(6739),s=n(1460),l=n(834),c=n(6871),u=n(184);t.Z=function(e){var t=(0,c.s0)(),n=(0,o.useState)({successPath:e.successPath,openModal:!1,messageType:null,message:null}),f=(0,a.Z)(n,2),d=f[0],p=f[1];function g(n,a){"success"===d.messageType&&t(d.successPath),e.modalInfo.openModal=!1,p((0,r.Z)((0,r.Z)({},d),{},{openModal:!1}))}return(0,o.useEffect)((function(){p((0,r.Z)((0,r.Z)({},d),{},{openModal:e.modalInfo.openModal,messageType:e.modalInfo.messageType,message:e.modalInfo.message}))}),[e]),(0,u.jsxs)(i.Z,{centered:!1,closeIcon:!0,open:d.openModal,onClose:g,children:[(0,u.jsx)(i.Z.Header,{children:"Message"}),(0,u.jsx)(i.Z.Content,{children:(0,u.jsx)(s.Z,{color:"success"===d.messageType?"green":"warning"===d.messageType?"orange":"red",children:(0,u.jsx)(s.Z.Header,{children:d.message})})}),(0,u.jsx)(i.Z.Actions,{children:(0,u.jsx)(l.Z,{color:"grey",onClick:g,children:"Close"})})]})}},6895:function(e,t,n){var r=n(1413),a=n(885),o=n(2791),i=n(6152),s=n(1257),l=n(2417),c=n(834),u=n(2836),f=(n(5498),n(5125)),d=n(184);t.Z=function(e){i.kL.register(i.uw,i.ST,i.f$,i.od,i.jn,i.Dx,i.u,i.De,i.FB,i.ho);var t=e.plotPath,n=(0,o.useState)(!1),p=(0,a.Z)(n,2),g=p[0],h=p[1],m=(0,o.useRef)(g);m.current=g;var y=(0,o.useState)(!1),v=(0,a.Z)(y,2),x=v[0],b=v[1],D=(0,o.useRef)(),j={type:"line",borderColor:"#007bff",backgroundColor:"#007bff",order:2,pointStyle:"circle",radius:7,hoverRadius:10,parsing:{xAxisKey:"valueTime",yAxisKey:"value"}},O={label:"Adaptation Plans",type:"scatter",borderColor:"black",backgroundColor:"white",pointStyle:"rectRot",radius:7,hoverRadius:10,order:1,parsing:{xAxisKey:"valueTime",yAxisKey:"value"}},Z={type:"line",borderColor:"#ff0000",backgroundColor:"#ff0000",order:3,pointStyle:"circle",radius:7,hoverRadius:10,parsing:{xAxisKey:"valueTime",yAxisKey:"value"}},S=(0,o.useState)({datasets:[]}),w=(0,a.Z)(S,2),C=w[0],I=w[1],P=(0,o.useState)({animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,maintainAspectRatio:!0,responsive:!0,plugins:{legend:{position:"top",labels:{usePointStyle:!0},reverse:!0},tooltip:{usePointStyle:!0,backgroundColor:"rgba(0, 0, 0, 0.5)",callbacks:{label:function(e){return 1===e.datasetIndex?"Plan Id: "+e.raw.planId:"Value: "+Math.round(1e3*e.raw.value)/1e3}}}},scales:{x:{type:"time",parsing:"false",time:{displayFormats:{second:"dd/MM/yyyy, HH:mm:ss",minute:"dd/MM/yyyy, HH:mm:ss",hour:"dd/MM/yyyy, HH:mm:ss",day:"dd/MM/yyyy, HH:mm:ss",week:"dd/MM/yyyy, HH:mm:ss",month:"dd/MM/yyyy, HH:mm:ss",quarter:"dd/MM/yyyy, HH:mm:ss",year:"dd/MM/yyyy, HH:mm:ss"},minUnit:"second",tooltipFormat:"dd/MM/yyyy, HH:mm:ss"},title:{display:!0,text:"Timestamp (dd/MM/yyyy, HH:mm:ss)",color:"#0057b3",font:{family:"Helvetica",weight:"bold"}},ticks:{font:{},color:"#000000",autoSkip:!0},min:e.startDate,max:e.endDate},y:{beginAtZero:!0,title:{display:!0,text:e.plotData.ylabel,color:"#0057b3",font:{family:"Helvetica",weight:"bold"}},ticks:{maxTicksLimit:20,font:{},color:"#000000"}}},onResize:function(){var e=window.location.href.split("/");if(e[e.length-1]!==t)return;h(!1)}}),M=(0,a.Z)(P,2),N=M[0],R=M[1];(0,o.useEffect)((function(){var t=[];t.push((0,r.Z)((0,r.Z)({},j),{},{label:e.plotData.dataSetMetric.label,data:e.plotData.dataSetMetric.data})),void 0!==e.plotData.plansData&&t.push((0,r.Z)((0,r.Z)({},O),{},{data:e.plotData.plansData})),void 0!==e.plotData.simulationData&&t.push((0,r.Z)((0,r.Z)({},Z),{},{label:"Simulation Values",data:e.plotData.simulationData})),I((0,r.Z)((0,r.Z)({},C),{},{datasets:t}))}),[e]),(0,o.useEffect)((function(){R((function(t){var n=JSON.parse(JSON.stringify(t));return n.scales.x.min=e.startDate,n.scales.x.max=e.endDate,n.onResize=t.onResize,n.plugins.tooltip.callbacks.label=t.plugins.tooltip.callbacks.label,n}))}),[e.startDate]);var k=[{beforeDraw:function(e){if(!m.current){var t=e.height,n=3*t/100,r=5*t/100,a=3.5*t/100;R((function(e){var t=JSON.parse(JSON.stringify(e));return t.scales.x.ticks.font.size=n,t.scales.y.ticks.font.size=n,t.scales.x.title.font.size=r,t.scales.y.title.font.size=r,t.plugins.legend.labels.font={size:a},t.onResize=e.onResize,t.plugins.tooltip.callbacks.label=e.plugins.tooltip.callbacks.label,t})),h(!0)}}}];return 0===C.datasets.length?(0,d.jsx)(l.Z,{active:!0,inline:"centered",children:" Preparing chart "}):(0,d.jsxs)("div",{children:[(0,d.jsxs)(c.Z,{color:"grey",floated:"right",loading:x,onClick:function(){b(!0);var e=D.current.toBase64Image("image/png",1),t=new f.ZP("landscape","px",[D.current.width,D.current.height]);t.addImage(e,"PNG",0,0,D.current.width,D.current.height),t.save("Plot.pdf"),b((function(e){return!e}))},children:[(0,d.jsx)(u.Z,{name:"download"}),"Download Chart"]}),(0,d.jsx)("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex"},children:(0,d.jsx)(s.kL,{ref:D,onClick:function(e){console.log((0,s.Lm)(D.current,e)),console.log((0,s.cX)(D.current,e)),console.log((0,s.E9)(D.current,e))},options:N,data:C,plugins:g?null:k,style:{display:g?"block":"none"}})})]})}},1206:function(e,t,n){n.r(t);var r=n(2982),a=n(7762),o=n(5861),i=n(885),s=n(7757),l=n.n(s),c=n(2791),u=n(4581),f=n(899),d=n(9402),p=n(2836),g=n(4863),h=n(2966),m=n(6303),y=n(2417),v=(n(6032),n(5409)),x=n(6895),b=n(5051),D=n(9778),j=n(6117),O=n(184);t.default=function(){var e=(0,c.useState)(null),t=(0,i.Z)(e,2),n=t[0],s=t[1],Z=(0,c.useState)(!1),S=(0,i.Z)(Z,2),w=S[0],C=S[1],I=(0,c.useRef)(n);I.current=n;var P=(0,c.useState)(!1),M=(0,i.Z)(P,2),N=M[0],R=M[1],k=(0,c.useState)({openModal:!1}),E=(0,i.Z)(k,2),T=E[0],J=E[1];function A(e){var t=new FileReader;t.addEventListener("load",(function(e){var t=JSON.parse(e.target.result);t.ready=!1;var r=JSON.parse(JSON.stringify(n));r.push(t),s(r)})),t.readAsText(e.target.files[0])}function H(e){var t=new FileReader,a=parseInt(e.currentTarget.getAttribute("plotindex"));t.addEventListener("load",(function(e){var t=(0,r.Z)(n),o=JSON.parse(e.target.result);t[a].configObject=o,t[a].replace=!0,s(t)})),t.readAsText(e.target.files[0])}function z(e,t){s((function(e){var n=JSON.parse(JSON.stringify(e));return n[t.plotindex].plotConfigName=t.value,n}))}function B(e,t){return F.apply(this,arguments)}function F(){return(F=(0,o.Z)(l().mark((function e(t,r){var a,o,i,c;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(0,b.Z)().validStringOrDropDownSelection(n[r.plotindex].plotConfigName)){e.next=17;break}return a=JSON.parse(JSON.stringify(n[r.plotindex])),o={plotConfigName:a.plotConfigName},i={plotConfigName:a.plotConfigName},delete a.ready,delete a.plotConfigName,e.next=8,new Blob([JSON.stringify(a)],{type:"application/json"}).arrayBuffer();case 8:return i.configObject=e.sent,i.configObject=Array.from(new Uint8Array(i.configObject)),e.next=12,(0,v.Z)().savePlotConfig(i);case 12:200===(c=e.sent).status?(o.configObject=a,o.plotConfigId=c.data.plotConfigId,s((function(e){var t=JSON.parse(JSON.stringify(e));return t[r.plotindex]=o,t})),K(a,r.plotindex)):(c.data.openModal=!0,J(c.data)),R(!1),e.next=18;break;case 17:R(!0);case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e,t){return L.apply(this,arguments)}function L(){return(L=(0,o.Z)(l().mark((function e(t,r){var a,o,i,c;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(0,b.Z)().validStringOrDropDownSelection(n[r.plotindex].plotConfigName)){e.next=16;break}return a=JSON.parse(JSON.stringify(n[r.plotindex])),o={plotConfigName:a.plotConfigName,plotConfigId:a.plotConfigId},delete a.replace,delete a.plotData,e.next=7,new Blob([JSON.stringify(a.configObject)],{type:"application/json"}).arrayBuffer();case 7:return o.configObject=e.sent,o.configObject=Array.from(new Uint8Array(o.configObject)),e.next=11,(0,v.Z)().replacePlotConfig(o);case 11:200===(i=e.sent).status?((c=JSON.parse(JSON.stringify(n)))[r.plotindex]=a,s(c),K(a.configObject,r.plotindex)):(i.data.openModal=!0,J(i.data)),R(!1),e.next=17;break;case 16:R(!0);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(e,t){return Q.apply(this,arguments)}function Q(){return(Q=(0,o.Z)(l().mark((function e(t,n){var r,a,o,i,c,u;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={metricId:t.metricId,dataType:t.dataType,addPlansInfo:t.addPlansInfo},t.livePlot?(a=new Date,o=new Date(a.getTime()-6e4),t.startDate=o,t.endDate=a,r.startDate=parseInt(o.valueOf()/1e3),r.endDate=parseInt(a.valueOf()/1e3)):(r.startDate=t.startDate,r.endDate=t.endDate),e.next=4,(0,v.Z)().getResourceData(t.resourceId,r);case 4:i=e.sent,c={label:t.metricLabel,data:i[0].listOfDataPoints},(u={}).dataSetMetric=c,"raw"===t.dataType?u.ylabel=i[0].descriptionInfo:(u.ylabel="Metric value ( 0<= y <=1)",t.addPlansInfo&&(i[0].listOfPlansInfo.forEach((function(e,t,n){e.value=i[0].listOfDataPoints.find((function(t){return t.valueTime===e.valueTime})).value})),u.plansData=i[0].listOfPlansInfo)),s((function(e){var r=JSON.parse(JSON.stringify(e));if(r[n].plotData=u,r[n].configObject.startDate=t.startDate,r[n].configObject.endDate=t.endDate,t.livePlot){var a=setInterval((function(){$(t,n,a)}),1e3);r[n].liveDataAPIRequestFunctionTimer=a}return r}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(e,t,n){return G.apply(this,arguments)}function G(){return(G=(0,o.Z)(l().mark((function e(t,n,r){var a,o,i,c,u;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=window.location.href.split("/"),e.prev=1,""===a[a.length-1]&&!("replace"in I.current[n])){e.next=7;break}return clearInterval(I.current[n].liveDataAPIRequestFunctionTimer),e.abrupt("return");case 7:if(!("removed"in I.current[n])||!0!==I.current[n].removed){e.next=11;break}return clearInterval(I.current[n].liveDataAPIRequestFunctionTimer),s((function(e){var t=JSON.parse(JSON.stringify(e));t.splice(n,1);for(var r=function(e){if(t[e].configObject.livePlot){var n=setInterval((function(){$(t[e].configObject,e,n)}),1e3);t[e].configObject.liveDataAPIRequestFunctionTimer=n}},a=n;a<t.length;a++)r(a);return t})),e.abrupt("return");case 11:e.next=17;break;case 13:return e.prev=13,e.t0=e.catch(1),clearInterval(r),e.abrupt("return");case 17:return o={metricId:t.metricId,dataType:t.dataType,addPlansInfo:t.addPlansInfo},i=new Date,c=new Date(i.getTime()-6e4),o.startDate=parseInt(c.valueOf()/1e3),o.endDate=parseInt(i.valueOf()/1e3),e.next=24,(0,v.Z)().getResourceData(t.resourceId,o);case 24:u=e.sent,t.addPlansInfo&&u[0].listOfPlansInfo.forEach((function(e,t,n){e.value=u[0].listOfDataPoints.find((function(t){return t.valueTime===e.valueTime})).value})),s((function(e){var r=JSON.parse(JSON.stringify(e));return r[n].plotData.dataSetMetric.data=u[0].listOfDataPoints,t.addPlansInfo&&(t.plansData=u[0].listOfPlansInfo),r[n].configObject.startDate=c,r[n].configObject.endDate=i,r}));case 27:case"end":return e.stop()}}),e,null,[[1,13]])})))).apply(this,arguments)}function U(e,t){return V.apply(this,arguments)}function V(){return(V=(0,o.Z)(l().mark((function e(t,r){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s((function(e){var t=JSON.parse(JSON.stringify(e));return t[r.plotindex].removed=!1,t})),e.next=3,(0,v.Z)().deletePlotConfig(n[r.plotindex].plotConfigId);case 3:200===e.sent&&(!1===n[r.plotindex].configObject.livePlot?s((function(e){var t=JSON.parse(JSON.stringify(e));t.splice(r.plotindex,1);for(var n=function(e){if(t[e].configObject.livePlot){var n=setInterval((function(){$(t[e].configObject,e,n)}),1e3);t[e].configObject.liveDataAPIRequestFunctionTimer=n}},a=r.plotindex;a<t.length;a++)n(a);return t})):s((function(e){var t=JSON.parse(JSON.stringify(e));return t[r.plotindex].removed=!0,t})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e,t){for(var r=[],a=0;a<2&&t<=n.length;a++)r.push((0,O.jsx)(u.Z.Column,{children:(0,O.jsx)(f.Z,{children:t<n.length?(0,O.jsx)("div",{children:"replace"in n[t]?(0,O.jsx)(d.Z,{children:(0,O.jsxs)(d.Z.Group,{children:[(0,O.jsx)(d.Z.Input,{label:"Insert new plot configuration name:",onChange:z,plotindex:t,error:N&&!(0,b.Z)().validStringOrDropDownSelection(n[t].plotConfigName)?{content:"Please insert a name for the plot configuration",pointing:"above"}:null}),(0,O.jsx)(d.Z.Button,{plotindex:t,onClick:q,children:"Replace"})]})}):"ready"in n[t]?(0,O.jsxs)(d.Z,{children:[(0,O.jsx)(d.Z.Group,{children:(0,O.jsx)(d.Z.Input,{label:"Insert plot configuration name:",onChange:z,plotindex:t,error:N&&!(0,b.Z)().validStringOrDropDownSelection(n[t].plotConfigName)?{content:"Please insert a name for the plot configuration",pointing:"above"}:null})}),(0,O.jsx)("div",{align:"right",children:(0,O.jsxs)(d.Z.Button,{icon:!0,color:"grey",plotindex:t,onClick:B,children:[(0,O.jsx)(p.Z,{name:"save outline"}),"Save"]})})]}):"plotData"in n[t]?(0,O.jsxs)("div",{children:["removed"in n[t]?(0,O.jsx)(p.Z,{style:{position:"absolute",top:"-23px",right:"-29px",fontSize:"3rem",background:"white"},loading:!0,name:"circle notch",color:"red"}):(0,O.jsx)(p.Z,{plotindex:t,style:{position:"absolute",top:"-12px",right:"-21px",background:"white",fontSize:"3rem",cursor:"pointer",height:"0.5em",width:"0.9em"},name:"remove circle",color:"red",onClick:U}),(0,O.jsx)(g.Z,{as:"h3",textAlign:"center",children:n[t].plotConfigName}),(0,O.jsx)(h.Z,{}),(0,O.jsx)(x.Z,{plotPath:"",plotData:n[t].plotData,startDate:"object"===typeof n[t].configObject.startDate?n[t].configObject.startDate:"string"===typeof n[t].configObject.startDate?new Date(n[t].configObject.startDate):new Date(1e3*n[t].configObject.startDate),endDate:"object"===typeof n[t].configObject.endDate?n[t].configObject.endDate:"string"===typeof n[t].configObject.endDate?new Date(n[t].configObject.endDate):new Date(1e3*n[t].configObject.endDate)}),(0,O.jsx)(h.Z,{}),(0,O.jsxs)(m.Z,{color:"blue",style:{cursor:"pointer",float:"right",marginTop:"-5px"},as:"label",size:"large",children:[(0,O.jsx)(p.Z,{name:"exchange"}),(0,O.jsx)("input",{type:"file",style:{display:"none"},plotindex:t,onChange:H}),"Replace Configuration"]}),(0,O.jsx)("br",{})]}):(0,O.jsx)(y.Z,{active:!0,inline:"centered",children:" Retrieving plot data... "})}):(0,O.jsxs)(m.Z,{color:"blue",style:{cursor:"pointer"},as:"label",size:"big",children:[(0,O.jsx)(p.Z,{name:"add"}),(0,O.jsx)("input",{type:"file",style:{display:"none"},onChange:A}),"Plot Configuration"]})})},a)),t++;return r}return(0,c.useEffect)((function(){function e(){return(e=(0,o.Z)(l().mark((function e(){var t,n,r,o,i;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,v.Z)().getPlotsConfigs();case 2:t=e.sent,n=(0,a.Z)(t);try{for(n.s();!(r=n.n()).done;)(o=r.value).configObject=JSON.parse(D.lW.from(o.configObject,"base64"))}catch(l){n.e(l)}finally{n.f()}for(s(t),C(!0),i=0;i<t.length;i++)K(t[i].configObject,i);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),(0,O.jsxs)("div",{children:[(0,O.jsx)(u.Z,{centered:!0,children:(0,O.jsx)(u.Z.Row,{children:(0,O.jsx)(u.Z.Column,{width:15,children:(0,O.jsx)(h.Z,{section:!0,horizontal:!0,children:(0,O.jsx)(g.Z,{as:"h1",textAlign:"center",children:" Imported Favourite Plots"})})})})}),(0,O.jsx)("br",{}),w?(0,O.jsx)(u.Z,{stackable:!0,padded:!0,columns:2,children:function(){for(var e=[],t=0,r=0;r<3&&t<=n.length;r++)e.push((0,O.jsx)(u.Z.Row,{children:W(0,t)},r)),t+=2;return e}()}):(0,O.jsx)(y.Z,{active:!0,inline:"centered",children:" Retrieving plots configurations... "}),(0,O.jsx)(j.Z,{successPath:"/",modalInfo:T})]})}},5051:function(e,t){t.Z=function(){return{validIntGreaterThanZero:function(e){return!!new RegExp("^[0]*[1-9][0-9]*$").test(e)},validIntGreaterOrEqualThanZero:function(e){return!!new RegExp("^[0-9]+$").test(e)},validFloatBetweenZeroAndOne:function(e){return!!new RegExp("(^0((\\.?)|(\\.[0-9]*))$)|(^1((\\.?)|(\\.0*))$)").test(e)},validStringOrDropDownSelection:function(e){return void 0!==e&&null!==e&&""!==e},validFloat:function(e){return!!new RegExp("^[0-9]+(\\.?)[0-9]*$").test(e)},validDropDownMultipleSelection:function(e){return 0!==e.length},validTimeStamp:function(e){if(null===e)return!1;var t=e.split("T");if(2!==t.length)return!1;var n=t[0].split("-"),r=t[1].split(":"),a=parseInt(n[1]),o=parseInt(n[2]);if(a<=7){if(a%2===0)if(2===a){if(function(e){if(e%4===0){if(e%100!==0)return!0;if(e%400===0)return!0}return!1}(parseInt(n[0]))){if(o>29)return!1}else if(o>28)return!1}else if(o>30)return!1}else if(a%2===1&&o>30)return!1;return!(r[2]>59)}}}},5409:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(4569),a=n.n(r);var o=function(){var e="http://10.3.3.68:8080/";return{getMetrics:function(e){return a().get("http://10.3.3.68:8080/getMetrics",{params:e}).then((function(e){return e.data.metrics})).catch((function(e){return console.log("Error:",e.message),null}))},getMetricById:function(t,n){var r=e+"getMetrics/"+t;return a().get(r).then((function(e){n(e.data.metric)})).catch((function(e){return console.log("Error:",e.message),null}))},createMetric:function(e){return a().post("http://10.3.3.68:8080/createMetric",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))},getDescriptions:function(e){return a().get("http://10.3.3.68:8080/getDescriptions",{params:e}).then((function(e){return e.data.descriptions})).catch((function(e){return console.log("Error:",e.message),null}))},getQualityModels:function(e,t){return a().get("http://10.3.3.68:8080/getQualityModels",{params:e}).then((function(e){t(e.data.qualityModels)})).catch((function(e){return console.log("Error:",e.message),null}))},getQualityModelById:function(t,n){var r=e+"getQualityModels/"+t;return a().get(r).then((function(e){n(e.data.qualityModel)})).catch((function(e){return console.log("Error:",e.message),null}))},createQualityModel:function(e){return a().post("http://10.3.3.68:8080/createQualityModel",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))},createConfigurationProfile:function(e){return a().post("http://10.3.3.68:8080/createConfigurationProfile",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))},getConfigurationProfileById:function(t,n){var r=e+"getConfigurationProfile/"+t;return a().get(r).then((function(e){n(e.data.configurationProfile)})).catch((function(e){return console.log("Error:",e.message),null}))},getActiveResources:function(e){return a().get("http://10.3.3.68:8080/getResources",{params:e}).then((function(e){return e.data.resources})).catch((function(e){return console.log("Error:",e.message),null}))},getResourceWeightsAndMetricsTree:function(t){var n=e+"getResources/"+t+"/weightedTree";return a().get(n).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),null}))},getConfigurationProfileListOfMetrics:function(t,n){var r=e+"getConfigurationProfile/"+t+"/listOfMetrics";return a().get(r,{params:n}).then((function(e){return e.data.listOfMetrics})).catch((function(e){return console.log("Error:",e.message),null}))},getResourceData:function(t,n){var r=e+"getResources/"+t+"/data";return a().get(r,{params:n}).then((function(e){return e.data.plotData})).catch((function(e){return console.log("Error:",e.message),null}))},getSimulationData:function(e){return a().patch("http://10.3.3.68:8080/simulateData",e).then((function(e){return e.data.simulationData})).catch((function(e){return console.log("Error:",e.message),null}))},getPlotsConfigs:function(){return a().get("http://10.3.3.68:8080/getPlotsConfigs").then((function(e){return e.data.plotsConfigs})).catch((function(e){return console.log("Error:",e.message),null}))},savePlotConfig:function(e){return a().post("http://10.3.3.68:8080/addPlotConfig",e).then((function(e){return e})).catch((function(e){return console.log("Error:",e.message),e.response}))},replacePlotConfig:function(e){return a().put("http://10.3.3.68:8080/replacePlotConfig",e).then((function(e){return e})).catch((function(e){return console.log("Error:",e.message),e.response}))},deletePlotConfig:function(t){var n=e+"deletePlotConfig/"+t;return a().delete(n).then((function(e){return e.status})).catch((function(e){return console.log("Error:",e.message),null}))},getRulesNames:function(e){return a().get("http://10.3.3.68:8080/getRules",{params:e}).then((function(e){return e.data.rulesNames})).catch((function(e){return console.log("Error:",e.message),null}))},getRuleCode:function(t){var n=e+"getRules/"+t;return a().get(n).then((function(e){return e.data.ruleDetail})).catch((function(e){return console.log("Error:",e.message),null}))},removeRule:function(t){var n=e+"removeRule/"+t;return a().delete(n).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),null}))},getActionsAndConfigsByResource:function(e){return a().get("http://10.3.3.68:8080/getActions/",{params:e}).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),null}))},createRule:function(e){return a().post("http://10.3.3.68:8080/addRule",e).then((function(e){return e.data})).catch((function(e){return console.log("Error:",e.message),console.log("Error contents:",e.response),e.response.data}))}}}}}]);
//# sourceMappingURL=206.5b774a58.chunk.js.map