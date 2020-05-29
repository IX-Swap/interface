import React from 'react';
import { Grid } from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import { formatMoney } from 'helpers/formatNumbers';
import SectionContainer from './SectionContianer';
import OfferDetail from './OfferDetail';

const OfferDetails = (
  {
    register,
    dso = {},
    edit = false,
  }: { register: any, dso: Dso, edit?: boolean },
  ref: any
) => (
  <Grid item xs={4}>
    <SectionContainer>
      <OfferDetail
        name="status"
        ref={register}
        label="Status"
        value={dso.status}
      />
      <OfferDetail
        name="capitalStructure"
        ref={register}
        edit={edit}
        label="Capital Structure"
        value={dso.capitalStructure}
      />
      <OfferDetail
        name="pricePerUnit"
        ref={register}
        edit={edit}
        label="Unit Price"
        value={formatMoney(dso.pricePerUnit || 0, (dso.currency || {}).symbol)}
        raw={`${dso.pricePerUnit || ''}`}
      />
      <OfferDetail
        name="totalFundraisingAmount"
        ref={register}
        edit={edit}
        label="Total Fundraising Amount"
        value={formatMoney(
          dso.totalFundraisingAmount || 0,
          (dso.currency || {}).symbol
        )}
        raw={`${dso.totalFundraisingAmount || ''}`}
      />
      <OfferDetail
        name="minimumInvestment"
        ref={register}
        edit={edit}
        label="Minimum Investment"
        value={formatMoney(
          dso.minimumInvestment || 0,
          (dso.currency || {}).symbol
        )}
        raw={`${dso.minimumInvestment || ''}`}
      />
    </SectionContainer>
  </Grid>
);

export default React.forwardRef(OfferDetails);
