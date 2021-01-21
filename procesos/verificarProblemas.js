console.log('Verificando errores en la pagina');
if (document.body.innerHTML.indexOf('Se ha producido un error en el sistema') > -1) {
  window.location.reload()
}