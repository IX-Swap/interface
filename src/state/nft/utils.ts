import { displayType, GroupKeyValuesInput, KeyValues, TraitType } from './types'

export const groupKeyValues = ({ description, link, properties, stats, levels, isNSFW }: GroupKeyValuesInput) => {
  const keyValues: KeyValues = {}
  if (description) {
    keyValues.description = description
  }
  if (link) {
    keyValues.link = link
  }
  const usedProperties = properties.map((property) => ({
    ...property,
    [`display_type`]: displayType[TraitType.RECTANGLE],
  }))
  const usedStats = stats.map((property) => ({
    ...property,
    [`display_type`]: displayType[TraitType.NUMBER],
  }))
  const usedLevels = levels.map((property) => ({
    ...property,
    [`display_type`]: displayType[TraitType.PROGRESS],
  }))
  const attributes = [...usedProperties, ...usedStats, ...usedLevels]
  if (attributes.length) {
    keyValues.attributes = attributes
  }
  keyValues.isNSFW = String(isNSFW)
  return keyValues
}
