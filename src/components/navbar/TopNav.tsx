import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { GiMatchTip } from 'react-icons/gi';
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';

export default async function TopNav() {
  const session = await auth();
  return (
    <Navbar
      maxWidth='xl'
      className='bg-gradient-to-r from-purple-400 to bg-purple-700'
      classNames={{
        item: [
          'text-xl',
          'text-white',
          'uppercase',
          'data-[active=true]:text-yellow-200',
        ],
      }}
    >
      <NavbarBrand
        as={Link}
        href='/'
      >
        <GiMatchTip
          className='text-gray-200'
          size={40}
        />
        <div className='font-bold text-3xl flex'>
          <span className='text-gray-900'>Next</span>
          <span className='text-gray-200'>Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavLink
          href='/members'
          label='members'
        />
        <NavLink
          href='/lists'
          label='lists'
        />
        <NavLink
          href='/messages'
          label='messages'
        />
      </NavbarContent>
      <NavbarContent justify='end'>
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Button
              variant='bordered'
              className='text-white'
              as={Link}
              href='/login'
            >
              Login
            </Button>
            <Button
              variant='bordered'
              className='text-white'
              as={Link}
              href='/register'
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
