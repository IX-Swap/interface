import {
  PersonalProfileWithAddress,
  IdentityFinancials,
  BaseIdentity,
  CorporateFields
} from 'v2/types/identity'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'
import {
  CorporateDeclarations,
  IndividualDeclarations
} from 'v2/app/pages/identity/const/declarations'

export type IndividualIdentityFormValues = PersonalProfileWithAddress &
  IdentityFinancials &
  Omit<
    BaseIdentity,
    | '_id'
    | 'status'
    | 'user'
    | 'createdAt'
    | 'updatedAt'
    | 'documents'
    | 'declarations'
  > & {
    documents: FormArray<Maybe<DataroomFile>>
    declarations: IndividualDeclarations
  }

export type CorporateIdentityFormValues = CorporateFields &
  Omit<
    BaseIdentity,
    | '_id'
    | 'status'
    | 'user'
    | 'createdAt'
    | 'updatedAt'
    | 'documents'
    | 'declarations'
  > & {
    documents: FormArray<Maybe<DataroomFile>>
    declarations: CorporateDeclarations
  }
