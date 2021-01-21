const RETRASO_ANIMACION = 3000;
const patronNIE = /[A-Z]\d+[A-Z]/;
const patronFecha = /\d{2}\/\d{2}\/\d{4}/

const formulario = document.getElementById('form');
const submit = document.querySelector('form .btn');
const dni = document.getElementById('dni')
const nombre = document.getElementById('nombre')
const fecha = document.getElementById('fecha');
const tiempo = document.getElementById('tiempo');
const msg = document.getElementById('msg');

chrome.storage.sync.get(['dni', 'nombre', 'fecha', 'tiempo'], function (data) {
  dni.value = data.dni || '';
  nombre.value = data.nombre || '';
  fecha.value = data.fecha || '';
  tiempo.value = data.tiempo || 1;
});

formulario.onsubmit = function (e) {
  e.preventDefault(e)
  const niePatron = patronNIE.test(dni.value)
  if (!niePatron) {
    return msg.innerHTML = 'NIE Inválido'
  }
  if (!patronFecha.test(fecha.value)) return msg.innerHTML = 'Fecha Inválida'
  /** @type {Array} */
  const nombreArray = nombre.value.split(' ')
  if (nombreArray.length < 3) return msg.innerHTML = 'Nombre inválido'

  msg.innerHTML = ''
  const data = {
    dni: dni.value,
    nombre: nombre.value,
    fecha: fecha.value,
    tiempo: tiempo.value
  }
  chrome.storage.sync.set(data, function () {
    submit.innerHTML = 'Guardado ✔';
    setTimeout(() => submit.innerHTML = 'Guardar 💾', 1000);
  })
};

/**
 * chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.style.backgroundColor = "' + color + '";' });
  });
 */