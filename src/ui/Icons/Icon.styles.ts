import styled from '@emotion/styled'

export const StyledSVG = styled.svg<{ hoverColor: string }>`
  &:hover {
    fill: ${(props: any) => props.hoverColor};
  }
`
