'use server';

import { z } from 'zod';
import prisma from '../lib/prisma';
import { redirect } from 'next/navigation';

const GENERATE_LENGTH:number = 5;

  // 函数来生成随机 backHalf
  function generateRandomBackHalf() {
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let backHalf = '';
    for (let i = 0; i < GENERATE_LENGTH; i++) {
      backHalf += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return backHalf;
  }

const FormSchema = z.object({
  destination: z.string().url(), // 校验为有效的 URL
  title: z.string().optional(), // 可选字段
  backHalf: z.string()
              .regex(/^[a-zA-Z0-9-_]*$/) // 只允许字母数字以及短横线和下划线
              .max(32)// 最大长度限制为32
              .optional(), //可选
});

export async function createLink(formData: FormData) {
  console.log('createLink', formData.get('destination'));
  const parsedData = FormSchema.parse({
    destination: formData.get('destination'),
    title: formData.get('title') || undefined,
    backHalf: formData.get('backHalf'),
  });

  let backHalf = parsedData.backHalf;
  if(!backHalf){
    backHalf = generateRandomBackHalf();
  } else {
    backHalf = backHalf.trim();
  }

  // TODO: 校验不能重复

  // 使用 Prisma 将数据保存到数据库
  await prisma.link.create({
    data: {
      destination: parsedData.destination,
      title: parsedData.title,
      backHalf
    },
  });

  redirect('/link/'+parsedData.backHalf);
}

export async function getLink(backHalf: string) {
  return await prisma.link.findFirst({where: {backHalf}});
}