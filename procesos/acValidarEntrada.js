const captcha = document.querySelector('.g-recaptcha');
if (captcha) {
  var myAudio = new Audio(chrome.runtime.getURL(`assets/captcha.mp3`));
  myAudio.play().then(() => {
    window.location.reload()
  })
}

setInterval(() => {

  const btnEnviar = document.getElementById('btnEnviar');
  if (btnEnviar.disabled == false) {
    btnEnviar.click();
  }
}, 1000);