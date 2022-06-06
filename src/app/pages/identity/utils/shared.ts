import {
  CorporateIdentity,
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'app/pages/identity/types/forms'
import {
  CorporateDeclarations,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { Maybe } from 'types/util'

export const getIdentityDefaultActiveStep = (args: {
  isSubmitted: boolean
  lastStepIndex: number
  isJourneyCompleted: boolean
}) => {
  const { isJourneyCompleted, isSubmitted, lastStepIndex } = args

  return isJourneyCompleted ? (isSubmitted ? lastStepIndex : 0) : undefined
}

export type IdentityType = 'corporate' | 'individual'

export type IdentityFormValues<T extends any> = T extends undefined
  ? never
  : (T extends CorporateIdentity
      ? CorporateIdentityFormValues & { declarations: CorporateDeclarations }
      : IndividualIdentityFormValues & {
          declarations: IndividualDeclarations
        }) & {
      documents: FormArray<DataroomFile>
    }

export const prepareDocumentsForUpload = (
  documents: FormArray<Maybe<DataroomFile>>
) => {
  return documents
    .map(d => d.value?._id ?? null)
    .filter(id => id !== null && id !== '') as string[]
}

export const prepareDeclarationsForUpload = (
  declarations: IndividualDeclarations | CorporateDeclarations
) => {
  return Object.entries(declarations).map(([key, value]) => ({
    [key]: value
  }))
}

export const titleCase = (value?: string) => {
  if (value === undefined) {
    return ''
  }

  return value
    .toLowerCase()
    .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
}

export const checkSingPassDisabled = (isSingPass: boolean, value?: string) => {
  return value !== undefined && value.trim() !== '' && isSingPass
}
