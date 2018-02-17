document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById("features");

  chrome.storage.sync.get(function(storedState) {
    var state = {};
    if (storedState) {
      state = storedState;
    }

    for (var name in features) {
      var label = document.createElement("label");
      var checkbox = document.createElement("input");
      var labelText = document.createTextNode(name);

      var cssClass = features[name];
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = (state[cssClass] === true);
      checkbox.addEventListener("change", function() {
        chrome.runtime.sendMessage({"cssClass": features[name]});

        state[cssClass] = checkbox.checked;
        chrome.storage.sync.set(state);
      });

      label.appendChild(checkbox);
      label.appendChild(labelText);

      form.appendChild(label);
    }
  });
});
