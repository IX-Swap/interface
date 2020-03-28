export default function arrToOpts (arr) {
  return arr.map(value => ({ value, label: value }))
}
