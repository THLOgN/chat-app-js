import User from "../models/user.model";
import Messgage from "../models/message.model.js";




export const getUsersForSidebar = async (req, res) => {

};

export const getMessage = async(req, res ) => {
    try {
        const {id : userToChatId} = req.params;
        const senderId = req.user._id;
        
        const messages = await Message.find({
            $or:{
                {send}
            }
        })

    } catch (error) {
        
    }
}