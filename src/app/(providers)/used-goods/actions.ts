'use server';

import { redirect } from 'next/navigation';
import { SearchParams } from './page';

const formDataToQueryString = (formData: FormData) => {
  return new URLSearchParams(formData as never).toString();
};

// TODO: query string 숫자 -> 문자
export const handleSubmit = async (params: SearchParams, formData: FormData) => {
  const { query } = params;
  const queryString = formDataToQueryString(formData);

  if (query) return redirect(`/used-goods?${queryString}&query=${encodeURIComponent(query)}`);
  redirect(`/used-goods?${queryString}`);
};

export const handleSearch = async (formData: FormData) => {
  const query = formData.get('query')?.toString();
  if (!query) return;

  redirect(`/used-goods?query=${encodeURIComponent(query)}`);
};
