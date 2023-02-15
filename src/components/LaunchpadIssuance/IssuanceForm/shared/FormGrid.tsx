import { text10 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'

interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export const FormGrid: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <Container className={props.className}>
      {props.title && (
        <TitleSection>
          <Title>{props.title}</Title>
          {props.description && <Description>{props.description}</Description>}
        </TitleSection>
      )}

      {props.children}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'title title';
  gap: 1.5rem;
`
const TitleSection = styled.div`
  grid-area: title;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: -0.03em;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Description = styled.div`
  ${text10}
  max-width: 500px;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`
