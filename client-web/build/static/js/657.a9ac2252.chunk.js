"use strict";(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[657],{7657:function(e,t,n){n.r(t),n.d(t,{default:function(){return M}});var i=n(72791),r=n(57020),a=n(50228),o=n(16090),s=n(79271),l=n(74165),d=n(15861),u=n(70885),c=n(85554),f=n(57337),p=n(89721),m=n(91482),h=n(95178),g=n(16263),v=n(45586),x=n(31128),j=n(80184),y=function(e){var t=e.message,n=e.userJid,r=e.position,a=e.buttonSender,o=t.data.senderFirstName,l=t.data.senderLastName,d=t.data.senderJID,c=(0,s.k6)(),f=(0,i.useState)(),p=(0,u.Z)(f,2),y=p[0],w=p[1];return(0,i.useEffect)((function(){t.data.quickReplies&&w(JSON.parse(t.data.quickReplies))}),[]),(0,j.jsxs)("div",{is:"Message",children:[r.separator?(0,j.jsx)(x.it,{children:r.separator}):null,(0,j.jsxs)(x.v0,{model:{sender:o+" "+l,direction:String(n).split("/")[0]===String(d).split("/")[0]?"outgoing":"incoming",position:r.position},avatarPosition:String(n).split("/")[0]===String(d).split("/")[0]?"tr":"tl",avatarSpacer:"first"!==r.type&&"single"!==r.type,children:[("first"===r.type||"single"===r.type)&&(0,j.jsx)("img",{style:{borderRadius:"50%",boxSizing:"border-box",width:"42px",height:"42px",cursor:"pointer"},onClick:function(){return c.push("/profile/"+t.data.senderWalletAddress)},is:"Avatar",src:t.data.photoURL,onError:function(e){var t=e.currentTarget;t.onerror=null,t.src="https://icotar.com/initials/"+o+" "+l},alt:o}),(0,j.jsxs)(x.v0.CustomContent,{children:[("first"===r.type||"single"===r.type)&&(0,j.jsxs)("strong",{style:{cursor:"pointer"},onClick:function(){return c.push("/profile/"+t.data.senderWalletAddress)},children:[o," ",l,(0,j.jsx)("br",{})]}),t.data.isMediafile&&"image"===t.data.mimetype.split("/")[0]?(0,j.jsx)(x.v0.ImageContent,{src:t.data.location,alt:t.data.originalName,width:200}):null,t.data.isMediafile&&"application"===t.data.mimetype.split("/")[0]?(0,j.jsxs)("a",{target:"_blank",href:t.data.location,children:[(0,j.jsx)(x.v0.ImageContent,{src:t.data.locationPreview,alt:t.data.originalName,width:150}),t.data.mimetype.split("/")[1]]}):null,t.data.isMediafile&&"video"===t.data.mimetype.split("/")[0]?(0,j.jsxs)("video",{controls:!0,width:"200px",children:[(0,j.jsx)("source",{src:t.data.location,type:t.data.mimetype,title:t.data.originalName}),"Sorry, your browser doesn't support videos."]}):null,t.data.isMediafile?null:t.body]}),("last"===r.type||"single"===r.type)&&(0,j.jsx)(x.v0.Footer,{sentTime:(0,h.Z)(new Date,new Date(t.date))>5?(0,m.Z)(new Date(t.date),"h:mm:ss a"):(0,g.Z)((0,v.Z)(new Date(t.date),0),new Date,{addSuffix:!0})})]},t.key),y?(0,j.jsx)("div",{style:{display:"flex",flexDirection:"column",width:"max-content",marginLeft:"45px"},children:y.map((function(e,t){return(0,j.jsx)(x.zx,{onClick:function(){return a(e)},border:!0,children:e.name},t)}))}):null]})},w=function(e){var t=e.message;e.userJid;return(0,j.jsx)("div",{style:{textAlign:"center",color:"#6ea9d7",fontSize:".8em",boxSizing:"border-box",fontFamily:"Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif"},children:t.body},t.key)},Z=n(74142),S=n(52797),C=n(60788),b=n(40464),D=n(8440),k=n(39571),A=n(96580),N=n(77248),I=n(17205);function J(){var e,t,n=(0,o.K)((function(e){return e.historyMessages})),r=(0,o.K)((function(e){return e.user})),s=(0,o.K)((function(e){return e.userChatRooms})),J=(0,o.K)((function(e){return e.loaderArchive})),M=(0,o.K)((function(e){return e.currentUntrackedChatRoom})),K=(0,i.useState)(),P=(0,u.Z)(K,2),R=P[0],E=P[1],U=(0,i.useState)(""),z=(0,u.Z)(U,2),L=z[0],_=z[1],T=(0,i.useState)(""),F=(0,u.Z)(T,2),B=F[0],q=F[1],V=(0,i.useState)({jid:"",name:"",room_background:"",room_thumbnail:"",users_cnt:""}),W=(0,u.Z)(V,2),H=W[0],Y=W[1],O=(0,i.useRef)(null),G=(0,Z.Z)(),Q=(0,S.Z)(G.breakpoints.down("md")),X=(0,i.useState)(!1),$=(0,u.Z)(X,2),ee=$[0],te=$[1],ne=(0,i.useState)(!1),ie=(0,u.Z)(ne,2),re=ie[0],ae=ie[1],oe=(0,i.useState)({headline:"",description:""}),se=(0,u.Z)(oe,2),le=se[0],de=se[1];(0,i.useEffect)((function(){(0,f.k2)(r.walletAddress).then((function(e){E(e.data.result)}))}),[]);var ue=function(e){q(e),Y(s.filter((function(t){return t.jid===e}))[0]),o.K.getState().clearCounterChatRoom(e),o.K.getState().setCurrentUntrackedChatRoom(e);var t=n.filter((function(t){return t.roomJID===e}));if(!J&&t.length<=10&&t.length>0){var i=t[0].id;c.ZP.getPaginatedArchive(e,String(i),10)}},ce=function(e){var t=n.filter((function(t){return t.roomJID===e})).slice(-1);return J&&t.length<=0?"Loading...":t.length>0?t[0].body:"No messages yet"},fe=function(e){var t=n.filter((function(t){return t.roomJID===e})).slice(-1);return t.length<=0?"":(0,h.Z)(new Date,new Date(t[0].date))>1?(0,m.Z)(new Date(t[0].date),"hh:mm"):(0,g.Z)((0,v.Z)(new Date(t[0].date),0),new Date,{addSuffix:!0})},pe=function(e){var t="";null!==R&&void 0!==R&&R.profileImage&&(t=null===R||void 0===R?void 0:R.profileImage),c.ZP.sendMessage(B,r.firstName,r.lastName,t,r.walletAddress,"object"===typeof e?e.value:L,"object"===typeof e?e.notDisplayedValue:null)};return(0,i.useEffect)((function(){var e=setTimeout((function(){c.ZP.pausedComposing(r.walletAddress,H.jid)}),1e3);return function(){return clearTimeout(e)}}),[L]),(0,i.useEffect)((function(){M&&ue(M),window.onblur=function(){o.K.getState().setCurrentUntrackedChatRoom("")},window.onfocus=function(){B&&(o.K.getState().setCurrentUntrackedChatRoom(B),o.K.getState().clearCounterChatRoom(B))}}),[B]),(0,j.jsxs)(a.Z,{style:{height:"500px"},children:[(0,j.jsxs)(x.tz,{responsive:!0,children:[(0,j.jsxs)(x.YE,{position:"left",scrollable:!1,children:[(0,j.jsx)(x.ol,{placeholder:"Search..."}),(0,j.jsx)(x.p7,{loading:J,children:s.map((function(e){return(0,j.jsx)(x.ri,{active:e.jid===B,unreadCnt:e.unreadMessages,onClick:function(){return ue(e.jid)},name:e.name,info:ce(e.jid),lastActivityTime:fe(e.jid),children:(0,j.jsx)(x.qE,{src:"none"!==e.room_background?e.room_background:"https://icotar.com/initials/"+e.name})},e.jid)}))})]}),(0,j.jsxs)(x.uU,{children:[!!H.name&&(0,j.jsxs)(x.BU,{children:[(0,j.jsx)(x.BU.Back,{}),n.filter((function(e){return e.roomJID===B})).length>0&&(0,j.jsx)(x.BU.Content,{userName:H.name,info:"Active "+(0,g.Z)((0,v.Z)(new Date(n.filter((function(e){return e.roomJID===B})).slice(-1)[0].date),0),new Date,{addSuffix:!0})}),(0,j.jsx)(x.BU.Actions,{children:(0,j.jsx)(p.Z,{})})]}),(0,j.jsxs)(x.rN,{loadingMore:J,onYReachStart:function(){if(!J){var e=n.filter((function(e){return e.roomJID===B}))[0].id;c.ZP.getPaginatedArchive(B,String(e),10)}},typingIndicator:!(null===(e=s.filter((function(e){return e.jid===B}))[0])||void 0===e||!e.composing)&&(0,j.jsx)(x.c2,{content:null===(t=s.filter((function(e){return e.jid===B}))[0])||void 0===t?void 0:t.composing}),children:[n.filter((function(e){return e.roomJID===B})).map((function(e,t,n){var i,r,a,o,s=function(e,t,n){var i,r,a,o,s,l,d=null===(i=e[n-1])||void 0===i||null===(r=i.data.senderJID)||void 0===r?void 0:r.split("/")[0],u=null===(a=e[n+1])||void 0===a||null===(o=a.data.senderJID)||void 0===o?void 0:o.split("/")[0],c=null===(s=t.data.senderJID)||void 0===s?void 0:s.split("/")[0],f={position:"single",type:"single"};return e[n-1]&&t&&(0,m.Z)(new Date(null===(l=e[n-1])||void 0===l?void 0:l.date),"dd")!==(0,m.Z)(new Date(t.date),"dd")&&(f.separator=(0,m.Z)(new Date(t.date),"EEEE, dd LLLL yyyy")),d!==c&&u!==c?f:d!==c&&u===c?(f.position="first",f.type="first",f):d===c&&u===c?(f.position="normal",f.type="normal",f):d===c&&u!==c?(f.position="single",f.type="last",f):f}(n,e,t);return"false"===e.data.isSystemMessage?(0,j.jsx)(y,{is:"Message",position:s,message:e,userJid:null===(i=c.ZP.client)||void 0===i||null===(r=i.jid)||void 0===r?void 0:r.toString(),buttonSender:pe},e.id):(0,j.jsx)(w,{is:"Message",message:e,userJid:null===(a=c.ZP.client)||void 0===a||null===(o=a.jid)||void 0===o?void 0:o.toString()})})),n.length<=0||!B&&(0,j.jsx)(x.rN.Content,{style:{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%",textAlign:"center",fontSize:"1.2em"},children:J?"Loading...":(0,j.jsx)("span",{children:!B&&"To get started, please select a chat room."})}),!J&&B&&n.filter((function(e){return e.roomJID===B})).length<=0&&(0,j.jsx)(x.rN.Content,{style:{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%",textAlign:"center",fontSize:"1.2em"},children:"Message list is empty"})]}),!!H.name&&(0,j.jsxs)("div",{is:"MessageInput",children:[(0,j.jsx)(x.Ru,{placeholder:"Type message here",onChange:function(e){_(e),c.ZP.isComposing(r.walletAddress,H.jid,r.firstName+" "+r.lastName)},onSend:pe,onAttachClick:function(){return O.current.click()}}),(0,j.jsx)("input",{type:"file",name:"file",id:"file",onChange:function(e){return function(e){de({headline:"File is loading, please wait...",description:""}),te(!0);var t=new FormData;t.append("files",e),(0,f.cT)(t).then((function(e){var t="";null!==R&&void 0!==R&&R.profileImage&&(t=null===R||void 0===R?void 0:R.profileImage),e.data.results.map(function(){var e=(0,d.Z)((0,l.Z)().mark((function e(n){var i;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i={firstName:r.firstName,lastName:r.lastName,walletAddress:r.walletAddress,chatName:H.name,userAvatar:t,createdAt:n.createdAt,expiresAt:n.expiresAt,fileName:n.filename,isVisible:n.isVisible,location:n.location,locationPreview:n.locationPreview,mimetype:n.mimetype,originalName:n.originalname,ownerKey:n.ownerKey,size:n.size,duration:null===n||void 0===n?void 0:n.duration,updatedAt:n.updatedAt,userId:n.userId,waveForm:"",attachmentId:n._id,wrappable:!0},c.ZP.sendMediaMessageStanza(B,i),te(!1);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})).catch((function(e){console.log(e),de({headline:"Error",description:"An error occurred while uploading the file"}),ae(!0)})),O.current.value=""}(e.target.files[0])},ref:O,style:{display:"none"}})]})]})]}),(0,j.jsxs)(C.Z,{fullScreen:Q,open:ee,onClose:function(){return te(!0)},"aria-labelledby":"responsive-dialog-title",children:[(0,j.jsx)(b.Z,{id:"responsive-dialog-title",children:le.headline}),(0,j.jsx)(D.Z,{children:re&&le.description.length>0?(0,j.jsx)(k.Z,{children:le.description}):(0,j.jsx)(a.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,j.jsx)(A.Z,{})})}),re?(0,j.jsx)(N.Z,{children:(0,j.jsx)(I.Z,{onClick:function(){return te(!1)},autoFocus:!0,children:"Close"})}):null]})]})}function M(){var e=(0,o.K)((function(e){return e.user})),t=(0,o.K)((function(e){return e.messages})),n=(0,s.k6)();return(0,i.useEffect)((function(){e.firstName||n.push("/")}),[e.firstName,n]),(0,j.jsxs)(r.Z,{maxWidth:"xl",style:{height:"calc(100vh - 68px)"},children:[(0,j.jsx)(a.Z,{children:"Chat"}),(0,j.jsx)(a.Z,{children:t.length}),(0,j.jsx)(J,{})]})}}}]);
//# sourceMappingURL=657.a9ac2252.chunk.js.map