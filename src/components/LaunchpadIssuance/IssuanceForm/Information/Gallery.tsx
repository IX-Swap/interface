import { Column } from 'components/LaunchpadMisc/styled'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { OfferFile } from 'state/launchpad/types'
import styled from 'styled-components'
import { FormGrid } from '../shared/FormGrid'

interface Props {
  files: OfferFile[]
  setter: (field: string, value: any) => void
}

export const GalleryBlock: React.FC<Props> = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['jpeg', 'png'],
    multiple: true,
    onDrop: (files: File[]) => {
      // props.setter('files', props.files.concat(files))
    }
  })

  return (
    <FormGrid title="Gallery">

      <Column>
        <Title>Images</Title>
        <ImageFieldContainer>

        </ImageFieldContainer>
      </Column>
      
      <Column>
        <Title>Videos</Title>

      </Column>
    </FormGrid>
  )
}

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 130%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const ImageFieldContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  justify-content: flex-start;
  align-items: stretch;

  gap: 0.75rem;
  padding: 0.75rem;

  overflow-x: auto;

  max-width: 100%;
  height: 180px;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const ImageFileCardContainer = styled.div`
  width: 160px;
  height: 160px;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const ImageFieldPromptContainer = styled(ImageFileCardContainer)`
  display: flex;
  flex-flow: column nowrap;

  jsutify-content: center;
  align-items: center;

  gap: 0.5rem;
`
