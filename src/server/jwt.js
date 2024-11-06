import jwt from 'jsonwebtoken';

const secret = "shh";
export const signToken = (payload, options) => {
  return jwt.sign(payload,secret,options);
};

export const verifyToken = (token) => {
  return jwt.verify(token,secret);
};
