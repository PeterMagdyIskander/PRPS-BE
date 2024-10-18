import { appDataSource } from "../dataSource.js"
import user_info from "../entity/user_info.js";

const deleteUserById = async (id) => {
    const userInfoRepository = appDataSource.getRepository(user_info);
    const userInfoObject = await userInfoRepository.findOne({
        where: { userCredentialsId: id },
    });
    await userInfoRepository.remove(userInfoObject);
}

const createAccountInfo = async (userCredentials, userObject) => {
    const userInfoRepository = appDataSource.getRepository(user_info);
    const userInfo = userInfoRepository.create({
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        phoneNumber: userObject.phoneNumber,
        gender: userObject.gender,
        track: userObject.track,
        city: userObject.city,
        street: userObject.street,
        dob: userObject.dob,
        educationLevel: userObject.educationLevel,
        schoolName: userObject.schoolName,
        major: userObject.major,
        graduationYear: userObject.graduationYear,
        nationalId: userObject.nationalId,
        signature: userObject.signature,
        userCredentials: userCredentials,
    });
    try {
        await userInfoRepository.save(userInfo);
        return true;
    }catch(err) {
        return false;
    }
}
const getAllUserDataByUserCredentialsId = async (userCredentialsId) => {
    const userInfoRepository = appDataSource.getRepository(user_info);
    const userInfo = await userInfoRepository.findOne({
        where: { userCredentialsId },
        relations: ["userCredentials"],
    });
    return userInfo;
}
export {
    deleteUserById,
    createAccountInfo,
    getAllUserDataByUserCredentialsId
};
