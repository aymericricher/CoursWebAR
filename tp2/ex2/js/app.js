let dataCDPK = null
let definitionForces = null

// Fonction pour charger les données JSON
async function chargerCDPK () {
  try {
    const response = await fetch('http://localhost:8080/data_cdp_k.php')
    if (!response.ok) throw new Error('Erreur chargement data_cdp_k.php')
    dataCDPK = await response.json()
  } catch (err) {
    console.error(err)
  }
}

// Fonction pour charger les définitions des forces
async function chargerDefinitionForces () {
  try {
    // Charger le fichier JSON
    const response = await fetch('http://localhost:8080/definition_forces.php')
    if (!response.ok) throw new Error('Erreur chargement definition_forces.php')

    definitionForces = await response.json()

    // Afficher les définitions dans la boîte prévue à cet effet
    const box = document.getElementById('definitionBox')
    const liste = definitionForces.definition_forces
    let html = ''

    // Parcourir les définitions et les ajouter au HTML
    for (const item of liste) {
      html += `<strong>${item.force}</strong><br>${item.definition}<br><br>`
    }

    box.innerHTML = html
  } catch (err) {
    console.error(err)
  }
}
// Fonction pour calculer le coefficient de traînée (CD)
function calculerCD (flap, mach, cl) {
  // Convertir les entrées en nombres
  flap = Number(flap)
  mach = Number(mach)
  cl = Number(cl)

  // Sélectionner les valeurs appropriées de CDp et K en fonction du flap
  const index = flap === 0 ? 0 : flap === 20 ? 1 : 2
  const CDp = dataCDPK.data_cdp_k.cdp[index]
  const K = dataCDPK.data_cdp_k.k[index]

  // Calculer CDcomp en fonction de Mach et Cl
  let CDcomp = 0

  // Plage de Mach
  if (mach > 0.6 && mach <= 0.78) {
    CDcomp = (0.0508 - 0.1748 * mach + 0.1504 * mach * mach) * (cl * cl)
  } else if (mach > 0.78 && mach <= 0.85) {
    CDcomp = (-99.3434 + 380.888 * mach - 486.8 * mach * mach + 207.408 * mach ** 3) * (cl * cl)
  }

  return CDp + K * (cl * cl) + CDcomp
}
// Fonction pour valider les champs du formulaire
function validerChamps () {
  // Récupérer les valeurs des champs
  const flap = document.getElementById('flap').value
  const mach = Number(document.getElementById('mach').value)
  const cl = Number(document.getElementById('cl').value)

  // Validation des champs
  if (flap === '') {
    window.alert('Veuillez sélectionner un flap.')
    return false
  }

  // Validation des valeurs numériques
  if (isNaN(mach) || mach < 0 || mach > 0.85) {
    window.alert('La valeur du Mach doit être entre 0 et 0.85.')
    return false
  }

  // Validation du coefficient de portance
  if (isNaN(cl) || cl < 0.2 || cl > 1.2) {
    window.alert('Le coefficient de portance doit être entre 0.2 et 1.2.')
    return false
  }

  return true
}

document.getElementById('btnCalcul').addEventListener('click', () => {
  if (!validerChamps()) return
  // Récupérer les valeurs des champs
  const flap = document.getElementById('flap').value
  const mach = document.getElementById('mach').value
  const cl = document.getElementById('cl').value

  // Calculer le CD
  const cd = calculerCD(flap, mach, cl)
  const zoneResultat = document.getElementById('result')
  zoneResultat.innerHTML = `CD = ${cd.toFixed(5)}`
})

// Charger les données et définitions au chargement de la page
window.addEventListener('DOMContentLoaded', async () => {
  await chargerCDPK()
  await chargerDefinitionForces()
})
