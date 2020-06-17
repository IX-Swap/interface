// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Container,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  column: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
  },
}));

type IdentitySectionProps = {
  title: string,
  subtitle?: string,
  children: Node,
};

const IdentitySection = ({
  title,
  subtitle,
  children,
}: IdentitySectionProps) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={() => {
        setExpanded(!expanded);
      }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Container className={classes.column}>
          <Typography variant="h6" className={classes.sectionHeader}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" className={classes.sectionHeader}>
              {subtitle}
            </Typography>
          )}
        </Container>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default IdentitySection;
