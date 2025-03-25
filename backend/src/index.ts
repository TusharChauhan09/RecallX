import express, { query } from 'express';
import { Request, Response } from "express";
import dotenv from 'dotenv';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import cookieParser from "cookie-parser";

import { Users }  from './models/users.model';
import { connectDB } from './lib/db';
import {genToken} from './lib/token';
import {authMiddleware} from './middleware/auth.middleware'
import { Content }  from './models/contents.model';
import { Links } from './models/links.model';
import { random } from './util/random.util';

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cookieParser());

// signup route
app.post('/api/v1/signup', async (req: Request, res: Response) : Promise<any> =>{
    const requiredBody = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(3).max(20)
    });

    const parseBodyWithSuccess = requiredBody.safeParse(req.body);
    if(!parseBodyWithSuccess.success){
        return res.status(402).json({
            message: "Incorrect input format",
            error: parseBodyWithSuccess.error
        });
    }
    
    const {username , password} = parseBodyWithSuccess.data ;

    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password,salt);
    
        await Users.create({
            username: username,
            password: passwordHashed
        })
    
        return res.json({
            message: "User signed up",
        })
    }
    catch(error: any){
        res.status(500).json({
            message: "Server error!!!"
        });
        console.log("error in signup controller",error.message);
    }
});

// signin route
app.post('/api/v1/signin', async (req : Request,res: Response) : Promise<any> =>{
    const requiredBody = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(3).max(20)
    });

    const parseBodyWithSuccess = requiredBody.safeParse(req.body);
    if(!parseBodyWithSuccess.success){
        return res.status(402).json({
            message: "Incorrect input format",
            error: parseBodyWithSuccess.error
        });
    }
    
    const {username , password} = parseBodyWithSuccess.data ;

    try{
        const user = await Users.findOne({username: username});
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const passwordCheck = await bcrypt.compare(password , user.password! );
        if(!passwordCheck){
            return res.status(400).json({
                message: "Invalid credentials"
               });
        }

        const token = genToken( user._id , res);

            return res.status(201).json({
            _id: user._id,
            username : user.username,
            password: user.password,
            token: token,
        })
    }
    catch(error: any ){
        console.log("Error in login controller",error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

});

app.use(authMiddleware);

// post content route 
app.post('/api/v1/content' , async (req : Request,res: Response) =>{
    try {
        const { link, type } = req.body;
        // @ts-ignore
        const userId = req.userId;

        await Content.create({
            link,
            type,
            userId,
            tags: []
        });

        res.status(200).json({
            message: "Contents added"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while adding content"
        });
    }

});

// get content route
app.get('/api/v1/content', async (req,res)=>{
    // @ts-ignore
    const userId = req.userId;

    const content = await Content.find({
        userId: userId
        // populate() : to bring all the data of the userId  and select: just username if not mention then all content selected
    }).populate({
        path: "userId",
        select: "username"
    });

    res.status(200).json({
        message : content
    })

});

// delete content route 
app.delete('/api/v1/delete', async (req,res)=>{
    const contentId = req.body.contentId;

    await Content.deleteOne({
        contentId,
        // @ts-ignore
        userId: req.userId
    })
});

// post / share brain route 
app.post('/api/v1/brain/share', async (req,res)=>{
    const share = req.body.share;  // true / false 
    try{
        if(share){
            const hash = random(10)
            await Links.create({
                hash:  hash ,
                // @ts-ignore
                userId: req.userId
            })
            res.status(200).json({
                message: "link genrated at: /share/" + hash
            })
        }
        else{
            await Links.deleteOne({
                // @ts-ignore
                userId: req.userId
            }) 
            res.status(200).json({
                message: "Removed link"
            })
        }
    }
    catch(err)
    {
        res.status(400).json({
            message: "Action is repreated"
        })
        return   
    }

});

// post / share using id route 
app.get('/api/v1/brain/:shareLink', async (req,res)=>{    
    const hash = req.params.shareLink;
    const link = await Links.findOne({
        hash: hash
    });

    if(!link){
        res.status(411).json({
            message: "Sorry link not found!"
        });
        return ;
    }

    const constentShare = await Content.find({
        userId :  link.userId
    })

    const userShare = await Users.findOne({
        _id :  link.userId
    })

    if(!constentShare || !userShare){
        res.status(400).json({
            message : " No content or user found present!"
        })  
        return;  
    }

    res.status(200).json({
        username: userShare.username,
        constent: constentShare
    })
    
});

app.listen(PORT,()=>{
    console.log("listening on PORT : "+PORT);
    connectDB();
})