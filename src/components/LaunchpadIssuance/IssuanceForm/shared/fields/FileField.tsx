import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Paperclip } from 'react-feather'
import { Column, ErrorText, Spacer } from 'components/LaunchpadMisc/styled'
import { FormFieldWrapper, OptionalLabel } from '../styled'
import { useDropzone } from 'react-dropzone'

interface Props {
  label: string
  hint?: React.ReactNode

  span?: number
  error?: string

  optional?: boolean
  disabled?: boolean

  field: string
  setter: (field: string, value: any) => void
}

export const FileField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const input = React.useRef<HTMLInputElement>(null)

  const openFileBrowser = React.useCallback(() => {
    input.current?.click()
  }, [input.current])

  const onFileSelect = React.useCallback((files: File[]) => {
    props.setter(props.field, files[0])
  }, [])
  
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onFileSelect, multiple: false })


  return (
    <FormFieldWrapper gap="1rem" span={props.span}>
      <Column gap="0.25rem">
        <FieldLabel>
          {props.label}
          {props.optional && <OptionalLabel>optional</OptionalLabel>}
        </FieldLabel>


        {props.hint && <FieldHint>{props.hint}</FieldHint>}
      </Column>

      <FieldWrapper {...getRootProps()} onClick={openFileBrowser}>
        <Paperclip color={theme.launchpad.colors.text.bodyAlt} size="15" />
        <Prompt>Upload File</Prompt>

        <input 
          {...getInputProps()}
          ref={input}
          multiple={false} 
          disabled={props.disabled} 
        />

        <Spacer />

        <BrowseButton>Browse</BrowseButton>
      </FieldWrapper>

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FormFieldWrapper>
  )
}

const FieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
const FieldHint = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldWrapper = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;
  padding: 1.5rem 2rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const Prompt = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`
const BrowseButton = styled.button`
  border: none;
  background: none;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.primary};
`