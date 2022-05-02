import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const animes = await prisma.anime.findMany()
  const rand = Math.floor(Math.random() * animes.length)
  return res.json(animes.slice(rand, rand + 1)[0])
}
