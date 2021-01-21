console.log('Verificando errores en la pagina');
if (document.body.innerHTML.indexOf('Se ha producido un error en el sistema') > -1) {
  var myAudio = new Audio(chrome.runtime.getURL(`${nombre}.mp3`));
  myAudio.play().then(() => {
    window.location.reload()
  })

}