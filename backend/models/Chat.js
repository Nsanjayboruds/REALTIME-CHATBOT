import mongoose from "mongoose";
// import { User } from "./User";

const schema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    latestMessage:{
        type: String,
        default:"New Chat",
    },

    
},
   {
    timestamps: true,
   }

);

export const Chat = mongoose.model("Chat", schema);