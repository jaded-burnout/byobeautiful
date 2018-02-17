function toggleFeatureClass(cssClass) {
  chrome.tabs.executeScript(null, {
    "code": "document.getElementsByTagName('html')[0].classList.toggle('" + cssClass + "');"
  });
}

function enableFeatureClass(cssClass) {
  chrome.tabs.executeScript(null, {
    "code": "document.getElementsByTagName('html')[0].classList.add('" + cssClass + "');"
  });
}

chrome.tabs.onUpdated.addListener(function(_, _, tab) {
  if (tab.url.match(/forums\.somethingawful\.com/)) {
    chrome.pageAction.show(tab.id);
    chrome.storage.sync.get(function(storedState) {
      var state = {};
      if (storedState) {
        state = storedState;
      }

      for (var cssClass in state) {
        if (state[cssClass]) {
          enableFeatureClass(cssClass);
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function(request) {
  toggleFeatureClass(request.cssClass);
});
