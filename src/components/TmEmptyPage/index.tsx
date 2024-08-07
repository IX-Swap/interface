import React, { useMemo } from 'react'
import { Trans, t } from '@lingui/macro'

import { TokenManagerTab } from 'pages/TokenManager'
import logoImg from 'assets/images/nothingFound.svg'

import { Container, Title, NothingFound } from './styleds'
import { TYPE } from 'theme'

interface Props {
  tab: TokenManagerTab
  children?: JSX.Element
  filtred?: boolean
}

export const TmEmptyPage = ({ tab, children, filtred }: Props) => {
  const text = useMemo(() => {
    switch (tab) {
      case 'my-tokens':
        return `No Tokens Added`
      case 'payout-events':
        return `No Payout Event Created`
      case 'payout-history':
        return `No Payout History`
      default:
        return `No Data`
    }
  }, [tab])

  return (
    <Container style={{marginTop: '130px'}}>
      <img style={{width: '200px'}} src={logoImg} alt="logoImg" />
      {!filtred ? (
        <>
          <TYPE.title5 style={{marginTop: '20px'}}>{text}</TYPE.title5>
          {children}
        </>
      ) : (
        <NothingFound>
          <div>
            <TYPE.title5>Nothing found</TYPE.title5>
          </div>
          <div>
            <TYPE.main1 lineHeight={'1px'} color={'#8F8FB2'}>{`We couldn't find anything with this criteria`}</TYPE.main1>
          </div>
        </NothingFound>
      )}
    </Container>
  )
}
