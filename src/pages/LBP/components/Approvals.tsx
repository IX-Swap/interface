import styled from 'styled-components'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { NewApproveButton } from 'components/Button'
import { ReactComponent as ExternalIcon } from '../../../assets/images/rightcheck.svg'
import { useAccreditedToken } from 'state/user/hooks'
import { useDerivedMintInfo } from 'state/mint/hooks'
import { Field } from 'state/mint/actions'

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  width: calc(50% - 10px);
  height: 200px;
  margin: 5px;
  @media (max-width: 768px) {
    width: calc(100% - 20px);
    max-width: 350px;
  }
`

const Button = styled.button`
  border: 1px solid #e6e6ff;
  color: #6666ff;
  width: 250px;
  height: 48px;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 16px;
`

interface Props {
  addressA?: string
  addressB: string
}

export default function Approvals({ addressA, addressB }: Props) {
  const currencyA = useAccreditedToken({ currencyId: addressA }) as any
  const currencyB = useAccreditedToken({ currencyId: addressB }) as any
  const {
    parsedAmounts,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], addressA)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], addressB)

  return (
    <CardContainer>
      <Card>
        <Serenity />
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>Approve Serenity</p>
        {approvalA !== ApprovalState.APPROVED && <Button onClick={approveACallback}>Approve Share</Button>}
        {approvalA === ApprovalState.APPROVED && (
          <NewApproveButton
            data-testid="approved-currency-a"
            style={{ flexGrow: approvalA !== ApprovalState.APPROVED ? 1 : 2, gap: '10px' }}
          >
            <ExternalIcon />
            <span>Approved Share</span>
          </NewApproveButton>
        )}
      </Card>
      <Card>
        <USDC />
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>Approve USDC</p>
        {approvalA !== ApprovalState.APPROVED && <Button onClick={approveBCallback}>Approve Asset</Button>}
        {approvalB === ApprovalState.APPROVED && (
          <NewApproveButton
            data-testid="approved-currency-b"
            style={{ flexGrow: approvalB !== ApprovalState.APPROVED ? 1 : 2, gap: '10px' }}
          >
            <ExternalIcon />
            <span>Approved Asset</span>
          </NewApproveButton>
        )}
      </Card>
    </CardContainer>
  )
}
