const SVGSpriter = require('svg-sprite')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const svgList = [
  './src/assets/icons/new/arrow-right.svg',
  './src/assets/icons/new/arrow-left.svg',
  './src/assets/icons/new/arrow-up.svg',
  './src/assets/icons/new/arrow-down.svg',
  './src/assets/icons/new/plus.svg',
  './src/assets/icons/new/minus.svg',
  './src/assets/icons/new/bell.svg',
  './src/assets/icons/new/alert-triangle.svg',
  './src/assets/icons/new/alert-circle.svg',
  './src/assets/icons/new/user.svg',
  './src/assets/icons/new/users.svg',
  './src/assets/icons/new/edit.svg',
  './src/assets/icons/new/send.svg',
  './src/assets/icons/new/mail.svg',
  './src/assets/icons/new/refresh.svg',
  './src/assets/icons/new/message.svg',
  './src/assets/icons/new/date.svg',
  './src/assets/icons/new/star.svg',
  './src/assets/icons/new/star-half-filled.svg',
  './src/assets/icons/new/star-filled.svg',
  './src/assets/icons/new/time.svg',
  './src/assets/icons/new/search.svg',
  './src/assets/icons/new/file.svg',
  './src/assets/icons/new/settings.svg',
  './src/assets/icons/new/security.svg',
  './src/assets/icons/new/download.svg',
  './src/assets/icons/new/upload.svg',
  './src/assets/icons/new/logout.svg',
  './src/assets/icons/new/login.svg',
  './src/assets/icons/new/book.svg',
  './src/assets/icons/new/trash.svg',
  './src/assets/icons/new/eye.svg',
  './src/assets/icons/new/eye-off.svg'
]

const generateSprite = () => {
  console.log('Generating sprites...')

  const config = {
    dest: './src/assets/icons/sprite',
    shape: {
      id: {
        separator: '--',
        generator: function (name, file) {
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

  var spriter = new SVGSpriter(config)

  svgList.forEach(svg =>
    spriter.add(
      svg,
      null,
      fs.readFileSync(svg, {
        encoding: 'utf-8'
      })
    )
  )

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
}

module.exports = { generateSprite }
