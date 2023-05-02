import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { MiniOffer, OfferStatus, OfferTimeframe } from 'state/launchpad/types'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { KEY_OFFER_STATUSES, OFFER_STATUSES } from 'components/LaunchpadIssuance/utils/constants'
import { DropdownField } from 'components/LaunchpadIssuance/IssuanceForm/shared/fields/DropdownField'
import { ConfirmModal } from '../shared/ConfirmModal'
import { DateRangeField } from 'components/LaunchpadIssuance/IssuanceForm/shared/fields/DateRangeField'
import moment from 'moment'
import { useEditTimeframe } from 'state/launchpad/hooks'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { useShowError } from 'state/application/hooks'
import { getDaysAhead, isFutureDate } from 'utils/time'
import { text1, text48 } from 'components/LaunchpadMisc/typography'
import { getDaysAfter } from 'utils/time'

interface Props {
  open: boolean
  setOpen: (foo: boolean) => void
  offer: MiniOffer
  refreshOffer: () => void
}

interface DateRange {
  startDate?: Date
  endDate?: Date
}

type RangeMode = 'single' | 'range'

const getNextStage = (stage: string) => {
  const currentIndex = KEY_OFFER_STATUSES.findIndex((item) => item === stage)
  const nextStatus = KEY_OFFER_STATUSES[currentIndex + 1]
  return nextStatus
}
const getPreviousStage = (stage: string) => {
  const currentIndex = KEY_OFFER_STATUSES.findIndex((item) => item === stage)
  const nextStatus = KEY_OFFER_STATUSES[currentIndex - 1]
  return nextStatus
}

const getTomorrow = () => getDaysAhead(1)
const getTwoDaysAhead = () => getDaysAhead(2)

export const EditTimeframeModal = ({ open, setOpen, offer, refreshOffer }: Props) => {
  const { status, timeframe, id } = offer

  /* state */
  const [openConfirm, setOpenConfirm] = useState(false)
  const [stage, setStage] = useState<string | undefined>()
  const [dates, setDates] = useState<DateRange>({
    startDate: getTomorrow(),
    endDate: getTwoDaysAhead(),
  })

  /* hooks */
  const { isLoading, error, load: editTimeframe } = useEditTimeframe(id)
  const showError = useShowError()

  /* effects */
  useEffect(() => {
    if (error) {
      showError(error)
    }
  }, [error])

  /* memos */
  const isSingle = useMemo(() => stage === OfferStatus.claim, [stage])

  const nextStage = useMemo(() => {
    if (!stage || isSingle) return ''
    return getNextStage(stage)
  }, [stage, isSingle])

  const stageOptions = useMemo(() => {
    const index = KEY_OFFER_STATUSES.findIndex((item) => item === status)
    if (index < 0) return []
    const allowedStatuses = KEY_OFFER_STATUSES.slice(index + 1)
    return allowedStatuses.map((status: string) => ({
      value: status,
      label: OFFER_STATUSES[status as keyof typeof OFFER_STATUSES] as string,
    }))
  }, [status])

  const rangeError = useMemo(() => {
    if (!stage) return ''
    if (!isSingle) {
      if (dates.startDate && dates.endDate) {
        const isSame = moment(dates.startDate).isSame(dates.endDate)
        if (isSame) {
          return 'Invalid Range - end date should come after start date(min 1 day)'
        }
      } else {
        return 'Invalid Range - start and end dates required'
      }
    }
    return ''
  }, [isSingle, stage, dates])

  const rangeValue = useMemo(() => {
    return isSingle ? dates.startDate : [dates.startDate, dates.endDate].filter((x) => !!x).map((x) => moment(x))
  }, [isSingle, dates])

  const label = useMemo(() => {
    if (!stage) return 'Select stage first'
    if (stage === OfferStatus.claim) {
      return OFFER_STATUSES.claim
    }
    const statuses = OFFER_STATUSES as { [key: string]: string }
    const first = statuses[stage]
    const second = statuses[nextStage]
    return `${first} to ${second}`
  }, [stage])

  const minDate = useMemo(() => {
    if (!stage || stage === OfferStatus.whitelist) {
      return new Date()
    }
    const date = timeframe[getPreviousStage(stage) as keyof OfferTimeframe]
    return isFutureDate(date) ? getDaysAfter(date, 1) : new Date()
  }, [stage, timeframe])

  const maxDate = useMemo(() => {
    if (!stage || [OfferStatus.closed, OfferStatus.claim].includes(stage as OfferStatus)) {
      return undefined
    }
    return timeframe[getNextStage(getNextStage(stage)) as keyof OfferTimeframe]
  }, [stage, timeframe])

  /* callbacks */
  const setRange = useCallback(
    (newStage: string) => {
      const startDate = timeframe[newStage as keyof OfferTimeframe]
      let endDate: Date | undefined
      if (newStage !== OfferStatus.claim) {
        endDate = timeframe[getNextStage(newStage) as keyof OfferTimeframe]
      }
      setDates({
        startDate,
        endDate,
      })
    },
    [timeframe]
  )

  /* methods */
  const onChooseStage = (_: string, value?: string) => {
    if (!value) return
    setStage(value)
    setRange(value)
  }

  const onCloseEdit = () => {
    setStage('')
    setDates({
      startDate: getTomorrow(),
      endDate: getTwoDaysAhead(),
    })
    setOpen(false)
  }

  const onSave = () => {
    if (!stage) return
    const body = { [stage]: dates.startDate } as { [key: string]: Date }
    if (!isSingle && dates.endDate) {
      body[nextStage] = dates.endDate
    }
    editTimeframe(body, () => {
      onCloseEdit()
      refreshOffer()
    })
  }

  const onChangeRange = ([startDate, endDate]: Date[]) => {
    setDates({ startDate, endDate })
  }

  return (
    <>
      <IssuanceDialog show={open} onClose={onCloseEdit} width="480px" height="360px">
        {isLoading && (
          <Centered height="360px">
            <Loader />
          </Centered>
        )}
        {!isLoading && (
          <Container>
            <Title>Change stage</Title>
            <DropdownField
              field="stage"
              setter={onChooseStage}
              label="Choose stage to change"
              options={stageOptions}
              value={stage}
              wrapperStyle={{
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            />
            <DateRangeField
              mode={(isSingle ? 'single' : 'range') as RangeMode}
              label={label}
              field="timeframe"
              minDate={minDate}
              maxDate={maxDate}
              value={rangeValue}
              onChange={onChangeRange}
              disabled={!stage}
              error={rangeError}
              dateFormat="DD/MM/YYYY"
            />
            <FilledButton
              onClick={() => setOpenConfirm(true)}
              style={{ marginTop: '16px' }}
              disabled={!stage || !!rangeError}
            >
              <ButtonLabel>Save</ButtonLabel>
            </FilledButton>
          </Container>
        )}
      </IssuanceDialog>
      <ConfirmModal isOpen={openConfirm} setOpen={setOpenConfirm} onAccept={onSave} />
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  ${text48}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  margin-bottom: 34px;
`
const ButtonLabel = styled.div`
  ${text1}
  color: ${(props) => props.theme.launchpad.colors.text.light};
`
