import styled from "styled-components";

export const Separator = styled.hr`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  opacity: 0.8;

  margin: 0;
`

export const Spacer = styled.div`
  flex-grow: 1;
`

type FlexJustifyContent = 'space-between' 
  | 'space-around'
  | 'spaced-evenly'
  | 'flex-start'
  | 'flex-end'
  | 'center'

interface FlexProps {
  padding?: string
  margin?: string

  justifyContent?: FlexJustifyContent
}

export const Flex = styled.div`
  display: flex;
`

export const Centered = styled.div<{ width?: string, height?: string }>`
  display: grid;
  place-content: center;

  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
`

export const CenteredAbsolute = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`

export const CenteredFixed = styled(Centered)`
  position: fixed;

  top: 0;
  left: 0;

  z-index: 10;
  
  ${props => props.width && `width: ${props.width};`}
  ${props => props.height && `height: ${props.height};`}
`