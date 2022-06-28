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

export const adjustIdentityOccupation = (str?: string) => {
  if (str === undefined) {
    return ''
  }

  const res = str.split('').map(el => el.toLowerCase())
  res[0] = res[0].toUpperCase()
  for (let i = 0; i < res.length; i++) {
    if (res[i] === ' ' || res[i] === '/') {
      res.splice(i + 1, 1, res[i + 1].toUpperCase())
    }
  }
  return res.join('')
}
