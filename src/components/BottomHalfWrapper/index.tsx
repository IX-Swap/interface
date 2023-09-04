import styled from 'styled-components'

export const BackgroundWrapper = styled.div`
  background: #F7F7FA;
  border-radius: 10px;
  backdrop-filter: blur(4px);
  padding: 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #E6E6FF;
  margin-top: 20px;
}
`

export const TopStraightBackgroundWrapper = styled(BackgroundWrapper)`
  margin-top: 0px;
  border-radius: 10px;
`
