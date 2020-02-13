import AuthController from "../controllers/auth";
import UploadController from "../controllers/uploads";
import ComparisonController from "../controllers/comparisons";
import AuthMiddleware from "../middleware/auth";
import Validator from "../middleware/validations";

export default function(router) {
  router.post("/auth/signin", Validator.userSignIn, AuthController.signIn);

  router.post(
    "/upload",
    AuthMiddleware.authenticateUser,
    UploadController.handleUpload
  );
  router.post(
    "/comparisons",
    Validator.comparisonRequest,
    AuthMiddleware.authenticateUser,
    ComparisonController.compare
  );
  router.get(
    "/comparisons",
    AuthMiddleware.authenticateUser,
    ComparisonController.getRecords
  );
  router.post(
    "/comparisons/:id",
    AuthMiddleware.authenticateUser,
    ComparisonController.rerun
  );

  return router;
}
