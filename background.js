let tabID;

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'sede.administracionespublicas.gob.es' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.alarms.onAlarm.addListener(alarmaHandler);

chrome.runtime.onMessage.addListener(
  async function messageHandler(request, sender) {
    if (request.alarm == "restart") {
      tabID = sender.tab.id
      const data = await syncData('tiempo')
      chrome.alarms.create('restart', { delayInMinutes: Number(data.tiempo) });
    }
    if (request == 'activarTab') {
      console.log(`activando tab :> ${sender.tab.id}`);
      chrome.tabs.update(sender.tab.id, { selected: true });
    }
  }
);

function syncData(campo) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(campo, function (data) {
      resolve(data)
    })
  });
}

function getTab(url) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ url }, (tabs) => {
      if (!tabs || tabs.length == 0) return reject()
      resolve(tabs[0])
    })
  });
}

function enviarMensaje(tabID, alarma) {
  chrome.tabs.sendMessage(tabID, { action: alarma });
}

async function alarmaHandler(alarm) {
  if (!tabID) {
    const tab = await getTab('https://sede.administracionespublicas.gob.es/icpplustiem/acCitar')
    if (tab) enviarMensaje(tab.id, alarm.name)
  } else {
    enviarMensaje(tabID, alarm.name)
  }
}