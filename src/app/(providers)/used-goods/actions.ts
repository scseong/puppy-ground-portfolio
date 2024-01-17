'use server';

import { redirect } from 'next/navigation';

// TODO: query string 숫자 -> 문자
export const handleSubmit = async (formData: FormData) => {
  const queryString = new URLSearchParams(formData as never).toString();
  const query = queryString.includes('ACTION_ID')
    ? queryString.substring(queryString.indexOf('=&') + 2)
    : queryString;

  redirect(`/used-goods?${query}`);
};
