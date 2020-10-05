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
import { DataroomFileWithGuide } from 'v2/types/dataroomFile'

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
): T & { documents: DataroomFileWithGuide[] } => {
  return identity !== undefined
    ? {
      ...identity,
      documents: formatDocuments(identity.documents ?? [], type)
    }
    : ({
      declarations: declarations[type],
      documents: formatDocuments([], type)
    } as any) // TODO: fix any
}

export const prepareDocumentsForUpload = (
  documents: DataroomFileWithGuide[]
) => {
  return documents
    .map(d => d.document?._id ?? null)
    .filter(d => d !== null) as string[]
}
