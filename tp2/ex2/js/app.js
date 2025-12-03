
let dataCDPK = null
let definitionForces = null



async function chargerCDPK () {
    try {
        const response = await fetch('http://localhost:8080/data_cdp_k.php')
        if (!response.ok) throw new Error('Erreur chargement data_cdp_k.php')
        dataCDPK = await response.json()
    } catch (err) {
        console.error(err)
    }
}


async function chargerDefinitionForces () {
    try {
        const response = await fetch('http://localhost:8080/definition_forces.php')
        if (!response.ok) throw new Error('Erreur chargement definition_forces.php')

        definitionForces = await response.json()

        const box = document.getElementById('definitionBox')
        const liste = definitionForces.definition_forces

  
        let html = '<div style="text-align:left; font-size:14px;">'

        for (const item of liste) {
            html += `<strong>${item.force}</strong><br>${item.definition}<br><br>`
        }

        html += '</div>'

        box.innerHTML = html
    } catch (err) {
        console.error(err)
    }
}





