import { Spinner } from '@nextui-org/react';
import React from 'react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center vertical-center'>
      <Spinner
        color='secondary'
        labelColor='secondary'
        label='Loading...'
      />
    </div>
  );
}
