import React from 'react'

// Material Component
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';


const options = [
    {
        id: 1,
        label: 'SGD',
    },
    {
        id: 2,
        label: 'IXPS',
    },
    {
        id: 3,
        label: 'USD',
    },
];

const DropdownFilter = (props) => {
    const classes = useStyles();

    return (
        <section className={classes.dropdownFilter}>
            <Typography 
                className={classes.filterTitle} 
                variant="h3"
            >
                Pair
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">Digital</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map(option =>
                        <MenuItem 
                            key={option.id}
                            value={option.label}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <span className={classes.filterBreak}>-</span>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Currency</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map(option =>
                        <MenuItem 
                            key={option.id}
                            value={option.label}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <Typography 
                className={classes.filterTitle} 
                variant="h3"
            >
                Side
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">All</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map(option =>
                        <MenuItem 
                            key={option.id}
                            value={option.label}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </section>
    );
}

export default DropdownFilter;
