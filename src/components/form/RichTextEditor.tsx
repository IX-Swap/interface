import React, { memo, useRef } from 'react'
import MUIRichTextEditor from 'mui-rte'
import { convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { TypedFieldRenderComponentProps } from './types'
import { Box } from '@mui/material'

export interface RichTextEditorProps extends TypedFieldRenderComponentProps {}

export const RichTextEditor = memo(
  (props: RichTextEditorProps) => {
    const { onChange, value = '' } = props
    const ref = useRef<any>(null)
    const contentHTML = convertFromHTML(value)

    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    )
    const content = JSON.stringify(convertToRaw(state))

    return (
      <Box pb={4}>
        <MUIRichTextEditor
          ref={ref}
          label='Start typing...'
          defaultValue={content}
          inlineToolbar
          onChange={data => {
            onChange(
              JSON.stringify(convertToRaw(data.getCurrentContent() as any))
            )
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
