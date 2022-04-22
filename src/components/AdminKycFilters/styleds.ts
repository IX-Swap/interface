import { Flex } from 'rebass'
import styled from 'styled-components'

export const SelectFiltersContainer = styled(Flex)`
  > div {
    border-radius: 0;
    max-width: 132px;
    width: 132px;
    height: 60px;
  }

  > :not(:last-child) {
    margin-right: 1px;
  }

  > div *[class*='IndicatorsContainer'] {
    display: none;
  }

  > div *[class*='menu'] {
    width: 200px;
  }

  > div *[class*='placeholder'] {
    font-size: 16px;
    font-weight: 300;
    line-height: 20px;
    color: ${({ theme }) => theme.text2};
    text-align: center;
  }

  > div *[class*='singleValue'] {
    font-size: 16px;
    font-weight: 300;
    line-height: 20px;
    color: ${({ theme }) => theme.text2};
    text-align: center;
  }

  > div *[class*='control'] {
    padding: 0px;
  }
`
