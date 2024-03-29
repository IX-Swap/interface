import { Flex } from 'rebass'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'

export const SelectFiltersContainer = styled(Flex)`
  > div {
    border-radius: 0;
    max-width: 132px;
    width: 132px;
    height: 60px;
    margin-top: -22px;

    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      max-width: 100%;
      width: 100%;
      margin-top: 0px;
    }
  }

  > :not(:last-child) {
    margin-right: 30px;
  }

  > div *[class*='IndicatorsContainer'] {
    display: none;
  }

  > div *[class*='indicatorContainer'] {
    display: none;
  }

  > div *[class*='menu'] {
    width: 200px;
  }

  > div *[class*='placeholder'] {
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    color: #8f8fb2;
    text-align: center;
  }

  > div *[class*='singleValue'] {
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    color: #8f8fb2;
    text-align: center;
  }

  > div *[class*='control'] {
    padding: 0px;
  }
`
