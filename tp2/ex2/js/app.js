
let dataCDPK = null




async function chargerCDPK () {
  try {
    const response = await fetch('http://localhost:8080/data_cdp_k.php')
    if (!response.ok) throw new Error('Erreur chargement data_cdp_k.php')
    dataCDPK = await response.json()
  } catch (err) {
    console.error(err)
  }
}





