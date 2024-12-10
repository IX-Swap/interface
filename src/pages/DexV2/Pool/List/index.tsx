import { MEDIA_WIDTHS, TYPE } from "theme";
import { Trans } from "@lingui/macro";
import styled from "styled-components";
import Filters from "./Filters";
import PoolList from "./PoolList";

export default function LiquidityPool() {
  return (
    <Pager>
      <PageContainer>
        <TYPE.title4 marginBottom="30px" data-testid="liquidityPoolTitle">
          <Trans>Liquidity Pools</Trans>
        </TYPE.title4>
        <Filters />
        <PoolList />
      </PageContainer>
    </Pager>
  )
}

const Pager = styled.div`
  background-color: #ffffff;
  width: 100vw;
  padding: 1rem;
  padding-top: 80px;
  padding-bottom: 50px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0rem;
  }
`

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  max-width: ${(props) => props.theme.launchpad.content.maxWidth};
  margin: auto;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-height: calc(100vh - 64px);
    width: 100%;
  `}
`
