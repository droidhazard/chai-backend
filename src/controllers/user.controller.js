import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // * Get user details from frontend
  // * Validation - not empty
  // * Check if user already exists: by username and email
  //  Check for images, check for avatar
  //  Upload avatar to cloudinary
  //  Create user object - create entry in db
  //  Remove password and refresh token fields from response
  //  Check if the user is actually created
  //  Return res

  const { fullName, username, email, password } = req.body;
  console.log("email: ", email);
  if (
    [fullName, email, username, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(
      400,
      "'fullname', 'email', 'username' and 'password', these fields are required"
    );
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists.");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "'avatar' file is missing.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
});

export { registerUser };
