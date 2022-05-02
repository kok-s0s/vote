import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const animes = await prisma.anime.findMany()
  let rand = Math.floor(Math.random() * animes.length)

  if (Object.keys(req.body).length === 1) {
    const { first } = req.body

    while (first.id === animes.slice(rand, rand + 1)[0].id)
      rand = Math.floor(Math.random() * animes.length)
  }
  else if (Object.keys(req.body).length === 2) {
    const { pendingUpgrade, changeless } = req.body

    const curAnime = await prisma.anime.findUnique({
      where: {
        id: changeless.id,
      },
    })

    await prisma.anime.update({
      where: {
        id: changeless.id,
      },
      data: {
        count: curAnime !== null ? curAnime.count + 1 : 0,
      },
    })

    while (pendingUpgrade.id === animes.slice(rand, rand + 1)[0].id || changeless.id === animes.slice(rand, rand + 1)[0].id)
      rand = Math.floor(Math.random() * animes.length)
  }

  return res.json(animes.slice(rand, rand + 1)[0])
}
