import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';

export default function ChatPage() {
  return (
    <>
      <CardHeader className='text-xl font-semibold text-secondary'>
        Chat
      </CardHeader>
      <Divider />
      <CardBody>chat goes here</CardBody>
    </>
  );
}
