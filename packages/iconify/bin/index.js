#! /usr/bin/env node
const mri = require('mri')
const { generateIconJSON } = require('../dist/index.cjs')

const argv = process.argv.slice(2)

const options = mri(argv)

const { input, output, prefix } = options

if (!input || !output || !prefix) {
  return console.error(`Export icons from ${input} to ${output} false.`)
}

generateIconJSON(input, output, prefix).then(() => {
  console.success(`Export icons from ${input} to ${output} success.`)
})
