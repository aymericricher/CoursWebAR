
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

function calculerCD (flap, mach, cl) {
    flap = Number(flap)
    mach = Number(mach)
    cl = Number(cl)

 
    const index = flap === 0 ? 0 : flap === 20 ? 1 : 2

    const CDp = dataCDPK.data_cdp_k.cdp[index]
    const K = dataCDPK.data_cdp_k.k[index]

    let CDcomp = 0

    if (mach > 0.6 && mach <= 0.78) {
        CDcomp = (0.0508 - 0.1748 * mach + 0.1504 * mach * mach) * (cl * cl)
    } else if (mach > 0.78 && mach <= 0.85) {
        CDcomp = (-99.3434 + 380.888 * mach - 486.8 * mach * mach + 207.408 * mach ** 3) * (cl * cl)
    }

    return CDp + K * (cl * cl) + CDcomp
}









