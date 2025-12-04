/* global _, document */

document.addEventListener('DOMContentLoaded', () => {
  // Création de variable
  let compteur = 0

  // Création du tableau
  const table = document.createElement('table')
  document.body.appendChild(table)

  // Création du titre
  const h1 = document.createElement('h1')
  h1.textContent = 'Tableau de nombres'
  document.body.insertBefore(h1, table)

  // Remplissage du tableau
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr')

    for (let c = 0; c < 15; c++) {
      const td = document.createElement('td')
      tr.appendChild(td)

      // Génération d'un nombre aléatoire entre 10 et 90
      const nombre = _.random(10, 90)
      td.textContent = nombre

      // Mise en évidence des nombres supérieurs à 80
      if (nombre > 80) {
        td.classList.add('highlight')
        compteur++
      }
    }

    table.appendChild(tr)
  }

  // Affichage du compteur
  const p = document.createElement('p')
  p.id = 'compteur'
  p.textContent = `Nombre de cellules ayant un nombre supérieur à 80 : ${compteur}`
  document.body.appendChild(p)
})
