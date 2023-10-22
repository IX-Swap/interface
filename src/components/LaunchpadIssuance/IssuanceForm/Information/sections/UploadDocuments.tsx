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
import { text48, text55 } from 'components/LaunchpadMisc/typography'
import { Flex } from 'rebass'
import { IssuanceTooltip } from '../../shared/fields/IssuanceTooltip'

interface Props {
  documents: AdditionalDocument[]
  otherExecutionDocuments: AdditionalDocument[]
}

export const UploadDocuments: React.FC<Props> = ({ documents, otherExecutionDocuments }) => {
  return (
    <>
      <MainTitle>{'Upload Documents'}</MainTitle>
      <FormGrid>
        <Flex alignContent={'flex-end'}>
          <Title>{'Execution Documents'}</Title>
          <IssuanceTooltip
            tooltipContent={
              'Execution documents are legal documents that investors need to acknowledge and agree to in order to purchase tokens. Examples of these documents are Purchase Agreement and Investment Memorandum'
            }
          />
        </Flex>
        <Field name={`purchaseAgreement`}>
          {({ field: { name, value, onChange, onBlur }, meta }: FieldProps) => (
            <FileField
              field={'purchaseAgreement.file'}
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
        <Field name={`investmentMemorandum`}>
          {({ field: { name, value, onChange, onBlur }, meta }: FieldProps) => (
            <FileField
              field={'investmentMemorandum.file'}
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
              {otherExecutionDocuments.map((document, idx) => (
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
      </FormGrid>

      <FormGrid>
        <Flex alignContent={'flex-end'}>
          <Title>{'Additional Documents'}</Title>
          {/* <IssuanceTooltip
            tooltipContent={
              'An investor data room is a secure space for the sharing of sensitive information relating to the company in which the investor is considering investing. Data rooms for investors used to be physical rooms, however today they are almost always virtual'
            }
          /> */}
        </Flex>
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
    </>
  )
}

const Title = styled.div`
  ${text55}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  padding-right: 10px;
`
const MainTitle = styled.div`
  ${text48}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
