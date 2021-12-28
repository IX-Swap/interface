import { Box } from 'rebass'
import styled from 'styled-components'

export const CollectionsGrid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`

export const CollectionCard = styled.div`
  width: 100%;
  max-height: 468px;
  border-radius: 30px;
  background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.5);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
`

export const CollectionImageWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  margin-bottom: 48px;
`

export const CollectionImage = styled.img`
  object-fit: contain;
  border-radius: 30px 30px 0px 0px;
`

export const CollectionLogo = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  left: 50%;
  bottom: -25px;
  transform: translateX(-50%);
  border-radius: 50%;
  object-fit: cover;
  outline: 4px solid #fff;
  z-index: 2;
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
