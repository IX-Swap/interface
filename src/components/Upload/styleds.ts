import styled from 'styled-components'

import { ReactComponent as Close } from '../../assets/images/delete-basket.svg'
import { ReactComponent as LogoDark } from '../../assets/svg/logo-white.svg'

export const PreviewParent = styled.div<{ isLogo: boolean; width: string; height: string }>`
  cursor: pointer;
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 20px;
  border: 1px dashed white;
  border-radius: ${({ isLogo }) => (isLogo ? '50%' : '0px')};
  video,
  img,
  audio {
    align-self: center;
    justify-self: left;
  }
  video,
  img {
    width: ${({ isLogo }) => (isLogo ? '300px' : '90%')};
    height: ${({ isLogo }) => (isLogo ? '300px' : '90%')};
    border-radius: ${({ isLogo }) => (isLogo ? '50%' : '0px')};
    object-fit: scale-down;
  }
`
export const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  position: relative;
`

export const ImageOverlay = styled.div`
  position: absolute;
  z-index: 70;
  opacity: 1;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
`
export const ImageContainer = styled.div<{ isBanner: boolean }>`
  width: ${({ isBanner }) => (isBanner ? '100%' : '350px')};
  height: 257px;
  position: relative;
`
export const StyledClose = styled(Close)`
  position: relative;
  align-self: flex-start;
  justify-self: right;
  min-width: 25px;
  min-height: 25px;
  top: -18px;
  right: -15px;
`
export const StyledLogo = styled(LogoDark)`
  width: 100%;
  height: 100%;
  opacity: 0.4;
`
