import jwt from "jsonwebtoken";

const config = process.env;

const auth = (req, res, next) => {
  //console.log(req.headers);
  try {
    const token = req.body.token || req.query.token || req.headers["accesstoken"] || req.cookies.token;
    try {
      const decoded = jwt.verify(token, config.JWT_KEY);
      //Check if the token has expired.
      if ((decoded.exp*1000) < Date.now()) {
          return res.status(401).send("Access token has expired");
      }

      req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
  }
  catch (err) {
    return res.status(401).send("Access token is missing");
  }
};

export default auth;