import ReactQueryProviders from '@/utils/ReactQueryProviders';
import React, { Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Footer, Header } from '../_components/layout';
import HeaderLoading from '../_components/layout/loading/HeaderLoading';
import LazyToastContainer from '@/app/_components/layout/loading/LazyToastContainer';

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
      <Suspense fallback={<HeaderLoading />}>
        <Header />
      </Suspense>
      {children}
      {modal}
      <Suspense>
        <LazyToastContainer />
      </Suspense>
      <Footer />
    </ReactQueryProviders>
  );
}

export default ProvidersLayout;
