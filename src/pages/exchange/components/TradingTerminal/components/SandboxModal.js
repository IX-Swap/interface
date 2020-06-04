import React from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

import { Button, Typography, Box } from '@material-ui/core';

// Utils
import Utils from 'utils/utils';

// Styles
import useStyles from './styles'
const SandboxModal = () => {
    const history = useHistory();
    const classes = useStyles();
    const [isOpen, setOpen] = React.useState(true);
    const _handleToggle = () => {
        setOpen(!isOpen);
        Utils.addVisitedPages(history.location.pathname);
    }

    const customStyles = {
        overlay: {
            background: 'rgba(0, 0, 0, 0.3)',
        },
        content : {
            bacground: '#fff',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25',
            borderRadius: '5px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '35px',
            width: '60%',
        }
    };

    const description = 'InvestaX operates its secondary trading platform (“Echange”) in a regularory sandbox under a Recognized Market Operator (“RMO”) approval issued by the Monetary Authority of Singapore (“MAS”) during the period [DDMMYYYY to DDMMYYYY], subject to extension. While in the sandbox, the Exchange will operate under pre-determined parameters and is not required to meet some of the standard requirements imposed on RMOs under the SFA. It may be possible that InvestaX may not continue to conduct regulated activities as an RMO under the SFA. It may be possible that InvestaX may not continue to conduct regulated activities as an RMO under the SFA during or after the sandbox period as determined by the MAS.';
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => _handleToggle}
            style={customStyles}
            contentLabel="Sandbox Modal"
        >
            <Typography 
                component="p"
                className={classes.modalDescription}
            >
                {description}
            </Typography>
            <Box className={classes.modalFooter}>
                <Button 
                    className={classes.confirmBtn}
                    onClick={_handleToggle} 
                    color="primary"
                >
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
};

export default SandboxModal;
