export const textFilter = (value?: string) =>
  value
    ?.split('')
    .filter((x) => /[a-zA-Z0-9 .,!?"'/\[\]+\-#$%&@:;]/.test(x))
    .join('') ?? ''
