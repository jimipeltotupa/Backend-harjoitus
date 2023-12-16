function readBook(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/books",true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    const books = JSON.parse(xmlhttp.responseText); //Huom! Palauttaa hakasulkeet JSONin ympärillä, slice poistaa ensimmäisen ja viimeisen merkin. Toimii yhdellä tiedolla, ei kahdella.
     // Luodaan taulukko, jossa käyttäjät näytetään
     let table = document.createElement('table');
     // Silmukka kirjojen läpikäymiseen
     for (let i = 0; i < books.length; i++) {
      let newRow = document.createElement('tr');
      newRow.appendChild(createCell(books[i].title));
      newRow.appendChild(createCell(books[i].author));
      newRow.appendChild(createCell(books[i].publisher));
      //Luodaan päivitä-painike
      newRow.appendChild(createForm(books[i], 'update'));
      //Luodaan poista-painike
      newRow.appendChild(createForm(books[i], 'delete'));
      table.appendChild(newRow);
     }
     document.getElementById("demo").appendChild(table);

        }
    }
function createCell(value) {
  let newCell = document.createElement('td');
  newCell.innerHTML = value;
  return newCell;
}
    }
    readBook();


function createForm(book, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = (action == 'delete') ? 'POST' : 'GET';
  // Ternääri (ternatry) operaatio, ensimmäinen vaihtoehto true ja jälkimmäinen false. Vertaa IF
  form.action = (action == 'delete') ? '/deleteBook' : '/updateBook.html';
  //Lisää piilokenttä id:lle
  let input = document.createElement('input');
  input.value = book._id;
  input.type = 'hidden'
  input.name = '_id'
  form.appendChild(input);
  // Jos update -> lisää lomakkeelle muutkin tiedot
  // lisätään kirjan nimi
  input = document.createElement('input');
  input.value = book.title;
  input.type = 'hidden'
  input.name = 'title'
  form.appendChild(input);
  // lisätään kirjoittajan nimi
  input = document.createElement('input');
  input.value = book.author;
  input.type = 'hidden'
  input.name = 'author'
  form.appendChild(input);
  // lisätään julkaisijan nimi
  input = document.createElement('input');
  input.value = book.publisher;
  input.type = 'hidden'
  input.name = 'publisher'
  form.appendChild(input);
  // Lisää painike
  input = document.createElement('input');
  input.type = 'submit';
  input.value = (action == 'delete') ? 'Delete book' : 'Update user';
  form.appendChild(input)
  newCell.appendChild(form);
  return newCell;

}