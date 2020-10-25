import React, { useRef } from 'react'
import MUIRichTextEditor from 'mui-rte'
import { TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor'
import { convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { TypedFieldRenderComponentProps } from './types'
import { Box } from '@material-ui/core'

export interface RichTextEditorProps extends TypedFieldRenderComponentProps {}

export const RichTextEditor = React.memo(
  (props: RichTextEditorProps) => {
    const { onChange, value = '' } = props
    const ref = useRef<TMUIRichTextEditorRef>(null)
    const contentHTML = convertFromHTML(value)
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    )
    const content = JSON.stringify(convertToRaw(state))

    return (
      <Box>
        <MUIRichTextEditor
          ref={ref}
          label='Start typing...'
          defaultValue={content}
          inlineToolbar
          onChange={data => {
            onChange(JSON.stringify(convertToRaw(data.getCurrentContent())))
          }}
          onSave={data => {
            onChange(data)
          }}
          onBlur={() => {
            if (ref.current !== null) {
              ref.current.save()
            }
          }}
        />
      </Box>
    )
  },
  () => true
)
