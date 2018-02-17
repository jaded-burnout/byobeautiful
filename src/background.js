loaded = false;
chrome.tabs.onUpdated.addListener(function(_, _, tab) {
  if (!loaded && tab.url.match(/forums\.somethingawful\.com/)) {
    chrome.pageAction.show(tab.id);
    loaded = true;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, respond) {
  chrome.tabs.executeScript(null, {
    "code": "document.getElementsByTagName('html')[0].classList.toggle('" + request.cssClass + "');"
  });
});
