const noHeaderError = {
  json: {
    error: "NO_AUTH_HEADER",
    message: "There is no authentication header attached to this request"
  },
  code: 400
};

const invalidTokenError = {
  json: {
    error: "INVALID_TOKEN",
    message: "The authentication token is not valid for this API"
  },
  code: 406
};

export { noHeaderError, invalidTokenError };
