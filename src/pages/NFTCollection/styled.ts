import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ellipsisText, gradientBorder, MEDIA_WIDTHS } from 'theme'

export const NftCollectionWrapper = styled.div`
  position: relative;
  width: 100%;
`
export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
  > button {
    height: 40px;
    font-weight: 600;
    font-size: 16px;
  }
`

export const NftCollectionInfo = styled.div`
  margin-top: 64px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 730px) {
    margin-top: 5rem;
  }
`

export const NftCollectionItems = styled.div`
  margin-top: 18px;
  position: relative;
  ${gradientBorder}
  display: grid;
  padding: 32px 42px;
  gap: 28px;
  grid-template-columns: ${`repeat(4, calc((100% - ${28 * 3}px) / 4))`};
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

export const NftPreviewLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  :visited {
    text-decoration: none;
    color: inherit;
  }
`

export const NoNftContainer = styled.div`
  text-align: center;

  padding: 2.5rem;

  width: 100%;
`

export const ImagesContainer = styled.div`
  position: relative;
`

export const CoverImage = styled.img`
  border-radius: 0px 0px 32px 32px;
  height: 200px;
  width: 100%;
  object-fit: cover;
`

export const CollectionLogo = styled.div`
  width: 120px;
  height: 120px;
  position: absolute;
  left: 50%;
  bottom: -60px;
  transform: translateX(-50%);
  border-radius: 50%;
  object-fit: cover;
  ${gradientBorder}
  :before {
    border-radius: 50%;
  }
  img {
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

export const Title = styled.div`
  ${ellipsisText}
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 18px;
  max-width: 600px;
`

export const Description = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 18px;
  max-width: 600px;
`

export const NFTsContainer = styled.div`
  position: relative;
  padding: 32px 42px;
  border-radius: 32px;
  margin: 18px 0px;
  :before {
    border-radius: 32px;
  }
`
