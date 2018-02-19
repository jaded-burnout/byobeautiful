document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById("features");

  chrome.storage.sync.get(function(storedState) {
    var state = {};
    if (storedState) {
      state = storedState;
    }

    var form = document.getElementById("features");
    var checkboxes = form.querySelectorAll("input[type=checkbox]");
    for (var checkbox of checkboxes) {
      var featureId = checkbox.getAttribute("id");

      checkbox.checked = (state[featureId] === true);
      checkbox.addEventListener("change", function(e) {
        chrome.runtime.sendMessage({
          "id": "spinning-images",
          "action": "toggle"
        });

        state[featureId] = e.target.checked;
        chrome.storage.sync.set(state);
      });

      if (extras[featureId]) {
        extras[featureId](checkbox);
      }
    }
  });
});
