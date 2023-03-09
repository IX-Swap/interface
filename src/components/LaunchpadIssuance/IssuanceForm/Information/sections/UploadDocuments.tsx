import React from 'react'
import styled from 'styled-components'
import { Plus } from 'react-feather'
import { Field, FieldArray, FieldProps } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { Column, Separator } from 'components/LaunchpadMisc/styled'
import { AddButton, DeleteButton } from '../../shared/styled'
import { FormField } from '../../shared/fields/FormField'
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
              <FieldContainer key={idx}>
                <Field name={`additionalDocuments[${idx}].name`}>
                  {({ field: { name, value, onChange }, meta }: FieldProps) => (
                    <FormField
                      borderless
                      label="Document Name"
                      placeholder="Name"
                      field={name}
                      setter={getSetter(onChange)}
                      value={value}
                      error={meta.error}
                      trailing={
                        documents.length > 1 && (
                          <RemoveButton onClick={handleRemove(idx)}>
                            <Trash />
                          </RemoveButton>
                        )
                      }
                    />
                  )}
                </Field>

                <Separator />

                <Field name={`additionalDocuments[${idx}].file`}>
                  {({ field: { name, value, onChange }, meta }: FieldProps) => (
                    <FileField
                      borderless
                      label={''}
                      field={name}
                      setter={getSetter(onChange)}
                      value={value}
                      error={meta.error}
                    />
                  )}
                </Field>
              </FieldContainer>
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

const FieldContainer = styled(Column)`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  grid-column: span 2;

  padding: 0.25rem;
`

const RemoveButton = styled(DeleteButton)`
  position: absolute;

  right: 1rem;
`
