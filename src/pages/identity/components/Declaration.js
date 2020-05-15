// @flow
import React from 'react';
import { Typography, Grid, List, ListItem, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em',
  },
  sublevel: {
    marginLeft: '3em',
  },
}));

type DeclarationItemProps = {
  _id: string,
  children: React.Node,
  answerable?: boolean,
};

const DeclarationItem = ({
  _id,
  children,
  answerable = false,
}: DeclarationItemProps) => (
  <ListItem id={_id}>
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={10} justify="flex-start">
        {children}
      </Grid>
      {answerable && (
        <>
          <Grid container item xs={1} justify="center">
            Yes
          </Grid>
          <Grid container item xs={1} justify="center">
            No
          </Grid>
        </>
      )}
    </Grid>
  </ListItem>
);

const Declaration = () => {
  const classes = useStyles();

  return (
    <List>
      <DeclarationItem answerable>
        <Typography paragraph>
          The User declares that he/she has the authority to open an account
          with InvestaX on behalf of the Applicant and bind the Applicant, and
          to submit all documents on behalf of the Applicant in connection with
          the account opening.
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem>
        <Typography>
          The Applicant qualifies as a "Corporate Accredited Investor" as
          defined in Section 4A(1)(a)(ii) of the Securities and Futures Act
          (“SFA”), Chapter 289, under Singapore law.
        </Typography>
      </DeclarationItem>
      <DeclarationItem answerable>
        <Typography className={classes.sublevel}>
          An entity or corporation with net assets exceeding $10 million or its
          equivalent in foreign currency; or
        </Typography>
      </DeclarationItem>
      <DeclarationItem answerable>
        <Typography className={classes.sublevel}>
          A corporation where all the shareholders are accredited investors; or
        </Typography>
      </DeclarationItem>
      <DeclarationItem answerable>
        <Typography className={classes.sublevel}>
          A partnership (other than a limited liability partnership) where all
          the partners are accredited investors; or
        </Typography>
      </DeclarationItem>
      <DeclarationItem answerable>
        <Typography className={classes.sublevel} paragraph>
          A trust where all the beneficiaries are accredited investors
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem answerable>
        <Typography paragraph>
          The Applicant has read and agrees to InvestaX's{' '}
          <Link href="#">Privacy Policy</Link>.
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem answerable>
        <Typography paragraph>
          The Applicant has read and agrees to InvestaX's{' '}
          <Link href="#">Terms of Use</Link>.
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem answerable>
        <Typography paragraph>
          The Applicant declares that it is not a "U.S. Person" for U.S. federal
          income tax purposes. <br />
          (Please submit <Link href="#">W-8BEN/W-8BEN-E</Link> (whichever is
          applicable) and satisfactory documentary evidence.)
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem answerable>
        <Typography>
          The Applicant elects to be and agrees to be treated as an "Accredited
          Investor".
        </Typography>
      </DeclarationItem>
      <DeclarationItem>
        <Typography className={classes.sublevel}>
          Applicant has been informed of and understands the consequences of
          being treated as an Accredited Investor, in particular the reduced
          regulatory investor safeguards for Accredited Investors.
        </Typography>
      </DeclarationItem>
      <DeclarationItem>
        <Typography className={classes.sublevel} paragraph>
          Applicant has been informed of and understands its right to opt out of
          the Accredited Investors status with InvestaX at any point in time
          after consent has been given, upon which InvestaX will process your
          election to opt out within 14 business days from receipt.
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem>
        <Typography>The Applicant acknowledges and understands:</Typography>
      </DeclarationItem>
      <DeclarationItem answerable>
        <Typography className={classes.sublevel}>
          InvestaX operates its primary issuance platform as a capital markets
          services licensee under the SFA (Cap. 289) of Singapore for dealing in
          capital markets products that are securities and units in a collective
          investment schemes, and an exempt financial advisor for the provision
          of advice on units in collective investment schemes, under license
          number CMS100635-1
        </Typography>
      </DeclarationItem>
      <DeclarationItem answerable>
        <Typography className={classes.sublevel} paragraph>
          • InvestaX operates its secondary trading platform (“Exchange”) in a
          regulatory sandbox under a Recognized Market Operator (“RMO”) approval
          issued by the Monetary Authority of Singapore (“MAS”) during the
          period [DDMMYYYY to DDMMYYYY], subject to extension. While in the
          sandbox, the Exchange will operate under pre-determined parameters and
          is not required to meet some of the standard requirements imposed on
          RMOs under the SFA. It may be possible that InvestaX may not continue
          to conduct regulated activities as an RMO under the SFA during or
          after the sandbox period as determined by the MAS.
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem answerable>
        <Typography paragraph>
          The applicant confirm that all information provided above and all
          documents provided or to be provided to InvestaX are true and correct
          to the best of my knowledge and you may rely on the accuracy thereof
        </Typography>
      </DeclarationItem>
      <br />
      <DeclarationItem answerable>
        <Typography paragraph>
          The applicant undertake to promptly inform InvestaX if there should be
          any changes in my/ our circumstances which would result in a change of
          investor status
        </Typography>
      </DeclarationItem>
      <br />
    </List>
  );
};

export default Declaration;
