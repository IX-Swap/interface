import { makeStyles } from '@material-ui/styles'

const defaultBadge = {
    borderRadius: 5,
    color: '#979797',
    display: 'flex',
    fontSize: 12,
    justifyContent: 'center',
    padding: 5,
    minWidth: 90,
};

export default makeStyles(theme => ({
    title: {
        fontSize: 25,
        fontWeight: 600,
        margin: '25px 10px',
    },
    componentStyle: {
        border: '1px solid #e8e8e8',
    },
    tableHeader: {
        fontSize: 12,
        fontWeight: 600,
        borderBottom: 0,
    },
    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    dateContainer: {
        marginTop: 16,
    },
    filterTitle: {
        color: '#a3a3a3',
        fontSize: 12,
        fontWeight: 600,
        marginTop: 16,
    },
    dateStyle: {
        margin: '0 10px',
    },
    filterContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 16,
        borderBottom: '1px solid #e8e8e8'
    },
    buttonFilter: {
        alignItems: 'center',
        display: 'flex',
    },
    btnStyle: {
        marginRight: 15,
    },
    dateFilter: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 15,
    },
    dropdownFilter: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 20,
        margin: '0 15px',
    },
    formControl: {
        margin: '0 10px',
        minWidth: 120,
    },
    filterBreak: {
        marginTop: 16,
        fontWeight: 600,
        fontSize: 18,
    },
    defaultCell: {
        fontSize: 12,
    },
    positiveCell: {
        fontSize: 12,
        color: '#009806',
    },
    negativeCell: {
        fontSize: 12,
        color: '#D20000',
    },
    disabledBadge: {
        ...defaultBadge,
        background: '#efefef',
    },
    positiveBadge: {
        ...defaultBadge,
        background: '#C5F1C7',
    },
    tableLink: {
        textDecoration: 'none',
        color: '#01A2FF',
    }
}))
