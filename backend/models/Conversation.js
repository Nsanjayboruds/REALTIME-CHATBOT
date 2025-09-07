import mongoose from "mongoose";
// import { User } from "./User.";

const schema = mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },

    
},
   {
    timestamps: true,
   }

);

export const Conversation = mongoose.model("Conversation", schema);