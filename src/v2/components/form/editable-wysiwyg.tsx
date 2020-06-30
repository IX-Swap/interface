import React, { useRef } from 'react'
import MUIRichTextEditor from 'mui-rte'
import { useFormContext, Controller } from 'react-hook-form'
import { TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor'

interface EditableWysiwygProps {
  editMode?: boolean
  name: string
  value: string
}

const Editor = (props: any) => {
  const ref = useRef<TMUIRichTextEditorRef>(null)
  return (
    <MUIRichTextEditor
      {...props}
      ref={ref}
      label='Start typing...'
      inlineToolbar
      onBlur={() => {
        if (ref.current) {
          ref.current.save()
        }
      }}
      onChange={() => {
        // props.onChange(JSON.stringify(convertToRaw(data.getCurrentContent())))
      }}
      onSave={(data: string) => {
        props.onChange(data)
      }}
    />
  )
}

const EditableWysiwyg = ({ editMode = false, name, value }: EditableWysiwygProps) => {
  const { control } = useFormContext()

  if (!editMode) {
    return <span dangerouslySetInnerHTML={{ __html: value }} />
  }

  return (
    <Controller
      as={<Editor label='Start typing...' inlineToolbar />}
      name={name}
      control={control}
    />
  )
}

export default EditableWysiwyg
