import mongoose, {Document, Model, Models, Schema, model, models} from 'mongoose'

export interface IUser extends Document{
    _id:  mongoose.Types.ObjectId
    email: string,
    username: string,
    image:string
}

const UserSchema = new Schema({
    email: {
        type: String, 
        unique: [true, 'email already exist!'],
        required: [true, 'email is required!']
    },
    username:{
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"] 
    },
    image:{
        type: String
    }

})

const User:Model<IUser> = models.User || model<IUser>("User", UserSchema)
export default User