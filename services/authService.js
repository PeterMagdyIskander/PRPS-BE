import { appDataSource } from "../dataSource.js";
import userCredentials from "../entity/user_credentials.js";
import { deleteUserById, createAccountInfo, getAllUserDataByUserCredentialsId } from './userInfo.js';


// Get user by email
const getUserByEmail = async (email) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const user = await userCredentialsRepository.findOne({
        where: { email },
    });
    return user;
};

// Get all user data by email
const getAllUserDataByEmail = async (email) => {
    const userCredentials = await getUserByEmail(email);
    if (!userCredentials) return null;
    const userInfo = await getAllUserDataByUserCredentialsId(userCredentials.id);
    return userInfo;
};

// Delete user by email
const deleteUserByEmail = async (email) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials); // Declare repository
    const user = await getUserByEmail(email);
    if (!user) return "User is not found.";
    await deleteUserById(user.id);
    await userCredentialsRepository.remove(user);
    return true;
};

// Create a new account
const createAccount = async (email, password, userObject) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials); // Declare repository
    const userCredentials = userCredentialsRepository.create({
        email,
        password,
        role: "account",
    });
    try {
        await userCredentialsRepository.save(userCredentials);
        const accountAddedSuccessfully = await createAccountInfo(userCredentials, userObject);
        if (accountAddedSuccessfully) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error creating account:', error);
        return false;
    }
};

// Update password
const updatePassword = async (email, password) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials); // Declare repository
    const user = await getUserByEmail(email);
    if (!user) return "User is not found.";
    user.password = password;
    await userCredentialsRepository.save(user);
    return "Password updated successfully.";
};

// Export functions
export {
    getUserByEmail,
    deleteUserByEmail,
    createAccount,
    getAllUserDataByEmail,
    updatePassword
};