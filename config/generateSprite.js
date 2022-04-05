const SVGSpriter = require('svg-sprite')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const generateSprite = () => {
  console.log('Generating sprites...')

  const config = {
    dest: './src/assets/icons/sprite',
    shape: {
      id: {
        separator: '--',
        generator: function (_, file) {
          const filename = file.path.substring(file.path.lastIndexOf('/') + 1)
          return filename.substring(0, filename.lastIndexOf('.'))
        },
        pseudo: '~'
      }
    },
    mode: {
      symbol: true
    }
  }

  const svgListDirectory = path.join(__dirname, '../src/assets/icons/new')
  fs.readdir(svgListDirectory, (err, files) => {
    if (err) {
      return console.warn('Unable to scan directory: ' + err)
    }

    const spriter = new SVGSpriter(config)

    files.forEach(function (file) {
      const filePath = `${svgListDirectory}/${file}`
      spriter.add(
        filePath,
        null,
        fs.readFileSync(filePath, {
          encoding: 'utf-8'
        })
      )
    })

    spriter.compile(function (error, result) {
      for (var mode in result) {
        for (var resource in result[mode]) {
          mkdirp.sync(path.dirname(result[mode][resource].path))
          fs.writeFileSync(
            result[mode][resource].path,
            result[mode][resource].contents
          )
        }
      }
    })
  })
}

module.exports = { generateSprite }
