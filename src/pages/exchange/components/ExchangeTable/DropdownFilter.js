import React from 'react'

// Material Component
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Styles
import useStyles from 'pages/exchange/components/ExchangeTable/styles';

const DropdownFilter = (props) => {
    const { setSide, setPair } = props;
    const classes = useStyles();
    const { items = [] } = props;

    const sides = [
        {
            side: 'bid',
            label: 'Sell',
        },
        {
            side: 'ask',
            label: 'Buy',
        },
    ];

    const _handleSetPair = evt => {
        const target = evt.target;
        const value = target.value;

        setPair(value);
    }

    const _handleSetSide = evt => {
        const target = evt.target;
        const value = target.value;

        setSide(value);
    }

    return (
        <section className={classes.dropdownFilter}>
            <Typography 
                className={classes.filterTitle} 
                variant="h3"
            >
                Pair
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">Pair</InputLabel>
                <Select 
                    defaultValue="" 
                    id="grouped-select"
                    onChange={_handleSetPair}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {items.map(option =>
                        <MenuItem 
                            key={option._id}
                            value={option._id}
                        >
                            {option.name}
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
                <Select 
                    defaultValue="" 
                    id="grouped-select"
                    onChange={_handleSetSide}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {sides.map(option =>
                        <MenuItem 
                            key={option.side}
                            value={option.side}
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
