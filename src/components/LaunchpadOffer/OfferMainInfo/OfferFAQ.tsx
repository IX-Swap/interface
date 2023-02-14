import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ChevronDown } from 'react-feather'

import { OfferFAQ } from 'state/launchpad/types'

interface Props {
  faq: OfferFAQ[]
}

interface QuestionProps {
  isOpen: boolean
  question: string
  answer: string
}

export const OfferQuestions: React.FC<Props> = (props) => {
  return (
    <FAQList>
      <FAQListTitle>Frequently Asked Questions</FAQListTitle>

      {props.faq.map((entry, idx) => (
        <OfferQuestion key={`quesion-${idx}`} isOpen={idx === 0} {...entry} />
      ))}
    </FAQList>
  )
}

const OfferQuestion: React.FC<QuestionProps> = (props) => {
  const theme = useTheme()

  const [open, setOpen] = React.useState(props.isOpen)

  const toggle = React.useCallback(() => setOpen((state) => !state), [])

  return (
    <FAQEntry>
      <Question onClick={toggle}>{props.question}</Question>
      <DropdownControl open={open} onClick={toggle}>
        <ChevronDown fill={theme.launchpad.colors.text.caption} />
      </DropdownControl>
      {open && <Answer>{props.answer}</Answer>}
    </FAQEntry>
  )
}

const FAQList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
`

const FAQListTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const FAQEntry = styled.div`
  display: grid;
  grid-template-columns: 1fr 10%;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'question dropdown'
    'answer .';
  place-content: start;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  padding: 1.25rem 2rem;
`

const Question = styled.div`
  grid-area: question;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  cursor: pointer;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Answer = styled.div`
  grid-area: answer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: -0.02em;
  margin-top: 1rem;
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const DropdownControl = styled.div<{ open?: boolean }>`
  grid-area: dropdown;
  place-self: center end;
  cursor: pointer;
  width: 20px;
  height: 20px;

  > svg {
    margin-left: 8px;
    height: 20px;
    min-width: 20px;
    ${(props) => props.open && 'transform: rotate(180deg);'};
    transition: 0.4s;
  }
`
