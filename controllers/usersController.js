
const appDataSource = require("../dataSource");
const userCredentials = require("../entity/user_credentials");
const userInfo = require("../entity/user_info");
var generator = require("generate-password");
const fs = require("fs");

const getUser = async (req, res) => {
  const email = req.params.email;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const userCredentialsRepository = appDataSource.getRepository(userCredentials);
  const user = await userCredentialsRepository.findOne({
    where: { email },
  });

  if (!user)
    return res
      .status(400)
      .json({ message: `Employee Id ${req.params.email} not found` });

  return res.json(user);
};

const deleteUser = async (req, res) => {
  const email = req.params.email;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const userCredentialsRepository = appDataSource.getRepository(userCredentials);
  const userCredentialsObject = await userCredentialsRepository.findOne({
    where: { email },
  });
  if (!userCredentialsObject) {
    return res.status(404).json({ message: "User not found" });
  }
  const userInfoRepository = appDataSource.getRepository(userInfo);
  const userInfoObject = await userInfoRepository.findOne({
    where: { userCredentialsId: user.id },
  });
  await userInfoRepository.remove(userInfoObject);
  await userCredentialsRepository.remove(user);
  return res.status(200).json({ message: "User deleted successfuly" });
};

const createAccount = async (req, res) => {
  const { company, occupation, firstName, lastName, email } = req.body;
  const userCredentialsRepository = appDataSource.getRepository(userCredentials);
  const userInfoRepository = appDataSource.getRepository(userInfo);

  try {
    // Create new user credentials
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const userCredentials = userCredentialsRepository.create({
      email,
      password,
      role: "account",
    });
    await userCredentialsRepository.save(userCredentials);

    // Create new user info linked to the user credentials
    const userInfo = userInfoRepository.create({
      firstName,
      lastName,
      company,
      occupation,
      approved: false,
      userCredentials,
    });
    await userInfoRepository.save(userInfo);

    res.status(201).json({ message: "Account Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user info." });
  }
};

const handleUpdatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "email and password are required" });
    }
    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    // Create new user credentials
    const user = await userCredentialsRepository.findOne({ where: { email: email } });

    if (user) {
      if (password === user.password) {
        return res.status(400).json({ message: "Please enter a new password" });
      }

      user.password = password;
      await userCredentialsRepository.save(user);

      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateEmail = async (req, res) => {
  const { email, newEmail } = req.body;
  try {
    if (!email || !newEmail) {
      console.log(email, newEmail);
      return res.status(404).json({ message: "email and newEmail are required" });
    }

    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const userInfoRepository = appDataSource.getRepository(userInfo); // Get UserInfo repository

    // Find the user based on email
    const user = await userCredentialsRepository.findOne({ where: { email: email } });

    // make sure that the new email doesn't exist
    const newEmailUser = await userCredentialsRepository.findOne({ where: { email: newEmail } });
    if (newEmailUser) {
      return res.status(404).json({ message: "New email already exists" });
    }

    if (user) {
      // Find the associated userInfo
      const userInfo = await userInfoRepository.findOne({
        where: { userCredentialsId: user.id },
      });

      if (userInfo) {
        // Update email in userCredentials
        user.email = newEmail;
        await userCredentialsRepository.save(user);

        res.status(200).json({ message: "Email updated successfully" });
      } else {
        console.log("User info not found  ",userInfo);
        return res.status(404).json({ message: "User info not found" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateName = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    if (!email || !firstName || !lastName) {
      return res.status(404).json({ message: "email, firstName and lastName are required" });
    }

    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const userInfoRepository = appDataSource.getRepository(userInfo); // Get UserInfo repository

    // Find the user based on email
    const user = await userCredentialsRepository.findOne({ where: { email: email } });

    if (user) {
      // Find the associated userInfo
      const userInfo = await userInfoRepository.findOne({ 
        where: { userCredentialsId: user.id } 
      });

      if (userInfo) {
        // Update firstName and lastName in userInfo
        userInfo.firstName = firstName;
        userInfo.lastName = lastName;

        // Save the updated userInfo
        await userInfoRepository.save(userInfo);

        res
          .status(200)
          .json({ message: "firstName and lastName are updated successfully" });
      } else {
        return res.status(404).json({ message: "User info not found" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateProfileData = async (req, res) => {
  const { email, firstName, lastName, occupation, image } = req.body;
  console.log("second");

  if (!email || !firstName || !lastName || !occupation) {
    return res
      .status(404)
      .json({
        message:
          "email, firstName, lastName and occupation are required",
      });
  }

  try {
    const userCredentialsRepository = appDataSource.getRepository(userCredentials);
    const userInfoRepository = appDataSource.getRepository(userInfo); // Get UserInfo repository

    const user = await userCredentialsRepository.findOne({ where: { email: email } });

    if (user) {
      console.log("user", user);
      // Find the associated userInfo
      const userInfo = await userInfoRepository.findOne({
        where: { userCredentialsId: user.id },
      });

      if (userInfo) {
        // Update firstName and lastName in userInfo
        userInfo.firstName = firstName;
        userInfo.lastName = lastName;
        userInfo.occupation = occupation;

        // Save the updated userInfo
        await userInfoRepository.save(userInfo);

        console.log("userInfo", userInfo);


        // Save the image data to a file, only if image is provided
        if (image) {
          const imageBuffer = Buffer.from(image.replace(/^data:image\/jpeg;base64,/, ""), 'base64');
          const imagePath = `./profile_pic/${user.id}.jpg`;
          // Create the 'profile_pic' folder if it doesn't exist
          fs.mkdir('./profile_pic', { recursive: true }, (err) => {
            if (err) {
              console.error("Error creating directory:", err);
              return res.status(500).json({ message: "Error saving image" });
            }

            // Now save the image
            fs.writeFile(imagePath, imageBuffer, (err) => {
              if (err) {
                console.error("Error saving image:", err);
                return res.status(500).json({ message: "Error saving image" });
              }
              console.log("Image saved successfully");
            });
          });
        }

        res
          .status(200)
          .json({ message: "profile data is updated successfully" });
      } else {
        return res.status(404).json({ message: "User info not found" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserInfo = async (req, res) => {
  const email = req.params.email;
  const userInfoRepository = appDataSource.getRepository(userInfo);
  const userCredentialsRepository = appDataSource.getRepository(userCredentials);

  try {
    // Retrieve user credentials based on email
    const userCredentials = await userCredentialsRepository.findOne({ 
      where: { email }
    });

    if (!userCredentials) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve user info using the userCredentialsId from the previous query
    const userInfo = await userInfoRepository.findOne({
      where: { userCredentialsId: userCredentials.id },
      relations: ["userCredentials"], // Include userCredentials if needed
    });

    if (!userInfo) {
      return res.status(404).json({ message: "User info not found" });
    }
    res.status(200).json(userInfo); // Return user info without the image
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user info" });
  }
};

const getImage = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId", userId);
  const imagePath = `./profile_pic/${userId}.jpg`;
  // Check if the image file exists
  if (fs.existsSync(imagePath)) {
    // Read the image file
    const imageData = fs.readFileSync(imagePath);
  
    // Convert the image data to base64
    const base64Image = `data:image/jpeg;base64,${imageData.toString('base64')}`;
  
    // Add the base64 image data to the response
    res.status(200).json({ 
      image: base64Image 
    });
  } else {
    imagePath = `./profile_pic/default.jpg`;
    if (fs.existsSync(imagePath)) {
      // Read the image file
      const imageData = fs.readFileSync(imagePath);
    
      // Convert the image data to base64
      const base64Image = `data:image/jpeg;base64,${imageData.toString('base64')}`;
    
      // Add the base64 image data to the response
      res.status(200).json({ 
        image: base64Image 
    });
  } else {
    // If the image file doesn't exist, return a 404 error
    res.status(404).json({ message: "Image not found" });
  }
  }
};

module.exports = {
  getUser,
  createAccount,
  handleUpdatePassword,
  deleteUser,
  handleUpdateEmail,
  handleUpdateName,
  getUserInfo,
  handleUpdateProfileData,
  getImage,
};
