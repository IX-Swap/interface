import React from 'react'
import { Typography, ListItem, Button } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import { Document } from '../../../../../types/dso'

interface DSDataRoomProps {
  documents: Document[]
  editMode: boolean
  onClickDocument: (doc: Document, i: number) => void
  onRemoveDocument: (doc: Document, i: number) => void
}

const DSDataRoom = ({ editMode, documents, onClickDocument, onRemoveDocument }: DSDataRoomProps) => {
  const items = (documents || []).map((document, i) => (
    <ListItem
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
      key={i}
    >
      <Button
        key={document._id}
        onClick={() => onClickDocument(document, i)}
      >
        <Typography>{document.originalFileName}</Typography>
      </Button>
      {editMode && (
        <Button>
          <RemoveIcon onClick={() => onRemoveDocument(document, i)} />
        </Button>
      )}
    </ListItem>
  ))

  return <>{items}</>
}

export default DSDataRoom
