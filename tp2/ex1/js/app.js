async function chargerParams () {
  const reponse = await fetch('http://localhost:8080/params_grille_nombres.php')
  if (!reponse.ok) {
    throw new Error('Impossible de charger les paramètres')
  }
  return await reponse.json()
}



