import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import { Document } from '../../../../types/document'
import Uploader from '../../../../components/form/uploader'
import storageHelper from '../../../../helpers/storageHelper'
import { downloadFile } from '../../../../helpers/httpRequests'
import { noop } from 'lodash'

interface DSDataRoomProps {
  dsoId?: string
  documents: Document[]
  editMode: boolean
  onAddDocument: (doc: Document) => void
  onRemoveDocument: (id: string) => void
}

const DSDataRoom = ({
  editMode,
  documents,
  onAddDocument,
  onRemoveDocument,
  dsoId = ''
}: DSDataRoomProps) => {
  const download = (id: string, own: boolean) => {
    let uri = `/issuance/dso/dataroom/documents/raw/${dsoId}/${id}`
    if (own) {
      uri = `/dataroom/raw/${storageHelper.getUserId()}/${id}`
    }

    downloadFile(uri).then(noop).catch(noop)
  }
  const items = (documents || []).map((document, i) => (
    <Grid container direction='row' key={document._id} alignItems='center'>
      <Grid item style={{ flexGrow: 1 }}>
        <Uploader
          docId={document._id}
          editMode={editMode}
          name={`documents.${i}`}
          guide={{
            title: document.title,
            label: document.originalFileName,
            type: document.type
          }}
          showTitle={false}
          download={() => {
            download(
              document._id,
              !document.user || document.user === storageHelper.getUserId()
            )
          }}
        />
      </Grid>
      {editMode && (
        <Grid item>
          <IconButton onClick={() => onRemoveDocument(document._id)}>
            <RemoveIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  ))

  return (
    <>
      {items}
      {editMode && (
        <Uploader
          key={`upload-${documents.length}`}
          editMode={editMode}
          name={`documents.${documents.length}`}
          onUpload={onAddDocument}
          guide={{
            title: 'Downloadable File',
            label: 'Downloadable File',
            type: 'dsoDocument'
          }}
          showTitle
          download={(id: string) => download(id, true)}
        />
      )}
    </>
  )
}

export default DSDataRoom

/*
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
*/
