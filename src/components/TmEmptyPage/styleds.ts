import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 72px;
  > img {
    max-width: 240px;
    width: 100%;
    height: auto;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin-top: 32px;
    > img {
      max-width: 128px;
    }
  }
`
export const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  margin: 60px 0px 40px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin: 32px 0px 18px;
  }
`

export const NothingFound = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  margin-top: 60px;
  align-items: center;
  font-weight: 600;
  line-height: 24px;
  > div:first-child {
    font-size: 24px;
    color: white;
  }
  > div:last-child {
    font-size: 18px;
    color: ${({ theme }) => theme.text9};
  }
`
