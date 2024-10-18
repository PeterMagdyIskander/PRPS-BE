const appDataSource = require("../dataSource");
const userCredentials = require("../entity/user_credentials");
import { deleteUserById, createAccountInfo } from './userInfo'


const getUserByEmail = async (email) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const user = await userCredentialsRepository.findOne({
        where: { email },
    });
    return user ? user : "User is not found.";
}
const getAllUserDataByEmail = async (email) => {
    const userInfoRepository = appDataSource.getRepository(userInfo);
    const userCredentials = await getUserByEmail(email);
    if (!userCredentials) return "User is not found.";
    const userInfo = await userInfoRepository.findOne({
        where: { userCredentialsId: userCredentials.id },
        relations: ["userCredentials"],
    });
    if (!userInfo) return "User is not found.";
    return userInfo;
}
const deleteUserByEmail = async (email) => {
    const user = await getUserByEmail(email);
    if (!user) return "User is not found."
    await deleteUserById(user.id);
    await userCredentialsRepository.remove(user);
    return true;
}
const createAccount = async (email, password) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const userCredentials = userCredentialsRepository.create({
        email,
        password,
        role: "account",
    });
    await userCredentialsRepository.save(userCredentials);
    await createAccountInfo(userCredentials);
    return true;
}
const updatePassword = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) return "User is not found.";
    user.password = password;
    await userCredentialsRepository.save(user);
    return "Password updated successfully."
    
}
module.exports = {
    getUserByEmail,
    deleteUserByEmail,
    createAccount,
    getAllUserDataByEmail,
    updatePassword
};

