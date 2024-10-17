const appDataSource = require("../dataSource");
const userCredentials = require("../entity/user_credentials");
import { deleteUserById } from './userInfo'


const getUserByEmail = async (email) => {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const user = await userCredentialsRepository.findOne({
        where: { email },
    });
    return user;
}

const deleteUserByEmail = async (email) => {
    const user = await getUserByEmail(email);
    await deleteUserById(user.id);
    await userCredentialsRepository.remove(user);
    return true;
}


module.exports = {
    getUserByEmail,
    deleteUserByEmail
};

