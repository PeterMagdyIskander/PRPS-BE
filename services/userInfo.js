const appDataSource = require("../dataSource");
const userInfo = require("../entity/user_info");

const deleteUserById = async (id) => {
    const userInfoRepository = appDataSource.getRepository(userInfo);
    const userInfoObject = await userInfoRepository.findOne({
        where: { userCredentialsId: id },
    });
    await userInfoRepository.remove(userInfoObject);
}

const createAccountInfo = async (userCredentials) => {
    const userInfoRepository = appDataSource.getRepository(userInfo);
    const userInfo = userInfoRepository.create({
        firstName,
        lastName,
        phoneNumber,
        gender,
        track,
        city,
        street,
        dob,
        educationLevel,
        schoolName,
        major,
        graduationYear,
        nationalId,
        signature,
        userCredentials,
    });
    await userInfoRepository.save(userInfo);
}

module.exports = {
    deleteUserById,
    createAccountInfo
};
