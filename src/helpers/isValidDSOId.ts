import { hasValue } from 'helpers/forms'

export const isValidDSOId = (dsoId?: string) =>
  hasValue(dsoId) && dsoId !== ':dsoId' && dsoId !== ':issuerId'
