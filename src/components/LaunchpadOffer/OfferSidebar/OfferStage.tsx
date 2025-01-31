import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { ChevronRight, Info } from 'react-feather'

import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'

import { OfferTimeframe, OfferTimeframeType } from 'state/launchpad/types'

import { InfoList } from '../util/InfoList'
import { useLocalization } from 'i18n'

const format = (from: Date, to?: Date) =>
  moment(from).format('Do MMM, HH:mm') + (to ? ` - ${moment(to).format('Do MMM, HH:mm')}` : '')

const hasStarted = (date: Date) => (date ? Date.parse(date.toString()) <= Date.now() : false)

interface StageProps {
  frames: OfferTimeframe
}

export const OfferStage: React.FC<StageProps> = (props) => {
  const theme = useTheme()
  const { t } = useLocalization()

  const stageHasStarted = {
    whitelist: hasStarted(props.frames.whitelist),
    preSale: hasStarted(props.frames.preSale),
    sale: hasStarted(props.frames.sale),
    closed: hasStarted(props.frames.closed),
    claim: hasStarted(props.frames.claim),
  }

  const getTooltip = (type: OfferTimeframeType) => {
    switch (type) {
      case OfferTimeframeType.whitelist:
        return {
          title: t('launchpad.offersPage.sideBar.investmentStage.whitelist.title'),
          body: t('launchpad.offersPage.sideBar.investmentStage.whitelist.body'),
        }

      case OfferTimeframeType.preSale:
        return {
          title: t('launchpad.offersPage.sideBar.investmentStage.preSale.title'),
          body: t('launchpad.offersPage.sideBar.investmentStage.preSale.body'),
        }

      case OfferTimeframeType.sale:
        return {
          title: t('launchpad.offersPage.sideBar.investmentStage.publicSale.title'),
          body: t('launchpad.offersPage.sideBar.investmentStage.publicSale.body'),
        }

      case OfferTimeframeType.closed:
        return {
          title: t('launchpad.offersPage.sideBar.investmentStage.closed.title'),
          body: t('launchpad.offersPage.sideBar.investmentStage.closed.body'),
        }

      case OfferTimeframeType.claim:
        return {
          title: t('launchpad.offersPage.sideBar.investmentStage.claim.title'),
          body: t('launchpad.offersPage.sideBar.investmentStage.claim.body'),
        }
    }
  }

  const whitelistAndPresale = props.frames.whitelist
    ? [
        {
          label: (
            <StageLabel hasStarted={stageHasStarted.whitelist}>
              {stageHasStarted.whitelist && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

              <div>{t('launchpad.offersPage.sideBar.investmentStage.whitelist.title')}</div>

              <Tooltip {...getTooltip(OfferTimeframeType.whitelist)}>
                <Info size="14" color={theme.launchpad.colors.text.caption} />
              </Tooltip>
            </StageLabel>
          ),
          value: <Nowrap>{format(props.frames.whitelist, props.frames.preSale)}</Nowrap>,
        },
        {
          label: (
            <StageLabel hasStarted={stageHasStarted.preSale}>
              {stageHasStarted.preSale && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

              <div>{t('launchpad.offersPage.sideBar.investmentStage.preSale.title')}</div>

              <Tooltip {...getTooltip(OfferTimeframeType.preSale)}>
                <Info size="14" color={theme.launchpad.colors.text.caption} />
              </Tooltip>
            </StageLabel>
          ),
          value: <Nowrap>{format(props.frames.preSale, props.frames.sale)}</Nowrap>,
        },
      ]
    : []

  const timeframes = () => {
    const items = [
      {
        label: (
          <StageLabel hasStarted={stageHasStarted.sale}>
            {stageHasStarted.sale && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

            <div>{t('launchpad.offersPage.sideBar.investmentStage.publicSale.title')}</div>

            <Tooltip {...getTooltip(OfferTimeframeType.sale)}>
              <Info size="14" color={theme.launchpad.colors.text.caption} />
            </Tooltip>
          </StageLabel>
        ),
        value: <Nowrap>{format(props.frames.sale, props.frames.closed)}</Nowrap>,
      },
      {
        label: (
          <StageLabel hasStarted={stageHasStarted.closed}>
            {stageHasStarted.closed && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

            <div>{t('launchpad.offersPage.sideBar.investmentStage.closed.title')}</div>

            <Tooltip {...getTooltip(OfferTimeframeType.closed)}>
              <Info size="14" color={theme.launchpad.colors.text.caption} />
            </Tooltip>
          </StageLabel>
        ),
        value: <Nowrap>{format(props.frames.closed, props.frames.claim)}</Nowrap>,
      },
      {
        label: (
          <StageLabel hasStarted={stageHasStarted.claim}>
            {stageHasStarted.claim && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

            <div>{t('launchpad.offersPage.sideBar.investmentStage.claim.title')}</div>

            <Tooltip {...getTooltip(OfferTimeframeType.claim)}>
              <Info size="14" color={theme.launchpad.colors.text.caption} />
            </Tooltip>
          </StageLabel>
        ),
        value: <Nowrap>{format(props.frames.claim)}</Nowrap>,
      },
    ]

    return [...whitelistAndPresale, ...items]
  }

  return <InfoList title={t('launchpad.offersPage.sideBar.investmentStage.title')} entries={timeframes()} />
}

const Nowrap = styled.div`
  white-space: nowrap;
`

const StageLabel = styled(Nowrap)<{ hasStarted: boolean }>`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.25rem;

  color: ${(props) =>
    props.hasStarted ? props.theme.launchpad.colors.primary : props.theme.launchpad.colors.text.body};
`
