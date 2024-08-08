import { CoreProvider } from 'core/CoreProvider';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import 'shared/styles/global.scss';

export const metadata: Metadata = {
  title: 'react project',
  description: 'Star Wars project',
  icons: {
    icon: '/icon.svg',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </CoreProvider>
  );
};

export default RootLayout;
