import React from 'react'
import styled from 'styled-components'

import { ReactComponent as ImageIcon } from 'assets/launchpad/svg/image-icon.svg'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { useDropzone } from 'react-dropzone'

interface Props {
  label: string
  placeholder?: string

  image?: File

  error?: string

  field: string
  setter: (field: string, value: any) => void
}

export const ImageField: React.FC<Props> = (props) => {
  const onFileSelect = React.useCallback((files: File[]) => {
    if (files.length === 1) {
      props.setter(props.field, files[0])
    }
  }, [props.image])
  
  const input = React.useRef<HTMLInputElement>(null)

  const openFileBrowser = React.useCallback(() => {
    input.current?.click()
  }, [input.current])

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onFileSelect, multiple: false })

  
  const url = React.useMemo(() => props.image && URL.createObjectURL(props.image), [props.image])
  
  return (
    <Column gap="0.5rem">
      <FieldContainer onClick={openFileBrowser} {...getRootProps()}>
        <input ref={input} {...getInputProps()} />

        {!props.image && (
          <>
            <FieldIcon><ImageIcon /></FieldIcon>
            <FieldLabel>{props.label}</FieldLabel>

            <FieldPlaceholder>{props.placeholder ?? 'PNG, JPG, and SVG files only.'}</FieldPlaceholder>

            <BrowseButton>
              Browse
            </BrowseButton>
          </>
        )}

        {props.image && <ImageFileCardContainer url={url} />}
      </FieldContainer>

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  gap: 0.25rem;
  padding: 0.25rem;

  height: 100%;

  flex-grow: 1;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  cursor: pointer;
`

const FieldIcon = styled.div`
  margin-bottom: 2rem;
`

const FieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.01em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const FieldPlaceholder = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const BrowseButton = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 18px;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.primary};

  cursor: pointer;

  padding: 0.5rem;

  border: none;
  border-radius: 6px;
  
  background: none;
  transition: background 0.3s;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`
const ImageFileCardContainer = styled.div<{ url?: string }>`
  height: 100%;
  width: 100%;

  border-radius: 6px;

  ${props => props.url && `
    background: url(${props.url});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  `}
`
