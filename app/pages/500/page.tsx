'use client';

import Error from '@/app/ui/error';
 
export default function InternalServerError() {
  return (
    <Error 
      message='500 Internal Server Error'
      details='Server-side error occurred'
    />
  );
}