import {
  CorporateIdentity,
  Declaration,
  DeclarationTemplate,
  IndividualIdentity
} from 'types/identity'
import documents, { formatDocuments } from 'app/pages/identity/const/documents'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import {
  CorporateDeclarations,
  corporateDeclarationsTemplate,
  IndividualDeclarations,
  individualDeclarationsTemplate
} from 'app/pages/identity/const/declarations'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'app/pages/identity/components/types'

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

type IdentityFormValues<T extends any> = T extends undefined
  ? never
  : (T extends CorporateIdentity
      ? CorporateIdentityFormValues & { declarations: CorporateDeclarations }
      : IndividualIdentityFormValues & {
          declarations: IndividualDeclarations
        }) & {
      documents: FormArray<DataroomFile>
    }

export const getIdentityFormDefaultValue = <
  T extends CorporateIdentity | IndividualIdentity | undefined
>(
  identity: T,
  type: IdentityType
): IdentityFormValues<T> => {
  return ({
    ...(identity ?? {}),
    declarations: formatDeclarations(type, identity?.declarations),
    documents: formatDocuments(identity?.documents ?? [], type),
    fundSource: getFundSource(identity as IndividualIdentity, type)
  } as unknown) as IdentityFormValues<T>
}

export const prepareDocumentsForUpload = (
  documents: FormArray<Maybe<DataroomFile>>
) => {
  return documents
    .map(d => d.value?._id ?? null)
    .filter(id => id !== null && id !== '') as string[]
}

export const getDeclarationTemplate = (
  declarations: DeclarationTemplate[],
  declaration?: Declaration
) => {
  return declarations.find(
    ({ key }) => key === Object.keys(declaration ?? {})[0]
  )
}

export const formatDeclarations = (
  type: IdentityType,
  declarations: Declaration[] = []
) => {
  const isCorporate = type === 'corporate'
  const templates = isCorporate
    ? corporateDeclarationsTemplate
    : individualDeclarationsTemplate

  const result = Object.keys(templates).reduce((acc, key) => {
    const declaration = declarations.find(
      declaration => Object.keys(declaration ?? {})[0] === key // declaration ?? {} hack is needed here because server data and new declarations had mismatching, TODO: remove in the next release
    )

    return {
      ...acc,
      [key]: declaration?.[key] ?? undefined
    }
  }, {})

  return isCorporate
    ? ((result as unknown) as CorporateDeclarations)
    : ((result as unknown) as IndividualDeclarations)
}

export const prepareDeclarationsForUpload = (
  declarations: IndividualDeclarations | CorporateDeclarations
) => {
  return Object.entries(declarations).map(([key, value]) => ({
    [key]: value
  }))
}

const fundSourceList = [
  'Inheritance/Gift',
  'Interest/Dividend',
  'Property',
  'Allowance/Spousal Income',
  'Employment',
  'Pension',
  'Retirement Benifits',
  'Others'
]

export const getFundSourceDefaults = () => {
  return fundSourceList.map(name => ({ name, checked: false, value: 0 }))
}

export const getFundSource = (
  identity: IndividualIdentity,
  type: IdentityType
) => {
  if (type === 'corporate') {
    return undefined
  }
  if (
    identity === undefined ||
    identity.fundSource === undefined ||
    identity.fundSource.length < 1
  ) {
    return getFundSourceDefaults()
  }

  return identity.fundSource
}
