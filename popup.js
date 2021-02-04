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
const activo = document.getElementById('activo');

let storage = {}

chrome.storage.sync.get(['dni', 'nombre', 'fecha', 'tiempo', 'activo'], function (data) {
  storage = data;
  dni.value = data.dni || '';
  nombre.value = data.nombre || '';
  fecha.value = data.fecha || '';
  tiempo.value = data.tiempo || 1;
  if (data.activo == undefined) {
    storage.activo = true;
    chrome.storage.sync.set(storage);
    activo.classList.add('btn-success');
    activo.textContent = "ACTIVO";
  } else {
    if (data.activo) {
      activo.textContent = "ACTIVO";
      activo.classList.add('btn-success')
    }
    else {
      activo.textContent = "INACTIVO";
      activo.classList.add('btn-danger')
    }
  }
});

activo.onclick = function activo_onClick(e) {
  storage.activo = !storage.activo;
  console.log('activo :>> ', storage.activo);
  chrome.storage.sync.set(storage, () => {
    if (storage.activo) {
      activo.textContent = "ACTIVO";
      activo.classList.remove("btn-danger")
      activo.classList.add("btn-success")
    } else {
      activo.textContent = "INACTIVO";
      activo.classList.remove("btn-success")
      activo.classList.add("btn-danger")
    }
  });
}

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