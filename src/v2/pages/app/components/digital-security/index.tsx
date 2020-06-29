import React, { useState } from 'react'
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'

import DsoTitle from './title'
import {
  Dso,
  DsoRequest,
  inititialValues
} from '../../../../types/dso'
import { Document } from '../../../../types/document'
import { Grid, Paper, Container, Box, Button, Typography } from '@material-ui/core'
import SectionContainer from './components/container'
import { useForm, FormContext } from 'react-hook-form'
import OfferDetails from './components/offer-details'
import EditableWysiwyg from '../../../../components/form/editable-wysiwyg'
import { get, set, noop } from 'lodash'
import TeamMember from './components/member'
import OfferingTerms from './components/offering-terms'
import DSDataroom from './components/dataroom'
import DSTitleEditor from './components/title-editor'
import { downloadFile } from '../../../../helpers/httpRequests'
import { useIsIssuer } from '../../../../helpers/acl'
import { useHistory } from 'react-router-dom'
import { flatten, unflatten } from 'flat'
import Uploader from '../../../../components/form/uploader'
import storageHelper from '../../../../helpers/storageHelper'
import { Asset } from '../../../../types/asset'
import { wysiwygToHtml } from '../../../../helpers/rendering'
import CorporateSelector from '../corporate-selector'

interface DigitalSecurityProps {
  buttonAction?: (form: DsoRequest, valid: boolean) => void
  buttonString?: string
  editMode?: boolean
  create?: boolean
  dso?: Dso
}

const generateRteValue = (html: string) => {
  const contentHTML = convertFromHTML(html)
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  )
  return JSON.stringify(convertToRaw(state))
}

const useDsoLogic = ({
  editMode = false,
  dso = inititialValues
}: DigitalSecurityProps) => {
  const wysiwygItems: Array<keyof Dso> = ['introduction', 'businessModel', 'useOfProceeds', 'fundraisingMilestone']
  const dsoForm: DsoRequest = { ...dso, documents: dso.documents.map((e) => e._id), currency: dso.currency[0]._id ?? '' }
  const [dsoState, setDsoState] = useState({ ...dso })
  const isIssuer = useIsIssuer()
  const history = useHistory()

  const getFinalValue = () => {
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest

    wysiwygItems.forEach((key: keyof Dso) => {
      const value = wysiwygToHtml(unflattened[key] as string || '{}')
      // @ts-ignore
      unflattened[key] = value
    })

    unflattened.team.forEach((e) => {
      e.about = wysiwygToHtml(e.about || '{}')
    })

    unflattened.documents = (unflattened.documents || []).filter(Boolean)

    const stringable = ['equityMultiple', 'investmentStructure']
    Object.keys(unflattened).forEach((key) => {
      const value = unflattened[key as keyof DsoRequest]
      if (
        value !== null &&
        value !== undefined &&
        value.toString().trim() === ''
      ) {
        // @ts-ignore
        unflattened[key] = stringable.includes(key) ? 'n/a' : null
      }
    })

    unflattened.launchDate = unflattened.launchDate ?? dso.launchDate
    unflattened.currency = unflattened.currency ?? dso.currency[0]._id
    unflattened.corporate = unflattened.corporate ?? dso.corporate

    return unflattened
  }

  wysiwygItems.forEach((key: keyof Dso) => {
    set(dsoForm, key, generateRteValue(get(dso, key)?.toString() ?? ''))
  })

  dsoForm.team = dsoForm.team.map((e) => {
    return {
      ...e,
      about: generateRteValue(e.about ?? '')
    }
  })

  const form = useForm({ defaultValues: { ...dsoForm } })

  const onAddTeamMember = () => {
    setDsoState({
      ...dsoState,
      team: [...dsoState.team, { ...inititialValues.team[0] }]
    })
  }

  const onAddDocument = (doc: Document) => {
    const docs = [...dsoState.documents, doc]
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest
    unflattened.documents = docs.map((e) => e._id)

    form.reset(unflattened)

    setDsoState({
      ...dsoState,
      documents: docs
    })
  }

  const onRemoveTeamMember = (index: number) => {
    const mDso = { ...dsoState }
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest

    mDso.team.splice(index, 1)
    unflattened.team.splice(index, 1)
    const finalValues: { [key: string]: string } = flatten(unflattened.team)

    Object.keys(finalValues).forEach((key) => {
      const value =
        key === 'about' ? generateRteValue(finalValues[key]) : finalValues[key]
      form.setValue(`team.${key}`, value)
    })

    setDsoState({
      ...mDso
    })
  }

  const onRemoveDocument = (id: string) => {
    const docs = dsoState.documents.filter((e) => e._id !== id)
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest
    unflattened.documents = docs.map((e) => e._id)

    form.reset(unflattened)

    setDsoState({
      ...dsoState,
      documents: docs
    })
  }

  const onDownloadSubscription = (id: string) => {
    let uri = `/issuance/dso/dataroom/subscription/raw/${dso._id}`
    if (editMode) {
      uri = `/dataroom/raw/${storageHelper.getUserId()}/${id}`
    }

    downloadFile(uri).then(noop).catch(noop)
  }

  return {
    form,
    getFinalValue,
    dso,
    isIssuer,
    onDownloadSubscription,
    onAddTeamMember,
    onRemoveTeamMember,
    onAddDocument,
    history,
    onRemoveDocument,
    dsoState
  }
}

const DigitalSecurity = ({
  buttonAction,
  buttonString,
  editMode: edit = false,
  create = false,
  dso = inititialValues
}: DigitalSecurityProps) => {
  const editMode = (create || edit)
  const {
    form, getFinalValue,
    isIssuer, onDownloadSubscription,
    onAddTeamMember, onRemoveTeamMember, onAddDocument,
    history, onRemoveDocument, dsoState
  } = useDsoLogic({ editMode, dso })

  return (
    <FormContext {...form}>
      <Container>
        <Paper>
          <Box p={4}>
            <Grid container spacing={4}>
              <Grid item container xs={12} justify="space-between">
                <Grid item>
                  {create ? (
                    <DSTitleEditor editMode dso={dso} />
                  ) : (
                    <DsoTitle editMode={editMode} dso={dso} />
                  )}
                </Grid>
                <Grid item>
                  {buttonString && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        if (buttonAction) {
                          const isValid = await form.triggerValidation()
                          buttonAction(getFinalValue(), isValid);
                        }
                      }}
                    >
                      {buttonString}
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <SectionContainer title="Introduction">
                  <EditableWysiwyg
                    editMode={editMode}
                    name="introduction"
                    value={dso.introduction}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={4}>
                <SectionContainer>
                  {editMode && !create && <CorporateSelector />}

                  <OfferDetails
                    editMode={editMode}
                    dso={dso}
                    currency={dso.currency[0] as Asset}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title="Subscription & Documents">
                  <Uploader
                    showTitle
                    editMode={editMode}
                    override
                    name="subscriptionDocument"
                    guide={{
                      type: "subscriptionDocument",
                      label: "Subscription Document",
                      title: "Subscription Document",
                    }}
                    download={onDownloadSubscription}
                  />
                  {/* <Button onClick={() => onDownloadSubscription()}>
                    Download
                    </Button> */}
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title="Offering Terms">
                  <OfferingTerms editMode={editMode} dso={dso} />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title="Business Model">
                  <EditableWysiwyg
                    editMode={editMode}
                    name="businessModel"
                    value={dso.businessModel}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title="Token Address">
                  <Grid container item justify="space-between">
                    <Typography color="primary">
                      {((dso || {}).deploymentInfo &&
                        ((dso || {}).deploymentInfo ?? {}).token) ??
                        "-"}
                    </Typography>
                    {isIssuer &&
                      !(dso || {}).deploymentInfo &&
                      (dso || {}).status === "Approved" &&
                      !editMode && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            history.push(
                              `/app/issuance/${dso.createdBy}/${dso._id}/deploy`
                            );
                          }}
                        >
                          Deploy
                        </Button>
                      )}
                  </Grid>
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title="Use of Proceeds">
                  <EditableWysiwyg
                    editMode={editMode}
                    name="useOfProceeds"
                    value={dso.useOfProceeds}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={6}>
                <SectionContainer title="Dataroom">
                  <DSDataroom
                    documents={dsoState.documents}
                    editMode={editMode}
                    onAddDocument={onAddDocument}
                    onRemoveDocument={onRemoveDocument}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={6}>
                <SectionContainer title="Fund Raising Milestone">
                  <EditableWysiwyg
                    editMode={editMode}
                    name="fundraisingMilestone"
                    value={dso.fundraisingMilestone}
                  />
                </SectionContainer>
              </Grid>
              <Grid item xs={12}>
                <SectionContainer title="Team">
                  {dsoState.team.map((e, i) => (
                    <TeamMember
                      key={e._id ?? `team-member-${i}`}
                      member={e}
                      index={i}
                      editMode={editMode}
                      dsoId={dso._id}
                      onRemoveTeamMember={() => onRemoveTeamMember(i)}
                    />
                  ))}
                  {
                    editMode && (
                      <Grid container justify="flex-end">
                        <Box m={4}>
                          <Button variant="contained" onClick={onAddTeamMember}>
                            Add
                          </Button>
                        </Box>
                      </Grid>
                    )
                  }
                </SectionContainer>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </FormContext>
  );
}

export default DigitalSecurity
