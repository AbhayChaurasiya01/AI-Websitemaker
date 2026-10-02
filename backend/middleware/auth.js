import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

// to creata a jwt token valid for 30 days
export function signToken(userId) { 
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set");
        return jwt.sign({sub:userId}, secret, {expiresIn: process.env.jwt_expiration || "30d"          
        });
}

// to check and validate user is loggedin or not
export async function requireAuth(req,res,next){
    try{
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer") ? header.slice(7):null;
        if(!token) return res.status(401).json({error:"Missing token"});

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.sub);
        if (!user) return res.status(401).json({error:"User not found"});
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({error:"Invalid or expired token"});
    }
}

// if  token found attach the token else make it anonymous
export async function optionalAuth(req,res,next){
    try{
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer") ? header.slice(7):null;

        if(token) {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(payload.sub);
            if(user) req.user=user;
        }
    }
    catch{
        //invalid token, ignore and continue as anonymous
    }
    next();
}