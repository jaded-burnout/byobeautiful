var form = document.getElementById("features");

for (var name in features) {
  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  var labelText = document.createTextNode(name);

  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("change", function() {
    chrome.runtime.sendMessage({"cssClass": features[name]});
  });

  label.appendChild(checkbox);
  label.appendChild(labelText);

  form.appendChild(label);
}
