import {
  IdentityProfile,
  IdentityFinancials,
  BaseIdentity,
  CorporateFields,
  Declaration
} from 'v2/types/identity'
import { DataroomFile, FormArray } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'

export type IndividualIdentityFormValues = IdentityProfile &
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
    declarations: FormArray<Declaration>
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
    declarations: FormArray<Declaration>
  }
