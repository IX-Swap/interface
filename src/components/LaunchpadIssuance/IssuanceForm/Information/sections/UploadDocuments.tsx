import React from 'react'
import { Plus } from 'react-feather'
import { Field, FieldArray, FieldProps } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { AddButton, DeleteButton } from '../../shared/styled'
import { FileField } from '../../shared/fields/FileField'
import { FormGrid } from '../../shared/FormGrid'
import { AdditionalDocument } from '../types'
import { getSetter } from '../util'
import styled from 'styled-components'
import { text50 } from 'components/LaunchpadMisc/typography'

interface Props {
  documents: AdditionalDocument[]
}

export const UploadDocuments: React.FC<Props> = ({ documents }) => {
  return (
    <FormGrid title="Upload Documents">
      <Title>{"Execution Documents"}</Title>
      
      <Field name={`purchaseAgreement.file`}>
          {({ field: { name, value, onChange, onBlur }, meta }: FieldProps) => (
            <FileField
              field={name}
              setter={getSetter(onChange)}
              touch={getSetter(onBlur)}
              value={value}
              error={meta.touched ? meta.error : ''}
              label="Purchase Agreement"
              span={2}
              isDocument
            />
          )}
        </Field>
      <Field name={`investmentMemorandum.file`}>
          {({ field: { name, value, onChange, onBlur }, meta }: FieldProps) => (
            <FileField
              field={name}
              setter={getSetter(onChange)}
              touch={getSetter(onBlur)}
              value={value}
              error={meta.touched ? meta.error : ''}
              label="Investment Memorandum"
              span={2}
              isDocument
            />
          )}
        </Field>
        <FieldArray name="otherExecutionDocuments">
          {({ push, handleRemove }) => (
            <>
              {documents.map((document, idx) => (
                <Field name={`otherExecutionDocuments[${idx}].file`} key={idx}>
                  {({ field: { name, value, onChange, onBlur }, meta }: FieldProps) => (
                    <FileField
                      label={'Others'}
                      field={name}
                      setter={getSetter(onChange)}
                      touch={getSetter(onBlur)}
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
        
        <Title>{"Dataroom"}</Title>
        <br />
        <FieldArray name="additionalDocuments">
          {({ push, handleRemove }) => (
            <>
              {documents.map((document, idx) => (
                <Field name={`additionalDocuments[${idx}].file`} key={idx}>
                  {({ field: { name, value, onChange, onBlur }, meta }: FieldProps) => (
                    <FileField
                      label={''}
                      field={name}
                      setter={getSetter(onChange)}
                      touch={getSetter(onBlur)}
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

const Title = styled.div`
  ${text50}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
