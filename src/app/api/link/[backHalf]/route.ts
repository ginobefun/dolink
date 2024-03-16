'use server';

import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const backHalf = req.nextUrl.pathname.split('/').pop();
    try {
        const link = await prisma.link.findFirst({
            where: { backHalf },
        });

        if (!link) {
            return new Response(null, { status: 404 });
        }

        return new Response(JSON.stringify(link), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}
