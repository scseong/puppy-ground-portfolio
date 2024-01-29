import ReactQueryProviders from '@/utils/ReactQueryProviders';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Footer, Header } from '../_components/layout';

function ProvidersLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ReactQueryProviders>
      <ReactQueryDevtools initialIsOpen={false} />
      <Header />
      {children}
      {modal}
      <ToastContainer />
      <Footer />
    </ReactQueryProviders>
  );
}

export default ProvidersLayout;
