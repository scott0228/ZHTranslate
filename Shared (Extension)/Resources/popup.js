console.log("Hello World!", browser);

document.querySelectorAll('label').forEach(item => {
  item.addEventListener('click', event => {
      console.log(document.querySelector('input[name="transferType"]:checked').value);
  })
})

document.querySelectorAll('input').forEach(item => {
  item.addEventListener('change', event => {
      console.log('AAA: ' + event.srcElement.value);
  })
})
