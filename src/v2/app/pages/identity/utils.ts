import { IndividualIdentity } from 'v2/types/identity'
import {
  declarations,
  formatDeclarations
} from 'v2/app/pages/identity/const/declarations'

export const getIdentityDocuments = (
  identity: IndividualIdentity | undefined
) => {
  if (identity !== undefined) {
    return identity.documents ?? []
  }

  return []
}

export const getIdentityDeclarations = (
  identity: IndividualIdentity | undefined
) => {
  if (identity !== undefined) {
    return (
      formatDeclarations(identity.declarations, 'individual') ??
      declarations.individual
    )
  }

  return declarations.individual
}
