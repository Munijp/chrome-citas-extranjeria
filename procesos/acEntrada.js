chrome.storage.sync.get(['dni', 'nombre', 'fecha'], function (data) {
  document.getElementById('txtIdCitado').value = data.dni;
  document.getElementById('txtDesCitado').value = data.nombre;
  document.getElementById('txtFecha').value = data.fecha;
  setInterval(() => {
    const btn = document.getElementById('btnEnviar');
    if (btn.disabled == false) btn.click();
  }, 2000);
});

