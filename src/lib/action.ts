'use server';

import { z } from 'zod';
import prisma from '../lib/prisma';
import { redirect } from 'next/navigation';
import { FormState } from './definition';

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
      .min(0) // 允许为空
      .max(32) // 最大长度限制为32
      .refine(value => value === '' || /^[a-zA-Z0-9_-]{4,32}$/.test(value), {
        message: 'Custom back-half must be a string of 4 to 32 characters consisting of letters, numbers, _, or -',
      }), // 自定义校验规则
});

export async function createLink(prevState: FormState, formData: FormData) {
  try {
    console.log('createLink', formData.get('destination'));
    const parsedData = FormSchema.parse({
      destination: formData.get('destination'),
      title: formData.get('title') || undefined,
      backHalf: formData.get('backHalf'),
    });

    let backHalf = parsedData.backHalf;
    let checkRepeated = false;
    if (!backHalf) {
      backHalf = generateRandomBackHalf();
      // 校验不能重复 如果重复 则重试 10 次
      for (let i = 0; i < 10; i++) {
        const existingLink = await prisma.link.findFirst({ where: { backHalf } });
        if (existingLink) {
          backHalf = generateRandomBackHalf();
        } else {
          checkRepeated = true;
          break;
        }
      }
    } else {
      backHalf = backHalf.trim();
    }

    // 兜底校验不能重复
    if (!checkRepeated) {
      const existingLink = await prisma.link.findFirst({ where: { backHalf } });
      if (existingLink) {
        return { hasError: true, message: `Link ${backHalf} already exists` } as FormState;
      }
    }

    // 使用 Prisma 将数据保存到数据库
    await prisma.link.create({
      data: {
        destination: parsedData.destination,
        title: parsedData.title,
        backHalf
      },
    });

    redirect('/link/' + backHalf);
    //return { hasError:false, message: `Added link ${backHalf}` } as FormState;
  } catch (e) { 
    if (e instanceof z.ZodError) {
      return { hasError:true, message: e.errors[0].message } as FormState;
    }

    console.error(e);
    return { hasError:true, message: `Failed to create link` } as FormState;
  }
}

export async function getLink(backHalf: string) {
  return await prisma.link.findFirst({where: {backHalf}});
}