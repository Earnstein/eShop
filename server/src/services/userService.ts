import User from "../models/userModel";


export const getUsersHandler = async () => {
    return await User.find({})
}