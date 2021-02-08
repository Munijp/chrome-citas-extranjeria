
if (document.body.innerHTML.indexOf('Se ha producido un error en el sistema') > -1) {
  var myAudio = new Audio(chrome.runtime.getURL(`assets/error.mp3`));
  myAudio.play().then(() => {
    window.location.href = 'https://sede.administracionespublicas.gob.es/icpplus/index.html';
  })
}
if (document.body.innerHTML.indexOf('Su sesión ha caducado por permanecer demasiado tiempo inactiva') > -1) {
  var myAudio = new Audio(chrome.runtime.getURL(`assets/error.mp3`));
  myAudio.play().then(() => {
    window.location.href = 'https://sede.administracionespublicas.gob.es/icpplus/index.html';
  })
}
if (document.body.innerHTML.indexOf('No ha superado la validación de seguridad asociada al Captcha del servicio') > -1) {
  var myAudio = new Audio(chrome.runtime.getURL(`assets/error.mp3`));
  myAudio.play().then(() => {
    window.location.href = 'https://sede.administracionespublicas.gob.es/icpplus/index.html';
  })
}