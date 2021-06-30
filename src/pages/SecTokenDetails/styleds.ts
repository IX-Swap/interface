import { ButtonEmpty } from 'components/Button'
import { RowStart } from 'components/Row'
import { Box } from 'rebass'
import styled from 'styled-components'
import { TYPE } from 'theme'

export const Container = styled(Box)`
  border: 1px solid white;
  height: fit-content;
`
export const InfoTitle = styled(RowStart)`
  gap: 21px;
  margin-bottom: 41px;
`

export const TitleText = styled.span`
  font-weight: 600;
  font-size: 36px;
  line-height: 56px;
  color: ${({ theme }) => theme.text1};
`
export const Description = styled.span``

export const ReadMoreButton = styled(ButtonEmpty)`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.text1};
  :hover {
    text-decoration: underline;
  }
`
export const DescriptionText = styled(TYPE.descriptionThin)`
  display: inline;
  color: ${({ theme }) => theme.text2};
`
