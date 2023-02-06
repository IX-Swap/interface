import React, { useCallback, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Check, X } from 'react-feather'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { useApproveRandomPresaleWhitelists, useManagePresaleWhitelists } from 'state/launchpad/hooks'
import { IssuanceTextField } from '../../utils/TextField'

interface Props {
  offerId: string;
  totalItems: number;
  refreshWhitelists: () => void;
}

export const OfferWhitelistApprove = ({ offerId, totalItems, refreshWhitelists }: Props) => {
  const theme = useTheme()
  const approveRandom = useApproveRandomPresaleWhitelists();
  const manageWhitelists = useManagePresaleWhitelists();
  const [count, setCount] = useState('');

  const refresh = () => {
    setCount('');
    refreshWhitelists();
  }

  const error = useMemo(() => {
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
  const disabledRandom = !count || !totalItems || !!error || !!isLoading;

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
  if (isLoading) {
    return <></>;
  }
  // todo confirmations
  // todo show error for all 
  return (
    <Container>
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
              error={error}
            />
            <EndAdornment disabled={disabledRandom} onClick={onApproveRandom}>Approve</EndAdornment>
          </FieldContainer>
        </GridItem>
        <GridItem>
          <OutlineButton color={theme.launchpad.colors.success} width="165px" onClick={onApproveAll}>
            <ButtonLabel disabled={!totalItems || manageWhitelists.isLoading}>Approve All</ButtonLabel>
            <Check size={13} />
          </OutlineButton>
        </GridItem>
        <GridItem>
          <OutlineButton color={theme.launchpad.colors.error} width="165px" onClick={onRejectAll}>
            <ButtonLabel disabled={!totalItems || manageWhitelists.isLoading}>Reject All</ButtonLabel>
            <X size={13} />
          </OutlineButton>
        </GridItem>
      </GridContainer>
    </Container>
  )
}

// todo colors
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const GridContainer = styled.div`
  display: grid; 
  grid-template-columns: auto 155px 155px; 
  grid-template-rows: auto; 
  grid-template-areas:
    "row1 row2 row3";
  gap: 20px 20px; 
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
  color: #292933;
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
  color: #6666FF;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;