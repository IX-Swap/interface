import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';

export default function RichEditor({
  value,
  save,
}: {
  value: string,
  save: Function,
}) {
  const contentHTML = convertFromHTML(value || '');
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  );
  const content = JSON.stringify(convertToRaw(state));

  return (
    <MUIRichTextEditor defaultValue={content} onSave={save} inlineToolbar />
  );
}
