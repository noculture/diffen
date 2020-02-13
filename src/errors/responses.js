class UserNotFound extends Error {
  static respond(res) {
    res.status(404);
    return res.json({
      error: "NOT_FOUND",
      message: "User not found"
    });
  }
}

class MalformedRoute extends Error {
  static respond(res) {
    res.status(400);
    return res.json({
      error: "BAD_ROUTE",
      message: "Id passed in the route is not a number"
    });
  }
}

export { UserNotFound, MalformedRoute };
