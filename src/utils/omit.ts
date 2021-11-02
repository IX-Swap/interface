export const omit = (originalObject: { [key: string]: any }, keysToOmit: string[]) => {
  const clonedObject = { ...originalObject }

  for (const path of keysToOmit) {
    delete clonedObject[path]
  }

  return clonedObject
}
