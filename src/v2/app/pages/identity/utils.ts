import {
  CorporateIdentity,
  Declaration,
  IndividualIdentity
} from 'v2/types/identity'
import {
  declarations,
  DeclarationValue,
  formatDeclarations
} from 'v2/app/pages/identity/const/declarations'

export type IdentityType = 'corporate' | 'individual'

export const getIdentityDocuments = (
  identity: IndividualIdentity | undefined
) => {
  if (identity !== undefined) {
    return identity.documents ?? []
  }

  return []
}

export const getIdentityDeclarations = (
  identity: IndividualIdentity | CorporateIdentity | undefined,
  type: IdentityType
) => {
  if (identity !== undefined) {
    return formatDeclarations(identity.declarations, type) ?? declarations[type]
  }

  return declarations[type]
}

export const allDeclarationsAreChecked = (declarations: Declaration[]) => {
  return declarations.every(d => {
    const key = Object.keys(d)[0]
    return d[key] === DeclarationValue.Yes
  })
}

export const getIdentityFormDefaultValue = <
  T extends IndividualIdentity | CorporateIdentity | undefined
>(
  identity: T,
  type: IdentityType
): T => {
  return identity !== undefined
    ? identity
    : ({ declarations: declarations[type] } as any) // TODO: fix any
}
