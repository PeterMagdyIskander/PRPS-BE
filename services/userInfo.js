const appDataSource = require("../dataSource");
const userInfo = require("../entity/user_info");

const deleteUserById = async (id) => {
    const userInfoObject = await userInfoRepository.findOne({
        where: { userCredentialsId: id },
    });
    await userInfoRepository.remove(userInfoObject);
}

module.exports = {
    deleteUserById
};
