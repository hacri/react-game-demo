(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(t,e,r){t.exports=r(29)},22:function(t,e,r){},24:function(t,e,r){},29:function(t,e,r){"use strict";r.r(e);var o,i,n,a=r(0),s=r.n(a),c=r(4),l=r.n(c),u=(r(22),r(23),r(2)),h=r(3),m=r(6),d=r(5),f=r(9),O=r(7),p=(r(24),r(10));!function(t){t[t.NORMAL=0]="NORMAL",t[t.ROW_BOOM=1]="ROW_BOOM",t[t.COL_BOOM=2]="COL_BOOM",t[t.BLOCK_BOOM=3]="BLOCK_BOOM"}(o||(o={})),function(t){t[t.NORMAL=0]="NORMAL",t[t.REMOVED=-1]="REMOVED",t[t.PENDING=1]="PENDING",t[t.REMOVING=2]="REMOVING"}(i||(i={}));var v,b=Object(p.a)(n=function(t){function e(t){var r;return Object(u.a)(this,e),(r=Object(m.a)(this,Object(d.a)(e).call(this,t))).clickItem=void 0,r.clickItem=r.props.boardStore.clickItem.bind(r.props.boardStore),r}return Object(O.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){var t,e=this,r=this.props.item,n={left:50*r.coord.colIdx,top:50*r.coord.rowIdx},a=["item","item-status_".concat(r.status),"item-type-".concat(r.type)],c="fadeIn";return r.status==i.REMOVED?(t="",c=""):r.status==i.REMOVING&&0==r.ttl?(a.push("remove-immediately"),r.type==o.NORMAL?t="\ud83d\udca2":(t="\ud83d\udca5",c="flash")):r.type==o.NORMAL?t="\ud83c\udf4e":r.type==o.ROW_BOOM?t="\ud83c\udf4c":r.type==o.COL_BOOM?t="\ud83c\udf49":r.type==o.BLOCK_BOOM&&(t="\ud83c\udf52"),c&&(a.push("animated"),a.push(c)),s.a.createElement("div",{key:r.id,className:a.join(" "),style:n,onClick:function(){return e.clickItem(r.coord.rowIdx,r.coord.colIdx)}},t)}}]),e}(a.Component))||n,I=Object(p.a)(v=function(t){function e(){return Object(u.a)(this,e),Object(m.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(O.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){var t=this,e={height:50*this.props.boardStore.rowLength,width:50*this.props.boardStore.colLength};return s.a.createElement("div",{className:"board",style:e},s.a.createElement("div",{className:"item-container"},this.props.boardStore.board.map(function(e){return s.a.createElement(b,{key:e.id,item:e,boardStore:t.props.boardStore})})))}}]),e}(a.Component))||v,k=function(t){function e(t){var r;return Object(u.a)(this,e),(r=Object(m.a)(this,Object(d.a)(e).call(this,t))).test=r.test.bind(Object(f.a)(r)),r}return Object(O.a)(e,t),Object(h.a)(e,[{key:"test",value:function(){this.props.store.removeItem(2,2)}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"main"},s.a.createElement(I,{boardStore:this.props.store}),s.a.createElement("ul",null,s.a.createElement("li",null,"\ud83c\udf4c = Row BOMB"),s.a.createElement("li",null,"\ud83c\udf49 = Column BOMB"),s.a.createElement("li",null,"\ud83c\udf52 = Block BOMB")),s.a.createElement("button",{onClick:this.test},"remove 2,2")))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var y,w,x=r(8),M=r.n(x),L=r(13),g=r(16),j=r(11),N=(r(28),r(1)),R=r(12),E=r.n(R),B=new(y=function(){function t(){var e=this;Object(u.a)(this,t),Object(g.a)(this,"board",w,this),this.rowLength=8,this.colLength=8,this.waitTime=300,this.increseId=1,this.inProcess=!0,this.dirtyList=[],this.firstSelectCoord=null,this.tmpHoverCoord=null,Object(N.e)(this.report.bind(this),{delay:300}),this.initBoard().then(function(){e.inProcess=!1})}return Object(h.a)(t,[{key:"initBoard",value:function(){var t=Object(L.a)(M.a.mark(function t(){var e=this;return M.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.isNeedFillItem()){t.next=6;break}return Object(N.m)(function(){e.fillItem()}),t.next=4,E.a.set(this.waitTime);case 4:t.next=0;break;case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"generateItem",value:function(t,e){this.board.push({id:this.increseId++,type:Math.floor(4*Math.random()),status:i.NORMAL,ttl:0,coord:{rowIdx:t,colIdx:e}})}},{key:"report",value:function(){}},{key:"getItem",value:function(t,e){return this.board.find(function(r){return r.coord.rowIdx==t&&r.coord.colIdx==e})}},{key:"removeRowItem",value:function(t,e){for(var r=0;r<this.colLength;r++)this.markRemoveStatus(t,r,e)}},{key:"removeColItem",value:function(t,e){for(var r=0;r<this.rowLength;r++)this.markRemoveStatus(r,t,e)}},{key:"removeAroundItem",value:function(t,e,r){for(var o=-1;o<=1;o++)if(!(t+o<0)&&!(t+o>=this.rowLength))for(var i=-1;i<=1;i++)e+i<0||e+i>=this.colLength||this.markRemoveStatus(t+o,e+i,r)}},{key:"processBoom",value:function(t){var e=this,r=this.dirtyList;this.dirtyList=[],r.map(function(r){var n=e.getItem(r.rowIdx,r.colIdx);if(n&&n.status==i.PENDING)switch(n.status=i.REMOVING,n.type){case o.ROW_BOOM:e.removeRowItem(r.rowIdx,t);break;case o.COL_BOOM:e.removeColItem(r.colIdx,t);break;case o.BLOCK_BOOM:e.removeAroundItem(r.rowIdx,r.colIdx,t)}})}},{key:"markRemoveStatus",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=this.getItem(t,e);n&&n.status==i.NORMAL&&(n.status=i.PENDING,n.ttl=r,n.type==o.NORMAL?n.status=i.REMOVING:this.dirtyList.push({rowIdx:t,colIdx:e}))}},{key:"isNeedFillItem",value:function(){if(this.board.length<this.rowLength*this.colLength)return!0;for(var t=0;t<this.board.length;t++)if(this.board[t].status!=i.NORMAL)return!0;return!1}},{key:"fillItem",value:function(){for(var t=0;t<this.colLength;t++)for(var e=this.rowLength-1;e>=0;e--){var r=this.getItem(e,t);if(!r||r.status!=i.NORMAL){r&&this.board.splice(this.board.indexOf(r),1);for(var o=e-1;o>=0;o--){var n=this.getItem(o,t);n&&n.coord.rowIdx++}this.generateItem(0,t);break}}}},{key:"clickItem",value:function(t,e){if(!this.inProcess)if(this.firstSelectCoord){for(var r=[],o=Math.min(t,this.firstSelectCoord.rowIdx),i=Math.max(t,this.firstSelectCoord.rowIdx),n=Math.min(e,this.firstSelectCoord.colIdx),a=Math.max(e,this.firstSelectCoord.colIdx),s=o;s<=i;s++)for(var c=n;c<=a;c++)r.push({rowIdx:s,colIdx:c});this.firstSelectCoord=null,this.removeItems(r)}else this.firstSelectCoord={rowIdx:t,colIdx:e}}},{key:"removeItem",value:function(t,e){this.removeItems([{rowIdx:t,colIdx:e}])}},{key:"removeItems",value:function(){var t=Object(L.a)(M.a.mark(function t(e){var r,o,n,a=this;return M.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.inProcess){t.next=2;break}return t.abrupt("return");case 2:for(this.inProcess=!0,console.log("start remove"),e.map(function(t){a.markRemoveStatus(t.rowIdx,t.colIdx)}),r=1;this.dirtyList.length;)this.processBoom(r),r++;o=!0,n=!0;case 9:if(!o){t.next=20;break}if(o=!1,n){t.next=16;break}return t.next=14,E.a.set(this.waitTime);case 14:t.next=17;break;case 16:n=!1;case 17:Object(N.m)(function(){a.board.map(function(t){t.status==i.REMOVING&&(t.ttl>0?(t.ttl--,o=!0):t.status=i.REMOVED)})}),t.next=9;break;case 20:console.log("start fill"),n=!0;case 22:if(!this.isNeedFillItem()){t.next=32;break}if(n){t.next=28;break}return t.next=26,E.a.set(this.waitTime);case 26:t.next=29;break;case 28:n=!1;case 29:Object(N.m)(function(){a.fillItem()}),t.next=22;break;case 32:this.inProcess=!1,console.log("finish");case 34:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}]),t}(),w=Object(j.a)(y.prototype,"board",[N.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Object(j.a)(y.prototype,"clickItem",[N.d],Object.getOwnPropertyDescriptor(y.prototype,"clickItem"),y.prototype),Object(j.a)(y.prototype,"removeItem",[N.d],Object.getOwnPropertyDescriptor(y.prototype,"removeItem"),y.prototype),y);l.a.render(s.a.createElement(k,{store:B}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.f6734396.chunk.js.map