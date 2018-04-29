// get tous les boutons
// ajout onClick a chaque bouton
// get l'iframe .video-overlay
// prendre l'id de la video et le mettre en src de l'iframe

let vimeoIframe = document.getElementById('video-overlay');
let vimeoContainer = document.getElementById('video-overlay-container');
let srcPre = "https://player.vimeo.com/video/";
let srcPost = "?color=FFFFFF&title=0&byline=0&portrait=0";
let allVideoIcons = document.getElementsByClassName('video-icon');
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var player = new Vimeo.Player(vimeoIframe);
init();

function init() {
  for (var i = 0; i < allVideoIcons.length; i++) {
    allVideoIcons[i].onclick = onVideoIconClick;
  }
  console.log(vimeoIframe.offsetHeight);
  document.addEventListener("click",onClick,false);
}

var isLoading = false;

function onVideoIconClick(e) {
  vimeoIframe.src = srcPre + e.currentTarget.getAttribute('vimeo-id') + srcPost;
  let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(!iOS) {
      player.play();
    }
  vimeoContainer.style.display = 'block';
  console.log(vimeoIframe.offsetHeight);
  console.log(vimeoIframe.offsetHeight/9 * 16);
  vimeoIframe.style.width = vimeoIframe.offsetHeight/9 * 16+"px";

  isLoading = true;
}

function onClick(e) {
  console.log(e.currentTarget);
  if(e.currentTarget != vimeoIframe) {
    console.log("yo");
  } else {
    console.log("no");
  }
}
console.log(allVideoIcons);
console.log(allVideoIcons[0].getAttribute('vimeo-id'));
