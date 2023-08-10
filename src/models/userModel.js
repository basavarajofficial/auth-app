import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    username : {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email : {
        type : String,
        unique : [true, 'Email already exists!'],
        required : [true, 'Email is required!'],
    },
    password : {
        type : String,
        required : [true, 'Password is required!'],
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,

})

const User = models.User || model("User", UserSchema);

export default User;