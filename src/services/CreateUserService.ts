import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

interface CreateUserProps {
  name: string;
  email: string;
}

class CreateUserService {
  async execute({name, email}: CreateUserProps) {
    if (!name) {
      throw new Error('Name invalid');
    }

    if (!email) {
      throw new Error('Email invalid');
    }

    const userAlreadyExists = await prisma.user.findFirst({where: {email}});

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const data = await prisma.user
      .create({
        data: {name, email},
      })
      .catch(e => {
        throw new Error('Error creating user');
      })
      .finally(() => prisma.$disconnect());

    return data;
  }
}

export {CreateUserService};