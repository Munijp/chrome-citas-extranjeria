const MINUTO = 1000 * 60
const info = document.querySelector('.mf-msg__info');
if (info) {
  const infoHTML = info.innerHTML;
  if (infoHTML.indexOf('En este momento no hay citas disponibles') > -1) {
    chrome.runtime.sendMessage({ alarm: "restart" });
    chrome.storage.sync.get("tiempo", (data) => {
      appendHtml(info, `<h2 style="color:#c33400;color:#c33400;">⏰ Esperando ${data.tiempo}m para iniciar de nuevo el proceso <span id="tiempo"></span></h2>`);
      iniciarTemporizador(data.tiempo);
    })
  } else {
    sonarAlarma();
    chrome.runtime.sendMessage('activarTab')
  }
}

function sonarAlarma() {
  var myAudio = new Audio(chrome.runtime.getURL("alarma.mp3"));
  myAudio.play();
}

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.action == 'restart') {
    window.location.href = 'https://sede.administracionespublicas.gob.es/icpplus/index.html'
  }
})

function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

let tiempoReiniciar;
function iniciarTemporizador(minutos) {
  const el = document.getElementById('tiempo');
  const now = new Date();
  tiempoReiniciar = new Date(0, 0, 0, 0, 0)
  tiempoReiniciar.setMinutes(minutos)
  setInterval(() => {
    el.innerHTML = tiempoReiniciar.toLocaleTimeString()
    tiempoReiniciar.setSeconds(tiempoReiniciar.getSeconds() - 1)
  }, 1000);
}

function getTab(url) {
  return new Promise((resolve, reject) => {
    console.log('tabs', chrome.tabs);
    chrome.tabs.query({ url }, (tabs) => {
      if (!tabs || tabs.length == 0) return reject()
      resolve(tabs[0])
    })
  });
}