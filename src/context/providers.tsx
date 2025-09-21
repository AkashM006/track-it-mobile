import React, { ReactNode } from 'react';
import { UserProvider } from './user.context';
import { CommonUIProvider } from './commonUI.context';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CommonUIProvider>
      <UserProvider>{children}</UserProvider>
    </CommonUIProvider>
  );
};

export default Providers;
