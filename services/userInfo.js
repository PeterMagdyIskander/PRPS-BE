const appDataSource = require("../dataSource");
const userInfo = require("../entity/user_info");

const deleteUserById = async (id) => {
    const userInfoRepository = appDataSource.getRepository(userInfo);
    const userInfoObject = await userInfoRepository.findOne({
        where: { userCredentialsId: id },
    });
    await userInfoRepository.remove(userInfoObject);
}

const createAccountInfo=()=>{
    
}

module.exports = {
    deleteUserById,
    createAccountInfo
};
