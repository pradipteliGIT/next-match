import { getMemberPhotosByUserId } from '@/app/actions/membersActions';
import { CardBody, CardHeader, Divider, Image } from '@nextui-org/react';
import React from 'react';

export default async function PhotosPage({
  params,
}: {
  params: { userId: string };
}) {
  const photos = await getMemberPhotosByUserId(params.userId);
  return (
    <>
      <CardHeader className='text-xl font-semibold text-secondary'>
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-col-5 gap-3'>
          {photos &&
            photos?.map((photo) => (
              <div key={photo.id}>
                <Image
                  alt='user photo'
                  src={photo.url}
                  key={photo.id}
                  height={100}
                  width={100}
                  className='object-cover aspect-square'
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
