document.getElementById('cvc').oninput = function () {
    if (this.value.length > 3) this.value = this.value.substr(0, 3);
  }

document.getElementById('num').oninput = function () {
  if (this.value.length > 19) this.value = this.value.substr(0, 19);
  
}

document.getElementById('date').oninput = function () {
  if (this.value.length > 5) this.value = this.value.substr(0, 5);
}

document.getElementById('num').addEventListener('input', function (e) {
  var target = e.target, position = target.selectionEnd, length = target.value.length;
  target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
});

document.getElementById('date').addEventListener('input', function (e) {
  var target = e.target, position = target.selectionEnd, length = target.value.length;
  target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ').trim();
  target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
});

