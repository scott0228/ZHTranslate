/*jshint esversion: 6 */
var options = optionsByDefault;

document.querySelectorAll('label').forEach(item => {
  item.addEventListener('click', event => {
      console.log(document.querySelector('input[name="transferType"]:checked').value);
  })
})

document.querySelectorAll('input').forEach(item => {
  item.addEventListener('change', event => {
      options.transferType = event.srcElement.value;
      browser.storage.local.set({options});
  })
})


browser.storage.local.get('options', (data) => {
  Object.assign(options, data.options);
  console.log('options', options);
  var transferTypeRadio = document.getElementsByName("transferType");
  for (var j = 0; j < transferTypeRadio.length; j++) {
      if (transferTypeRadio[j].value == options.transferType) {
          transferTypeRadio[j].checked = true;
          break;
      }
  }
});
