import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Plus } from 'react-feather'
import { FieldArray, FormikErrors } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { Column, ErrorText, Separator } from 'components/LaunchpadMisc/styled'

import { OfferFAQ } from 'state/launchpad/types'

import { AddButton } from '../../shared/styled'
import { FormGrid } from '../../shared/FormGrid'
import { useGetFieldArrayId } from 'state/launchpad/hooks'

import { FAQEntry, InformationFormValues } from '../types'

interface Props {
  faq: OfferFAQ[]
  errors: FormikErrors<InformationFormValues>
  setter: (field: string, value: any) => void
}

export const FAQBlock: React.FC<Props> = (props) => {
  const theme = useTheme()
  const getId = useGetFieldArrayId()
  
  const faq = React.useMemo(() => props.faq as (OfferFAQ & { id: number })[], [props.faq])

  return (
    <FormGrid title="FAQ">
      <FieldArray name="faq">
        {({ push, handleRemove }) => (
          <>
            {faq.map((entry, idx) => (
              <FieldWrapper key={`faq-${entry.id}`}>
                <Question>
                  <Label>Question</Label>

                  <QuestionWrapper>
                    <QuestionInput 
                      placeholder='Question Title'
                      onChange={e => props.setter(`faq[${idx}].question`, e.target.value)} 
                    />
                  </QuestionWrapper>
                  
                  {(faq.length > 1 || idx > 0) && <RemoveButton onClick={handleRemove(idx)}><Trash /></RemoveButton>}

                  <ErrorMessage>{(props.errors.faq as FormikErrors<FAQEntry>[])?.[idx]?.question}</ErrorMessage>
                </Question>

                <Separator />

                <AnswerWrapper>
                  <Label>Answer</Label>
                  <AnswerInput 
                    placeholder='Answer Description'
                    onChange={e => props.setter(`faq[${idx}].answer`, e.target.value)}
                  />
                  
                  <ErrorText>{(props.errors.faq as FormikErrors<FAQEntry>[])?.[idx]?.answer}</ErrorText>
                </AnswerWrapper>
              </FieldWrapper>
            ))}
            
            <AddButton onClick={() => push({ id: getId() })}>
              <Plus color={theme.launchpad.colors.primary} /> Add FAQ
            </AddButton>
          </>
        )}
      </FieldArray>
    </FormGrid>
  )
}

const FieldWrapper = styled(Column)`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  grid-column: span 2;

  padding: 1rem;
`

const Question = styled.div`
  display: grid;

  grid-template-columns: 1fr 25px;
  grid-template-rows: minmax(auto, 20px) repeat(2, auto);
  grid-template-areas:
    "label remove"
    "input remove"
    "error error";

  gap: 0.25rem;

  margin: 1rem;
`

const QuestionWrapper = styled.div`
  grid-area: input;
  
  display: flex;

  flex-flow: row nowrap;
  align-items: center;
  gap: 0.5rem;

`
const Label = styled.div`
  grid-area: label;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const QuestionInput = styled.input`
  flex-grow: 1;

  border: none;
  background: none;
  outline: none;

  height: 100%;

  align-self: flex-end;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const AnswerWrapper = styled.div`
  padding: 1rem;
`

const AnswerInput = styled.textarea`
  border: none;
  background: none;
  outline: none;
  resize: none;

  width: 100%;
  min-height: 120px;
`

const RemoveButton = styled(AddButton)`
  grid-area: remove;
`

const ErrorMessage = styled(ErrorText)`
  grid-area: error;
`