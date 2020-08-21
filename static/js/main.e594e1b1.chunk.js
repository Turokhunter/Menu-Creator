(this["webpackJsonpMenu-Creator"]=this["webpackJsonpMenu-Creator"]||[]).push([[0],{103:function(e,n,t){},107:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),i=t(16),o=t.n(i),l=(t(70),t(11)),c=t(12),s=t(14),u=t(13),d=t(112),p=function(e){var n=e.handleAdd;return r.a.createElement(r.a.Fragment,null,"Options:"," ",r.a.createElement(d.a,{variant:"outline-primary",value:"checkbox",onClick:n},"Checkbox")," ",r.a.createElement(d.a,{variant:"outline-primary",value:"dropdown",onClick:n},"Dropdown")," ",r.a.createElement(d.a,{variant:"outline-primary",value:"colorpicker",onClick:n},"Color Picker")," ")},m=t(52),h=t.n(m),g=(t(85),t(111)),f=t(54),b=t(108),v=function(e){var n=e.option,t=e.handleUpdate;return r.a.createElement(g.a,null,r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:f.a},r.a.createElement(b.a,null,r.a.createElement(b.a.Prepend,null,r.a.createElement(b.a.Text,{id:"nameLabel"},"Name:")),r.a.createElement(g.a.Control,{value:n.name,name:"name",type:"text",placeholder:"Name",onChange:t})))),r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:f.a},r.a.createElement(b.a,null,r.a.createElement(b.a.Prepend,null,r.a.createElement(b.a.Text,{id:"priceDiffLabel"},"Price Difference:")),r.a.createElement(b.a.Checkbox,{name:"priceDiff","aria-label":"option 1",checked:n.priceDiff,onChange:t})))))},x=t(109),E=t(4),O=t(5);function k(){var e=Object(E.a)(["\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    width: 16px;\n    height: 16px;\n    cursor: pointer;\n    user-drag: none;\n    user-select: none;\n    -moz-user-select: none;\n    -webkit-user-drag: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n"]);return k=function(){return e},e}function y(){var e=Object(E.a)(["\n    position: relative;\n    margin: 3px;\n    font-size: 13px;\n    border: 1px dashed #3b9de9;\n    border-radius: 4px;\n    padding: 0 8px;\n    line-height: 30px;\n    color: #666666;\n    background: rgba(255, 255, 255, 0.7);\n"]);return y=function(){return e},e}function j(){var e=Object(E.a)(["\n    border-bottom: 2px solid;\n    border-color: gray;\n    background: #5583d8;\n    color: white;\n    padding-left: 10px;\n    border-radius: 6px 6px 0px 0px;\n"]);return j=function(){return e},e}function C(){var e=Object(E.a)(["\n  background-color: transparent;\n  border: 0px;\n"]);return C=function(){return e},e}function w(){var e=Object(E.a)(["\n  padding-top: 6px;\n"]);return w=function(){return e},e}function S(){var e=Object(E.a)(["\n  padding-left : 30px;\n"]);return S=function(){return e},e}function z(){var e=Object(E.a)(["\n  padding-top: 6px;\n"]);return z=function(){return e},e}function D(){var e=Object(E.a)(["\n    border: 1px solid #E9E9E9;\n    border-radius: 4px;\n    height: 140px;\n    padding: 5px;\n"]);return D=function(){return e},e}var T=O.a.div(D()),A=O.a.h5(z()),N=O.a.label(S()),I=O.a.div(w()),U=Object(O.a)(d.a)(C()),P=O.a.div(j()),H=O.a.div(y()),V=O.a.img(k()),B=t(30),R=t(58),F=function(e){var n=e.option,t=e.handleClickDeleteOption,a=e.handleClickDuplicateOption,i=n.type.charAt(0).toUpperCase()+n.type.slice(1);return r.a.createElement(P,null,r.a.createElement(x.a,null,r.a.createElement(f.a,{xs:9},r.a.createElement("div",{className:"MyDragHandleClassName"},r.a.createElement(A,null,i,":",n.id))),r.a.createElement(f.a,null,"  ",r.a.createElement(U,{variant:"light",onClick:function(e){return a(n)}},r.a.createElement(R.a,null))," ",r.a.createElement(U,{variant:"light",onClick:function(e){return t(n)}},r.a.createElement(B.a,null)))))},G=function(e){var n=e.option,t=e.handleUpdate;return r.a.createElement(g.a,null,r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:f.a},r.a.createElement(b.a,null,r.a.createElement(b.a.Prepend,null,r.a.createElement(b.a.Text,{id:"prceDiffLabel"},"Checked:")),r.a.createElement(b.a.Checkbox,{name:"selected","aria-label":"option 1",checked:n.selected,onChange:t})))))},J=t(53),L=t(31),q=t.n(L),M=t(32),W=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(e){var a;return Object(l.a)(this,t),(a=n.call(this,e)).setTagText=function(e){a.tagName=e},a.handleClickAddTag=function(){a.props.handleClickAddTag({tagId:a.tagId,tagName:a.tagName.value}),a.tagId+=1,a.tagName.value=""},a.handleEnterAddTag=function(e){"Enter"===e.key&&""!==a.tagName.value&&(a.handleClickAddTag(),e.preventDefault())},a.tagName="",a.tagId=0,0!==e.option.items.length&&(a.tagId=e.option.items.reduce((function(e,n){return Math.max(e.id,n.id)}))+1),a}return Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,null,r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:f.a,md:"8"},r.a.createElement(b.a,null,r.a.createElement(b.a.Prepend,null,r.a.createElement(b.a.Text,null,"Selected:")),r.a.createElement(g.a.Control,{as:"select",name:"selected",onChange:this.props.handleUpdate},r.a.createElement("option",{key:"-1",value:"-1"}," "),this.props.option.items.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)}))))))),r.a.createElement(b.a,null,r.a.createElement(J.a,{placeholder:"Tag",onKeyDown:this.handleEnterAddTag,ref:this.setTagText}),r.a.createElement(b.a.Append,null,r.a.createElement(d.a,{onClick:this.handleClickAddTag,variant:"info"},"Add"))),r.a.createElement(T,null,r.a.createElement(M.DraggableArea,{tags:this.props.option.items,render:function(n){var t=n.tag;n.index;return r.a.createElement(H,null,r.a.createElement(V,{src:q.a,onClick:function(){return e.props.handleClickDeleteTag(t)}}),t.name)},onChange:function(n){return e.props.handleUpdatingTagOrder(n)}})))}}]),t}(r.a.Component),$=t(59),K=function(e,n){return"exclude"===e.colorInclusion?n.filter((function(n){var t,a=Object($.a)(e.items);try{for(a.s();!(t=a.n()).done;){if(t.value.id===n.id)return!1}}catch(r){a.e(r)}finally{a.f()}return!0})):"include"===e.colorInclusion?n.filter((function(n){return e.items.some((function(e){return n.id===e.id}))})):n},Y=t(33),Q=t(60),X=t.n(Q),Z=function(e){return e.name},_=function(e){return r.a.createElement("div",null,e.name)};var ee=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(e){var a;return Object(l.a)(this,t),(a=n.call(this,e)).getSuggestions=function(e){var n=e.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");if(""===n)return[];var t=new RegExp(n,"i");return a.state.filament.filter((function(e){return-1!==e.name.search(t)}))},a.onSuggestionsFetchRequested=function(e){var n=e.value;a.setState({suggestions:a.getSuggestions(n)})},a.onSuggestionsClearRequested=function(){a.setState({suggestions:[]})},a.onSuggestionSelected=function(e,n){var t=n.suggestionValue,r=a.state.filament.filter((function(e){return e.name===t}));0!==r.length&&(0===a.props.option.items.filter((function(e){return e.name===r[0].name})).length&&(a.props.handleClickAddTag({tagId:r[0].id,tagName:r[0].name}),a.setState({choices:K(a.props.option,a.state.filament)})),a.setState({color:""}))},a.setColor=function(e,n){var t=n.newValue;n.method;a.setState({color:t})},a.handleClickAddAllColor=function(){for(var e=[],n=0;n<a.state.filament.length;n++)e.push({id:a.state.filament[n].id,name:a.state.filament[n].name});a.props.handleUpdatingTagOrder(e),a.setState({choices:K(a.props.option,a.state.filament)})},a.handleClickClearAllColor=function(){a.props.handleUpdatingTagOrder([]),a.setState({choices:K(a.props.option,a.state.filament)})},a.state={color:"",suggestions:[],filament:Y.filament},a}return Object(c.a)(t,[{key:"updateSelectchoice",value:function(e,n){return K(e,n)}},{key:"render",value:function(){var e=this,n=this.state,t=n.color,a=n.suggestions,i={placeholder:"Color",value:t,onChange:this.setColor,disabled:"all"===this.props.option.colorInclusion},o={container:"autosuggest",input:"form-control",suggestionsContainer:"dropdown",suggestionsList:"dropdown-menu ".concat(a.length?"show":""),suggestion:"dropdown-item",suggestionHighlighted:"active"},l=this.updateSelectchoice(this.props.option,this.state.filament);return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,null,r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:f.a,md:"8"},r.a.createElement(b.a,null,r.a.createElement(b.a.Prepend,null,r.a.createElement(b.a.Text,null,"Selected:")),r.a.createElement(g.a.Control,{as:"select",name:"colorId",onChange:this.props.handleUpdate},r.a.createElement("option",{key:"-1",value:"-1"}," "),l.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})))))),r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Group,{as:f.a},r.a.createElement(b.a,null,r.a.createElement(b.a.Prepend,null,r.a.createElement(b.a.Text,null,"Color Enclusion:")),r.a.createElement(I,null,r.a.createElement(N,{className:"radio-inline"},r.a.createElement("input",{type:"radio",name:"colorInclusion",value:"all",checked:"all"===this.props.option.colorInclusion,onChange:this.props.handleUpdate,className:"form-check-input"}),"All"),r.a.createElement(N,{className:"radio-inline"},r.a.createElement("input",{type:"radio",name:"colorInclusion",value:"include",className:"form-check-input",checked:"include"===this.props.option.colorInclusion,onChange:this.props.handleUpdate}),"Include"),r.a.createElement(N,{className:"radio-inline"},r.a.createElement("input",{type:"radio",name:"colorInclusion",value:"exclude",className:"form-check-input",checked:"exclude"===this.props.option.colorInclusion,onChange:this.props.handleUpdate}),"Exclude")))))),r.a.createElement(b.a,null,r.a.createElement(X.a,{suggestions:a,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested,onSuggestionsClearRequested:this.onSuggestionsClearRequested,onSuggestionSelected:this.onSuggestionSelected,getSuggestionValue:Z,renderSuggestion:_,inputProps:i,theme:o}),r.a.createElement(b.a.Append,null,r.a.createElement(d.a,{onClick:this.handleClickAddAllColor,variant:"info",disabled:"all"===this.props.option.colorInclusion},"Add All")),r.a.createElement(b.a.Append,null,r.a.createElement(d.a,{onClick:this.handleClickClearAllColor,variant:"info",disabled:"all"===this.props.option.colorInclusion},"Clear All"))),r.a.createElement(T,null,r.a.createElement(M.DraggableArea,{tags:this.props.option.items,render:function(n){var t=n.tag;n.index;return r.a.createElement(H,null,r.a.createElement(V,{src:q.a,onClick:function(){return e.props.handleClickDeleteTag(t)}}),t.name)},onChange:function(n){return e.props.handleUpdatingTagOrder(n)}})))}}]),t}(r.a.Component),ne=t(110),te=function(e){var n=e.option,t=e.handleUpdate,a=e.handleUpdatingTagOrder,i=e.handleClickDeleteTag,o=e.handleClickAddTag;return"checkbox"===n.type?r.a.createElement(G,{option:n,handleUpdate:t}):"dropdown"===n.type?r.a.createElement(W,{option:n,handleUpdate:t,handleUpdatingTagOrder:a,handleClickDeleteTag:i,handleClickAddTag:o}):"colorpicker"===n.type?r.a.createElement(ee,{option:n,handleUpdate:t,handleUpdatingTagOrder:a,handleClickDeleteTag:i,handleClickAddTag:o}):void 0},ae=function(e){var n=e.option,t=e.handleUpdate,a=e.handleUpdatingTagOrder,i=e.handleClickDeleteTag,o=e.handleClickAddTag,l=e.handleClickDeleteOption,c=e.handleClickDuplicateOption;return r.a.createElement("div",{className:"panel"},r.a.createElement(F,{option:n,handleClickDeleteOption:l,handleClickDuplicateOption:c}),r.a.createElement(ne.a,{style:{paddingTop:"6px"}},r.a.createElement(v,{option:n,handleUpdate:t}),r.a.createElement(te,{option:n,handleUpdate:t,handleUpdatingTagOrder:a,handleClickDeleteTag:i,handleClickAddTag:o})))},re=function(e){for(var n=e.options,t=e.handleUpdate,a=e.handleUpdatingTagOrder,i=e.handleClickDeleteTag,o=e.handleClickAddTag,l=e.handleClickDeleteOption,c=e.handleUpdatingOptionOrder,s=e.handleClickDuplicateOption,u=[],d=0,p=0;p<n.length;p++){var m=n[p],g=4;"dropdown"===m.type?g=9:"checkbox"===m.type?g=5:"colorpicker"===m.type&&(g=10),u.push({i:m.id,x:0,y:d,w:1,h:g}),d+=g}return r.a.createElement("div",null,r.a.createElement(h.a,{className:"layout",layout:u,cols:1,rows:12,rowHeight:35,width:500,isResizable:!1,autoSize:!0,onLayoutChange:c,draggableHandle:".MyDragHandleClassName"},u.map((function(e,c){return r.a.createElement("div",{key:e.i},r.a.createElement(ae,{option:n[c],handleUpdate:function(e){return t(c,e)},handleUpdatingTagOrder:function(e){return a(c,e)},handleClickDeleteTag:function(e){return i(c,e)},handleClickAddTag:function(e){return o(c,e)},handleClickDeleteOption:l,handleClickDuplicateOption:s}))}))))};function ie(){var e=Object(E.a)(["\n  padding-top: 8px;\n"]);return ie=function(){return e},e}function oe(){var e=Object(E.a)(["\n  position: relative;\n  right: 10px;\n"]);return oe=function(){return e},e}function le(){var e=Object(E.a)(["\n"]);return le=function(){return e},e}O.a.div(le());var ce=Object(O.a)(d.a)(oe()),se=O.a.div(ie()),ue=function(e){var n=e.data,t=e.handleSetPrice;return r.a.createElement(ne.a,null,r.a.createElement(x.a,{className:"d-flex justify-content-between"},r.a.createElement(f.a,null,r.a.createElement(se,null,"Number of Varients: ",n.numVarients)),r.a.createElement(ce,{onClick:t},"Set Price")))};function de(){var e=Object(E.a)(["\n  display: flex;\n  width : 520px;\n  align-items: center;\n  position: relative;\n  z-index: 10;\n  height: 60px;\n  border-radius: 3px;\n  border-top: 2px solid lightgray;\n  border-right: 2px solid lightgray;\n"]);return de=function(){return e},e}function pe(){var e=Object(E.a)(["\n    width : 520px;\n    height: ",";\n    overflow: auto;\n    overflow-x:hidden;\n"]);return pe=function(){return e},e}function me(){var e=Object(E.a)(["\n    /* display: flex; */\n    /* align-items: center; */\n    z-index: 10;\n    height: 50px;\n    width: 520px;\n    border-radius: 3px;\n    border-bottom: 2px solid lightgray;\n    border-right: 2px solid lightgray;\n"]);return me=function(){return e},e}var he=O.a.div(me()),ge=O.a.div(pe(),(function(e){return e.height})),fe=O.a.div(de()),be=t(20);function ve(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}var xe=function(e){var n=e.data,t=e.handleAdd,i=e.handleUpdate,o=e.handleUpdatingTagOrder,l=e.handleClickDeleteTag,c=e.handleClickAddTag,s=e.handleClickDeleteOption,u=e.handleUpdatingOptionOrder,d=e.handleClickDuplicateOption,m=e.handleSetPrice,h=function(){var e=Object(a.useState)(ve()),n=Object(be.a)(e,2),t=n[0],r=n[1];return Object(a.useEffect)((function(){function e(){r(ve())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),t}().height;return r.a.createElement(r.a.Fragment,null,r.a.createElement(he,null,r.a.createElement(p,{handleAdd:t})),r.a.createElement(ge,{height:h-125+"px"},r.a.createElement(re,{options:n.options,handleUpdate:i,handleUpdatingTagOrder:o,handleClickDeleteTag:l,handleClickAddTag:c,handleClickDeleteOption:s,handleUpdatingOptionOrder:u,handleClickDuplicateOption:d})),r.a.createElement(fe,null,r.a.createElement(ue,{data:n,handleSetPrice:m})))},Ee=t(61);function Oe(){var e=Object(E.a)(["\n.Resizer {\n  background: #000;\n  opacity: 0.2;\n  z-index: 1;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-background-clip: padding;\n  -webkit-background-clip: padding;\n  background-clip: padding-box;\n}\n\n.Resizer:hover {\n  -webkit-transition: all 2s ease;\n  transition: all 2s ease;\n}\n\n.Resizer.horizontal {\n  height: 11px;\n  margin: -5px 0;\n  border-top: 5px solid rgba(255, 255, 255, 0);\n  border-bottom: 5px solid rgba(255, 255, 255, 0);\n  cursor: row-resize;\n  width: 100%;\n}\n\n.Resizer.horizontal:hover {\n  border-top: 5px solid rgba(0, 0, 0, 0.5);\n  border-bottom: 5px solid rgba(0, 0, 0, 0.5);\n}\n\n.Resizer.vertical {\n  width: 11px;\n  margin: 0 -5px;\n  border-left: 5px solid rgba(255, 255, 255, 0);\n  border-right: 5px solid rgba(255, 255, 255, 0);\n  cursor: col-resize;\n}\n\n.Resizer.vertical:hover {\n  border-left: 5px solid rgba(0, 0, 0, 0.5);\n  border-right: 5px solid rgba(0, 0, 0, 0.5);\n}\n.Resizer.disabled {\n  cursor: not-allowed;\n}\n.Resizer.disabled:hover {\n  border-color: transparent;\n}\n// .Pane {\n//   -webkit-transition:height .6s ease-in-out;\n//   transition:height .6s ease-in-out;\n//   -moz-transition: height .6s ease-in-out;\n// }\n\n"]);return Oe=function(){return e},e}function ke(){var e=Object(E.a)(["\n  // min-width: 600px;\n  width:100%;\n"]);return ke=function(){return e},e}function ye(){var e=Object(E.a)(["\n  width : 520px;\n"]);return ye=function(){return e},e}function je(){var e=Object(E.a)(["\n  width : 100%;\n  height: 100%;\n  display: flex;\n"]);return je=function(){return e},e}var Ce=O.a.div(je()),we=O.a.div(ye()),Se=O.a.div(ke()),ze=O.a.div(Oe()),De=t(8),Te=t(19);function Ae(e){var n={},t=[],a=[];return e.forEach((function(e){!0===e.priceDiff&&("colorpicker"===e.type?t.length?t.forEach((function(n){var t=Object(Te.a)(n);t.push(e.id+"=Stand"),a.push(t);var r=Object(Te.a)(n);r.push(e.id+"=Prem"),a.push(r);var i=Object(Te.a)(n);i.push(e.id+"=UltPrem"),a.push(i)})):(a.push([e.id+"=Stand"]),a.push([e.id+"=Prem"]),a.push([e.id+"=UltPrem"])):"dropdown"===e.type?t.length?t.forEach((function(n){e.items.forEach((function(t){var r=Object(Te.a)(n);r.push(e.id+"="+t.id),a.push(r)}))})):e.items.forEach((function(n){a.push([e.id+"="+n.id])})):"checkbox"===e.type&&(t.length?t.forEach((function(n){a.push(Object(Te.a)(n).push(e.id+"=true")),a.push(Object(Te.a)(n).push(e.id+"=false"))})):(a.push([e.id+"=true"]),a.push([e.id+"=false"]))),t=Object(Te.a)(a),a=[])})),t.forEach((function(e){n[e.join("&")]=""})),n}function Ne(e,n){for(var a=t(101),r={},i=[],o=function(){var e=Object(be.a)(c[l],2),n=e[0],t=e[1];if("unassigned"===n)return"continue";t.taskIds.forEach((function(e){r[e]=t.title}))},l=0,c=Object.entries(n);l<c.length;l++)o();e.options.forEach((function(e){if("colorpicker"===e.type){var n=Object(De.a)({},e);if("all"===e.colorInclusion);else if("include"===e.colorInclusion){var t=[];e.items.forEach((function(e){t.push(e.id)})),n.includeColor=t}else if("exclude"===e.colorInclusion){t=[];e.items.forEach((function(e){t.push(e.id)})),n.excludeColor=t}delete n.colorInclusion,delete n.items,i.push(n)}else("dropdown"===e.type||"checkbox"===e.type)&&i.push(e)}));var s={mapping:r,options:i},u=JSON.stringify(s,null,2),d=new Blob([u],{type:"application/json"});a.saveAs(d,"file.json")}function Ie(){var e=Object(E.a)(["\n\n"]);return Ie=function(){return e},e}function Ue(){var e=Object(E.a)(["\n  border-radius: 2px;\n  float: left;\n  min-width: 50px !important;\n  height: 35px !important;\n  margin: 0;\n  border: #ccc 1px solid;\n  background-color: #ddd;\n  font-size: 13px;\n  text-align: center;\n  line-height: 35px;\n  white-space: nowrap;\n  text-transform: uppercase;\n  padding: 0 10px;\n  cursor: pointer;\n  &.is-selected {\n    box-shadow: 0px 1px 2px rgba(0,0,0,0.8);\n    border-color: transparent;\n    background-color: #b5c8da;\n  }\n"]);return Ue=function(){return e},e}function Pe(){var e=Object(E.a)(['\n  padding: .75rem;\n  padding-left: .25rem;\n  padding-right: .25rem;\n  display: block;\n  font-size: 16px;\n  font-family: "Work Sans","HelveticaNeue","Helvetica Neue",sans-serif;\n  color: #3d4246;\n  line-height: 1.5;\n']);return Pe=function(){return e},e}function He(){var e=Object(E.a)(['\n  margin: 0px;\n  color: #363636;\n  font-size: 1.5rem;\n  font-weight: 600;\n  line-height: 1.125;\n  font-family: "Work Sans","HelveticaNeue","Helvetica Neue",sans-serif;\n']);return He=function(){return e},e}function Ve(){var e=Object(E.a)(["\n  width: 50px;\n  border-radius: 10%;\n  cursor: pointer;\n  padding: 1px;\n  border: 2px solid;\n  &.is-selected {\n    box-shadow: 1px 4px 5px rgba(0,0,0,0.8);\n    background-color: #b5c8da;\n  }\n"]);return Ve=function(){return e},e}function Be(){var e=Object(E.a)(["\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1.25;\n  position: relative;\n  font-size: 20px;\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n  padding-left: 0.75rem;\n"]);return Be=function(){return e},e}function Re(){var e=Object(E.a)(["\n  padding-top: 40px;\n  width: 560px;\n  overflow:hidden;\n"]);return Re=function(){return e},e}var Fe=Object(O.a)(ne.a)(Re()),Ge=O.a.label(Be()),Je=O.a.img(Ve()),Le=O.a.h3(He()),qe=O.a.div(Pe()),Me=O.a.label(Ue()),We=(O.a.div(Ie()),function(e){var n=e.option;return r.a.createElement(x.a,null,r.a.createElement("div",{className:"form-check"},r.a.createElement(Ge,{className:"form-chech-label"},r.a.createElement("input",{type:"checkbox",className:"form-check-input"}),n.name)))}),$e=function(e){var n=e.option;return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,null,r.a.createElement(Le,null,n.name)),r.a.createElement(x.a,null,n.items.map((function(e){return r.a.createElement(qe,{key:e.id},r.a.createElement(Me,{className:n.selected===e.id&&"is-selected"},e.name))}))))},Ke=function(e){var n=e.option,t=e.filament,a=K(n,t);return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,null,r.a.createElement(Le,null,n.name,""!==n.colorId?": "+n.colorId:"")),r.a.createElement(x.a,null,a.map((function(e){return r.a.createElement(qe,{key:e.id,style:{padding:"3.2px"}},r.a.createElement(Je,{className:n.colorId===e.id&&"is-selected",src:e.zoom}))}))))},Ye=function(e){var n=e.option,t=e.filament;return"checkbox"===n.type?r.a.createElement(We,{option:n}):"dropdown"===n.type?r.a.createElement($e,{option:n}):"colorpicker"===n.type?r.a.createElement(Ke,{option:n,filament:t}):void 0},Qe=function(e){var n=e.data,t=Y.filament;return r.a.createElement(Fe,null,n.options.map((function(e){return r.a.createElement(Ye,{key:e.id,option:e,filament:t})})))},Xe=t(17);function Ze(){var e=Object(E.a)(["\n  margin-left:10px;\n"]);return Ze=function(){return e},e}function _e(){var e=Object(E.a)(["\n  background-color: transparent;\n  color: black;\n  border-color: transparent;\n"]);return _e=function(){return e},e}function en(){var e=Object(E.a)(["\n  display:flex;\n  justify-content: flex-end;\n"]);return en=function(){return e},e}function nn(){var e=Object(E.a)(["\n  display:flex;\n  justify-content: flex-start;\n  align-items:center;\n"]);return nn=function(){return e},e}function tn(){var e=Object(E.a)(["\n  width:200px;\n"]);return tn=function(){return e},e}function an(){var e=Object(E.a)(["\n  padding-left:5px;\n  vertical-align: middle;\n  width:125px;\n"]);return an=function(){return e},e}var rn=O.a.div(an()),on=O.a.div(tn()),ln=O.a.div(nn()),cn=O.a.div(en()),sn=Object(O.a)(d.a)(_e()),un=Object(O.a)(d.a)(Ze()),dn=t(39),pn=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(e){var a;return Object(l.a)(this,t),(a=n.call(this,e)).addVarient=function(){""!==a.variantName.value&&(a.props.addColumns(a.variantName.value),a.variantName.value="")},a.handleEnterAddVarient=function(e){"Enter"===e.key&&(a.addVarient(),e.preventDefault())},a.setVariantText=function(e){a.variantName=e},a.variantName="",a}return Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(ln,null,r.a.createElement(rn,null,"Add a Varient:"),r.a.createElement(on,null,r.a.createElement(b.a,null,r.a.createElement(J.a,{placeholder:"Varient Name",onKeyDown:this.handleEnterAddVarient,ref:this.setVariantText}),r.a.createElement(b.a.Append,null,r.a.createElement(d.a,{onClick:this.addVarient,variant:"info"},"Add")))),r.a.createElement(un,{onClick:this.props.exportJson},"Export")),r.a.createElement(cn,null,r.a.createElement(sn,{onClick:function(n){return e.props.changeHeight("down")},variant:"light"},r.a.createElement(dn.b,null)),r.a.createElement(sn,{onClick:function(n){return e.props.changeHeight("up")},variant:"light"},r.a.createElement(dn.a,null))))}}]),t}(r.a.Component),mn=t(25);function hn(){var e=Object(E.a)(["\n  position:absolute;\n  top: 0px;\n  right: 0px;\n"]);return hn=function(){return e},e}function gn(){var e=Object(E.a)(["\n  padding:8px;\n  transition: background-color 0.2s ease;\n  background-color: ",";\n  flex-grow: 1;\n  min-height: 100px;\n"]);return gn=function(){return e},e}function fn(){var e=Object(E.a)(["\n  padding:8px;\n  padding-right:40px;\n"]);return fn=function(){return e},e}function bn(){var e=Object(E.a)(["\n  border:1px solid lightgrey;\n  border-radius: 2px;\n  padding: 8px;\n  margin-bottom:8 px;\n  background-color: ",";\n"]);return bn=function(){return e},e}function vn(){var e=Object(E.a)(["\n  display:flex;\n"]);return vn=function(){return e},e}function xn(){var e=Object(E.a)(["\n  position:relative;\n  margin: 8px;\n  border:1px solid lightgrey;\n  border-radius: 2px;\n  min-width: 250px;\n  display: flex;\n  flex-direction: column;\n"]);return xn=function(){return e},e}var En=O.a.div(xn()),On=O.a.div(vn()),kn=O.a.div(bn(),(function(e){return e.isDragging?"lightgreen":"white"})),yn=O.a.h3(fn()),jn=O.a.div(gn(),(function(e){return e.isDraggingOver?"skyblue":"white"})),Cn=Object(O.a)(d.a)(hn()),wn=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(){return Object(l.a)(this,t),n.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(mn.b,{draggableId:this.props.task.id,index:this.props.index},(function(n,t){return r.a.createElement(kn,Object.assign({},n.draggableProps,n.dragHandleProps,{ref:n.innerRef,isDragging:t.isDragging}),e.props.task.content)}))}}]),t}(r.a.Component),Sn=t(64),zn=t.n(Sn),Dn=(t(103),function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(){return Object(l.a)(this,t),n.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(En,null,r.a.createElement("div",null,"unassigned"!==this.props.column.id?r.a.createElement(zn.a,{text:this.props.column.title,labelClassName:"VariantTitle",inputClassName:"VariantInput",onFocusOut:function(n){return e.props.updateColumnName(n,e.props.column.id)}}):r.a.createElement(yn,null,this.props.column.title),"unassigned"!==this.props.column.id&&r.a.createElement(Cn,{variant:"light",onClick:function(n){return e.props.deleteColumn(e.props.column.id)}},r.a.createElement(B.a,null))),r.a.createElement(mn.c,{droppableId:this.props.column.id},(function(n,t){return r.a.createElement(jn,Object.assign({ref:n.innerRef},n.droppableProps,{isDraggingOver:t.isDraggingOver}),e.props.tasks.map((function(e,n){return r.a.createElement(wn,{key:e.id,task:e,index:n})})),n.placeholder)})))}}]),t}(r.a.Component)),Tn=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=n.call.apply(n,[this].concat(r))).onDragEnd=function(n){var t=n.destination,a=n.source,r=n.draggableId;if(t&&(t.droppableId!==a.droppableId||t.index!==a.index)){var i=e.props.columns[a.droppableId],o=e.props.columns[t.droppableId];if(i!==o){var l=Array.from(i.taskIds);l.splice(a.index,1);var c=Object(De.a)(Object(De.a)({},i),{},{taskIds:l}),s=Array.from(o.taskIds);s.splice(t.index,0,r);var u=Object(De.a)(Object(De.a)({},o),{},{taskIds:s});e.props.updateLists(c,u)}else{var d=Array.from(i.taskIds);d.splice(a.index,1),d.splice(t.index,0,r);var p=Object(De.a)(Object(De.a)({},i),{},{taskIds:d});e.props.updateColumns(p)}}},e}return Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(mn.a,{onDragEnd:this.onDragEnd},r.a.createElement(On,null,this.props.columnOrder.map((function(n){var t=e.props.columns[n],a=t.taskIds.map((function(n){return e.props.tasks[n]}));return r.a.createElement(Dn,{key:t.id,column:t,tasks:a,deleteColumn:e.props.deleteColumn,updateColumnName:e.props.updateColumnName})}))))}}]),t}(r.a.Component);function An(){var e=Object(E.a)(["\n  overflow: auto;\n  overflow-x:hidden;\n  height: ",";\n"]);return An=function(){return e},e}function Nn(){var e=Object(E.a)(["\n  display:flex;\n  align-items:center;\n  justify-content:space-between;\n  z-index: 10;\n  height: 55px;\n  border-radius: 3px;\n  border-bottom: 2px solid lightgray;\n  border-right: 2px solid lightgray;\n"]);return Nn=function(){return e},e}var In=O.a.div(Nn()),Un=O.a.div(An(),(function(e){return e.height})),Pn=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=n.call.apply(n,[this].concat(r))).state={mapping:e.props.mapping,tasks:{},columns:{unassigned:{id:"unassigned",title:"Unassigned Variants",taskIds:[]}},columnOrder:["unassigned"]},e.exportJson=function(){e.state.columns.unassigned.taskIds.length>0?alert("There are still some prices not assigned."):e.props.exportJson(e.state.columns)},e.addColumns=function(n){var t={id:n,title:n,taskIds:[]},a=e.state.columnOrder.slice();a.push(t.id);var r=Object(De.a)(Object(De.a)({},e.state),{},{columns:Object(De.a)(Object(De.a)({},e.state.columns),{},Object(Xe.a)({},t.id,t)),columnOrder:a});e.setState(r)},e.updateLists=function(n,t){var a,r=Object(De.a)(Object(De.a)({},e.state),{},{columns:Object(De.a)(Object(De.a)({},e.state.columns),{},(a={},Object(Xe.a)(a,n.id,n),Object(Xe.a)(a,t.id,t),a))});e.setState(r)},e.updateColumnName=function(n,t){var a=Object(De.a)(Object(De.a)({},e.state.columns[t]),{},{title:n}),r=Object(De.a)(Object(De.a)({},e.state),{},{columns:Object(De.a)(Object(De.a)({},e.state.columns),{},Object(Xe.a)({},t,a))});e.setState(r)},e.updateColumns=function(n){var t=Object(De.a)(Object(De.a)({},e.state),{},{columns:Object(De.a)(Object(De.a)({},e.state.columns),{},Object(Xe.a)({},n.id,n))});e.setState(t)},e.deleteColumn=function(n){var t=Array.from(e.state.columns[n].taskIds),a=Array.from(e.state.columnOrder);a.splice(a.indexOf(n),1),e.setState({columnOrder:a});var r=Object(De.a)({},e.state.columns),i=e.state.columns.unassigned,o=Object(De.a)(Object(De.a)({},i),{},{taskIds:i.taskIds.concat(t)});delete r[n],r.unassigned=o,e.setState({columns:r})},e}return Object(c.a)(t,[{key:"componentDidUpdate",value:function(e,n){if(this.props.mapping!==e.mapping){for(var t={},a=[],r=0,i=Object.entries(this.props.mapping);r<i.length;r++){var o=Object(be.a)(i[r],1)[0];t[o]={id:o,content:o},a.push(o)}this.setState({tasks:t});for(var l={},c=0,s=Object.entries(n.columns);c<s.length;c++){var u=Object(be.a)(s[c],2),d=u[0],p=u[1];"unassigned"===d?l.unassigned=Object(De.a)(Object(De.a)({},n.columns.unassigned),{},{taskIds:a}):l[d]=Object(De.a)(Object(De.a)({},p),{},{taskIds:[]})}this.setState({columns:l})}}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(In,null,r.a.createElement(pn,{addColumns:this.addColumns,exportJson:this.exportJson,changeHeight:this.props.changeHeight})),r.a.createElement(Un,{height:this.props.height+"px"},r.a.createElement(Tn,{tasks:this.state.tasks,columns:this.state.columns,columnOrder:this.state.columnOrder,updateColumns:this.updateColumns,updateLists:this.updateLists,deleteColumn:this.deleteColumn,updateColumnName:this.updateColumnName})))}}]),t}(r.a.Component),Hn=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=n.call.apply(n,[this].concat(r))).counter={cb:0,dd:0,cp:0},e.state={height:window.innerHeight-70,mapping:[],numVarients:0,options:[]},e.determineNumberofVarients=function(e){return e.reduce((function(e,n){return n.priceDiff?"colorpicker"===n.type?3*e:"dropdown"===n.type?e*(0===n.items.length?1:n.items.length):"checkbox"===n.type?2*e:(console.log("Type not implemented for Counting"),e):e}),1)},e.handleAddingNewOptions=function(n){var t=e.state.options.slice(),a=n.target.value;"checkbox"===a?t.push({id:"cb"+e.counter.cb++,name:"",type:"checkbox",priceDiff:!1,selected:!1}):"dropdown"===a?t.push({id:"dd"+e.counter.dd++,name:"",type:"dropdown",priceDiff:!1,selected:"",items:[]}):"colorpicker"===a?t.push({id:"cp"+e.counter.cp++,name:"",type:"colorpicker",priceDiff:!1,colorId:"",colorInclusion:"all",items:[]}):console.log("Option type is not implemented for Add"),e.setState({options:t,numVarients:e.determineNumberofVarients(t)})},e.handleUpdateingOptions=function(n,t){var a=e.state.options.slice(),r=t.target,i=r.name,o=r.value,l=r.type,c=r.checked;a[n][i]="checkbox"===l?c:o,e.setState({options:a,numVarients:e.determineNumberofVarients(a)})},e.handleUpdatingTagOrder=function(n,t){var a=e.state.options.slice();a[n].items=t,e.setState({options:a,numVarients:e.determineNumberofVarients(a)})},e.handleClickDeleteTag=function(n,t){var a=e.state.options.slice(),r=a[n].items.filter((function(e){return t.id!==e.id}));a[n].items=r,e.setState({options:a,numVarients:e.determineNumberofVarients(a)})},e.handleClickAddTag=function(n,t){var a=e.state.options.slice();a[n].items.push({id:a[n].id+"t"+t.tagId,name:t.tagName}),e.setState({options:a,numVarients:e.determineNumberofVarients(a)})},e.handleClickDeleteOption=function(n){var t=e.state.options.slice().filter((function(e){return n.id!==e.id}));e.setState({options:t,numVarients:e.determineNumberofVarients(t)})},e.handleUpdatingOptionOrder=function(n){n.sort((function(e,n){return e.y-n.y}));var t=n.map((function(e){return e.i})),a=e.state.options.slice().sort((function(e,n){var a=e.id,r=n.id;return t.indexOf(a)-t.indexOf(r)}));e.setState({options:a,numVarients:e.determineNumberofVarients(a)})},e.handleClickDuplicateOption=function(n){var t=JSON.parse(JSON.stringify(n));"checkbox"===t.type?t.id="cb"+e.counter.cb++:"dropdown"===t.type?t.id="dd"+e.counter.dd++:"colorpicker"===t.type?t.id="cp"+e.counter.cp++:console.log("Duplicate is not implement for this type");var a=e.state.options.slice();a.push(t),e.setState({options:a})},e.handleSetPrice=function(){var n=Ae(e.state.options);e.setState({mapping:n}),e.setState({height:window.innerHeight/2})},e.exportJson=function(n){Ne(e.state,n)},e.changeHeight=function(n){"up"===n?e.setState({height:50}):e.setState({height:window.innerHeight-70})},e.updateHeight=function(n){e.setState({height:n})},e}return Object(c.a)(t,[{key:"render",value:function(){var e=window.innerHeight-this.state.height-70;return r.a.createElement(Ce,null,r.a.createElement(we,null,r.a.createElement(xe,{data:this.state,handleAdd:this.handleAddingNewOptions,handleUpdate:this.handleUpdateingOptions,handleUpdatingTagOrder:this.handleUpdatingTagOrder,handleClickDeleteTag:this.handleClickDeleteTag,handleClickAddTag:this.handleClickAddTag,handleClickDeleteOption:this.handleClickDeleteOption,handleUpdatingOptionOrder:this.handleUpdatingOptionOrder,handleClickDuplicateOption:this.handleClickDuplicateOption,handleSetPrice:this.handleSetPrice})),r.a.createElement(Se,null,r.a.createElement(ze,null,r.a.createElement(Ee.a,{split:"horizontal",style:{position:"relative"},paneStyle:{overflow:"auto",display:"inline"},size:this.state.height,onDragFinished:this.updateHeight},r.a.createElement(Qe,{data:this.state}),r.a.createElement(Pn,{mapping:this.state.mapping,exportJson:this.exportJson,changeHeight:this.changeHeight,height:e})))))}}]),t}(r.a.Component);var Vn=function(){return r.a.createElement(Hn,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(104),t(105),t(106);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Vn,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},31:function(e,n,t){e.exports=t.p+"static/media/delete.3df96e6b.png"},33:function(e){e.exports=JSON.parse('{"filament":[{"id":"atm-neongreen","color":"#53F04D","name":"Atomic Trans Neon Green","tier":"Standard","src":"atomic-transneongreen.jpg","zoom":"atomic-transneongreen-zoom.png","opacity":0.95},{"id":"hb-black","color":"#252724","name":"HatchBox Black","tier":"Standard","src":"hatchbox-black.jpg","zoom":"hatchbox-black-zoom.png","opacity":1},{"id":"hb-blue","color":"#011CAE","name":"HatchBox Blue","tier":"Standard","src":"hatchbox-blue.jpg","zoom":"hatchbox-blue-zoom.png","opacity":1},{"id":"hb-gold","color":"#E8A932","name":"HatchBox Gold","tier":"Standard","src":"hatchbox-gold.jpg","zoom":"hatchbox-gold-zoom.png","opacity":1},{"id":"hb-green","color":"#0FC069","name":"HatchBox Green","tier":"Standard","src":"hatchbox-green.jpg","zoom":"hatchbox-green-zoom.png","opacity":1},{"id":"hb-orange","color":"#FF7320","name":"HatchBox Orange","tier":"Standard","src":"hatchbox-orange.jpg","zoom":"hatchbox-orange-zoom.png","opacity":1},{"id":"hb-pink","color":"#FF7478","name":"HatchBox Pink","tier":"Standard","src":"hatchbox-pink.jpg","zoom":"hatchbox-pink-zoom.png","opacity":1},{"id":"hb-red","color":"#EF1021","name":"HatchBox Red","tier":"Standard","src":"hatchbox-red.jpg","zoom":"hatchbox-red-zoom.png","opacity":1},{"id":"hb-silver","color":"#B5B7B1","name":"HatchBox Silver","tier":"Standard","src":"hatchbox-silver.jpg","zoom":"hatchbox-silver-zoom.png","opacity":1},{"id":"hb-white","color":"#E6E5DE","name":"HatchBox White","tier":"Standard","src":"hatchbox-white.jpg","zoom":"hatchbox-white-zoom.png","opacity":1},{"id":"hb-yellow","color":"#FDE506","name":"HatchBox Yellow","tier":"Standard","src":"hatchbox-yellow.jpg","zoom":"hatchbox-yellow-zoom.png","opacity":1},{"id":"php-oceanblue","color":"#3BADD3","name":"Push Ocean Blue","tier":"Standard","src":"push-oceanblue.jpg","zoom":"push-oceanblue-zoom.png","opacity":1},{"id":"pru-azureblue","color":"#008CD6","name":"Prusa Azure Blue","tier":"Premium","src":"prusa-azureblue.jpg","zoom":"prusa-azureblue-zoom.png","opacity":1},{"id":"pru-galaxyblack","color":"#4F4C46","name":"Prusa Galaxy Black","tier":"Premium","src":"prusa-galaxyblack.jpg","zoom":"prusa-galaxyblack-zoom.png","opacity":1},{"id":"pru-galaxysilver","color":"#B8B8B5","name":"Prusa Galaxy Silver","tier":"Premium","src":"prusa-galaxysilver.jpg","zoom":"prusa-galaxysilver-zoom.png","opacity":1},{"id":"pru-galaxypurple","color":"#412B7C","name":"Prusa Galaxy Purple","tier":"Premium","src":"prusa-galaxypurple.jpg","zoom":"prusa-galaxyspurple-zoom.png","opacity":1},{"id":"pru-gentlemengrey","color":"#2D4C4D","name":"Prusa Gentlemen Grey","tier":"Premium","src":"prusa-gentlemensgrey.jpg","zoom":"prusa-gentlemansgrey-zoom.png","opacity":1},{"id":"pru-opalgreen","color":"#085C4E","name":"Prusa Opal Green","tier":"Premium","src":"prusa-opalgreen.jpg","zoom":"prusa-opalgreen-zoom.png","opacity":1},{"id":"ptp-protonpurple","color":"#964861","name":"ProtoPasta Proton Purple","tier":"Ultra Premium","src":"protopasta-protonpurple.jpg","zoom":"protopasta-protonpurple-zoom.png","opacity":1}]}')},65:function(e,n,t){e.exports=t(107)},70:function(e,n,t){},85:function(e,n,t){}},[[65,1,2]]]);
//# sourceMappingURL=main.e594e1b1.chunk.js.map