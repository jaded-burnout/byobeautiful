extras = {
  "spinning-images": function(checkbox) {
    var fieldset = checkbox.parentElement.parentElement;
    var slider = fieldset.querySelector("input[type=range]");

    slider.addEventListener("change", function(e) {
      var newSpinTime = parseInt(e.target.value, 10);
      chrome.runtime.sendMessage({
        "id": "spinning-images",
        "action": "set-spin-time",
        "value": newSpinTime
      });
    });
  }
};
