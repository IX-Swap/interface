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
    taxResidencies: getTaxResidencyData(type, identity)?.taxResidencies,
    singaporeOnly: getTaxResidencyData(type, identity)?.singaporeOnly,
    taxIdentificationNumber: getTaxResidencyData(type, identity)
      ?.taxIdentificationNumber,
    taxIdAvailable: getTaxResidencyData(type, identity)?.taxIdAvailable,
    reasonUnavailable: getTaxResidencyData(type, identity)?.reasonUnavailable
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

export const getTaxResidencyData = (
  type: IdentityType,
  identity?: IndividualIdentity | CorporateIdentity
) => {
  if (type === 'corporate') {
    return undefined
  }

  const individualIdentity = identity as IndividualIdentity
  const defaultTaxResidencyData = {
    singaporeOnly: 'yes',
    taxIdAvailable: true,
    taxIdentificationNumber: '',
    reasonUnavailable: '',
    taxResidencies: [
      {
        countryOfResidence: '',
        taxIdentificationNumber: ''
      }
    ]
  }

  if (
    identity === undefined ||
    individualIdentity.taxResidencies === undefined ||
    individualIdentity.taxResidencies.length < 1
  ) {
    return defaultTaxResidencyData
  }

  const singaporeOnlyValue =
    individualIdentity.taxResidencies[0].residentOfSingapore ?? true

  return {
    singaporeOnly: singaporeOnlyValue ? 'yes' : 'no',
    taxIdAvailable: individualIdentity.taxResidencies[0].taxIdAvailable,
    reasonUnavailable: individualIdentity.taxResidencies[0].reason,
    taxIdentificationNumber:
      individualIdentity.taxResidencies[0].taxIdentificationNumber,
    taxResidencies: individualIdentity.taxResidencies.slice(1)
  }
}

export const MAX_TAX_RESIDENCIES = 5

export const prepareDeclarationsForUpload = (
  declarations: IndividualDeclarations | CorporateDeclarations
) => {
  return Object.entries(declarations).map(([key, value]) => ({
    [key]: value
  }))
}
