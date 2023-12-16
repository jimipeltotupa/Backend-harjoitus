document.body.onload = function() {
    document.getElementById('_id').value = getParam('_id');
    document.getElementById('nimi').value = getParam('nimi');
    document.getElementById('ohjeet').value = getParam('ohjeet');
    document.getElementById('ruokalaji').value = getParam('ruokalaji');
    document.getElementById('valmistusaika').value = getParam('valmistusaika');
} 

function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}
