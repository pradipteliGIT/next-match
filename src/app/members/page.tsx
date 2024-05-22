import Link from 'next/link';
import React from 'react';
import { getMembers } from '../actions/membersActions';
import MemberCard from './memberCard';

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl-gird-cols-6 gap-8'>
      {members &&
        members.map((member) => (
          <MemberCard
            member={member}
            key={member.id}
          />
        ))}
    </div>
  );
}
