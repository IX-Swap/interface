import styled from 'styled-components'

export const Separator = styled.hr<{ marginTop?: string; marginBottom?: string; color?: string }>`
  border: 1px solid ${(props) => props.color ?? props.theme.launchpad.colors.border.default};
  opacity: 0.8;

  margin: 0;

  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}`};
`

export const Spacer = styled.div`
  flex-grow: 1;
`

type FlexJustifyContent = 'space-between' | 'space-around' | 'spaced-evenly' | 'flex-start' | 'flex-end' | 'center'

type FlexAlignItems = 'flex-start' | 'flex-end' | 'stretch' | 'center'

type FlexWrap = 'wrap' | 'nowrap'

interface FlexProps {
  padding?: string
  margin?: string

  justifyContent?: FlexJustifyContent
  alignItems?: FlexAlignItems
  wrap?: FlexWrap

  height?: string
  width?: string

  gap?: string
}

export const Flex = styled.div<FlexProps>`
  display: flex;

  flex-wrap: ${(props) => props.wrap ?? 'nowrap'};

  ${(props) => props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}

  ${(props) => props.gap && `gap: ${props.gap};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.padding && `padding: ${props.padding};`}
  
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
`

export const Row = styled(Flex)`
  flex-direction: row;
`

export const Column = styled(Flex)`
  flex-direction: column;
`

export const Centered = styled.div<{ width?: string; height?: string }>`
  display: grid;
  place-content: center;

  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.height && `height: ${props.height};`}
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

  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.height && `height: ${props.height};`}
`

export const LoaderContainer = styled(CenteredFixed)`
  backdrop-filter: blur(20px);

  ${(props) => `width: ${props.width ?? '100vw'};`}
  ${(props) => `height: ${props.height ?? '100vh'};`}
`

export const IconButton = styled.button`
  display: grid;
  place-content: center;

  border: none;
  background: none;

  border-radius: 6px;

  cursor: pointer;

  transition: background 0.3s;

  padding: 0.25rem;

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`

export const FormFieldContainer = styled(Column)`
  gap: 0.125rem;
`

export const ErrorText = styled.div<{ padding?: string }>`
  color: #ff6060;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;

  ${(props) => props.padding ?? `paddding: ${props.padding};`}
`

export const FlexVerticalCenter = styled.div`
  display: flex;
  align-items: center;
`
