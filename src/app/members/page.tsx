import Link from 'next/link';
import React from 'react';

export default function MembersPage() {
  return (
    <div>
      <h1 className='text-3xl'>This will be the members page</h1>
      <Link href='/'>Go to home</Link>
    </div>
  );
}
