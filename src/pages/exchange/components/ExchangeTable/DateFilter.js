import React from 'react';
import moment from 'moment';

// Material Component
import { KeyboardDatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

const DATE_FORMAT = 'MM/dd/yyyy';

const DateFilter = (props) => {
  const classes = useStyles();
  // const today = moment().format('MM/dd/YYYY');

  const [fromDate, setFrom] = React.useState(new Date());

  const [toDate, setTo] = React.useState(new Date());

  const _handleSetFrom = (date) => {
    setFrom(date);
    props.setFrom(moment(fromDate).format('YYYY-MM-DD HH:mm:ss'));
  };

  const _handleSetTo = (date) => {
    setTo(date);
    props.setTo(moment(fromDate).format('YYYY-MM-DD HH:mm:ss'));
  };

  return (
    <section className={classes.dateFilter}>
      <Typography className={classes.filterTitle} variant="h3">
        Date
      </Typography>
      <KeyboardDatePicker
        className={classes.dateStyle}
        disableToolbar
        variant="inline"
        format={DATE_FORMAT}
        margin="normal"
        id="date-picker-from"
        value={fromDate}
        onChange={_handleSetFrom}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
      />
      <KeyboardDatePicker
        className={classes.dateStyle}
        disableToolbar
        variant="inline"
        format={DATE_FORMAT}
        margin="normal"
        id="date-picker-to"
        value={toDate}
        onChange={_handleSetTo}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
      />
    </section>
  );
};

export default DateFilter;
