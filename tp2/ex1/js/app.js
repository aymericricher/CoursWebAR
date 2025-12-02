document.addEventListener('DOMContentLoaded', () => {


  
  const table = document.createElement('table');
  document.body.appendChild(table);

  const h1 = document.createElement('h1')
  h1.textContent = 'Tableau de nombres'
  document.body.insertBefore(h1, table);


  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');

    for (let c = 0; c < 15; c++) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }





  

});
