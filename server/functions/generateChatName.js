import { User } from "../models/User.js";

export const generateChatName = async (senderUserId, recipientUserId) => {

    const senderUserDoc = await User.findById(senderUserId);
    const recipientUserDoc = await User.findById(recipientUserId);

    return `${senderUserDoc.username}-${recipientUserDoc.username}-chat`
};
