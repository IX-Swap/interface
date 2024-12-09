import { Flex } from "rebass";
import { BodyRow, HeaderRow, Table } from "components/Table";
import { BodyContainer } from "components/TmPayoutHistory/styleds";
import { Fragment, useState } from "react";
import { Line } from "components/Line";
import { Pagination } from "components/Pagination";
import styled from "styled-components";
import { Title } from "components/LaunchpadMisc/tables";
import { SortIcon } from "components/LaunchpadIssuance/utils/SortIcon";
import { useOnChangeOrder } from "./hooks";
import { AbstractOrder } from "state/launchpad/types";
import { TYPE } from "theme";
import useTheme from "hooks/useTheme";

export interface OrderConfig {
  tvl?: string | null
  volumn?: string | null
  type?: string | null
  apr?: string | null
}

export default function PoolList() {
  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Flex flexWrap='wrap' flexDirection="column" style={{ gap: 32 }}>
      <Table header={<Header />} body={<Body items={[{
        tokens: [{
          ticker: 'USDC',
          percentage: '50%',
          iconUrl: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png'
        }, {
          ticker: 'ETH',
          percentage: '50%',
          iconUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
        }],
        tvl: '$24,654.54',
        volume: '$5,443.45',
        type: 'RWA',
        apr: '3.67%',
      }, {
        tokens: [{
          ticker: 'USDC',
          percentage: '25%',
          iconUrl: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png'
        }, {
          ticker: 'ETH',
          percentage: '25%',
          iconUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
        }, {
          ticker: 'USDT',
          percentage: '25%',
          iconUrl: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png'
        }, {
          ticker: 'DAI',
          percentage: '25%',
          iconUrl: 'https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png'
        }],
        tvl: '$24,654.54',
        volume: '$5,443.45',
        type: 'RWA',
        apr: '2.61% - 3.66%',
      }]} />} />
      <Pagination
        totalPages={9}
        page={1}
        onPageChange={onPageChange}
        totalItems={99}
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
      {items.map((item, index) => (
        <Fragment key={`payout-${item.id}`}>
          <Line />
          <Row item={item} key={`payout-${item.id}`} />
          {index === items.length - 1 && <Line />}
        </Fragment>
      ))}
    </BodyContainer>
  )
}

const Header = () => {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<OrderConfig>({})
  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)
  return (
    <StyledHeaderRow>
      <Title>
        Pool name
      </Title>
      <StyledTitle onClick={() => onChangeOrder('tvl')}>
        TVL <SortIcon type={order.tvl} />
      </StyledTitle>
      <StyledTitle onClick={() => onChangeOrder('volume')}>
        Volume <SortIcon type={order.volumn} />
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

const Row = ({item}: {item: any}) => {
  const theme = useTheme()

  return (
    <StyledBodyRow>
      <Flex flexWrap='wrap'>
        {item.tokens.map((token: any) => (
          <Flex key={token.ticker} alignItems="center" className="token">
            <img src={token.iconUrl} alt={token.ticker} width={24} height={24} />
            <span>{token.ticker}</span>
            <span className="percentage">{token.percentage}</span>
          </Flex>
        ))}
      </Flex>
      <TYPE.main1>
        {item.tvl}
      </TYPE.main1>
      <TYPE.main1>
        {item.volume}
      </TYPE.main1>
      <TYPE.main1 color={theme.blue5}>
        {item.type}
      </TYPE.main1>
      <TYPE.main0 fontSize={16}>
        {item.apr}
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
