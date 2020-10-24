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
import documents, {
  formatDocuments
} from 'v2/app/pages/identity/const/documents'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'

export type IdentityType = 'corporate' | 'individual'

export const getIdentityDocuments = (
  identity: IndividualIdentity | CorporateIdentity | undefined,
  type: IdentityType
) => {
  if (identity !== undefined) {
    return identity.documents !== undefined
      ? formatDocuments(identity.documents, type)
      : documents[type]
  }

  return documents[type]
}

export const getIdentityDeclarations = (
  identity: IndividualIdentity | CorporateIdentity | undefined,
  type: IdentityType
) => {
  if (identity !== undefined) {
    return identity.declarations !== undefined
      ? formatDeclarations(identity.declarations, type)
      : declarations[type]
  }

  return declarations[type]
}

export const allDeclarationsAreChecked = (
  declarations: FormArray<Declaration>
) => {
  return declarations.every(({ value }) => {
    const key = Object.keys(value)[0]
    return value[key] === DeclarationValue.Yes
  })
}

export const getIdentityFormDefaultValue = <
  T extends IndividualIdentity | CorporateIdentity | undefined
>(
  identity: T,
  type: IdentityType
): T & {
  documents: FormArray<Maybe<DataroomFile>>
  declarations: FormArray<Declaration>
} => {
  return identity !== undefined
    ? {
        ...identity,
        declarations: declarations[type].map((value, index) => ({
          value: identity.declarations[index]
        })),
        documents: formatDocuments(identity.documents ?? [], type)
      }
    : ({
        declarations: declarations[type].map(value => ({ value })),
        documents: formatDocuments([], type)
      } as any) // TODO: fix any
}

export const prepareDocumentsForUpload = (
  documents: FormArray<Maybe<DataroomFile>>
) => {
  return documents
    .map(d => d.value?._id ?? null)
    .filter(d => d !== null) as string[]
}
