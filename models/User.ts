import mongoose,{Sch ema,model,models} from "mongoose";
import bcrypt from "bcryptjs";
import { time } from "console";
import { create } from "domain";

export interface IUser {
    email:string,
    password:string,
    _id?:string,
    createdAt?:Date,
    updatedAt?:Date
}

const userSchema = new Schema<IUser>(
    {
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    },
    {
        timestamps:true
    }
);

// what is does - this is a middleware , it will run before save , and it will hash the password , if the password is modified
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
    }
    next();
})

const User = models?.User || model<IUser>("User",userSchema);

export default User;


