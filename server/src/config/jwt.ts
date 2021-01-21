export default {
  jwtAuthenticate: {
    secret: process.env.JWT_SECRET_AUTHENTICATE as string,
    expiresIn: '1d',
  },
  jwtForgotPassword: {
    secret: process.env.JWT_SECRET_FORGOT_PASSWORD as string,
    expiresIn: 600,
  },
};
