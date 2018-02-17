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
      checkbox.setAttribute("data-cssclass", cssClass);
      checkbox.checked = (state[cssClass] === true);
      checkbox.addEventListener("change", function(e) {
        var targetCSSClass = e.target.getAttribute("data-cssclass");
        chrome.runtime.sendMessage({"cssClass": targetCSSClass});

        state[targetCSSClass] = e.target.checked;
        chrome.storage.sync.set(state);
      });

      label.appendChild(checkbox);
      label.appendChild(labelText);

      form.appendChild(label);
    }
  });
});
