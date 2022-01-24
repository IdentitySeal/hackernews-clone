const jwt = require("jsonwebtoken");
const APP_SECRET = process.env.APP_SECRET;



const getTokenPayload = (token) => {
  return jwt.verify(token, APP_SECRET);
};

const getUserId = (req, authToken) => {
  
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // console.log(req)
      // console.log(authHeader)
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No Token Found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(token);
    return userId;
  }
  throw new Error("Not Authenthecated");
};

module.exports = {
    APP_SECRET,
    getUserId
}
