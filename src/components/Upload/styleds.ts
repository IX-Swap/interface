import styled from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { ReactComponent as LogoDark } from '../../assets/svg/logo-white.svg'

export const PreviewParent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px dashed white;
  video,
  img,
  audio {
    align-self: center;
    justify-self: left;
  }
  video,
  img {
    width: 90%;
    height: 90%;
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
export const ImageContainer = styled.div`
  width: 350px;
  height: 257px;
  position: relative;
`
export const StyledClose = styled(Close)`
  position: relative;
  align-self: flex-start;
  justify-self: right;
  width: 25px;
  height: 25px;
  top: -18px;
  right: -15px;
`
export const StyledLogo = styled(LogoDark)`
  width: 100%;
  height: 100%;
  opacity: 0.4;
`
