const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/user.model.js");

const registerUser = asyncHandler(async(req, res)=>{

    const {fullName, userName, email, password} = req.body;

    if(!fullName || !userName || !email || !password){
        return res.status(400).json(
           new ApiResponse(400, {}, "ALl fields required---------->")
        );
    }

    const user = await User.findOne({
        where: {
          email: email,
        },
      });

      console.log('Generated SQL Query:', user.toString());

    if(user){
        return res.status(400).json(
            new ApiResponse(400, {}, "user is already exist")
        )
    }

    return res.status(201).json(
        new ApiResponse(201, {}, "user registered successfully")
    )
})

module.exports = {
    registerUser
}