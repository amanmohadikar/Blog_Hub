const User = require("../Model/User")
const bcrypt = require("bcrypt")


const getAllUser = async (req, res) => {
  try {
    let users = await User.find();
    if (!users) return res.status(404).json({ message: "No Users Found" });
    return res.status(200).json({ users });
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

//  const signup = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (err) {
//     return console.log(err);
//   }
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ message: "User Already Exists! Login Instead" });
//   }
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//     blogs: [],
//   });

//   try {
//     await user.save();
//   } catch (err) {
//     return console.log(err);
//   }
//   return res.status(201).json({ user });
// };


const signup = async (req, res) => {
  try {
    let data = req.body
    let { name, email, password } = data
    if (!name && !email && !password) return res.status(400).json({ message: "All field is mandatory" })
    let isEmailExist = await User.findOne({ email })
    if (isEmailExist) return res.status(400).json({ message: "Email is already exist" })
    const hashPassword = bcrypt.hashSync(password, 10)
    const user = new User({ name, email, password: hashPassword, blogs: [] })
    user.save()
    return res.status(201).json({ message: "User create Successfully", user })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

//  const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!existingUser) {
//     return res.status(404).json({ message: "Couldnt Find User By This Email" });
//   }

//   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Password must be present" });
//   }
//   return res
//     .status(200)
//     .json({ message: "Login Successfull", user: existingUser });
// };


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) return res.status(400).json({ message: "Email and password both must be present" })
    let existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "Couldnt Find User By This Email" });

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Password not correct" });
    return res.status(200).json({ message: "Login Successfull", user: existingUser });
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
};



module.exports = { getAllUser, signup, login }