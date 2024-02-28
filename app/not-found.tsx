'use client';

import Error from '@/app/ui/error';
 
export default function NotFound() {
  return (
    <Error 
      message='404 Not Found'
      details='Could not find the requested page.'
    />
  );
}