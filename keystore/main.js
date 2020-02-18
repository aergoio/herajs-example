let identity;
function newIdentity() {
	identity = HerajsCrypto.createIdentity();
  document.getElementById('address').innerHTML = identity.address;
}
function exportIdentity() {
    const password = document.getElementById('password').value;
    if (!password) {
        alert("Password must not be blank");
        return
    }
  document.getElementById('btn-export').innerHTML = 'Please wait...';
  setTimeout(() => {
    HerajsCrypto.keystoreFromPrivateKey(identity.privateKey, password).then(keystore => {
      const text = JSON.stringify(keystore, null, 2);
      download(identity.address + '__keystore.txt', text);
      document.getElementById('btn-export').innerHTML = 'Export account as keystore';
    });
  }, 0);
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
let keystore;
function changeFile() {
  const f = document.getElementById('file').files[0];
	const reader = new FileReader();
  reader.onload = function(e) {
    keystore = JSON.parse(e.target.result);
	};
  reader.readAsText(f);
}
function importIdentity() {
  document.getElementById('import-status').innerHTML = "Loading...";
	const password = document.getElementById('password2').value;
  setTimeout(() => {
    HerajsCrypto.identityFromKeystore(keystore, password).then(ide => {
      identity = ide;
      document.getElementById('address2').innerHTML = identity.address;
      document.getElementById('import-status').innerHTML = "Success";
    }).catch(err => {
    	document.getElementById('import-status').innerHTML = err;
    })
  }, 0);
}

window.onload = function() {
    document.getElementById('btn-newIdentity').addEventListener('click', newIdentity);
    document.getElementById('btn-export').addEventListener('click', exportIdentity);
    document.getElementById('file').addEventListener('change', changeFile);
    document.getElementById('btn-import').addEventListener('click', importIdentity);
}