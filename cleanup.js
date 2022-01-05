const fs = require('fs')
const path = require('path')
const glob = require('glob')

glob('src/**/*.spec.tsx', (err, files) => {
  if (err) console.error(err)

  const filesWithNoTests = files.filter(file => {
    const contents = fs.readFileSync(file, {
      encoding: 'utf-8'
    })

    return !contents.includes("it('")
  })

  filesWithNoTests.forEach(file => {
    try {
      fs.unlinkSync(file)
      console.log(`successfully removed file ${file}`)
    } catch (e) {
      console.error(`couldn't remove the file ${file}`)
    }
  })
})
