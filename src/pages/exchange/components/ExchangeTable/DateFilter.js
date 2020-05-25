import React from 'react'

// Material Component
import { KeyboardDatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

const DATE_FORMAT = 'mm/dd/yyyy';

const DateFilter = (props) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <section className={classes.dateFilter}>
            <Typography 
                className={classes.filterTitle} 
                variant="h3"
            >
                Date
            </Typography>
            <KeyboardDatePicker
                className={classes.dateStyle}
                disableToolbar
                variant="inline"
                format={DATE_FORMAT}
                margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
            />
            <KeyboardDatePicker
                className={classes.dateStyle}
                disableToolbar
                variant="inline"
                format={DATE_FORMAT}
                margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{ 'aria-label': 'change date' }}
            />
        </section>
    );
}

export default DateFilter;
