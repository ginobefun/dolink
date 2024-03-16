'use server';

import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

const GENERATE_LENGTH: number = 5;
const MAX_ATTEMPTS = 10;

function generateRandomBackHalf() {
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let backHalf = '';
    for (let i = 0; i < GENERATE_LENGTH; i++) {
        backHalf += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return backHalf;
}

const CreateLinkReq = z.object({
    destination: z.string().url().max(200, "The destination URL must be less than 200 characters"),
    title: z.string().max(100, "The title must be less than 100 characters").optional(),
    backHalf: z.string().optional().refine(value => !value || /^[a-zA-Z0-9_-]{4,32}$/.test(value), {
        message: 'Custom back-half must be a string of 4 to 32 characters consisting of letters, numbers, _, or -',
    }),
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log('createLink', data);
        const parsedData = CreateLinkReq.parse(data);

        let backHalf = parsedData.backHalf || generateRandomBackHalf();
        if (!parsedData.backHalf) {
            let attempts = 0;
            let isUnique = false;
            while (attempts < MAX_ATTEMPTS && !isUnique) {
                const existingLink = await prisma.link.findFirst({ where: { backHalf } });
                if (!existingLink) {
                    isUnique = true;
                } else {
                    backHalf = generateRandomBackHalf();
                    attempts++;
                }
            }

            if (!isUnique) {
                return new NextResponse(JSON.stringify({ message: `Failed to generate a unique back-half after several attempts.` }), { status: 500 });
            }
        }

        await prisma.link.create({
            data: {
                destination: parsedData.destination,
                title: parsedData.title || '',
                backHalf
            },
        });

        return new NextResponse(JSON.stringify({ backHalf }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        if (e instanceof z.ZodError) {
            return new NextResponse(JSON.stringify({ message: e.errors[0].message }), { status: 400 });
        }

        console.error(e);
        return new NextResponse(JSON.stringify({ message: `Failed to create link` }), { status: 500 });
    }
}
