import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Plus } from 'react-feather'
import { Field, FieldArray, FieldProps } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { Column, ErrorText, Separator } from 'components/LaunchpadMisc/styled'
import { text19, text30 } from 'components/LaunchpadMisc/typography'
import { OfferFAQ } from 'state/launchpad/types'
import { AddButton } from '../../shared/styled'
import { FormGrid } from '../../shared/FormGrid'

interface Props {
  faq: OfferFAQ[]
}

export const FAQBlock: React.FC<Props> = ({ faq }) => {
  const theme = useTheme()
  const getTarget = (name: string, value: any) => ({ target: { name, value } })

  return (
    <FormGrid title="FAQ">
      <FieldArray name="faq">
        {({ push, handleRemove }) => (
          <>
            {faq.map((entry, idx) => (
              <FieldWrapper key={idx}>
                <Field name={`faq[${idx}].question`}>
                  {({ field: { name, value, onChange }, meta }: FieldProps) => (
                    <Question>
                      <Label>Question</Label>

                      <QuestionWrapper>
                        <QuestionInput
                          placeholder="Question Title"
                          value={value}
                          onChange={(e) => onChange(getTarget(name, e.target.value))}
                        />
                      </QuestionWrapper>

                      {(faq.length > 1 || idx > 0) && (
                        <RemoveButton onClick={handleRemove(idx)}>
                          <Trash />
                        </RemoveButton>
                      )}

                      {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </Question>
                  )}
                </Field>

                <Separator />

                <Field name={`faq[${idx}].answer`}>
                  {({ field: { name, value, onChange }, meta }: FieldProps) => (
                    <AnswerWrapper>
                      <Label>Answer</Label>
                      <AnswerInput
                        placeholder="Answer Description"
                        value={value}
                        onChange={(e) => onChange(getTarget(name, e.target.value))}
                      />

                      {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </AnswerWrapper>
                  )}
                </Field>
              </FieldWrapper>
            ))}

            <AddButton onClick={() => push({ question: '', answer: '' })}>
              <Plus color={theme.launchpad.colors.primary} /> Add FAQ
            </AddButton>
          </>
        )}
      </FieldArray>
    </FormGrid>
  )
}

const FieldWrapper = styled(Column)`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  grid-column: span 2;
  padding: 1rem;
`

const Question = styled.div`
  display: grid;
  grid-template-columns: 1fr 25px;
  grid-template-rows: minmax(auto, 20px) repeat(2, auto);
  grid-template-areas:
    'label remove'
    'input remove'
    'error error';

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

  ${text19}

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const QuestionInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  height: 100%;
  align-self: flex-end;

  ${text30}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  ::placeholder {
    color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  }
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
  ${text30}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  ::placeholder {
    color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  }
`

const RemoveButton = styled(AddButton)`
  grid-area: remove;
`

const ErrorMessage = styled(ErrorText)`
  grid-area: error;
`
