import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants';
import { UploaderLBP } from 'pages/KYC/common';
import { FormGrid } from 'pages/KYC/styleds';
import React, { useState } from 'react';
import { useShowError } from 'state/application/hooks';

export default function Branding() {
  const [values, setValues] = useState<any>({
    LBPLogo: null,
    LBPBanner: null
  });
  const showError = useShowError();

  const handleDropImage = (acceptedFile: any, key: string) => {
    const file = acceptedFile;
    if (file?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR);
    } else if (values[key]) {
      showError("You can only upload one image at a time.");
    } else {
      setValues({ ...values, [key]: file });
    }
  };

  const handleImageDelete = (key: string) => {
    setValues({ ...values, [key]: null });
  };

  return (
    <>
      <FormGrid columns={2}>
        <UploaderLBP
          title=""
          files={values.LBPLogo ? [values.LBPLogo] : []}
          onDrop={(file) => {
            handleDropImage(file, 'LBPLogo');
          }}
          handleDeleteClick={() => {
            handleImageDelete('LBPLogo');
          }}
        />
        <UploaderLBP
          title=""
          files={values.LBPBanner ? [values.LBPBanner] : []}
          onDrop={(file) => {
            handleDropImage(file, 'LBPBanner');
          }}
          handleDeleteClick={() => {
            handleImageDelete('LBPBanner');
          }}
        />
      </FormGrid>
    </>
  );
}
