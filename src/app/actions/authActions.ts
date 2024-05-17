'use server';

import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schemas/loginSchema';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { status: 'success', data: 'Logged In' };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials' };
          break;
        default:
          return { status: 'error', error: 'Something went wrong' };
          break;
      }
    } else {
      return { status: 'error', error: 'Something else went wrong' };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function registerUser(
  userData: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    //This will validate our model on server side.
    const validated = registerSchema.safeParse(userData);
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }
    //If modal is valid then go and update database
    const { name, email, password } = validated.data;
    //This will has the password 10 is reasonable number to has.
    //Longer the number improves complexity and time to generate password.
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      return { status: 'error', error: 'User already registered with us' };
    //Here we are not using await se we returning async function.
    //If we store query result in variable then we can use await and return that variable
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return { status: 'success', data: user };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
