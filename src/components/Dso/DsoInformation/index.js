// @flow
/* eslint-disable react/no-danger */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Box, Grid, Typography, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { assignWith, set } from 'lodash';

import AddIcon from '@material-ui/icons/Add';
import type { Dso } from 'context/dso/types';
import { useIsIssuer } from 'services/acl';

import RichEditor from '../rte';
import DsoTitle from '../DsoTitle';
import TeamMember from './DsoTeamMember';
import OfferingTerms from '../OfferingTerms';
import OfferDetails from '../OfferDetails';
import SectionContainer from '../SectionContianer';

const useDsoLogic = (dso, action) => {
  const rteRefs = useRef<{ values: Dso }>({});
  const isIssuer = useIsIssuer();
  const history = useHistory();
  const [editableDso, setEditableDso] = useState(dso || {});
  const def = rteRefs.current.values ? rteRefs.current.values : editableDso;
  const { register, getValues, reset, control } = useForm({
    defaultValues: { ...def },
  });

  const edit = ['edit', 'create'].includes(action);

  const merge = (destArr, sourceArr) =>
    sourceArr.map((source, i) => {
      const dest = destArr[i];

      Object.keys(source).forEach((key) => {
        if (!source[key]) {
          delete source[key];
        }

        if (!dest[key]) {
          delete dest[key];
        }
      });

      Object.keys(dest).forEach((key) => {
        if (!source[key]) {
          delete source[key];
        }

        if (!dest[key]) {
          delete dest[key];
        }
      });

      return { ...source, ...dest };
    });

  const getFinalValues = () => {
    Object.values(rteRefs.current).forEach((e) => {
      // $FlowFixMe
      if (e.save) {
        // $FlowFixMe
        e.save();
      }

      if (Array.isArray(e)) {
        e.forEach((v) => {
          // $FlowFixMe
          if (v.save) {
            v.save();
          }
        });
      }
    });

    const data = getValues({ nest: true });
    const finalData = assignWith(data, rteRefs.current.values, (a, b, key) => {
      if (key === 'team') {
        return merge(a, b);
      }
    });

    if (dso._id) {
      finalData.launchDate = dso.launchDate;
      finalData.currency = dso.currency[0]._id;
      finalData.subscriptionDocument = dso.subscriptionDocument;
    }

    if (!finalData.team) {
      finalData.team = [];
    }

    return finalData;
  };

  const addMember = () => {
    const values = getFinalValues();
    values.team.push({
      _id: undefined,
      photo: undefined,
      name: '',
      position: '',
      about: '',
    });

    rteRefs.current.values = { ...values };
    setEditableDso({
      ...values,
    });

    reset(values);
  };

  const onRemove = (index) => {
    const values = getFinalValues();
    const team = values.team.filter((e, i) => i !== index);
    if (
      // $FlowFixMe
      rteRefs.current.team &&
      rteRefs.current.team.length &&
      rteRefs.current.team.length > index
    ) {
      rteRefs.current.team.splice(index, 1);
    }

    values.team = [...team];
    rteRefs.current.values = { ...values };
    setEditableDso({
      ...values,
    });

    reset(values);
  };

  const setRefValue = (key, value) => {
    if (!rteRefs.current.values) {
      rteRefs.current.values = {};
    }

    set(rteRefs.current.values, key, value);
  };

  const registerRichText = (key, ref) => {
    set(rteRefs.current, key, ref);
  };

  return {
    editableDso,
    registerRichText,
    setRefValue,
    onRemove,
    addMember,
    edit,
    isIssuer,
    history,
    register,
    control,
    getFinalValues,
  };
};

const DsoInformation = ({
  dso,
  headerButtonText,
  headerButtonAction,
  onClickDocument,
  headerButtonShown = true,
  action = 'view',
}: {
  dso: Dso,
  action?: string,
  headerButtonShown?: boolean,
  headerButtonText?: string,
  headerButtonAction?: Function,
  onClickDocument: Function,
}) => {
  const {
    registerRichText,
    setRefValue,
    onRemove,
    addMember,
    edit,
    isIssuer,
    history,
    register,
    control,
    editableDso,
    getFinalValues,
  } = useDsoLogic(dso || {}, action);

  return (
    <Paper>
      <form>
        <Box p={4}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <DsoTitle
                edit={action === 'create'}
                ref={register}
                issuerName={editableDso.issuerName}
                tokenSymbol={editableDso.tokenSymbol}
              />
            </Grid>

            {headerButtonAction && headerButtonText && headerButtonShown && (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    edit
                      ? headerButtonAction(dso._id, getFinalValues())
                      : headerButtonAction()
                  }
                >
                  {headerButtonText}
                </Button>
              </Grid>
            )}
          </Grid>
          <Box mt={4}>
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <SectionContainer title="Introduction">
                  {!edit && (
                    <Typography paragraph>
                      <span
                        dangerouslySetInnerHTML={{ __html: dso.introduction }}
                      />
                    </Typography>
                  )}
                  {edit && (
                    <RichEditor
                      value={editableDso.introduction || 'Introduction'}
                      ref={(ref) => registerRichText('introduction', ref)}
                      save={(val) => {
                        setRefValue('introduction', val);
                      }}
                    />
                  )}
                </SectionContainer>
              </Grid>
              <OfferDetails
                dso={editableDso || {}}
                register={register}
                edit={edit}
              />
            </Grid>
          </Box>

          <Box mt={4}>
            <OfferingTerms
              dso={editableDso || {}}
              register={register}
              edit={edit}
              ref={register}
              control={control}
            />
          </Box>

          <Box mt={4}>
            <SectionContainer title="Business Model">
              {!edit && (
                <Typography>
                  <span
                    dangerouslySetInnerHTML={{ __html: dso.businessModel }}
                  />
                </Typography>
              )}
              {edit && (
                <RichEditor
                  value={editableDso.businessModel || 'Business Model'}
                  ref={(ref) => registerRichText('businessModel', ref)}
                  save={(val) => {
                    setRefValue('businessModel', val);
                  }}
                />
              )}
            </SectionContainer>
          </Box>

          <Box mt={4}>
            <SectionContainer title="Token Address">
              <Grid container item justify="space-between">
                <Typography color="primary">
                  {(dso.deploymentInfo && dso.deploymentInfo.token) || '-'}
                </Typography>
                {isIssuer &&
                  !dso.deploymentInfo &&
                  dso.status === 'Approved' &&
                  !edit && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        history.push(`/issuance/${dso._id}/deploy`)
                      }
                    >
                      Deploy
                    </Button>
                  )}
              </Grid>
            </SectionContainer>
          </Box>

          <Box mt={4}>
            <SectionContainer title="Use of Proceeds">
              {!edit && (
                <Typography>
                  <span
                    dangerouslySetInnerHTML={{ __html: dso.useOfProceeds }}
                  />
                </Typography>
              )}
              {edit && (
                <RichEditor
                  value={editableDso.useOfProceeds || 'Use of Proceeds'}
                  ref={(ref) => registerRichText('useOfProceeds', ref)}
                  save={(val) => {
                    setRefValue('useOfProceeds', val);
                  }}
                />
              )}
            </SectionContainer>
          </Box>

          <Box mt={4}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <SectionContainer title="Dataroom">
                  {!edit &&
                    (dso.documents || []).map((document) => (
                      <Button
                        key={document._id}
                        onClick={() => onClickDocument(document)}
                      >
                        <Typography>{document.title}</Typography>
                      </Button>
                    ))}
                  {edit && <span>upload subscriptionDocument</span>}
                </SectionContainer>
              </Grid>
              <Grid item xs={6}>
                <SectionContainer title="Fund Raising Milestone">
                  {!edit && (
                    <Typography>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: dso.fundraisingMilestone,
                        }}
                      />
                    </Typography>
                  )}
                  {edit && (
                    <RichEditor
                      value={
                        editableDso.fundraisingMilestone ||
                        'Fund raising Milestone'
                      }
                      ref={(ref) =>
                        registerRichText('fundRaisingMilestone', ref)
                      }
                      save={(val) => {
                        setRefValue('fundraisingMilestone', val);
                      }}
                    />
                  )}
                </SectionContainer>
              </Grid>
            </Grid>
          </Box>

          <Box mt={4}>
            <SectionContainer title="Team">
              {(editableDso.team || []).map((member, i) => (
                <TeamMember
                  index={i}
                  edit={edit}
                  member={member}
                  key={member._id || i}
                  remove={() => onRemove(i)}
                  ref={(ref) => {
                    if (ref && ref.save) {
                      registerRichText(`team[${i}]`, ref);
                      return;
                    }

                    if (ref) {
                      register(ref);
                    }
                  }}
                  save={(val) => {
                    setRefValue(`team[${i}].about`, val);
                  }}
                />
              ))}

              {edit && (
                <Box style={{ textAlign: 'right' }}>
                  <Button onClick={() => addMember()}>
                    <AddIcon /> Add
                  </Button>
                </Box>
              )}
            </SectionContainer>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default DsoInformation;
