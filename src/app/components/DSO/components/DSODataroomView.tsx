import React, { Fragment } from 'react'
import { Grid, Typography } from '@mui/material'
import { DownloadDSODocument } from 'app/components/DSO/components/DownloadDSODocument'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/components/DSO/components/styles'

export interface DSODataroomViewProps {
  dso: DigitalSecurityOffering
  showTitle?: boolean
  isNewThemeOn?: boolean
}

export const DSODataroomView = (props: DSODataroomViewProps) => {
  const classes = useStyles()
  const { dso, showTitle = true, isNewThemeOn = false } = props

  const renderSubscriptionDocumentTitle = () => {
    return (
      <Grid item>
        <Typography variant='h5'>Subscription Document</Typography>
      </Grid>
    )
  }

  const renderSubscriptionDocument = () => {
    return (
      <Grid item>
        {dso.subscriptionDocument !== undefined ? (
          <Fragment>
            <DataroomHeader />
            <DataroomViewRow
              key={dso.subscriptionDocument?._id}
              title='Subscription Document'
              document={dso.subscriptionDocument}
              showDivider={showTitle}
              downloader={
                <DownloadDSODocument
                  dsoId={dso._id}
                  type={'subscriptionDocument'}
                  documentId={dso.subscriptionDocument?._id}
                />
              }
            />
          </Fragment>
        ) : (
          <Typography>No subscription document provided</Typography>
        )}
      </Grid>
    )
  }

  const renderDataroomTitle = () => {
    return (
      <Grid item>
        <Typography variant='h5'>Dataroom</Typography>
      </Grid>
    )
  }

  const renderDataroom = () => {
    return (
      <Grid item>
        {dso.documents.length > 0 ? (
          <Fragment>
            <DataroomHeader />
            {dso.documents?.map(document => (
              <DataroomViewRow
                key={document._id}
                title={document.type}
                document={document}
                showDivider={showTitle}
                downloader={
                  <DownloadDSODocument
                    dsoId={dso._id}
                    documentId={document._id}
                  />
                }
              />
            ))}
          </Fragment>
        ) : (
          <Typography>No documents uploaded</Typography>
        )}
      </Grid>
    )
  }

  return (
    <Grid
      container
      direction='column'
      spacing={3}
      className={isNewThemeOn ? classes.newDSOViewItemStyles : ''}
    >
      {showTitle && (
        <Grid item>
          <FormSectionHeader title='Documents' />
        </Grid>
      )}

      {showTitle ? renderSubscriptionDocumentTitle() : null}
      {showTitle ? renderSubscriptionDocument() : null}

      {!showTitle ? (
        <Grid
          item
          container
          direction={'column'}
          className={classes.newDSOViewItemStyles}
        >
          <Grid item>
            <Typography
              variant={'h4'}
              color={'primary'}
              style={{ fontWeight: 700 }}
            >
              Subscription Document
            </Typography>
            <VSpacer size={'small'} />
          </Grid>
          {renderSubscriptionDocument()}
        </Grid>
      ) : null}

      {!showTitle ? <VSpacer size={'medium'} /> : null}

      {showTitle ? renderDataroomTitle() : null}
      {showTitle ? renderDataroom() : null}

      {!showTitle ? (
        <Grid
          item
          container
          direction={'column'}
          className={classes.newDSOViewItemStyles}
        >
          <Grid item>
            <Typography
              variant={'h4'}
              color={'primary'}
              style={{ fontWeight: 700 }}
            >
              Dataroom
            </Typography>
            <VSpacer size={'small'} />
          </Grid>
          {renderDataroom()}
        </Grid>
      ) : null}
    </Grid>
  )
}
