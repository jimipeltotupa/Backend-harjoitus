function showAllRecipes() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/Reseptit", true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      const reseptit = JSON.parse(xmlhttp.responseText);
      let table = document.createElement('table');
      let headerRow = document.createElement('tr');

      headerRow.appendChild(createCell("Nimi"));
      headerRow.appendChild(createCell("Ruokalaji"));
      headerRow.appendChild(createCell("Valmistusaika"));
      headerRow.appendChild(createCell("Ohjeet"));

      table.appendChild(headerRow);

      for (let i = 0; i < reseptit.length; i++) {
        let newRow = document.createElement('tr');
        newRow.appendChild(createCell(reseptit[i].nimi));
        newRow.appendChild(createCell(reseptit[i].ruokalaji));
        newRow.appendChild(createCell(reseptit[i].valmistusaika));
        newRow.appendChild(createCell(reseptit[i].ohjeet));
        newRow.appendChild(createForm(reseptit[i], 'update'));
        newRow.appendChild(createForm(reseptit[i], 'delete'));
        table.appendChild(newRow);
      }

      document.getElementById("resepti-lista").appendChild(table);
    }
  };
}

function createCell(value) {
  let newCell = document.createElement('td');
  newCell.innerHTML = value;
  return newCell;
}

function createForm(resepti, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = (action == 'delete') ? 'POST' : 'GET';
  form.action = (action == 'delete') ? '/deleteRecipe' : '/updaterecipe.html';
  let input = document.createElement('input');
  input.value = resepti._id;
  input.type = 'hidden';
  input.name = '_id';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = resepti.nimi;
  input.type = 'hidden';
  input.name = 'nimi';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = resepti.ruokalaji;
  input.type = 'hidden';
  input.name = 'ruokalaji';
  form.appendChild(input);

  input = document.createElement('input');
  input.value = resepti.valmistusaika;
  input.type = 'hidden';
  input.name = 'valmistusaika';
  form.appendChild(input);

  input = document.createElement('input');
  input.type = 'submit';
  input.value = (action == 'delete') ? 'Delete resepti' : 'Update resepti';
  form.appendChild(input);

  newCell.appendChild(form);
  return newCell;
}

showAllRecipes();
