const axios = require("axios");
async function verifyAccessToken(accessToken) {
  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
    );
    const data = response.data;

    if (data.error) {
      // Access token is invalid or expired
      console.error("Invalid access token:", data.error.message);
      return null;
    }

    // Access token is valid
    // console.log("Access token is valid:", data);
    return data;
  } catch (error) {
    console.error("Error verifying access token:", error);
    return null;
  }
}

async function generateNewAccessToken(refreshToken) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
    });
    const data = response.data;

    if (data.error) {
      console.error("Error getting new access token:", data.error);
      return null;
    }

    console.log("New access token generated:", data);
    return data.access_token;
  } catch (error) {
    console.error("Error generating new access token:", error);
    return null;
  }
}




// async function verifyAndGenerateToken(accessToken,refreshToken){

//   const accessToken = customer.accessToken;
//   const refreshToken = customer.refreshToken;
 
//   let validAccessToken = null;
//   try {
//     let isValid = await verifyAccessToken(accessToken);
//     if (isValid) {
//       validAccessToken = accessToken;
//     } else {
//       validAccessToken = await generateNewAccessToken(refreshToken);
//       customer.accessToken = validAccessToken;
//       await customer.save();

//       console.log("new Token generated:", validAccessToken);
//     }
//   } catch (err) {
//     console.error(err.message);
//   }
// }

module.exports = { verifyAccessToken, generateNewAccessToken };
