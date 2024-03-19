"use server"

import DietComponent from "./diet"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function MainDiet()
{
    const session = await getServerSession(authOptions);
    console.log(session)
    return (
        <DietComponent options={session}></DietComponent>
    )
}