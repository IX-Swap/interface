import React, { useRef } from 'react'
import MUIRichTextEditor from 'mui-rte'
import { TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor'
import { convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { ControllerRenderProps } from './types'
import draftToHtml from 'draftjs-to-html'
import { Box } from '@material-ui/core'

export const wysiwygToHtml = (draft: string): string => {
  return draftToHtml(JSON.parse(draft))
}

export interface RichTextEditorProps extends ControllerRenderProps {}

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
