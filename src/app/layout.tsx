import '@/styles/globals.css';
import { Metadata } from 'next';
import ReduxProvider from '@/redux/ReduxProvider';

export const metadata: Metadata = {
  title: 'RSSchool | NextJS',
  description: 'Description main page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
