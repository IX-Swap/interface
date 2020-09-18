import React, { useState } from 'react'
import { ContentState, convertFromHTML, convertToRaw } from 'draft-js'
// import { DSOTitle } from 'v2/app/components/DSO/DSOTitle'
import {
  DigitalSecurityOffering as IDSO,
  DsoRequest,
  inititialValues
} from 'v2/types/dso'
import { Document } from 'v2/types/document'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { FormProvider, useForm } from 'react-hook-form'
import { DSODetails } from 'v2/app/components/DSO/components/DSODetails'
import EditableWysiwyg from 'v2/components/form/EditableWysiwyg'
import { get, noop, set } from 'lodash'
import { DSOTeamMember } from 'v2/app/components/DSO/components/DSOTeamMember'
import { DSOTerms } from 'v2/app/components/DSO/components/DSOTerms'
import { DSODataroom } from 'v2/app/components/DSO/components/DSODataroom'
import { DSOTitle } from 'v2/app/components/DSO/components/DSOTitle'
import { downloadFile } from 'v2/helpers/httpRequests'
import { useIsIssuer } from 'v2/helpers/acl'
import { useHistory } from 'react-router-dom'
import { flatten, unflatten } from 'flat'
import Uploader from 'v2/components/form/Uploader'
import storageHelper from '../../../helpers/storageHelper'
import { Asset } from 'v2/types/asset'
import { wysiwygToHtml } from 'v2/helpers/rendering'
import { CorporateSelector } from 'v2/app/components/CorporateSelector'

interface DigitalSecurityProps {
  buttonAction?: (form: DsoRequest, valid: boolean) => void
  buttonString?: string
  editMode?: boolean
  create?: boolean
  dso?: IDSO
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
  const wysiwygItems: Array<keyof IDSO> = [
    'introduction',
    'businessModel',
    'useOfProceeds',
    'fundraisingMilestone'
  ]
  const dsoForm: DsoRequest = {
    ...dso,
    documents: dso.documents?.map(e => e._id) ?? [],
    currency: dso.currency[0]._id ?? ''
  }
  const [dsoState, setDsoState] = useState({ ...dso })
  const isIssuer = useIsIssuer()
  const history = useHistory()

  const getFinalValue = () => {
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest

    wysiwygItems.forEach((key: keyof IDSO) => {
      // @ts-expect-error
      unflattened[key] = wysiwygToHtml((unflattened[key] as string) ?? '{}')
    })

    unflattened.team.forEach(e => {
      e.about = wysiwygToHtml(e.about ?? '{}')
    })

    unflattened.documents = (unflattened.documents ?? []).filter(Boolean)

    const stringable = ['equityMultiple', 'investmentStructure']
    Object.keys(unflattened).forEach(key => {
      const value = unflattened[key as keyof DsoRequest]
      if (
        value !== null &&
        value !== undefined &&
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        value.toString().trim() === ''
      ) {
        // @ts-expect-error
        unflattened[key] = stringable.includes(key) ? 'n/a' : null
      }
    })

    unflattened.launchDate = unflattened.launchDate ?? dso.launchDate
    unflattened.currency = unflattened.currency ?? dso.currency[0]._id
    unflattened.corporate = unflattened.corporate ?? dso.corporate

    return unflattened
  }

  wysiwygItems.forEach((key: keyof IDSO) => {
    set(dsoForm, key, generateRteValue(get(dso, key)?.toString() ?? ''))
  })

  dsoForm.team = dsoForm.team.map(e => {
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
    const docs = [...(dsoState.documents ?? []), doc]
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest
    unflattened.documents = docs.map(e => e._id)

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

    Object.keys(finalValues).forEach(key => {
      const value =
        key === 'about' ? generateRteValue(finalValues[key]) : finalValues[key]
      form.setValue(`team.${key}`, value)
    })

    setDsoState({
      ...mDso
    })
  }

  const onRemoveDocument = (id: string) => {
    const docs = dsoState.documents?.filter(e => e._id !== id) ?? []
    const unflattened = { ...unflatten(form.getValues()) } as DsoRequest
    unflattened.documents = docs.map(e => e._id)

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

export const DSO = (props: DigitalSecurityProps) => {
  const {
    buttonAction,
    buttonString,
    editMode: edit = false,
    create = false,
    dso = inititialValues
  } = props
  const editMode = create || edit
  const {
    form,
    getFinalValue,
    isIssuer,
    onDownloadSubscription,
    onAddTeamMember,
    onRemoveTeamMember,
    onAddDocument,
    history,
    onRemoveDocument,
    dsoState
  } = useDsoLogic({ editMode, dso })

  return (
    <FormProvider {...form}>
      <Container>
        <Paper>
          <Box p={4}>
            <Grid container spacing={4}>
              <Grid item container xs={12} justify='space-between'>
                <Grid item>
                  {create ? (
                    <DSOTitle editMode dso={dso} />
                  ) : (
                    <DSOTitle editMode={editMode} dso={dso} />
                  )}
                </Grid>
                <Grid item>
                  {buttonString !== undefined && (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={async () => {
                        if (buttonAction !== undefined) {
                          // const isValid = await form.triggerValidation()
                          const isValid = true
                          buttonAction(getFinalValue(), isValid)
                        }
                      }}
                    >
                      {buttonString}
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <DSOContainer title='Introduction'>
                  <EditableWysiwyg
                    editMode={editMode}
                    name='introduction'
                    value={dso.introduction}
                  />
                </DSOContainer>
              </Grid>
              <Grid item xs={4}>
                <DSOContainer>
                  {editMode && !create && <CorporateSelector />}

                  <DSODetails
                    editMode={editMode}
                    dso={dso}
                    currency={dso.currency[0] as Asset}
                  />
                </DSOContainer>
              </Grid>
              <Grid item xs={12}>
                <DSOContainer title='Subscription & Documents'>
                  <Uploader
                    showTitle
                    editMode={editMode}
                    override
                    name='subscriptionDocument'
                    guide={{
                      type: 'subscriptionDocument',
                      label: 'Subscription Document',
                      title: 'Subscription Document'
                    }}
                    download={onDownloadSubscription}
                  />
                  {/* <Button onClick={() => onDownloadSubscription()}>
                    Download
                    </Button> */}
                </DSOContainer>
              </Grid>
              <Grid item xs={12}>
                <DSOContainer title='Offering Terms'>
                  <DSOTerms editMode={editMode} dso={dso} />
                </DSOContainer>
              </Grid>
              <Grid item xs={12}>
                <DSOContainer title='Business Model'>
                  <EditableWysiwyg
                    editMode={editMode}
                    name='businessModel'
                    value={dso.businessModel}
                  />
                </DSOContainer>
              </Grid>
              <Grid item xs={12}>
                <DSOContainer title='Token Address'>
                  <Grid container item justify='space-between'>
                    <Typography color='primary'>
                      {((dso ?? {}).deploymentInfo !== undefined &&
                        ((dso ?? {}).deploymentInfo ?? {}).token) ??
                        '-'}
                    </Typography>
                    {isIssuer &&
                      (dso ?? {}).deploymentInfo !== undefined &&
                      (dso ?? {}).status === 'Approved' &&
                      !editMode && (
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => {
                            history.push(
                              `/issuance/${dso.createdBy}/${dso._id}/deploy`
                            )
                          }}
                        >
                          Deploy
                        </Button>
                      )}
                  </Grid>
                </DSOContainer>
              </Grid>
              <Grid item xs={12}>
                <DSOContainer title='Use of Proceeds'>
                  <EditableWysiwyg
                    editMode={editMode}
                    name='useOfProceeds'
                    value={dso.useOfProceeds}
                  />
                </DSOContainer>
              </Grid>
              <Grid item xs={6}>
                <DSOContainer title='Dataroom'>
                  <DSODataroom
                    documents={dsoState.documents ?? []}
                    editMode={editMode}
                    onAddDocument={onAddDocument}
                    onRemoveDocument={onRemoveDocument}
                  />
                </DSOContainer>
              </Grid>
              <Grid item xs={6}>
                <DSOContainer title='Fund Raising Milestone'>
                  <EditableWysiwyg
                    editMode={editMode}
                    name='fundraisingMilestone'
                    value={dso.fundraisingMilestone}
                  />
                </DSOContainer>
              </Grid>
              <Grid item xs={12}>
                <DSOContainer title='Team'>
                  {dsoState.team.map((e, i) => (
                    <DSOTeamMember
                      key={e._id ?? `team-member-${i}`}
                      member={e}
                      index={i}
                      editMode={editMode}
                      dsoId={dso._id}
                      onRemoveTeamMember={() => onRemoveTeamMember(i)}
                    />
                  ))}
                  {editMode && (
                    <Grid container justify='flex-end'>
                      <Box m={4}>
                        <Button variant='contained' onClick={onAddTeamMember}>
                          Add
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </DSOContainer>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </FormProvider>
  )
}
