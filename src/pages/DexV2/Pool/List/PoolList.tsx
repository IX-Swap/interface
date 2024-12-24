import { Flex } from "rebass";
import { BodyRow, HeaderRow, Table } from "components/Table";
import { BodyContainer } from "components/TmPayoutHistory/styleds";
import { Fragment, memo, useMemo, useState } from "react";
import { Line } from "components/Line";
import { Pagination } from "components/Pagination";
import styled from "styled-components";
import { Title } from "components/LaunchpadMisc/tables";
import { SortIcon } from "components/LaunchpadIssuance/utils/SortIcon";
import { useOnChangeOrder, usePoolList } from "./hooks";
import { AbstractOrder } from "state/launchpad/types";
import { TYPE } from "theme";
import useTheme from "hooks/useTheme";
import { useCurrency } from "lib/balancer/hooks/useCurrency";
import { fNum } from "lib/balancer/utils/numbers";
import CurrencyLogo from "components/CurrencyLogo";
import { useSafeCurrency } from "hooks/Tokens";
import { usePoolFilter } from "./FilterProvider";
import { adminOffset } from "state/admin/constants";

export default function PoolList() {
  const { pools } = usePoolList()
  const { page, setPage } = usePoolFilter()

  const onPageChange = (page: number) => {
    setPage(page - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Flex flexWrap='wrap' flexDirection="column" style={{ gap: 32 }}>
      <Table header={<Header />} body={<Body items={pools} />} />
      <Pagination
        totalPages={null}
        page={page + 1}
        onPageChange={onPageChange}
        totalItems={adminOffset}
      />
    </Flex>
  )
}

interface IBody {
  items: any[]
}
const Body = ({ items }: IBody) => {
  return (
    <BodyContainer>
      {items.map((pool, index) => (
        <Fragment key={`pool-${pool.id}`}>
          <Line />
          <Row pool={pool} />
          {index === items.length - 1 && <Line />}
        </Fragment>
      ))}
    </BodyContainer>
  )
}

const Header = () => {
  const { order, setOrder } = usePoolFilter()
  
  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder)
  return (
    <StyledHeaderRow>
      <Title>
        Pool name
      </Title>
      <StyledTitle onClick={() => onChangeOrder('totalLiquidity')}>
        TVL <SortIcon type={order.totalLiquidity} />
      </StyledTitle>
      <StyledTitle onClick={() => onChangeOrder('totalSwapVolume')}>
        Volume <SortIcon type={order.totalSwapVolume} />
      </StyledTitle>
      <StyledTitle onClick={() => onChangeOrder('type')}>
        Type <SortIcon type={order.type} />
      </StyledTitle>
      <StyledTitle onClick={() => onChangeOrder('apr')}>
        APR <SortIcon type={order.apr} />
      </StyledTitle>
    </StyledHeaderRow>
  )
}

type TokenIconProps = {
  address: string
}

const TokenIcon = ({ address }: TokenIconProps) => {
  const currency = useSafeCurrency(address)
  return (
    <CurrencyLogo currency={currency} size={'24px'} />
  )
}

const MemoTokenIcon = memo(TokenIcon, (prevProps: TokenIconProps, nextProps: TokenIconProps) => {
  return prevProps.address === nextProps.address;
})

const Row = ({ pool }: { pool: any }) => {
  const theme = useTheme()
  const { toCurrency } = useCurrency()

  return (
    <StyledBodyRow>
      <Flex flexWrap='wrap'>
        {pool?.tokens?.map((token: any) => (
          <Flex key={token.ticker} alignItems="center" className="token">
            <MemoTokenIcon address={token.address} />
            <span>{token.symbol}</span>
            <span className="percentage">{fNum('weight', token.weight || '')}</span>
          </Flex>
        ))}
      </Flex>
      <TYPE.main color={'text1'}>
        {toCurrency(pool.totalLiquidity)}
      </TYPE.main>
      <TYPE.main color={'text1'}>
        {toCurrency(pool.totalSwapVolume)}
      </TYPE.main>
      <TYPE.main1 color={theme.blue5}>
        SAMPLE
      </TYPE.main1>
      <TYPE.main0 fontSize={16}>
        aprToShow
      </TYPE.main0>
    </StyledBodyRow>
  )
}

const gridTemplateColumns = '3.5fr 1fr 1fr 1fr 1fr';

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: ${gridTemplateColumns};
  place-content: center;
  margin-top: 22px;
  > div {
    color: ${({ theme }) => theme.text9};
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
  }
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: ${gridTemplateColumns};
  place-content: center;
  margin-bottom: 0px;
  border: none;
  font-size: 14px;

  > div:last-child {
    padding: 0;
  }

  > div {
    padding: 24px 10px;
    gap: 4px;
  }

  .token {
    border: 1px solid ${({ theme }) => theme.bg24};
    border-radius: 8px;
    padding: 8px 12px;
    gap: 8px;
    .percentage {
      color: ${({ theme }) => theme.blue5};
    }
  }
`

const StyledTitle = styled(Title)`
  gap: 6px;
`
