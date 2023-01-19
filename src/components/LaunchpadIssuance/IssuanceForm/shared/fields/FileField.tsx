import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Paperclip } from 'react-feather'

import { ReactComponent as CancelIcon } from 'assets/launchpad/svg/cancel-vector.svg'
import { Column, ErrorText, Row, Spacer } from 'components/LaunchpadMisc/styled'
import { FormFieldWrapper, OptionalLabel } from '../styled'
import { useDropzone } from 'react-dropzone'
import { IssuanceFile } from '../../types'

interface Props {
  label?: React.ReactNode
  hint?: React.ReactNode
  trailing?: React.ReactNode

  span?: number
  value?: IssuanceFile
  error?: string

  optional?: boolean
  disabled?: boolean
  borderless?: boolean
  showLabelInside?: boolean

  icon?: React.ReactNode

  field: string
  setter: (field: string, value: any) => void
}

export const FileField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const input = React.useRef<HTMLInputElement>(null)

  const [value, setValue] = React.useState<File | undefined>(props.value?.file)

  const openFileBrowser = React.useCallback(() => {
    input.current?.click()
  }, [input.current])

  const onFileSelect = React.useCallback((files: File[]) => {
    props.setter(props.field, { file: files[0] })
    setValue(files[0])
  }, [])

  const onFileRemove = React.useCallback(() => {
    props.setter(props.field, props.value?.id ? null : undefined)
    setValue(undefined)
  }, [])
  
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onFileSelect, multiple: false })


  return (
    <FormFieldWrapper gap="1rem" span={props.span} error={props.error}>
      <Column gap="0.25rem">
        <FieldLabel>
          {props.label}
          {props.optional && <OptionalLabel>optional</OptionalLabel>}
        </FieldLabel>

        {props.hint && <FieldHint>{props.hint}</FieldHint>}
      </Column>

      <FieldWrapper borderless={props.borderless}>
        <Row gap="0.5rem" {...getRootProps()}>
          {props.icon ?? <Paperclip color={theme.launchpad.colors.text.bodyAlt} size="15" />}

          {!value && <Prompt>{props.showLabelInside ? props.label : 'Upload File'}</Prompt>}
          {value && <Prompt>{value.name}</Prompt>}
          

          <input 
            {...getInputProps()}
            ref={input}
            multiple={false} 
            disabled={props.disabled} 
          />

          {value && <CancelIcon onClick={onFileRemove} title="remove" cursor="pointer" />}

          <Spacer />

          <BrowseButton onClick={openFileBrowser}>Browse</BrowseButton>
        </Row>

        {props.trailing}
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

const FieldWrapper = styled.div<{ borderless?: boolean }>`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;
  padding: 1.5rem 2rem;

  ${props => !props.borderless && `border: 1px solid ${props.theme.launchpad.colors.border.default};`}
  border-radius: 6px;

  > *:first-child {
    flex-grow: 1;
  }
`

const Prompt = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`
const BrowseButton = styled.button`
  border: none;
  background: none;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.primary};
`