import React from 'react';
import { PasswordResetProvider } from './PasswordResetContext';
import Reset from './Reset';

export default () => {
  return (
    <PasswordResetProvider>
      <Reset />
    </PasswordResetProvider>
  );
};
