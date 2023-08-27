import {getServerSession} from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options'
import prisma from '@/app/libs/prismadb'

export async function getSession(){
    return await getServerSession(options);
}

export default async function getCurrentUser() {
    try {

        const session = await getSession();
    
        if(!session?.user?.email) {
            return null
        }
    
        const currentUser = await prisma.user.findFirst({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null
        }

        return currentUser

    } catch(error: any) {
        return null
        
    }
}