import {
  PersonalProfileWithAddress,
  IdentityFinancials,
  BaseIdentity,
  CorporateFields
} from 'types/identity'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import {
  CorporateDeclarations,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'

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
