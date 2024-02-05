import prisma from '../../../prisma/prisma-client';

interface IdQueryObject {
  id: number
}

export async function getNewText() {
  const ids: IdQueryObject[] = await prisma.originalText.findMany({
    select: {
      id: true,
      content: false,
    },
  });
  const chosenId = ids[Math.floor(Math.random() * ids.length)].id;
  const chosenText: string = (await prisma.originalText.findUnique({
    where: {
      id: chosenId
    },
    select: {
      id: false,
      content: true
    },
  })).content;

  return chosenText;
}