(this.webpackJsonpprojectv2=this.webpackJsonpprojectv2||[]).push([[0],{107:function(e,t,a){},108:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),s=a.n(r),i=(a(82),a(14)),o=a(12),d=a(19),u=a(7),l=a(15),j=a(65),b=a.n(j).a.create({baseURL:"http://localhost:7542/2.0/",withCredentials:!0}),p=function(e,t,a){return b.post("auth/login",{email:e,password:t,rememberMe:a})},h=function(e,t){return b.post("auth/register",{email:e,password:t})},O=function(){return b.post("auth/me")},f=function(e){return b.put("auth/me",{name:e})},g=function(){return b.delete("auth/me")},m=function(e,t,a){return b.post("auth/forgot",{email:e,from:t,message:a})},x=function(e,t){return b.post("auth/set-new-password",{password:e,resetPasswordToken:t})},k=function(e){return b.get("cards/pack",e)},C=function(e){return b.post("cards/pack",{cardsPack:{name:e}})},v=function(e){return b.delete("cards/pack/?id=".concat(e))},w=function(e,t){return b.put("cards/pack",{cardsPack:{_id:e,name:t}})},P=function(e){return b.get("cards/card",e)},y=function(e){return b.post("cards/card",{card:e})},S=function(e){return b.delete("cards/card?id=".concat(e))},_=function(e,t){return b.put("cards/card",{card:{_id:e,question:t}})},I=a(32),D=Object(I.b)({name:"auth",initialState:{isLoggedIn:!1,isRegistered:!1,isInitialized:!1,user:{_id:"",email:"",name:"",avatar:""},updatedUser:{},isPassUpdated:!1,isPassSet:!1,status:"idle"},reducers:{getLoginAC:function(e,t){e.isLoggedIn=t.payload.value},registerNewUser:function(e,t){e.isRegistered=t.payload.value},getMe:function(e,t){e.isInitialized=t.payload.value},getUpdatedUser:function(e,t){e.updatedUser=t.payload.name},getUser:function(e,t){e.user=t.payload.user},forgotPass:function(e,t){e.isPassUpdated=t.payload.value},setPass:function(e,t){e.isPassSet=t.payload.value},setAppStatusAC:function(e,t){e.status=t.payload.status}}}),A=D.actions,U=A.getLoginAC,F=A.registerNewUser,T=A.getMe,L=A.getUpdatedUser,R=A.getUser,N=A.forgotPass,E=A.setPass,Z=A.setAppStatusAC,q=D.reducer,G=a(2),M=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.auth.isLoggedIn})),a=Object(u.c)((function(e){return e.auth.user})),c=Object(n.useState)(a.name),r=Object(d.a)(c,2),s=r[0],i=r[1],j=Object(n.useState)(!1),b=Object(d.a)(j,2),p=b[0],h=b[1],g=Object(n.useState)(!1),m=Object(d.a)(g,2),x=m[0],k=m[1];Object(n.useEffect)((function(){t||e((function(e){O().then((function(t){var a=t.data,n=a._id,c=a.name,r=a.email,s=a.avatar;e(R({user:{_id:n,name:c,email:r,avatar:s}}))})).catch((function(e){e.response?e.response.data.error:e.message,console.log("Error: ",Object(l.a)({},e))}))}))}),[]);return t?Object(G.jsxs)("div",{children:[Object(G.jsx)("div",{children:Object(G.jsx)("img",{src:a.avatar,alt:""})}),x&&Object(G.jsx)("div",{children:p?Object(G.jsx)("input",{type:"text",value:s,autoFocus:!0,onBlur:function(){h(!1),e(function(e){return function(t){t(Z({status:"loading"})),f(e).then((function(a){t(L({name:e})),t(Z({status:"succeeded"}))})).catch((function(e){e.response?e.response.data.error:e.message,console.log("Error: ",Object(l.a)({},e))}))}}(s))},placeholder:"new name",onChange:function(e){i(e.currentTarget.value)}}):Object(G.jsx)("span",{onDoubleClick:function(){h(!0),i(a.name)},children:s})}),Object(G.jsx)("button",{onClick:function(){k(!x)},children:"show"})]}):Object(G.jsx)(o.a,{to:we.login})},$=a(31),V=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.auth.isLoggedIn})),a=Object($.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<4&&(t.password="Invalid password"):t.password="Required",t},onSubmit:function(t){var n,c,r;e((n=t.email,c=t.password,r=t.rememberMe,function(e){e(Z({status:"loading"})),p(n,c,r).then((function(t){var a=t.data,n=a._id,c=a.name,r=a.email,s=a.avatar;e(U({value:!0})),e(R({user:{_id:n,name:c,email:r,avatar:s}})),e(Z({status:"succeeded"}))})).catch((function(e){e.response?e.response.data.error:e.message,console.log("Error: ",Object(l.a)({},e))}))})),a.resetForm()}});return t?Object(G.jsx)(o.a,{to:we.profile}):Object(G.jsx)("div",{children:Object(G.jsxs)("form",{onSubmit:a.handleSubmit,children:[Object(G.jsxs)("div",{children:[Object(G.jsx)("input",Object(l.a)({type:"email",placeholder:"email"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(G.jsx)("div",{style:{color:"red"},children:a.errors.email})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("input",Object(l.a)({type:"password",placeholder:"password"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&Object(G.jsx)("div",{style:{color:"red"},children:a.errors.password})]}),Object(G.jsx)("input",Object(l.a)({type:"checkbox"},a.getFieldProps("rememberMe"))),Object(G.jsx)("button",{type:"submit",color:"primary",children:"Login"})]})})},z=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.auth.isRegistered})),a=Object(u.c)((function(e){return e.auth.isLoggedIn})),n=Object($.a)({initialValues:{email:"",password:"",password_confirmation:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Email is Required",e.password?e.password.length<4&&(t.password="Invalid password"):t.password="Password is Required",e.password_confirmation!==e.password&&(t.password="Passwords should match"),t},onSubmit:function(t){var a,c;n.resetForm(),e((a=t.email,c=t.password,function(e){e(Z({status:"loading"})),h(a,c).then((function(t){e(F({value:!0})),e(Z({status:"succeeded"}))})).catch((function(e){e.response?e.response.data.error:e.message,console.log("Error: ",Object(l.a)({},e))}))}))}});return t?Object(G.jsx)(o.a,{to:we.login}):a?Object(G.jsx)("div",{children:Object(G.jsxs)("form",{onSubmit:n.handleSubmit,children:[Object(G.jsxs)("div",{children:[Object(G.jsx)("input",Object(l.a)({type:"email",placeholder:"email"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(G.jsx)("div",{style:{color:"red"},children:n.errors.email})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("input",Object(l.a)({type:"password",placeholder:"password"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(G.jsx)("div",{style:{color:"red"},children:n.errors.password})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)("input",Object(l.a)({type:"password",placeholder:"password"},n.getFieldProps("password_confirmation"))),n.touched.password_confirmation&&n.errors.password_confirmation&&Object(G.jsx)("div",{style:{color:"red"},children:n.errors.password_confirmation})]}),Object(G.jsx)("button",{type:"submit",color:"primary",children:"Register"})]})}):Object(G.jsx)(o.a,{to:we.login})},B=function(){return Object(G.jsx)("div",{})},H=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.auth.isLoggedIn})),a=Object($.a)({initialValues:{email:""},validate:function(e){var t={};e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required"},onSubmit:function(t){var n,c,r;e((n=t.email,c="nya-admin@nya.nya",r="<div style=\"background-color: lime; padding: 15px\">error: string;password recovery link:<a href='http://tengrix.github.io/projectv2/#/set-pass/$token$'>link</a></div>",function(e){e(Z({status:"loading"})),m(n,c,r).then((function(t){e(N({value:!0})),e(Z({status:"succeeded"}))}))})),a.resetForm()}});return t?Object(G.jsx)("div",{children:Object(G.jsxs)("form",{onSubmit:a.handleSubmit,action:"",children:[Object(G.jsx)("input",Object(l.a)({type:"email",placeholder:"email"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(G.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(G.jsx)("button",{type:"submit",children:"Submit"})]})}):Object(G.jsx)(o.a,{to:we.login})},J=function(){var e=Object(o.g)().token,t=Object(u.b)(),a=Object(u.c)((function(e){return e.auth.isPassSet})),n=Object(u.c)((function(e){return e.auth.isLoggedIn})),c=Object($.a)({initialValues:{password:""},validate:function(e){var t={};e.password?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.password)||(t.password="Invalid email address"):t.password="Required"},onSubmit:function(a){t(function(e,t){return function(a){a(Z({status:"loading"})),x(e,t).then((function(e){a(E({value:!0})),a(Z({status:"succeeded"}))}))}}(a.password,e)),c.resetForm()}});return a?Object(G.jsx)(o.a,{to:we.login}):n?Object(G.jsx)("div",{children:Object(G.jsxs)("form",{onSubmit:c.handleSubmit,action:"",children:[Object(G.jsx)("input",Object(l.a)({type:"password",placeholder:"password"},c.getFieldProps("password"))),c.touched.password&&c.errors.password&&Object(G.jsx)("div",{style:{color:"red"},children:c.errors.password}),Object(G.jsx)("button",{type:"submit",children:"Submit"})]})}):Object(G.jsx)(o.a,{to:we.login})},W=Object(I.b)({name:"packReducer",initialState:{cardPacks:[],myCardsPack:!1,isDeleted:!1,cardPacksTotalCount:14,maxCardsCount:1,minCardsCount:0,page:1,pageCount:10,sortCardsPacks:"0cardsCount",user_id:"",newCardsPack:{name:""},updatedCardsPack:{name:""}},reducers:{getPacks:function(e,t){e.cardPacks=t.payload.packsData.cardPacks,e.cardPacksTotalCount=t.payload.packsData.cardPacksTotalCount,e.page=t.payload.packsData.page,e.maxCardsCount=t.payload.packsData.maxCardsCount,e.pageCount=t.payload.packsData.pageCount,e.minCardsCount=t.payload.packsData.minCardsCount},getNewPack:function(e,t){e.newCardsPack.name=t.payload.name},changeSort:function(e,t){e.sortCardsPacks=t.payload.newSort},checkMyPack:function(e,t){e.myCardsPack=t.payload.value},delPacks:function(e,t){e.isDeleted=t.payload.value},updatePackName:function(e,t){e.updatedCardsPack.name=t.payload.name}}}),Q=W.actions,K=Q.getPacks,X=(Q.getNewPack,Q.changeSort),Y=Q.checkMyPack,ee=Q.delPacks,te=Q.updatePackName,ae=W.reducer,ne=function(){return function(e,t){e(Z({status:"loading"}));var a=t(),n={params:{page:a.packs.page,max:a.packs.maxCardsCount,pageCount:a.packs.pageCount,min:a.packs.minCardsCount,sortPacks:a.packs.sortCardsPacks,user_id:a.packs.user_id,cardPacksTotalCount:a.packs.cardPacksTotalCount}};a.packs.myCardsPack?n.params.user_id=a.auth.user._id:n.params.user_id="",k(n).then((function(t){e(K({packsData:t.data})),e(Z({status:"succeeded"}))}))}},ce=a(145),re=a(143),se=a(144),ie=a(146),oe=a(147),de=a(142),ue=a(152),le=a(153),je=a(138),be=function(e){var t=Object(u.b)(),a=Object(n.useState)(!0),c=Object(d.a)(a,2),r=c[0],s=c[1],o=Object(n.useState)(""),l=Object(d.a)(o,2),j=l[0],b=l[1],p=function(e){t(function(e){return function(t){t(Z({status:"loading"})),v(e).then((function(){t(ee({value:!0})),t(ne()),t(Z({status:"succeeded"}))}))}}(e))},h=function(e,a){t(te({name:j})),t(function(e,t){return function(a){a(Z({status:"loading"})),w(e,t).then((function(e){a(ne()),a(Z({status:"succeeded"}))}))}}(e,a))};return Object(G.jsxs)(je.a,{children:[Object(G.jsx)(de.a,{component:"th",scope:"row",children:e.packs.name}),Object(G.jsx)(de.a,{component:"th",scope:"row",children:e.packs.cardsCount}),Object(G.jsx)(de.a,{align:"right",children:e.packs.created}),Object(G.jsx)(de.a,{align:"right",children:e.packs.updated}),e.isChecked&&Object(G.jsxs)(de.a,{align:"right",children:[Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){s(!r)},children:"edit"}),Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){return p(e.packs._id)},children:"del"}),r?"":Object(G.jsx)("input",{type:"text",value:j,onChange:function(e){return b(e.currentTarget.value)}}),Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){return h(e.packs._id,j)},children:"save"})]}),Object(G.jsx)(i.b,{to:"/cards/"+e.packs._id,children:Object(G.jsx)("button",{disabled:"loading"===e.status,children:"learn"})})]})},pe=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.auth.status})),a=Object(u.c)((function(e){return e.packs.cardPacks})),r=Object(u.c)((function(e){return e.auth.isLoggedIn})),s=Object(u.c)((function(e){return e.packs.newCardsPack.name})),i=Object(u.c)((function(e){return e.packs.myCardsPack})),l=Object(n.useState)(s),j=Object(d.a)(l,2),b=j[0],p=j[1],h=c.a.useState(0),O=Object(d.a)(h,2),f=O[0],g=O[1],m=c.a.useState(10),x=Object(d.a)(m,2),k=x[0],v=x[1],w=Object(n.useState)(i),P=Object(d.a)(w,2),y=P[0],S=P[1],_=Object(le.a)({table:{minWidth:650}})();Object(n.useEffect)((function(){e(ne())}),[]);var I=function(t){e(function(e){return function(t){t(Z({status:"loading"})),C(e).then((function(e){t(ne()),t(Z({status:"succeeded"}))}))}}(t))};if(!r)return Object(G.jsx)(o.a,{to:we.login});var D=function(t){e(X({newSort:t})),e(ne())};return Object(G.jsxs)(re.a,{component:se.a,children:[Object(G.jsxs)(ce.a,{className:_.table,"aria-label":"simple table",children:[Object(G.jsxs)(ie.a,{children:[Object(G.jsx)("input",{type:"checkbox",checked:y,onChange:function(t){var a=t.currentTarget.checked;S(a),e(Y({value:a})),e(ne())}}),Object(G.jsxs)(oe.a,{children:[Object(G.jsxs)(de.a,{children:[Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("1name")},children:"\u2191"}),Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("0name")},children:"\u2193"}),"Name"]}),Object(G.jsxs)(de.a,{align:"right",children:[Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("0cardsCount")},children:"\u2191"}),Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("1cardsCount")},children:"\u2193"}),"Cards Count"]}),Object(G.jsxs)(de.a,{align:"right",children:[Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("1created")},children:"\u2191"}),Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("0created")},children:"\u2193"}),"Created"]}),Object(G.jsxs)(de.a,{align:"right",children:[Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("1updated")},children:"\u2191"}),Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return D("0updated")},children:"\u2193"}),"Updated"]}),Object(G.jsxs)(de.a,{align:"right",children:[Object(G.jsx)("input",{disabled:"loading"===t,type:"text",value:b,onChange:function(e){p(e.currentTarget.value)}}),Object(G.jsx)("button",{disabled:"loading"===t,onClick:function(){return I(b)},children:"add"})]})]})]}),a.map((function(e){return Object(G.jsx)(be,{packs:e,isChecked:i,status:t},e._id)}))]}),Object(G.jsx)(ue.a,{rowsPerPageOptions:[5,10,25],component:"div",count:a.length,rowsPerPage:k,page:f,onPageChange:function(t,a){g(a),e(ne())},onRowsPerPageChange:function(t){v(parseInt(t.target.value,10)),g(0),e(ne())}})]})},he=Object(I.b)({name:"cardReducer",initialState:{cards:[],cardsTotalCount:3,maxGrade:5,minGrade:1,page:1,pageCount:10,packUserId:"",sortCards:"0grade",newCardCreated:!1},reducers:{getCards:function(e,t){e.cards=t.payload.cardData.cards,e.page=t.payload.cardData.page,e.pageCount=t.payload.cardData.pageCount,e.packUserId=t.payload.cardData.packUserId,e.cardsTotalCount=t.payload.cardData.cardsTotalCount,e.maxGrade=t.payload.cardData.maxGrade,e.minGrade=t.payload.cardData.minGrade},sortCards:function(e,t){e.sortCards=t.payload.value},newCard:function(e,t){e.newCardCreated=t.payload.value}}}),Oe=he.actions,fe=Oe.getCards,ge=Oe.sortCards,me=(Oe.newCard,he.reducer),xe=function(e){return function(t,a){var n=a(),c={params:{min:n.cards.minGrade,max:n.cards.maxGrade,page:n.cards.page,sortCards:n.cards.sortCards,pageCount:n.cards.pageCount,cardsPack_id:e}};P(c).then((function(e){t(fe({cardData:e.data}))}))}},ke=function(e){var t=Object(u.b)(),a=Object(n.useState)(!1),c=Object(d.a)(a,2),r=c[0],s=c[1],i=Object(u.c)((function(e){return e.packs.myCardsPack})),o=function(){s(!r)},l=Object(n.useState)(""),j=Object(d.a)(l,2),b=j[0],p=j[1],h=function(e,a,n){t(function(e,t,a){return function(n,c){_(e,t).then((function(){n(xe(a))}))}}(e,a,n))};return Object(G.jsxs)(je.a,{children:[Object(G.jsx)(de.a,{component:"th",scope:"row",children:e.card.question}),Object(G.jsxs)(de.a,{align:"left",children:[r&&e.card.answer,r?Object(G.jsx)("button",{onClick:function(){return o()},children:"close"}):Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){return o()},children:"show"})]}),Object(G.jsx)(de.a,{align:"left",children:e.card.shots}),Object(G.jsx)(de.a,{align:"left",children:e.card.grade}),i&&Object(G.jsxs)(de.a,{children:[Object(G.jsx)(de.a,{align:"left",children:Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){return e.delCardHandler(e.id)},children:"del"})}),Object(G.jsxs)(de.a,{align:"left",children:[Object(G.jsx)("input",{disabled:"loading"===e.status,type:"text",value:b,onChange:function(e){p(e.currentTarget.value)}}),Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){return h(e.id,b,e.packId)},children:"upd"})]}),Object(G.jsx)(de.a,{children:Object(G.jsx)("button",{disabled:"loading"===e.status,onClick:function(){return e.addNewCard(e.packId)},children:"add"})})]})]})},Ce=a(148),ve=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.cards.cards})),a=Object(u.c)((function(e){return e.auth.isLoggedIn})),c=Object(u.c)((function(e){return e.auth.status})),r=Object(o.g)().packID,s=Object(le.a)({table:{minWidth:650}})();Object(n.useEffect)((function(){e(xe(r))}),[e,r]);var i=function(t){e(ge({value:t})),e(xe(r))},d=function(t){var a;e((a=t,function(e,t){var n={_id:t().auth.user._id,cardsPack_id:a,grade:0,shots:0,answer:"no answer",question:"no question"};y(n).then((function(t){e(xe(a))}))}))};if(!a)return Object(G.jsx)(o.a,{to:we.login});var l=function(t){e(function(e){return function(){S(e).then((function(){}))}}(t)),e(xe(r))};return Object(G.jsx)(re.a,{component:se.a,children:Object(G.jsxs)(Ce.a,{className:s.table,"aria-label":"simple table",children:[Object(G.jsx)(ie.a,{children:Object(G.jsxs)(oe.a,{children:[Object(G.jsx)(de.a,{children:"Questions"}),Object(G.jsx)(de.a,{align:"left",children:"Answers"}),Object(G.jsxs)(de.a,{align:"left",children:[Object(G.jsx)("button",{disabled:"loading"===c,onClick:function(){return i("1shot")},children:"\u2191"}),Object(G.jsx)("button",{disabled:"loading"===c,onClick:function(){return i("0shot")},children:"\u2193"}),"Shots"]}),Object(G.jsxs)(de.a,{align:"left",children:[Object(G.jsx)("button",{disabled:"loading"===c,onClick:function(){return i("1grade")},children:"\u2191"}),Object(G.jsx)("button",{disabled:"loading"===c,onClick:function(){return i("0grade")},children:"\u2193"}),"Grades"]})]})}),t.length&&t.map((function(e){return Object(G.jsx)(ke,{id:e._id,card:e,delCardHandler:l,packId:r,addNewCard:d,status:c},e._id)}))]})})},we={login:"/login",register:"/register",profile:"/profile",error:"/404",renew:"/renew",setPassword:"/set-pass/:token",packs:"/packs",cards:"/cards/:packID?"},Pe=function(){return Object(G.jsx)("div",{children:Object(G.jsxs)(o.d,{children:[Object(G.jsx)(o.b,{path:"/",exact:!0,component:M}),Object(G.jsx)(o.b,{path:we.profile,component:M}),Object(G.jsx)(o.b,{path:we.login,component:V}),Object(G.jsx)(o.b,{path:we.register,component:z}),Object(G.jsx)(o.b,{path:we.error,component:B}),Object(G.jsx)(o.b,{path:we.renew,component:H}),Object(G.jsx)(o.b,{path:we.setPassword,component:J}),Object(G.jsx)(o.b,{path:we.packs,component:pe}),Object(G.jsx)(o.b,{path:we.cards,component:ve}),Object(G.jsx)(o.b,{path:"/404",render:function(){return Object(G.jsx)("h1",{children:"404:PAGE NOT FOUND"})}}),Object(G.jsx)(o.a,{from:"*",to:we.error})]})})},ye=a(149),Se=a(150),_e=a(151),Ie=function(){return Object(G.jsx)("div",{children:Object(G.jsx)(ye.a,{color:"light",light:!0,expand:"md",children:Object(G.jsxs)(Se.a,{className:"mr-auto",navbar:!0,children:[Object(G.jsx)(_e.a,{children:Object(G.jsx)(i.b,{to:we.profile,children:"Profile"})}),Object(G.jsx)(_e.a,{children:Object(G.jsx)(i.b,{to:we.login,children:"Sign In"})}),Object(G.jsx)(_e.a,{children:Object(G.jsx)(i.b,{to:we.register,children:"Sign Up"})}),Object(G.jsx)(_e.a,{children:Object(G.jsx)(i.b,{to:we.renew,children:"Renew Password"})}),Object(G.jsx)(_e.a,{children:Object(G.jsx)(i.b,{to:we.setPassword,children:"Set Password"})}),Object(G.jsx)(_e.a,{children:Object(G.jsx)(i.b,{to:we.packs,children:"Packs"})})]})})})};a(107);var De=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.auth.isInitialized})),a=Object(u.c)((function(e){return e.auth.isLoggedIn}));return Object(n.useEffect)((function(){e((function(e){e(Z({status:"loading"})),O().then((function(t){e(U({value:!0})),e(R({user:t.data})),e(Z({status:"succeeded"}))})).catch((function(e){e.response?e.response.data.error:e.message,console.log("Error: ",Object(l.a)({},e))})).finally((function(){e(T({value:!0}))}))}))}),[e]),t?Object(G.jsx)("div",{children:Object(G.jsxs)(i.a,{children:[a?Object(G.jsx)("button",{onClick:function(){e((function(e){e(Z({status:"loading"})),g().then((function(t){e(U({value:!1})),e(Z({status:"succeeded"}))})).catch((function(e){e.response?e.response.data.error:e.message,console.log("Error: ",Object(l.a)({},e))}))}))},children:"logout"}):Object(G.jsx)(o.a,{to:we.login}),Object(G.jsx)(Ie,{}),Object(G.jsx)(Pe,{})]})}):Object(G.jsx)("div",{children:"loading"})},Ae=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,155)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))},Ue=a(24),Fe=a(39),Te=Object(Ue.b)({auth:q,packs:ae,cards:me}),Le=Object(I.a)({reducer:Te,middleware:function(e){return e().prepend(Fe.a)}});window.store=Le,s.a.render(Object(G.jsx)(c.a.StrictMode,{children:Object(G.jsx)(u.a,{store:Le,children:Object(G.jsx)(De,{})})}),document.getElementById("root")),Ae()},82:function(e,t,a){}},[[108,1,2]]]);
//# sourceMappingURL=main.3c64b6d3.chunk.js.map