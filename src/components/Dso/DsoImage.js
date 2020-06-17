import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { getImgUrl } from 'services/httpRequests';
import storage from 'services/storageHelper';

const useStyles = makeStyles(() => ({
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0',
  },
}));

const DsoImage = ({
  logo,
  edit = false,
  dsoId = '',
}: {
  dsoId: string,
  edit: boolean,
  logo: string,
}) => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState('');

  const setPhoto = async (id) => {
    const x = await getImgUrl(
      edit
        ? `/dataroom/raw/${storage.getUserId()}/${id || ''}`
        : `/issuance/dso/dataroom/logo/raw/${id}`
    );

    setImgUrl(x);
  };

  useEffect(() => {
    if (edit) {
      if (logo) {
        setPhoto(logo);
      }

      return;
    }

    if (dsoId) {
      setPhoto(dsoId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, dsoId, logo]);

  return (
    <div
      className={classes.logo}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        margin: '0 auto',
      }}
    />
  );
};

export default DsoImage;
