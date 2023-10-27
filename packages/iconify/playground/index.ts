import { generateIconToJSON, parseIconifyJSON } from "../src";

(async function () {
    await generateIconToJSON('./playground/icons', './playground/icon.json', 'bs')

    const icons = require('./icon.json')

    parseIconifyJSON(icons, {
        'stroke-width': 1,
        'stroke-linejoin': null
    })

    console.log('success')
})()
