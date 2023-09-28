import { text10, text48 } from 'components/LaunchpadMisc/typography'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as CrossIcon } from 'assets/images/newTooltip.svg'
import { Box } from 'rebass'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import theme from 'theme'
import { Info } from 'react-feather'

interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export const FormGrid: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const [localTime, setLocalTime] = useState(new Date())
  const convertToLocalUTC = () => {
    const localTimestamp = localTime.getTime()
    const utcTimestamp = localTimestamp - localTime.getTimezoneOffset() * 60 * 1000
    const utcDate = new Date(utcTimestamp)
    const newString = utcDate.toString().split(' ')[5]
    return `${newString.slice(0, 6)}:${newString.slice(6, 8)}`
  }

  const utcTime = convertToLocalUTC()
  return (
    <Container className={props.className}>
      {props.title && (
        <TitleSection>
          <Box style={{ display: 'flex' }}>
            <Title>{props.title}</Title>
            {props.title === 'Timeline' ? (
              <Tooltip
                title="Investments Stages"
                body={`The time provided is based on your local time at ${utcTime} time zone.`}
              >
                <Info style={{ margin: '6px', cursor: 'pointer', color: '#B8B8CC' }} size="14" />
              </Tooltip>
            ) : (
              ''
            )}
          </Box>
          {props.description && <Description>{props.description}</Description>}
        </TitleSection>
      )}

      {props.children}
    </Container>
  )
}

// ;<CrossIcon style={{ margin: '6px', cursor: 'pointer' }} />
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
  ${text48}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Description = styled.div`
  ${text10}
  max-width: 500px;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`
