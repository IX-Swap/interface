import React from 'react'
import MUIRichTextEditor from 'mui-rte'
import { useFormContext, Controller } from 'react-hook-form'
import { convertToRaw } from 'draft-js'

interface EditableWysiwygProps {
  editMode?: boolean
  name: string
  value: string
}

const Editor = (props: any) => {
  return (
    <MUIRichTextEditor
      {...props}
      label='Start typing...'
      inlineToolbar
      onChange={(data) => {
        props.onChange(JSON.stringify(convertToRaw(data.getCurrentContent())))
      }}
    />
  )
}

const StateAwareEditor = ({ name, control }: any) => {
  return (
    <Controller
      as={<Editor label='Start typing...' inlineToolbar />}
      name={name}
      control={control}
    />
  )
}

const EditableWysiwyg = ({ editMode = false, name, value }: EditableWysiwygProps) => {
  const { control, formState } = useFormContext()

  if (!editMode) {
    return <span dangerouslySetInnerHTML={{ __html: value }} />
  }

  return (
    <StateAwareEditor
      formState={formState}
      control={control}
      name={name}
    />
  )
}

export default EditableWysiwyg
