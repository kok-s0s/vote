import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const animes = await prisma.anime.findMany({
    orderBy: [
      {
        count: 'desc',
      },
    ],
  })

  return res.json(animes)
}
