document.body.onload = function() {
    document.getElementById('_id').value = getParam('_id');
    document.getElementById('title').value = getParam('title'); // Kokeillaan yhdellä
    document.getElementById('author').value = getParam('author');
    document.getElementById('publisher').value = getParam('publisher');
    document.getElementById('read').value = getParam('read');
} 
function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}