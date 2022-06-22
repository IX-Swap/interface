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
`

export const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 32px 32px 0px 0px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  ${({ active }) =>
    active
      ? css`
          background: ${({ theme }) => theme.bgG3};
        `
      : css`
          position: relative;
          ${gradientBorder}
          ::before {
            border-radius: 32px 32px 0px 0px;
            padding: 1px;
          }
        `}
`

export const Body = styled.div`
  position: relative;
  padding: 32px;
  ${gradientBorder}
  ::before {
    border-radius: 0px 32px 32px 32px;
    padding: 1px;
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
  }
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
    row-gap: 12px;
    grid-template-columns: minmax(0px, 1fr);
  }
`

export const CardContainer = styled.div`
  border-radius: 30px;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg22};
  cursor: pointer;
`

export const PayoutTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 16px;
  > div {
    font-weight: 600;
    font-size: 22px;
    line-height: 33px;
    ${ellipsisText}
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
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
  }
`

export const PayoutLabel = styled.div`
  color: ${({ theme }) => theme.text2};
  opacity: 0.5;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 2px;
`

export const PayoutValue = styled.div`
  font-weight: 600;
  font-size: 14px;
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
    grid-template-columns: minmax(0px, 1fr);
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
  }
`
