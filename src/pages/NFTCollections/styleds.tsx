import { Box } from 'rebass'
import styled from 'styled-components'

import { ellipsisText, gradientBorder, MEDIA_WIDTHS } from 'theme'
import { ImageLoader } from 'components/ImageLoader'

export const CollectionsGrid = styled.div`
  display: grid;
  grid-gap: 28px;
  padding: 32px 42px;
  grid-template-columns: ${`repeat(4, calc((100% - ${28 * 3}px) / 4))`};
  position: relative;
  ${gradientBorder};
  @media (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    grid-template-columns: ${`repeat(3, calc((100% - ${28 * 2}px) / 3))`};
  }
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    grid-template-columns: ${`repeat(2, calc((100% - 28px) / 2))`};
    padding: 16px 21px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 100%;
  }
`

export const CollectionCard = styled.div`
  position: relative;
  width: 100%;
  max-height: 468px;
  border-radius: 18px;
  background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.68);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);

  transition: transform 0.3s;
  .more-actions {
    display: none;
  }
  :hover {
    ${gradientBorder}
    ::before {
      border-radius: 18px;
      z-index: 1;
    }
    .more-actions {
      display: block;
    }
  }
`

export const CollectionImageWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
`

export const CollectionImage = styled(ImageLoader)`
  border-radius: 18px 18px 0px 0px;
  > img {
    border-radius: 18px 18px 0px 0px;
    width: 100%;
    height: 100%;
  }
`

export const CollectionLogo = styled(ImageLoader)`
  width: 60px;
  height: 60px;
  position: absolute;
  left: 50%;
  bottom: -25px;
  transform: translateX(-50%);
  border-radius: 50%;
  object-fit: cover;
  outline: 2px solid #fff;
  z-index: 2;
  > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`
export const ActiveSortItemBottom = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.borderG1};
  width: calc(100% - 0.75rem);
`

export const SortText = styled.button`
  ${({ active }: { active: boolean }) => `
  cursor: pointer;
  font-weight: ${active ? 600 : 300};
  margin-right: 0.75rem !important;
  border: none;
  background-color: transparent;
  font-size: 16px;
  line-height: 24px;
  padding: 0px 8px;
  color: ${active ? '#FFFFFF' : '#EDCEFF'};
  margin-top: ${active ? '4px' : '0px'};
  outline: none;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
  `}
`

export const Divider = styled(Box)`
  height: 1px;
  background-color: ${({ theme }) => theme.divider};
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  row-gap: 32px;
  a {
    min-height: 40px;
    height: 40px;
    font-weight: 600;
    font-size: 16px;
    :hover {
      text-decoration: none;
    }
  }
`

export const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  text-align: center;
  color: ${({ theme }) => theme.text9};
  font-weight: 500;
  font-size: 12px;
  > div {
    ${ellipsisText};
  }
  > div:first-child {
    font-weight: 600;
    font-size: 18px;
    color: white;
  }
  padding: 42px 12px 18px;
`
export const MoreActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 25px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  border-radius: 8px;
  background: ${({ theme }) => theme.bgG1};
  box-shadow: 2px 2px 4px rgba(90, 84, 111, 0.25);
  svg {
    transform: rotate(90deg);
    path {
      stroke: white;
    }
  }
`
