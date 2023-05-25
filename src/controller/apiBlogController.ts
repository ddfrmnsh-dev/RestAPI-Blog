import express, { Request, Response, NextFunction  } from "express";
import { PrismaClient } from "@prisma/client";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
    RequestError,
    UnauthorizedError
} from "../error/RequestErrorCollection"
const prisma = new PrismaClient();

async function getFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
    const posts = await prisma.post.findMany({
        include: { author: true }
    })
    try{
        res.json(posts)

    } catch(error){
        res.status(error.status).send({
            error : {
                status : error.status,
                message : error.message
            }
        })
    }
}

async function insertPost( req:Request, res:Response) {
    

    try{
        const { content, authorEmail } = req.body
        const result = await prisma.post.create({
            data: {
                content,
                author: {
                    connect: { email: authorEmail}
                }
            }
        })
        res.json(result)

    } catch(error){
        // res.status(error.status).send({
        //     error : {
        //         status : error.status,
        //         message : error.message
        //     }
        // })
        res.json({
            error : {
                message: error.message
            }
        })
    }

}

async function getPostById( req:Request, res:Response, next: NextFunction) {
    const {id} = req.params
    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
    })
    
    try{
        res.json(post)

    } catch(error){
        res.status(error.status).send({
            error : {
                status : error.status,
                message : error.message
            }
        })
    }
}

async function updatePostById( req:Request, res:Response) {
    const {id} = req.params
    const post = await prisma.post.update({
        where: { id: Number(id) },
        data: {
            ...req.body
        }
    })
    console.log("ini data", post)
    try{
        res.json(post)
    } catch(error){
        res.json({
            error: {
                message : error.message
            }
        })
    }
}

async function deletePostById( req:Request, res:Response): Promise<void> {
    const { id } = req.params
    const post = await prisma.post.delete({
        where: { id: Number(id) }
    })
    try{
        res.json({
            post: post,
            message: "Post Deleted Successfully"
        })
    } catch(error) {
        res.json({
            error: {
                message: error.message
            }
        })
    }
}

async function insertUser(req:Request, res:Response) {
    // const {email, username, name} = req.body
    // const result = await prisma.user.create({
    //     data: { 
    //         email: email,
    //         username: username,
    //         name: name
    //     }
    // })
    const result = await prisma.user.create({
        data: { ...req.body }
      })
      console.log("data user", result)
    try{
        res.json(result)

    } catch(error){
        res.status(error.status).send({
            error:  {
                status: error.status,
                message: error.message
            }
        })
    }
}

async function getUserById( req:Request, res:Response) {
    const { username } = req.params
    const user = await prisma.user.findUnique({
        where: { username: String(username) }
    })

    try{
        res.json(user)

    } catch(error){
        res.json({
            error : {
                message : error.message
            }
        })
    }
}

export default {
    getFeed,
    insertPost,
    getPostById,
    updatePostById,
    deletePostById,
    insertUser,
    getUserById
}