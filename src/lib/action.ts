'use server';
import prisma from '../lib/prisma';

export async function getLink(backHalf: string) {
  return await prisma.link.findFirst({where: {backHalf}});
}