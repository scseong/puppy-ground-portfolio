'use client';

import dynamic from 'next/dynamic';

const LazyToast = dynamic(
  async () => {
    await import('react-toastify/dist/ReactToastify.css');
    const mod = await import('react-toastify');
    return mod.ToastContainer;
  },
  { ssr: false }
);

export default LazyToast;
