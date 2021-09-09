import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

import {CreateUserController} from './controllers/CreateUserController';

const router = Router();

const createUserController = new CreateUserController();

router.post('/user', createUserController.handle);
router.get('/user', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

export {router};