import React from 'react'
import styled, { useTheme } from 'styled-components'

import { useDropzone } from 'react-dropzone'
import { FormikErrors, FieldArray } from 'formik'
import { Image, Plus, Trash } from 'react-feather'

import { ReactComponent as TrashIcon } from 'assets/launchpad/svg/trash-icon.svg'

import { useGetFieldArrayId } from 'state/launchpad/hooks'
import { Column } from 'components/LaunchpadMisc/styled'

import { InformationFormValues, VideoLink } from '../types'

import { AddButton, DeleteButton } from '../../shared/styled'
import { FormField } from '../../shared/fields/FormField'
import { FormGrid } from '../../shared/FormGrid'
import { IssuanceFile } from '../../types'

interface Props {
  images: IssuanceFile[]
  videos: VideoLink[]
  errors: FormikErrors<InformationFormValues>
  setter: (field: string, value: any) => void
}

export const GalleryBlock: React.FC<Props> = (props) => {
  const theme = useTheme()

  const getId = useGetFieldArrayId()
  const container = React.useRef<HTMLDivElement>(null)

  const onFileSelect = React.useCallback((files: File[]) => {
    props.setter('images', props.images.concat(files.map(x => ({ file: x }))))

    container.current?.scrollTo({ left: container.current.scrollWidth, behavior: 'smooth' })
  }, [props.images, container])

  const removeImage = React.useCallback((idx: number) => {
    const images = [...props.images]

    console.log(images)

    images.splice(idx, 1)

    console.log(images)

    props.setter('images', images)
  }, [props.images])

  const urls = React.useMemo(() => props.images.map(x => URL.createObjectURL(x.file)), [props.images])
  const videos = React.useMemo(() => props.videos as (VideoLink & { id: number })[], [props.videos])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: onFileSelect
  })

  return (
    <FormGrid title="Gallery">
      <TitledContainer>
        <Title>Images</Title>
        <ImageFieldContainer ref={container}>
          {props.images.map((image, idx) => (
            <ImageFileCardContainer key={idx} url={urls[idx]}>
              <ImageRemoveButton onClick={() => removeImage(idx)}>
                <Trash size="15" color={theme.launchpad.colors.primary} />
              </ImageRemoveButton>
            </ImageFileCardContainer>
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
                <FormField 
                  key={video.id}
                  
                  label="Link Source"
                  placeholder='URL' 

                  field={`videos[${idx}].url`}
                  setter={props.setter}
                  error={(props.errors.videos?.[idx] as FormikErrors<VideoLink> | undefined )?.url}

                  trailing={(props.videos.length > 1 || idx > 0) && (
                    <RemoveButton onClick={handleRemove(idx)}>
                      <TrashIcon />
                    </RemoveButton>
                  )}
                />
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
  position: relative;

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

const ImageRemoveButton = styled.button`
  position: absolute;

  display: grid;

  place-content: center;

  width: 24px;
  height: 24px;

  right: 0.125rem;
  top: 0.125rem;

  background: none;
  border: none;
  outline: none;

  padding: 0;

  border-radius: 50%;
  cursor: pointer;

  transition: background 0.3s;

  :hover {
    background: ${props => props.theme.launchpad.colors.text.title + '20'};
  }
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

const RemoveButton = styled(DeleteButton)`
  position: absolute;

  right: 1rem;
`