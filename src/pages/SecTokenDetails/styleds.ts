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
export const DescriptionTitle = styled(TYPE.titleSmall)`
  text-transform: uppercase;
`
export const Description = styled.span``
export const Details = styled.div`
  margin-top: 26px;
  margin-bottom: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
`
export const GridElement = styled.div`
  width: 260px;
`
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
export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
