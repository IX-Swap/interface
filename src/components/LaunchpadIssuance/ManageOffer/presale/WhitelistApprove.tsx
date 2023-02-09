import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Check, X } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useApproveRandomPresaleWhitelists, useManagePresaleWhitelists } from 'state/launchpad/hooks'
import { IssuanceTextField } from '../../utils/TextField'
import { ConfirmPopup } from '../../utils/ConfirmPopup'
import { useShowError } from 'state/application/hooks'

interface Props {
  offerId: string;
  totalItems: number;
  refreshWhitelists: () => void;
}
interface ConfirmProps {
  isOpen: boolean;
  setOpen: (foo: boolean) => void;
  onAccept: () => void;
}

export const ConfirmModal = ({ isOpen, setOpen, onAccept }: ConfirmProps) => {
  const onAcceptWithClose = () => {
    onAccept();
    setOpen(false);
  }
  return <ConfirmPopup isOpen={isOpen} onDecline={() => { setOpen(false) }} onAccept={onAcceptWithClose} />;
}

export const OfferWhitelistApprove = ({ offerId, totalItems, refreshWhitelists }: Props) => {
  const theme = useTheme()
  const approveRandom = useApproveRandomPresaleWhitelists();
  const manageWhitelists = useManagePresaleWhitelists();
  const [count, setCount] = useState('');
  const showError = useShowError()

  const [openApproveAll, setOpenApproveAll] = useState(false);
  const [openRejectAll, setOpenRejectAll] = useState(false);
  const [openApproveRandom, setOpenApproveRandom] = useState(false);

  const refresh = () => {
    setCount('');
    refreshWhitelists();
  }

  const randomError = useMemo(() => {
    if (approveRandom.error) {
      return approveRandom.error;
    }
    if (count && totalItems && +count > totalItems) {
      return `You can approve maximum ${totalItems} users`;
    }
    return '';
  }, [count, totalItems, approveRandom.error]);
  const isLoading = useMemo(() => {
    return approveRandom.isLoading || manageWhitelists.isLoading;
  }, [approveRandom.isLoading, manageWhitelists.isLoading])
  const disabledRandom = !count || !totalItems || !!randomError || !!isLoading;
  const disabledAll = !totalItems || manageWhitelists.isLoading;

  const integerNumberFilter = useCallback((value?: string) => {
    if (!value) {
      return '';
    }
    return value
      .split('')
      .filter(x => /[0-9]/.test(x))
      .join('');
  }, []);

  const onApproveRandom = () => {
    if (disabledRandom) return;
    approveRandom.load(offerId, +count).then(() => {
      refresh();
    });
  };
  const onApproveAll = () => {
    if (!totalItems) return;
    manageWhitelists.load(offerId, { approveAll: true }).then(() => {
      refresh();
    });
  }
  const onRejectAll = () => {
    if (!totalItems) return;
    manageWhitelists.load(offerId, { rejectAll: true }).then(() => {
      refresh();
    });
  }
  const onClickManage = (disabled: boolean, setMethod: (foo: boolean) => void) => {
    if (!disabled) {
      setMethod(true);
    }
  }
  useEffect(() => {
    if (manageWhitelists.error) {
      showError(manageWhitelists.error);
    }
  }, [manageWhitelists.error])

  if (isLoading) {
    return <></>;
  }
  return (
    <Container>
      <ConfirmModal isOpen={openApproveAll} setOpen={setOpenApproveAll} onAccept={onApproveAll} />
      <ConfirmModal isOpen={openRejectAll} setOpen={setOpenRejectAll} onAccept={onRejectAll} />
      <ConfirmModal isOpen={openApproveRandom} setOpen={setOpenApproveRandom} onAccept={onApproveRandom} />

      <Title>Approve Registration</Title>
      <GridContainer>
        <GridItem>
          <FieldContainer>
            <IssuanceTextField
              onChange={setCount}
              label='Approve randomly'
              placeholder='Approve randomly'
              inputFilter={integerNumberFilter}
              disabled={false}
              error={randomError}
            />
            <EndAdornment disabled={disabledRandom} onClick={() => onClickManage(disabledRandom, setOpenApproveRandom)}>Approve</EndAdornment>
          </FieldContainer>
        </GridItem>
        <GridItem>
          <OutlineButton color={theme.launchpad.colors.success} width="165px" onClick={() => onClickManage(disabledAll, setOpenApproveAll)}>
            <ButtonLabel disabled={disabledAll}>Approve All</ButtonLabel>
            <Check size={13} />
          </OutlineButton>
        </GridItem>
        <GridItem>
          <OutlineButton color={theme.launchpad.colors.error} width="165px" onClick={() => onClickManage(disabledAll, setOpenRejectAll)}>
            <ButtonLabel disabled={disabledAll}>Reject All</ButtonLabel>
            <X size={13} />
          </OutlineButton>
        </GridItem>
        {/* {manageWhitelists.error && (
          <ErrorText>{manageWhitelists.error}</ErrorText>
        )} */}
      </GridContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const GridContainer = styled.div`
  display: grid; 
  grid-template-columns: auto 155px 155px; 
  grid-template-rows: auto; 
  grid-template-areas:
    "row1 row2 row3"
    "error error error";
  gap: 0 20px; 
`;
const GridItem = styled.div`
  display: grid;  
  align-items: center;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.03em;
  color: ${props => props.theme.launchpad.colors.text.title};
  margin-bottom: 17px;
`;
const ButtonLabel = styled.span<{ disabled: boolean }>`
  font-weight: 600;
  opacity: ${props => props.disabled ? 0.5 : 1};
`
const FieldContainer = styled.div`
  position: relative;
  max-width: 759px;
`;
const EndAdornment = styled.div<{ disabled: boolean }>`
  position: absolute;
  top: 28px;
  right: 32px;
  cursor: pointer;
  z-index: 20;

  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: ${props => props.theme.launchpad.colors.primary};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;
const ErrorText = styled.div`
  color: ${props => props.theme.launchpad.colors.error};

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  text-align: right;
  grid-area: error;
`