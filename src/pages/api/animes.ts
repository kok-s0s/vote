import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  const animes = await prisma.anime.findMany({
    orderBy: [
      {
        count: 'desc',
      },
    ],
  })

  if (body === 'len')
    return res.json(animes.length)

  return res.json(animes)
}
