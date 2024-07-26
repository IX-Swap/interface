import { background } from 'styled-system'
import styled, { css } from 'styled-components'
import { ellipsisText, gradientBorder, MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.bg24};
  margin: 0 -40px 0 -40px;
  padding: 0 40px 0 40px;
`

export const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  height: 80px;
  display: flex;
  align-items: center;
  ${({ active }) =>
    active
      ? css`
          border-bottom: 2px solid;
          border-color: ${({ theme }) => theme.bg26};
        `
      : css`
          position: relative;
          color: ${({ theme }) => theme.text6};
        `}
  @media(max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: 13px;
    width: 50%;
    text-align: center;
  }
`

export const Body = styled.div`
  position: relative;
  padding: 32px;
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

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px;
  > img {
    max-width: 240px;
    width: 100%;
    height: auto;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 0px;
    > img {
      max-width: 128px;
    }
  }
`

export const EmptyText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  margin-top: 60px;
  text-align: center;
`

export const NothingFound = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  align-items: center;

  > div:last-child {
    font-weight: 600;
    line-height: 24px;
    font-size: 18px;
    color: ${({ theme }) => theme.text9};
  }
`

export const AllPayoutContainer = styled.div`
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
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    & > div {
      &:nth-child(2) {
        margin-left: 0;
      }
    }
  }
`

export const AllPayoutListLayout = styled.div`
  margin: 0 -80px 0 -80px;
  padding: 40px 80px;
  background: ${({ theme }) => theme.bg1};
`


export const AllPayoutListContainer = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  row-gap: 40px;
  column-gap: 12px;
  @media (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    row-gap: 24px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
    row-gap: 12px;
    column-gap: 8px;
  }
`

export const CardContainer = styled.div`
  border: 1px solid;
  border-color: ${({ theme }) => theme.bg24};
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  cursor: pointer;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    min-width: 152px;
    border-radius: 12px;
    padding: 12px 8px;
    min-width: 150px;
  }
`

export const PayoutTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  > div {
    font-weight: 600;
    font-size: 22px;
    line-height: 33px;
    ${ellipsisText}
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      font-size: 14px;
      line-height: 21px;
      white-space: pre-wrap;
      overflow: auto;
      text-overflow: none;
    }
  }
  > img,
  svg {
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
    }
  }
`

export const PayoutTokenContainer = styled.div`
  position: relative;
  overflow: visible !important;
`

export const PayoutToken = styled.img`
  border-radius: 50%;
  background: ${({ theme }) => theme.bg24};
  text-indent: 1rem;
`

export const PayoutChain = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 26px;
  border: 2px solid #fff;
  text-indent: 1rem;
  background: ${({ theme }) => theme.bg24};
`

export const PaymentPeriod = styled.div`
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: none !important;
  }
`

export const PayoutInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    justify-self: flex-start;
    width: 100%;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
  }
`

export const PayoutLabel = styled.div`
  color: ${({ theme }) => theme.text11};
  font-weight: 500;
  font-size: 13px;
`

export const PayoutValue = styled.div`
  color: ${({ theme }) => theme.text5};
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
`

export const MyPayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
  row-gap: 24px;
`

export const MyPayoutListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

export const MyListTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 20px;
    line-height: 30px;
  }
`

export const MyListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  row-gap: 40px;
  column-gap: 12px;
  @media (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    row-gap: 24px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    row-gap: 12px;
    column-gap: 8px;
  }
`

export const Hr = styled.div`
  background-color: ${({ theme }) => theme.text9};
  height: 1px;
  width: 100%;
`

export const ViewMoreBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  > button {
    min-height: 32px;
    height: 32px;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      min-height: 40px;
      height: 40px;
      width: 100%;
      max-width: 312px;
    }
  }
`

export const MyEventsEmptyText = styled.div`
  color: ${({ theme }) => theme.text9};
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin: 20px 0px 56px;
`

export const PayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PayoutType = styled.div`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.bg24}`};
  border-radius: 4px;
  color: ${({ theme }) => theme.text5};
  font-weight: 500;
  font-size: 13px;
  padding: 0 12px;
`
