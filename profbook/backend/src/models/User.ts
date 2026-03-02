import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({

    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password:{
        type: String,
        required:true,
        minLength:8
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["student","professor"]
    }

});
userSchema.pre("save", async function() {
if(!this.isModified("password")){
    return;
}
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password, salt);
});

const User = model("User",userSchema);
export default User;