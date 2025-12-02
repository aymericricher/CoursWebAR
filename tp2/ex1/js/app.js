document.addEventListener('DOMContentLoaded', () => {


  
  const table = document.createElement('table');
  document.body.appendChild(table);

  const h1 = document.createElement('h1')
  h1.textContent = 'Tableau de nombres'
  document.body.insertBefore(h1, table);

  let compteur = 0;

  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');

    for (let c = 0; c < 15; c++) {
      const td = document.createElement('td');
      tr.appendChild(td);

      const nombre = _.random(10, 90);
      td.textContent = nombre; 

      if (nombre > 80) {
          td.classList.add('highlight')
          compteur++
        }
    }

    table.appendChild(tr);
  }

  const p = document.createElement('p');
  p.id = 'compteur';
  p.textContent = `Nombre de cellules ayant un nombre supérieur à 80 : ${compteur}`;
  document.body.appendChild(p);


});
