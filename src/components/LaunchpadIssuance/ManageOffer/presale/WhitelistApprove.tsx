import React, { useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Check, X } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useApproveRandomPresaleWhitelists, useManagePresaleWhitelists } from 'state/launchpad/hooks'
import { IssuanceTextField } from '../../utils/TextField'
import { useShowError } from 'state/application/hooks'
import { ConfirmModal } from '../shared/ConfirmModal'
import { text1, text2, text51 } from 'components/LaunchpadMisc/typography'
import { integerNumberFilter } from 'utils/input'

interface Props {
  offerId: string
  totalItems: number
  refreshWhitelists: () => void
  disabledManage: boolean
}

export const OfferWhitelistApprove = ({ offerId, totalItems, refreshWhitelists, disabledManage }: Props) => {
  const theme = useTheme()
  const approveRandom = useApproveRandomPresaleWhitelists()
  const manageWhitelists = useManagePresaleWhitelists()
  const [count, setCount] = useState('')
  const showError = useShowError()

  // const [openApproveAll, setOpenApproveAll] = useState(false)
  // const [openRejectAll, setOpenRejectAll] = useState(false)
  const [openApproveRandom, setOpenApproveRandom] = useState(false)

  const refresh = () => {
    setCount('')
    refreshWhitelists()
  }

  const disabledAll = disabledManage || !totalItems || manageWhitelists.isLoading

  const randomError = useMemo(() => {
    if (approveRandom.error) {
      return approveRandom.error
    }
    if (count && totalItems && +count > totalItems) {
      return `You can approve maximum ${totalItems} users`
    }
    if (!disabledAll && !totalItems) {
      return 'There are no users to approve'
    }
    return ''
  }, [count, totalItems, approveRandom.error])

  const disabledRandom = disabledManage || !count || !totalItems || approveRandom.isLoading || !!randomError

  const onApproveRandom = () => {
    if (disabledRandom) return
    approveRandom.load(offerId, +count).then(() => {
      refresh()
    })
  }
  // const onApproveAll = () => {
  //   if (!totalItems) return
  //   manageWhitelists.load(offerId, { approveAll: true }).then(() => {
  //     refresh()
  //   })
  // }
  // const onRejectAll = () => {
  //   if (!totalItems) return
  //   manageWhitelists.load(offerId, { rejectAll: true }).then(() => {
  //     refresh()
  //   })
  // }
  const onClickManage = (disabled: boolean, setMethod: (foo: boolean) => void) => {
    if (!disabled) {
      setMethod(true)
    }
  }
  useEffect(() => {
    if (manageWhitelists.error) {
      showError(manageWhitelists.error)
    }
  }, [manageWhitelists.error])

  if (approveRandom.isLoading || manageWhitelists.isLoading) {
    return <></>
  }
  return (
    <Container>
      {/* <ConfirmModal isOpen={openApproveAll} setOpen={setOpenApproveAll} onAccept={onApproveAll} />
      <ConfirmModal isOpen={openRejectAll} setOpen={setOpenRejectAll} onAccept={onRejectAll} /> */}
      <ConfirmModal isOpen={openApproveRandom} setOpen={setOpenApproveRandom} onAccept={onApproveRandom} />

      <Title>Approve Registration to Invest</Title>
      <GridContainer>
        <SmallTitle>Approve Randomly</SmallTitle>
        <GridItem>
          <FieldContainer>
            <IssuanceTextField
              onChange={setCount}
              // label="Approve randomly"
              placeholder="Approve randomly"
              inputFilter={integerNumberFilter}
              disabled={disabledManage}
              error={disabledManage ? '' : randomError}
              maxLength={64}
            />
            <EndAdornment disabled={disabledRandom} onClick={() => onClickManage(disabledRandom, setOpenApproveRandom)}>
              Approve
            </EndAdornment>
          </FieldContainer>
        </GridItem>
        {/* <GridItem>
          <OutlineButton
            color={theme.launchpad.colors.success}
            width="165px"
            onClick={() => onClickManage(disabledAll, setOpenApproveAll)}
          >
            <ButtonLabel disabled={disabledAll}>Approve All</ButtonLabel>
            <Check size={13} />
          </OutlineButton>
        </GridItem>
        <GridItem>
          <OutlineButton
            color={theme.launchpad.colors.error}
            width="165px"
            onClick={() => onClickManage(disabledAll, setOpenRejectAll)}
          >
            <ButtonLabel disabled={disabledAll}>Reject All</ButtonLabel>
            <X size={13} />
          </OutlineButton>
        </GridItem> */}
      </GridContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    'row1'
    'error';
  gap: 0 20px;
`
const GridItem = styled.div`
  display: grid;
  align-items: center;
`
const Title = styled.div`
  ${text51}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  margin-bottom: 17px;
`

const SmallTitle = styled.div`
  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  margin-bottom: 17px;
`

const ButtonLabel = styled.span<{ disabled: boolean }>`
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
const FieldContainer = styled.div`
  position: relative;
  max-width: 100%;
`
const EndAdornment = styled.div<{ disabled: boolean }>`
  position: absolute;
  top: 18px;
  right: 32px;
  cursor: pointer;
  z-index: 20;
  ${text1}
  color: ${(props) => props.theme.launchpad.colors.primary};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
