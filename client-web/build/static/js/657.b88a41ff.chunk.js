"use strict";(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[657],{7657:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var i=n(72791),r=n(20803),a=n(50228),o=n(88522),s=n(79271),l=n(74165),d=n(15861),u=n(70885),c=n(85554),f=n(57337),p=n(89721),m=n(91482),h=n(95178),g=n(16263),x=n(45586),v=n(31128),j=n(74142),y=n(52797),Z=n(13811),w=n(16992),b=n(65348),S=n(60788),C=n(8440),k=n(59911),D=n(77248),A=n(52898),N=n(80184),I=function(e){var t=e.message,n=e.userJid,r=e.position,a=e.buttonSender,l=t.data.senderFirstName,d=t.data.senderLastName,p=t.data.senderJID,I=(0,s.k6)(),J=(0,i.useState)(),M=(0,u.Z)(J,2),K=M[0],P=M[1],R=(0,j.Z)(),E=(0,y.Z)(R.breakpoints.down("md")),z=(0,i.useState)(!1),T=(0,u.Z)(z,2),U=T[0],L=T[1],_=i.useState(null),F=(0,u.Z)(_,2),B=F[0],W=F[1],q=(0,i.useState)("transfer"),O=(0,u.Z)(q,2),V=O[0],H=O[1],Y=Boolean(B),G=(0,i.useState)(""),Q=(0,u.Z)(G,2),X=Q[0],$=Q[1],ee=(0,o.K)((function(e){return e.balance})).filter((function(e){return!e.tokenType&&e.contractAddress.length>10})),te=(0,i.useState)(),ne=(0,u.Z)(te,2),ie=ne[0],re=ne[1],ae=(0,o.K)((function(e){return e.user}));return(0,i.useEffect)((function(){t.data.quickReplies&&P(JSON.parse(t.data.quickReplies)),(0,f.k2)(ae.walletAddress).then((function(e){re(e.data.result)}))}),[]),(0,N.jsxs)("div",{is:"Message",children:[r.separator?(0,N.jsx)(v.it,{children:r.separator}):null,(0,N.jsxs)(v.v0,{model:{sender:l+" "+d,direction:String(n).split("/")[0]===String(p).split("/")[0]?"outgoing":"incoming",position:r.position},avatarPosition:String(n).split("/")[0]===String(p).split("/")[0]?"tr":"tl",avatarSpacer:"first"!==r.type&&"single"!==r.type,children:[("first"===r.type||"single"===r.type)&&(0,N.jsx)("img",{style:{borderRadius:"50%",boxSizing:"border-box",width:"42px",height:"42px",cursor:"pointer"},onClick:function(){return I.push("/profile/"+t.data.senderWalletAddress)},is:"Avatar",src:t.data.photoURL,onError:function(e){var t=e.currentTarget;t.onerror=null,t.src="https://icotar.com/initials/"+l+" "+d},alt:l}),(0,N.jsxs)(v.v0.CustomContent,{children:[("first"===r.type||"single"===r.type)&&(0,N.jsxs)("span",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,N.jsxs)("strong",{style:{cursor:"pointer"},onClick:function(){return I.push("/profile/"+t.data.senderWalletAddress)},children:[l," ",d,(0,N.jsx)("br",{})]}),String(n).split("/")[0]!==String(p).split("/")[0]?(0,N.jsx)(Z.Z,{"aria-label":"more",id:"long-button","aria-controls":Y?"long-menu":void 0,"aria-expanded":Y?"true":void 0,"aria-haspopup":"true",onClick:function(e){W(e.currentTarget)},children:(0,N.jsx)(A.Z,{})}):null]}),t.data.isMediafile&&"image"===t.data.mimetype.split("/")[0]?(0,N.jsx)(v.v0.ImageContent,{src:t.data.location,alt:t.data.originalName,width:200}):null,t.data.isMediafile&&"application"===t.data.mimetype.split("/")[0]?(0,N.jsxs)("a",{target:"_blank",href:t.data.location,children:[(0,N.jsx)(v.v0.ImageContent,{src:t.data.locationPreview,alt:t.data.originalName,width:150}),t.data.mimetype.split("/")[1]]}):null,t.data.isMediafile&&"video"===t.data.mimetype.split("/")[0]?(0,N.jsxs)("video",{controls:!0,width:"200px",children:[(0,N.jsx)("source",{src:t.data.location,type:t.data.mimetype,title:t.data.originalName}),"Sorry, your browser doesn't support videos."]}):null,t.data.isMediafile?null:t.body]}),("last"===r.type||"single"===r.type)&&(0,N.jsx)(v.v0.Footer,{sentTime:(0,h.Z)(new Date,new Date(t.date))>5?(0,m.Z)(new Date(t.date),"h:mm:ss a"):(0,g.Z)((0,x.Z)(new Date(t.date),0),new Date,{addSuffix:!0})})]},t.key),K?(0,N.jsx)("div",{style:{display:"flex",flexDirection:"column",width:"max-content",marginLeft:"45px"},children:K.map((function(e,t){return(0,N.jsx)(v.zx,{onClick:function(){return a(e)},border:!0,children:e.name},t)}))}):null,(0,N.jsxs)(w.Z,{id:"basic-menu",anchorEl:B,open:Y,onClose:function(){return W(null)},MenuListProps:{"aria-labelledby":"basic-button"},anchorOrigin:{vertical:"bottom",horizontal:"center"},children:[(0,N.jsx)(b.Z,{onClick:function(){return e="transfer",W(null),L(!0),void H(e);var e},children:"Transfer coins"}),(0,N.jsx)(b.Z,{onClick:function(){return W(null)},children:"Direct message"}),(0,N.jsx)(b.Z,{onClick:function(){return W(null)},children:"Ban this user"})]}),(0,N.jsxs)(S.Z,{fullScreen:E,open:U,onClose:function(){return L(!0)},"aria-labelledby":"responsive-dialog-title",children:[(0,N.jsx)(C.Z,{children:"transfer"===V?(0,N.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:["Rewards ",(0,N.jsx)("strong",{children:ee[0].tokenName})," with coins",(0,N.jsx)(k.Z,{id:"outlined-basic",label:"Outlined",type:"number",variant:"outlined",value:X,onChange:function(e){return $(e.target.value)}}),(0,N.jsx)(v.zx,{onClick:function(){(0,f.tZ)(ee[0].tokenName,ee[0].tokenSymbol,Number(X),t.data.senderWalletAddress).then((function(e){console.log("Transfer success => ",e);var n="";null!==ie&&void 0!==ie&&ie.profileImage&&(n=null===ie||void 0===ie?void 0:ie.profileImage),c.ZP.sendMessage(t.roomJID,ae.firstName,ae.lastName,n,ae.walletAddress,"",null)})).catch((function(e){console.log(e)}))},children:"Send"})]}):null}),(0,N.jsx)(D.Z,{children:(0,N.jsx)(v.zx,{onClick:function(){return L(!1)},autoFocus:!0,children:"Close"})})]})]})},J=function(e){var t=e.message;e.userJid;return(0,N.jsx)("div",{style:{textAlign:"center",color:"#6ea9d7",fontSize:".8em",boxSizing:"border-box",fontFamily:"Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif"},children:t.body},t.key)},M=n(40464),K=n(39571),P=n(96580),R=n(17205);function E(){var e,t,n=(0,o.K)((function(e){return e.historyMessages})),r=(0,o.K)((function(e){return e.user})),s=(0,o.K)((function(e){return e.userChatRooms})),Z=(0,o.K)((function(e){return e.loaderArchive})),w=(0,o.K)((function(e){return e.currentUntrackedChatRoom})),b=(0,i.useState)(),k=(0,u.Z)(b,2),A=k[0],E=k[1],z=(0,i.useState)(""),T=(0,u.Z)(z,2),U=T[0],L=T[1],_=(0,i.useState)(""),F=(0,u.Z)(_,2),B=F[0],W=F[1],q=(0,i.useState)({jid:"",name:"",room_background:"",room_thumbnail:"",users_cnt:""}),O=(0,u.Z)(q,2),V=O[0],H=O[1],Y=(0,i.useRef)(null),G=(0,j.Z)(),Q=(0,y.Z)(G.breakpoints.down("md")),X=(0,i.useState)(!1),$=(0,u.Z)(X,2),ee=$[0],te=$[1],ne=(0,i.useState)(!1),ie=(0,u.Z)(ne,2),re=ie[0],ae=ie[1],oe=(0,i.useState)({headline:"",description:""}),se=(0,u.Z)(oe,2),le=se[0],de=se[1];(0,i.useEffect)((function(){(0,f.k2)(r.walletAddress).then((function(e){E(e.data.result)}))}),[]);var ue=function(e){W(e),H(s.filter((function(t){return t.jid===e}))[0]),o.K.getState().clearCounterChatRoom(e),o.K.getState().setCurrentUntrackedChatRoom(e);var t=n.filter((function(t){return t.roomJID===e}));if(!Z&&t.length<=10&&t.length>0){var i=t[0].id;c.ZP.getPaginatedArchive(e,String(i),10)}},ce=function(e){var t=n.filter((function(t){return t.roomJID===e})).slice(-1);return Z&&t.length<=0?"Loading...":t.length>0?t[0].body:"No messages yet"},fe=function(e){var t=n.filter((function(t){return t.roomJID===e})).slice(-1);return t.length<=0?"":(0,h.Z)(new Date,new Date(t[0].date))>1?(0,m.Z)(new Date(t[0].date),"hh:mm"):(0,g.Z)((0,x.Z)(new Date(t[0].date),0),new Date,{addSuffix:!0})},pe=function(e){var t="";null!==A&&void 0!==A&&A.profileImage&&(t=null===A||void 0===A?void 0:A.profileImage),c.ZP.sendMessage(B,r.firstName,r.lastName,t,r.walletAddress,"object"===typeof e?e.value:U,"object"===typeof e?e.notDisplayedValue:null)};return(0,i.useEffect)((function(){var e=setTimeout((function(){c.ZP.pausedComposing(r.walletAddress,V.jid)}),1e3);return function(){return clearTimeout(e)}}),[U]),(0,i.useEffect)((function(){w&&ue(w),window.onblur=function(){o.K.getState().setCurrentUntrackedChatRoom("")},window.onfocus=function(){B&&(o.K.getState().setCurrentUntrackedChatRoom(B),o.K.getState().clearCounterChatRoom(B))}}),[B]),(0,N.jsxs)(a.Z,{style:{height:"500px"},children:[(0,N.jsxs)(v.tz,{responsive:!0,children:[(0,N.jsxs)(v.YE,{position:"left",scrollable:!1,children:[(0,N.jsx)(v.ol,{placeholder:"Search..."}),(0,N.jsx)(v.p7,{loading:Z,children:s.map((function(e){return(0,N.jsx)(v.ri,{active:e.jid===B,unreadCnt:e.unreadMessages,onClick:function(){return ue(e.jid)},name:e.name,info:ce(e.jid),lastActivityTime:fe(e.jid),children:(0,N.jsx)(v.qE,{src:"none"!==e.room_background?e.room_background:"https://icotar.com/initials/"+e.name})},e.jid)}))})]}),(0,N.jsxs)(v.uU,{children:[!!V.name&&(0,N.jsxs)(v.BU,{children:[(0,N.jsx)(v.BU.Back,{}),n.filter((function(e){return e.roomJID===B})).length>0&&(0,N.jsx)(v.BU.Content,{userName:V.name,info:"Active "+(0,g.Z)((0,x.Z)(new Date(n.filter((function(e){return e.roomJID===B})).slice(-1)[0].date),0),new Date,{addSuffix:!0})}),(0,N.jsx)(v.BU.Actions,{children:(0,N.jsx)(p.Z,{})})]}),(0,N.jsxs)(v.rN,{loadingMore:Z,onYReachStart:function(){if(!Z){var e=n.filter((function(e){return e.roomJID===B}))[0].id;c.ZP.getPaginatedArchive(B,String(e),10)}},typingIndicator:!(null===(e=s.filter((function(e){return e.jid===B}))[0])||void 0===e||!e.composing)&&(0,N.jsx)(v.c2,{content:null===(t=s.filter((function(e){return e.jid===B}))[0])||void 0===t?void 0:t.composing}),children:[n.filter((function(e){return e.roomJID===B})).map((function(e,t,n){var i,r,a,o,s=function(e,t,n){var i,r,a,o,s,l,d=null===(i=e[n-1])||void 0===i||null===(r=i.data.senderJID)||void 0===r?void 0:r.split("/")[0],u=null===(a=e[n+1])||void 0===a||null===(o=a.data.senderJID)||void 0===o?void 0:o.split("/")[0],c=null===(s=t.data.senderJID)||void 0===s?void 0:s.split("/")[0],f={position:"single",type:"single"};return e[n-1]&&t&&(0,m.Z)(new Date(null===(l=e[n-1])||void 0===l?void 0:l.date),"dd")!==(0,m.Z)(new Date(t.date),"dd")&&(f.separator=(0,m.Z)(new Date(t.date),"EEEE, dd LLLL yyyy")),d!==c&&u!==c?f:d!==c&&u===c?(f.position="first",f.type="first",f):d===c&&u===c?(f.position="normal",f.type="normal",f):d===c&&u!==c?(f.position="single",f.type="last",f):f}(n,e,t);return"false"===e.data.isSystemMessage?(0,N.jsx)(I,{is:"Message",position:s,message:e,userJid:null===(i=c.ZP.client)||void 0===i||null===(r=i.jid)||void 0===r?void 0:r.toString(),buttonSender:pe},e.id):(0,N.jsx)(J,{is:"Message",message:e,userJid:null===(a=c.ZP.client)||void 0===a||null===(o=a.jid)||void 0===o?void 0:o.toString()})})),n.length<=0||!B&&(0,N.jsx)(v.rN.Content,{style:{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%",textAlign:"center",fontSize:"1.2em"},children:Z?"Loading...":(0,N.jsx)("span",{children:!B&&"To get started, please select a chat room."})}),!Z&&B&&n.filter((function(e){return e.roomJID===B})).length<=0&&(0,N.jsx)(v.rN.Content,{style:{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%",textAlign:"center",fontSize:"1.2em"},children:"Message list is empty"})]}),!!V.name&&(0,N.jsxs)("div",{is:"MessageInput",children:[(0,N.jsx)(v.Ru,{placeholder:"Type message here",onChange:function(e){L(e),c.ZP.isComposing(r.walletAddress,V.jid,r.firstName+" "+r.lastName)},onSend:pe,onAttachClick:function(){return Y.current.click()}}),(0,N.jsx)("input",{type:"file",name:"file",id:"file",onChange:function(e){return function(e){de({headline:"File is loading, please wait...",description:""}),te(!0);var t=new FormData;t.append("files",e),(0,f.cT)(t).then((function(e){var t="";null!==A&&void 0!==A&&A.profileImage&&(t=null===A||void 0===A?void 0:A.profileImage),e.data.results.map(function(){var e=(0,d.Z)((0,l.Z)().mark((function e(n){var i;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i={firstName:r.firstName,lastName:r.lastName,walletAddress:r.walletAddress,chatName:V.name,userAvatar:t,createdAt:n.createdAt,expiresAt:n.expiresAt,fileName:n.filename,isVisible:n.isVisible,location:n.location,locationPreview:n.locationPreview,mimetype:n.mimetype,originalName:n.originalname,ownerKey:n.ownerKey,size:n.size,duration:null===n||void 0===n?void 0:n.duration,updatedAt:n.updatedAt,userId:n.userId,waveForm:"",attachmentId:n._id,wrappable:!0},c.ZP.sendMediaMessageStanza(B,i),te(!1);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})).catch((function(e){console.log(e),de({headline:"Error",description:"An error occurred while uploading the file"}),ae(!0)})),Y.current.value=""}(e.target.files[0])},ref:Y,style:{display:"none"}})]})]})]}),(0,N.jsxs)(S.Z,{fullScreen:Q,open:ee,onClose:function(){return te(!0)},"aria-labelledby":"responsive-dialog-title",children:[(0,N.jsx)(M.Z,{id:"responsive-dialog-title",children:le.headline}),(0,N.jsx)(C.Z,{children:re&&le.description.length>0?(0,N.jsx)(K.Z,{children:le.description}):(0,N.jsx)(a.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,N.jsx)(P.Z,{})})}),re?(0,N.jsx)(D.Z,{children:(0,N.jsx)(R.Z,{onClick:function(){return te(!1)},autoFocus:!0,children:"Close"})}):null]})]})}function z(){var e=(0,o.K)((function(e){return e.user})),t=(0,o.K)((function(e){return e.messages})),n=(0,s.k6)();return(0,i.useEffect)((function(){e.firstName||n.push("/")}),[e.firstName,n]),(0,N.jsxs)(r.Z,{maxWidth:"xl",style:{height:"calc(100vh - 68px)"},children:[(0,N.jsx)(a.Z,{children:"Chat"}),(0,N.jsx)(a.Z,{children:t.length}),(0,N.jsx)(E,{})]})}}}]);
//# sourceMappingURL=657.b88a41ff.chunk.js.map