console.log("-*-");
// setTimeout(setup(), 50);

// INITIALISATION :
//on affecte les valeurs et cache les paroles et l'overlay
var mainPage = document.getElementsByClassName('main-container')[0];
var parolesPage = document.getElementsByClassName('paroles-container')[0];
var parolesOverlay = document.getElementsByClassName('paroles-overlay')[0];
let imagesContainer = document.getElementsByClassName('canvas-container')[0];
let imageUrls = ["assets/generated/fond-carre.png","assets/generated/fond-horizontal.png","assets/generated/fond-story.png"];
let imgs = imagesContainer.getElementsByTagName('img');
var loadListeners = [null,null,null];

let introContainer = document.getElementsByClassName('intro-container')[0];
let introText = document.getElementsByClassName('intro')[0];

// animation intro : on set y origin et target
let originalSignature = document.getElementsByClassName('oxmo-signature')[0];
let signature = originalSignature.cloneNode(true);
let ySignatureOrigin = originalSignature.offsetTop;

originalSignature.style.visibility = "hidden";
let targetSignature = document.getElementsByClassName('oxmo-signature')[1];
let ySignatureTarget = targetSignature.offsetTop;
targetSignature.style.visibility = "hidden";

signature.classList.add("animated-signature");

introContainer.appendChild(signature);
signature = document.getElementsByClassName('animated-signature')[0];
signature.setAttribute("style", "top: "+ySignatureOrigin+"px;");

let beigeColor = "#E9D3B6";
let clearBeigeColor = "#FFF5E8";

window.onscroll = scrollAnim;
window.onresize = onResize;
// loadListeners.

countdown();

if(AOS)
  AOS.init({
    disable: "mobile"
  });

// test();
// showParolesOverlay(false);
// showParoles(false);

function scrollAnim() {
  let scroll = window.scrollY;

  if(scroll+ySignatureOrigin <= ySignatureTarget) {
    signature.setAttribute("style", "top: "+(ySignatureOrigin + scroll)+"px");
  }

  if(scroll >= introText.offsetTop - window.screen.height/2) {
    //&& scroll < introText.offsetTop + introText.offsetHeight) {
    introContainer.style.backgroundColor = beigeColor;
  } else {
    introContainer.style.backgroundColor = clearBeigeColor;
  }
}

function onResize() {
  ySignatureOrigin = originalSignature.offsetTop;
  ySignatureTarget = targetSignature.offsetTop;
  scrollAnim();
}

function test() {
  setTimeout(createImage("Greg Phillingae",0), 10);
  setTimeout(createImage("Karol Senami",1), 15);
  setTimeout(createImage("Oxmo Puuuuuuuuccino",2), 20);
}
function showParoles(displayed) {
  if(displayed) {
    parolesPage.style.display = "block";
    mainPage.style.display = "none";
  }
  else {
    mainPage.style.display = "block";
    parolesPage.style.display = "none";
  }
  window.scrollTo(0, 0);
  scrollAnim();
}
function showParolesOverlay(displayed) {
  if(displayed)
    parolesOverlay.style.display = "block";
  else {
    parolesOverlay.style.display = "none";
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = "";
    }
  }

    // let overflowState = displayed ? "hidden":"unset";
    // document.body.setAttribute("style","overflow-y:"+overflowState);

}

function onParolesBlocClick(event) {
  console.log(event.innerHTML);
  // imagesContainer.innerHTML = "";
  parolesOverlay.style.display = "block";

  createImage(event.innerHTML,0);
  createImage(event.innerHTML,1);
  createImage(event.innerHTML,2);

  // document.body.setAttribute("style","overflow-y:hidden");
}

function createImage(paroles, index) {
  console.log("createImage");
  var img = new Image();
  img.crossOrigin = "Anonymous";

  // var canvas = document.getElementById('canvas'+index);
  var canvas = document.createElement("canvas");
  loadListeners[index] = function(){addTextToImage(canvas,img,paroles,index)};

  img.addEventListener('load', loadListeners[index], true);
  img.setAttribute("id","canvasImage"+index);
  // img.onload = addTextToImage(canvas,img,paroles);
  img.src = imageUrls[index];
  // canvas.setAttribute("width",img.naturalWidth);
  // canvas.setAttribute("height",img.naturalHeight);

  // no imagesContainer.appendChild(canvas);

  console.log("complete ? ",img.complete)

  // if(img.complete) {
  //   addTextToImage(canvas,img,paroles);
  // } else {
  //   img.onload = addTextToImage(canvas,img,paroles);
  //   img.src = "assets/generated/fond-carre.png";
  // }
  console.log("--");
  // img.onload = function() {


    // ctx.fillText("Entre nos femmes, nos filles et nos mères",x,y - 100);
    // ctx.fillText("Chaque jour la vie éphémère J’ai envie de dire",x,y);
    // ctx.fillText("Qu’on vous aime",x,y + 100);
  // };
}

function addTextToImage(canvas,img,paroles,index) {
  console.log("addTextToImage ; complete?"+img.complete);
  var ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.setAttribute("id","canvas"+index);

  ctx.drawImage(img, 0, 0);

  ctx.font = index==1 ? "120px Amithen" : "65px Amithen";
  ctx.textAlign = "center";
  ctx.fillStyle = "#E35550";


  var lines = index != 2 ? paroles.split('<br>') : paroles.split("\u200C");

  let lineHeight = index==1 ? 200 : 100;
  let x = canvas.width/2;
  let y = canvas.height/2 - (lines.length-2)/2*lineHeight;
  y -= 40;
  if(index == 2) y -= 80;

  for (var j = 0; j<lines.length; j++) {
    lines[j] = lines[j].replace("<br>", "");
    ctx.fillText(lines[j], x, y +j*lineHeight);
  }
  img.removeEventListener('load', loadListeners[index], true);
  img.style.visibility = "hidden";
  // var canvasContainer = document.getElementById('canvas'+index+'-container');
  // var ctnrCtx = canvasContainer.getContext("2d");
  // ctnrCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height,
  //   0, 0, canvasContainer.width, canvasContainer.height);

  // ctx.scale(0.25,0.25);

  // console.log(canvas.);
  // drawCanvasToImage(canvas, img);
  drawCanvasToImage(canvas, document.getElementById("canvas"+index+"-container"));
}

function drawCanvasToImage(canvas, img) {
  // console.log("canvas.toDataURL() "+canvas.toDataURL());

  img.setAttribute("src", canvas.toDataURL("image/png"));
  img.style.visibility = "";
  // canvas.toBlob(function(blob) {
  //   var url = URL.createObjectURL(blob);
  //
  //   img.onload = function() {
  //     // no longer need to read the blob so it's revoked
  //     URL.revokeObjectURL(url);
  //   };
  //
  //   img.src = url;
  //   imagesContainer.appendChild(img);
  // });

}

function countdown() {
    // Set the date we're counting down to
  var countDownDate = new Date("Mar 8, 2020 10:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementsByClassName("clip-countdown")[0].innerHTML = days + " j. " + hours + " h. "
    + minutes + " min. et " + seconds + " s. ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementsByClassName("clip-sortie")[0].style.display = "none";
      document.getElementsByClassName("clip-countdown")[0].style.display = "none";
      // document.getElementsByClassName("clip-countdown")[0].innerHTML = "EXPIRED";
    }
  }, 1000);
}

function onFbClick() {
  var url="http://www.oxmopuccino-tendrement.com"; //Set desired URL here
  var imgUrl="http://www.oxmopuccino-tendrement.com/"+imgs[0].src; //Set Desired Image here
  var totalurl=encodeURIComponent(url+'?img='+imgUrl);

  console.log("onFbClick (url, imgUrl, totalUrl)",url,imgUrl,totalurl);
  window.open ('http://www.facebook.com/sharer.php?u='+totalurl,'','width=500, height=500, scrollbars=yes, resizable=no');
}

function onTwitterClick() {

}
