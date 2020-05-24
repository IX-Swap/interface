import React, { useState } from 'react';
import IdentityForm from './IdentityForm';
import type { IdentityProfile } from '../modules/types';

const ArrayForm = ({
  rootName,
  data,
  editMode,
}: {
  rootName: string,
  data: IdentityProfile[],
  editMode: boolean,
}) => {
  // TODO: Add/Subtract forms
  const [count] = useState(1);

  if (editMode) {
    return [...Array(count)].map((_, i) => {
      const name = `${rootName}[${i}]`;
      return <IdentityForm key={name} rootName={name} />;
    });
  }

  if (data) {
    return data.map((identity, i) => {
      const name = `${rootName}[${i}]`;
      return <IdentityForm identity={identity} key={name} rootName={name} />;
    });
  }

  return <>loading...</>;
};

export default ArrayForm;
