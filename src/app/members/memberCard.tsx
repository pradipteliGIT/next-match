import { calculateAge } from '@/lib/util';
import { Card, CardFooter, Image } from '@nextui-org/react';
import { Member } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type Props = {
  member: Member;
};

export default function MemberCard({ member }: Props) {
  return (
    <Card
      fullWidth
      as={Link}
      isPressable
      href={`members/${member.userId}`}
    >
      <Image
        isZoomed
        alt={member.name}
        src={member.image || '/images/user.png'}
        width={300}
        className='aspect-square object-cover'
      />
      <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
        <div className='flex flex-col text-white'>
          <span className='text-semibold'>
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className='text-sm'>{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
