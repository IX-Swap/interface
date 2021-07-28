import styled from 'styled-components'

export const BackgroundWrapper = styled.div`
  background: ${({ theme }) => theme.bgG7};
  border-radius: 34px;
  backdrop-filter: blur(4px);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
}
`

export const TopStraightBackgroundWrapper = styled(BackgroundWrapper)`
  border-radius: 24px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`
