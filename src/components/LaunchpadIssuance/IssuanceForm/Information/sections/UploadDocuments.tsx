import React from 'react'
import { Plus } from 'react-feather'
import { Field, FieldArray, FieldProps } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { AddButton, DeleteButton } from '../../shared/styled'
import { FileField } from '../../shared/fields/FileField'
import { FormGrid } from '../../shared/FormGrid'
import { AdditionalDocument } from '../types'
import { getSetter } from '../util'

interface Props {
  documents: AdditionalDocument[]
}

export const UploadDocuments: React.FC<Props> = ({ documents }) => {
  return (
    <FormGrid title="Upload Documents">
      <FieldArray name="additionalDocuments">
        {({ push, handleRemove }) => (
          <>
            {documents.map((document, idx) => (
              <Field name={`additionalDocuments[${idx}].file`} key={idx}>
                {({ field: { name, value, onChange }, meta }: FieldProps) => (
                  <FileField
                    label={''}
                    field={name}
                    setter={getSetter(onChange)}
                    value={value}
                    error={meta.error}
                    isDocument
                    trailing={
                      documents.length > 1 && (
                        <DeleteButton onClick={handleRemove(idx)}>
                          <Trash />
                        </DeleteButton>
                      )
                    }
                  />
                )}
              </Field>
            ))}

            <AddButton onClick={() => push({ name: '', file: null })}>
              <Plus /> Add Document
            </AddButton>
          </>
        )}
      </FieldArray>
    </FormGrid>
  )
}
