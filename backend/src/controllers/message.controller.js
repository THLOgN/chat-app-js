import User from "../models/user.model";
import Messgage from "../models/message.model.js";


export const getUsersForSidebar = async (req, res) => {

};

export const getMessage = async(req, res ) => {
    try {
        const {id : userToChatId} = req.params;
        const senderId = req.user._id;
        
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}

            ]  
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // Upload base 64 image to cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;

        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        //

        res.status(201).json(newMessage);

    } catch (error) {
         console.log("Error in sendMessage controller: ", error.message);
         res.status(500).json({message: "Internal Server Error"});
    }
};