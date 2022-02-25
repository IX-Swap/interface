export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const fixCapitalization = (words: string[]) => {
  return [capitalizeFirstLetter(words[0]), ...words.slice(1).map((word) => word.toLocaleLowerCase())]
}

export const convert = (obj: any): string =>
  Object.entries(obj)
    .map(([key, value]) =>
      typeof value === 'string'
        ? `\t${fixCapitalization(key.split(/(?=[A-Z])/)).join(' ')}: \t${value};\n`
        : `\n\t${key}: \n${convert(value)}\n`
    )
    .join('')
