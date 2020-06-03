import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

function RichEditor(
  { value, save }: { value: string, save: Function },
  ref: any
) {
  console.log('value of rte', value);
  const contentHTML = convertFromHTML(value || '<p>&nbsp some value</p>');
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  );
  const content = JSON.stringify(convertToRaw(state));

  const onSave = (data) => save(draftToHtml(JSON.parse(data)));

  return (
    <MUIRichTextEditor
      ref={ref}
      defaultValue={content}
      label="Start typing..."
      onSave={onSave}
      inlineToolbar
    />
  );
}

export default React.forwardRef(RichEditor);
