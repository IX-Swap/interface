import React from 'react'
import styled, { useTheme } from 'styled-components'

import { useDropzone } from 'react-dropzone'
import { Image, Plus } from 'react-feather'

import { FieldArray } from 'formik'


import { Column } from 'components/LaunchpadMisc/styled'

import { VideoLink } from './types'

import { FormField } from '../shared/fields/FormField'
import { AddButton, DeleteButton } from '../shared/styled'
import { FormGrid } from '../shared/FormGrid'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { useGetFieldArrayId } from 'state/launchpad/hooks'


interface Props {
  images: File[]
  videos: VideoLink[]
  setter: (field: string, value: any) => void
}
export const GalleryBlock: React.FC<Props> = (props) => {
  const theme = useTheme()

  const getId = useGetFieldArrayId()

  const onFileSelect = React.useCallback((files: File[]) => {
    console.log(files)
    props.setter('images', props.images.concat(files))
  }, [props.images])

  const urls = React.useMemo(() => props.images.map(x => URL.createObjectURL(x)), [props.images])
  const videos = React.useMemo(() => props.videos as (VideoLink & { id: number })[], [props.videos])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: onFileSelect
  })

  return (
    <FormGrid title="Gallery">
      <TitledContainer>
        <Title>Images</Title>
        <ImageFieldContainer>
          {props.images.map((image, idx) => (
            <ImageFileCardContainer key={idx} url={urls[idx]} />
          ))}


          <ImageFieldPromptContainer {...getRootProps()}>
            <input {...getInputProps()} />

            <Image color={theme.launchpad.colors.text.bodyAlt} />

            <header>
              Add More Images
            </header>

            <main>
              Drag images here or click to browse
            </main>
          </ImageFieldPromptContainer>
        </ImageFieldContainer>
      </TitledContainer>
      
      <TitledContainer>
        <Title>Videos</Title>
        
        <FieldArray name="videos">
          {({ push, handleRemove }) => (
            <>
              {videos.map((video, idx) => (
                <VideoLinkContainer key={video.id}>
                  <FormField 
                    field={`videos[${idx}].title`}
                    setter={props.setter}
                    label="Video Title"
                    placeholder='Title'
                    borderless
                  />

                  <VideoLinkSeparator />

                  <FormField 
                    field={`videos[${idx}].url`}
                    setter={props.setter}
                    label="Link Source"
                    placeholder='URL' 
                    borderless
                    trailing={(props.videos.length > 1 || idx > 0) && (
                      <DeleteButton onClick={handleRemove(idx)}>
                        <Trash />
                      </DeleteButton>
                    )}
                  />
                </VideoLinkContainer>
              ))}

              <AddButton onClick={() => push({ id: getId() })}>
                <Plus /> Add Video 
              </AddButton>
            </>

          )}

        </FieldArray>
      </TitledContainer>
    </FormGrid>
  )
}

const TitledContainer = styled(Column)`
  grid-column: span 2;

  gap: 1rem;
`

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
  overflow-y: hide;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const ImageFileCardContainer = styled.div<{ url?: string }>`
  width: 160px;
  height: 160px;

  flex-basis: 160px;
  flex-shrink: 0;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  ${props => props.url && `
    background: url(${props.url});
    background-repeat: no-repeat;
    background-size: cover;
  `}

  content: contain;
`

const ImageFieldPromptContainer = styled(ImageFileCardContainer)`
  display: flex;
  flex-flow: column nowrap;

  jsutify-content: center;
  align-items: center;

  gap: 0.25rem;
  padding: 2rem 0;

  cursor: pointer;

  transition: background 0.3s;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }

  header, main {
    max-width: 80%;
  }

  header {
    font-style: normal;
    font-weight: 500;
    font-size: 11px;

    line-height: 15px;
    letter-spacing: -0.01em;
    
    text-align: center;
    
    color: ${props => props.theme.launchpad.colors.text.title};
  }

  main {
    font-style: normal;
    font-weight: 500;
    font-size: 11px;

    line-height: 15px;
    letter-spacing: -0.02em;
    
    text-align: center;

    color: ${props => props.theme.launchpad.colors.text.bodyAlt};
  }
`

const VideoLinkContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;

  gap: 0;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  > * {
    flex-grow: 1;
  }
`

const VideoLinkSeparator = styled.div`
  border-left: 1px solid ${props => props.theme.launchpad.colors.border.default};
  width: 1px;
  height: 100%;

  flex-grow: 0;
`