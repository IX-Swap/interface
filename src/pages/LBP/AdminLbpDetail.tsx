import { InvestorInformation } from 'components/LBP/Dashboard/InvestorInformation'
import { useQueryParams } from 'hooks/useParams'
import styled from 'styled-components'

export const AdminLbpDetail = () => {
  const {
    objectParams: { id: lbpId },
  } = useQueryParams<{ id: number }>(['id'])
  return (
    <Wrapper style={{ padding: '0px 8%' }}>
      {/* Charts */}
      {/* TODO: Kapil will add chart component here */}

      {/* Investor Information */}
      <InvestorInformation lbpId={lbpId} />
    </Wrapper>
  )
}

const Wrapper = styled.article`
  min-height: 100vh;
  padding: 0 10%;
  width: 100%;
  margin: auto;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
