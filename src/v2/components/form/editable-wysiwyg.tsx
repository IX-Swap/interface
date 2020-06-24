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
  console.log(props)
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

const EditableWysiwyg = ({ editMode = false, name, value }: EditableWysiwygProps) => {
  const { control } = useFormContext()

  const editor = <Editor label='Start typing...' inlineToolbar />

  if (!editMode) {
    return <span dangerouslySetInnerHTML={{ __html: value }} />
  }

  return (
    <Controller
      as={editor}
      name={name}
      control={control}
    />
  )
}

export default EditableWysiwyg
