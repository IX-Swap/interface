import styled from 'styled-components'

export const Card = styled.div`
  width: 350px; // 350 + 50
  height: 500px; // 307 + 50
  position: relative;
  background: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
    transform: scale(1.1, 1.1);
  }
  img {
    width: 100%;
    height: 70%;
    position: absolute;
    top: 0;
    object-fit: cover;
  }
`
