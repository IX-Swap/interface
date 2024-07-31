import { background } from 'styled-system'
import styled, { css } from 'styled-components'
import { ellipsisText, gradientBorder, MEDIA_WIDTHS } from 'theme'
import { BodyRow, HeaderRow } from 'components/Table'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const PayoutHistoryBody = styled.div`
  position: relative;
  padding: 32px 0;
  ::before {
    padding: 1px;
    @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      border-radius: 0px 0px 32px 32px;
    }
  }
  @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 24px 12px;
  }
`

export const PayoutHistoryFilter = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
  > :first-child {
    margin-bottom: 32px;
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      margin-bottom: 12px;
    }
  }

  .MuiPickersDateRangePickerInput-root {
    height: 100%;
  }

  .search {
    width: 100%;
    padding-right: 10px;
  }

  .search input {
    border-radius: 8px;
    height: 48px;
    gap: 10px;
    padding: 0 16px 0 44px;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }

  .filters-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;

    .dropdown {
      border-radius: 8px;
      height: 48px;
      gap: 10px;
      padding: 0 16px;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.02em;

      div {
        font-size: 13px;
        font-weight: 500;
      }

      &.filter-status {
        @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
          grid-column: span 2 / span 2;
        }
      }
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & > div {
      &:nth-child(2) {
        margin-left: 0;
      }
    }
  }
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 1fr minmax(auto, 125px) 1fr 1fr minmax(auto, 125px);
  height: 80px;
  min-width: 900px;
  width: 100%;
  margin-bottom: 0px;
  border: none;
  > div {
    padding: 24px 10px;
  }
`

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr 1fr minmax(auto, 125px) 1fr 1fr minmax(auto, 125px);
  min-width: 900px;
  width: 100%;
  margin-top: 22px;
  > div {
    color: ${({ theme }) => theme.text9};
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
  }
`

export const ViewBtn = styled.a`
  color: white;
`
