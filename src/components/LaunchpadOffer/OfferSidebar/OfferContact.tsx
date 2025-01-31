import React from 'react'
import styled from 'styled-components'
import { Mail } from 'react-feather'
import { InfoList } from '../util/InfoList'
import { useLocalization } from 'i18n'

interface Props {
  email?: string
}

export const OfferContact: React.FC<Props> = (props) => {
  const { t } = useLocalization()
  const entries = React.useMemo(
    () => [
      {
        label: (
          <ContactLine href={props.email ? `mailto:${props.email}` : '#'}>
            <Mail size="18" /> {props.email}
          </ContactLine>
        ),
      },
    ],
    []
  )

  return <InfoList title={t('launchpad.offersPage.sideBar.contactUs')} entries={entries} />
}

const ContactLine = styled.a`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.launchpad.colors.text.body};

  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }

  svg > * {
    stroke: ${(props) => props.theme.launchpad.colors.text.body};
  }
`
