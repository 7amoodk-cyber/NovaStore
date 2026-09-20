const products=[
{id:1,name:"Nova Productivity",cat:"apps",desc:"حزمة أدوات ذكية لتنظيم يومك",price:9.99,icon:"📱",bg:"#e9e5ff",rating:4.9},
{id:2,name:"Cyber Quest",cat:"games",desc:"مغامرة رقمية مليئة بالتحديات",price:14.99,icon:"🎮",bg:"#dff5ff",rating:4.8},
{id:3,name:"Cinema Night",cat:"movies",desc:"تجربة سينمائية لعشاق الأفلام",price:6.99,icon:"🎬",bg:"#ffe8ed",rating:4.7},
{id:4,name:"Anime Universe",cat:"anime",desc:"عالم من الشخصيات والقصص المذهلة",price:11.99,icon:"🍥",bg:"#fff0d9",rating:4.9},
{id:5,name:"Creator Pack",cat:"design",desc:"موارد وقوالب للمصممين والمبدعين",price:19.99,icon:"🎨",bg:"#e3f6e8",rating:5},
{id:6,name:"Focus Timer Pro",cat:"apps",desc:"ارفع تركيزك وأنجز مهامك",price:4.99,icon:"⏱️",bg:"#e9efff",rating:4.6},
{id:7,name:"Pixel Arena",cat:"games",desc:"معارك سريعة بأسلوب بيكسل",price:12.99,icon:"👾",bg:"#f0e5ff",rating:4.8},
{id:8,name:"Motion Templates",cat:"design",desc:"قوالب حركة جاهزة لمشاريعك",price:24.99,icon:"🪄",bg:"#fff1df",rating:4.9}
];
let category="all",sort="featured",query="",cart=[],wish=[];
const $=s=>document.querySelector(s);
function render(){
 let list=products.filter(p=>(category==="all"||p.cat===category)&&(`${p.name} ${p.desc}`.toLowerCase().includes(query.toLowerCase())));
 if(sort==="price")list.sort((a,b)=>a.price-b.price);if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 $("#products").innerHTML=list.map(p=>`<article class="product"><div class="product-art" style="background:${p.bg}"><small>${label(p.cat)}</small><button class="heart ${wish.includes(p.id)?"saved":""}" onclick="toggleWish(${p.id})">${wish.includes(p.id)?"♥":"♡"}</button><span>${p.icon}</span></div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="meta"><div><div class="price">${p.price.toFixed(2)} <small>USD</small></div><div class="rating">★ ${p.rating}</div></div><button class="add" onclick="addCart(${p.id})">+ أضف</button></div></div></article>`).join("");
 $("#empty").style.display=list.length?"none":"block";
 document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b.dataset.category===category));
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.sort===sort));
 $("#cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);$("#wishCount").textContent=wish.length;
}
function label(c){return{apps:"تطبيقات",games:"ألعاب",movies:"أفلام",anime:"أنمي",design:"تصميم"}[c]}
function toast(t){$("#toast").textContent=t;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2200)}
function addCart(id){let item=cart.find(i=>i.id===id);item?item.qty++:cart.push({id,qty:1});render();toast("تمت إضافة المنتج إلى السلة");}
function toggleWish(id){wish.includes(id)?wish=wish.filter(x=>x!==id):wish.push(id);render();toast(wish.includes(id)?"أضيف إلى المفضلة":"أزيل من المفضلة")}
function openDrawer(type="cart"){ $("#drawerTitle").textContent=type==="wish"?"المفضلة":"سلة التسوق";$("#drawerBody").innerHTML="";let items=type==="wish"?products.filter(p=>wish.includes(p.id)):cart.map(i=>({...products.find(p=>p.id===i.id),qty:i.qty}));
 if(!items.length){$("#drawerBody").innerHTML='<div style="padding:35px;text-align:center;color:#8b91a4">لا توجد منتجات هنا بعد.</div>'}
 items.forEach(p=>{$("#drawerBody").innerHTML+=`<div class="drawer-item"><div class="thumb" style="background:${p.bg}">${p.icon}</div><div style="flex:1"><h4>${p.name}</h4><p>${p.price.toFixed(2)} USD ${p.qty?"× "+p.qty:""}</p>${type==="cart"?`<button onclick="removeCart(${p.id})">إزالة</button>`:`<button onclick="toggleWish(${p.id});openDrawer('wish')">إزالة</button>`}</div></div>`});
 $("#drawerFoot").innerHTML=type==="cart"?`<div class="total"><span>الإجمالي</span><span>${cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0).toFixed(2)} USD</span></div><button class="btn primary" style="width:100%" onclick="toast('هذه واجهة تجريبية — اربط بوابة الدفع لاحقًا')">متابعة الدفع ←</button>`:"";
 $("#drawer").classList.add("open");$("#overlay").classList.add("show");
}
function removeCart(id){cart=cart.filter(i=>i.id!==id);render();openDrawer("cart")}
document.querySelectorAll(".category,[data-category]").forEach(b=>b.addEventListener("click",()=>{category=b.dataset.category;render();document.querySelector("#featured").scrollIntoView({behavior:"smooth"})}));
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{sort=b.dataset.sort;render()}));
$("#searchToggle").onclick=()=>{$("#searchbar").classList.toggle("show");$("#searchInput").focus()};
$("#searchInput").oninput=e=>{query=e.target.value;render()};
$("#clearSearch").onclick=()=>{$("#searchInput").value="";query="";render()};
$("#cartBtn").onclick=()=>openDrawer("cart");$("#wishlistBtn").onclick=()=>openDrawer("wish");
$("#drawerClose").onclick=$("#overlay").onclick=()=>{$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")};
$("#menuBtn").onclick=()=>{$(".nav-links").style.display=$(".nav-links").style.display==="flex"?"none":"flex";$(".nav-links").style.position="absolute";$(".nav-links").style.top="68px";$(".nav-links").style.right="4%";$(".nav-links").style.background="white";$(".nav-links").style.padding="20px";$(".nav-links").style.border="1px solid var(--line)";$(".nav-links").style.borderRadius="15px";$(".nav-links").style.flexDirection="column"};
$("#newsletter").onsubmit=e=>{e.preventDefault();toast("تم تسجيل بريدك بنجاح — شكرًا لك!");e.target.reset()};
render();
