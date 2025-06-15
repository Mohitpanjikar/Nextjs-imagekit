import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";

// TODO -  get data from frontend -validation check , existing user check,crete user in db , return success response
export async function POST(request:NextRequest){
    try{
        const {email,password} = await request.json();

        if(!email || !password){
            return NextResponse.json({error:"Email and password are required"},{status:400});
        }

        await connectDB();
        const ExistingUser = await User.findOne({email});

        if(ExistingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        await User.create({email,password});
        return NextResponse.json({message:"User created successfully"},{status:201});


    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Something went wrong"},{status:500});
    }
}