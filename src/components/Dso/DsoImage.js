import React, { useState, useEffect } from 'react';
import type { Document } from 'context/dso/types';
import { makeStyles } from '@material-ui/styles';
import { getImgUrl } from 'services/httpRequests';

const useStyles = makeStyles(() => ({
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0',
  },
}));

const DsoImage = ({ documents }: { documents: Array<Document> }) => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState('');

  const image = (documents || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.updatedAt))
    .find((e) => e.type === 'tokenLogo');

  const setPhoto = async (user, id) => {
    const x = await getImgUrl(`/dataroom/raw/${user}/${id || ''}`);

    setImgUrl(x);
  };

  useEffect(() => {
    if (image) {
      setPhoto(image.user, image._id);
    }
  }, [image]);

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
