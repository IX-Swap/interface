import styled from 'styled-components'
import maintenanceBackground from 'assets/images/maintenance-background.png'

export const Wrapper = styled.div`
  background-image: ${`url("${maintenanceBackground}")`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  > div {
    width: 318px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const StyledGradientText = styled.div`
  background: ${({ theme }) => theme.borderG4};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 5px;
`
