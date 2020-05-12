import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { getRequest } from 'services/httpRequests';

export default function ImageFromApi({ url }) {
  const [localUrl, setLocalUrl] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getRequest(url)
      .then((res) => res.blob())
      .then((blob) => setLocalUrl(URL.createObjectURL(blob)))
      .catch(setError);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return localUrl ? (
    <Box
      component="img"
      src={localUrl}
      alt=""
      maxWidth="16rem"
      maxHeight="16rem"
      height=" auto"
      width="auto"
    />
  ) : (
    <span>({error ? 'Failed to load image' : 'Loading image...'})</span>
  );
}
