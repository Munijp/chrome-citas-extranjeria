const captcha = document.querySelector('.g-recaptcha');
if (captcha) {
  alert('hemos detectado reCAPTCHA')
}

setInterval(() => {

  const btnEnviar = document.getElementById('btnEnviar');
  if (btnEnviar.disabled == false) {
    btnEnviar.click();
  }
}, 1000);