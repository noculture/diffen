class UserNotFound extends Error {
  static respond(res) {
    res.status(404);
    return res.json({
      error: "NOT_FOUND",
      message: "User not found"
    });
  }
}

class ComparisonNotFound extends Error {
  static respond(res) {
    res.status(404);
    return res.json({
      error: "NOT_FOUND",
      message: "Comparison not found"
    });
  }
}

class FailedUpload extends Error {
  static respond(res) {
    res.status(401);
    return res.json({
      error: "FAILED_UPLOAD",
      message: "The file upload failed"
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

export { UserNotFound, FailedUpload, ComparisonNotFound, MalformedRoute };
