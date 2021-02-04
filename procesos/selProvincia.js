chrome.storage.sync.get(['activo'], ({ activo }) => {
  if (activo) {
    document.getElementById('form').value = '/icpplustiem/citar?p=28&locale=es';
    document.getElementById('btnAceptar').click()
  }
})
