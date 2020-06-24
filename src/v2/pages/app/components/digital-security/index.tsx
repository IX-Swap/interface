import React from 'react'
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'

import DsoTitle from './title'
import { Dso, Document } from '../../../../types/dso'
import { Grid, Paper, Container, Box, Button, Typography } from '@material-ui/core'
import SectionContainer from './components/container'
import { useForm, FormContext } from 'react-hook-form'
import OfferDetails from './components/offer-details'
import EditableWysiwyg from '../../../../components/form/editable-wysiwyg'
import { get, set, noop } from 'lodash'
import TeamMember from './components/member'
import OfferingTerms from './components/offering-terms'
import DSDataroom from './components/dataroom'
import { downloadFile } from '../../../../helpers/httpRequests'
import { useIsIssuer } from '../../../../helpers/acl'
import { useHistory } from 'react-router-dom'

interface DigitalSecurityProps {
  editMode?: boolean
  dso: Dso
}

const generateRteValue = (html: string) => {
  const contentHTML = convertFromHTML(html)
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  )
  return JSON.stringify(convertToRaw(state))
}

const DigitalSecurity = ({
  editMode = false,
  dso
}: DigitalSecurityProps) => {
  const wysiwygItems: Array<keyof Dso> = ['introduction', 'businessModel', 'useOfProceeds', 'fundraisingMilestone']
  const dsoForm: Dso = { ...dso }
  const isIssuer = useIsIssuer()
  const history = useHistory()

  wysiwygItems.forEach((key: keyof Dso) => {
    set(dsoForm, key, generateRteValue(get(dso, key)?.toString() ?? ''))
  })

  dsoForm.team = dsoForm.team.map((e) => {
    return {
      ...e,
      about: generateRteValue(e.about)
    }
  })

  const form = useForm({ defaultValues: { ...dsoForm } })

  const onClickDocument = (doc: Document, i: number) => {
    const uri = `/issuance/dso/dataroom/documents/raw/${dso._id}/${doc._id}`
    downloadFile(uri).then(noop).catch(noop)
  }

  const onDownloadSubscription = () => {
    const uri = `/issuance/dso/dataroom/subscription/raw/${dso._id}`
    downloadFile(uri).then(noop).catch(noop)
  }

  const onRemoveDocument = (doc: Document, i: number) => console.log('onDocumentRemove', doc, i)

  return (
    <FormContext {...form}>
      <Container>
        <Paper>
          <Box p={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <DsoTitle editMode={editMode} dso={dso} />
              </Grid>
              <Grid item xs={8}>
                <SectionContainer title='Introduction'>
                  <EditableWysiwyg editMode={editMode} name='introduction' value={dso.introduction} />
                </SectionContainer>
              </Grid>
              <Grid item xs={4}>
                <SectionContainer>
                  <OfferDetails editMode={editMode} dso={dso} currency={dso.currency[0]} />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title='Subscription & Documents'>
                  <Button onClick={() => onDownloadSubscription()}>
                    Download
                  </Button>
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title='Offering Terms'>
                  <OfferingTerms editMode={editMode} dso={dso} />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title='Business Model'>
                  <EditableWysiwyg editMode={editMode} name='businessModel' value={dso.businessModel} />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title='Token Address'>
                  <Grid container item justify="space-between">
                    <Typography color="primary">
                      {((dso || {}).deploymentInfo &&
                        ((dso || {}).deploymentInfo ?? {}).token) ??
                        '-'}
                    </Typography>
                    {isIssuer &&
                      !(dso || {}).deploymentInfo &&
                      (dso || {}).status === 'Approved' &&
                      !editMode && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          history.push(
                              `/app/issuance/${dso.createdBy}/${dso._id}/deploy`
                          )
                        }
                      >
                          Deploy
                      </Button>
                    )}
                  </Grid>
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title='Use of Proceeds'>
                  <EditableWysiwyg editMode={editMode} name='useOfProceeds' value={dso.useOfProceeds} />
                </SectionContainer>
              </Grid>
              <Grid item xs={6}>
                <SectionContainer title='Dataroom'>
                  <DSDataroom
                    documents={dso.documents}
                    editMode={editMode}
                    onClickDocument={onClickDocument}
                    onRemoveDocument={onRemoveDocument}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={6}>
                <SectionContainer title='Fund Raising Milestone'>
                  <EditableWysiwyg editMode={editMode} name='fundraisingMilestone' value={dso.fundraisingMilestone} />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title='Team'>
                  {dso.team.map((e, i) => (
                    <TeamMember
                      key={e._id ?? `team-member-${i}`}
                      member={e}
                      index={i}
                      editMode={editMode}
                      dsoId={dso._id}
                    />
                  ))}
                </SectionContainer>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </FormContext>
  )
}

export default DigitalSecurity
