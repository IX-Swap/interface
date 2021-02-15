import {
  PersonalProfileWithAddress,
  IdentityFinancials,
  CorporateFields
} from 'types/identity'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import {
  CorporateDeclarations,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'

export type IndividualIdentityFormValues = PersonalProfileWithAddress &
  IdentityFinancials & {
    documents: FormArray<Maybe<DataroomFile>>
    declarations: IndividualDeclarations
    investorAgreement: boolean
    custodyAgreement: boolean
    disclosures: boolean
  }

export type CorporateIdentityFormValues = CorporateFields & {
    documents: FormArray<Maybe<DataroomFile>>
    declarations: CorporateDeclarations
  }
