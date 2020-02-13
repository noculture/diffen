import AuthController from "../controllers/auth";
import AuthMiddleware from "../middleware/auth";
import Validator from "../middleware/validations";

export default function(router) {
  router.post("/auth/signin", Validator.userSignIn, AuthController.signIn);

  //   router.post('/bookings', Validator.bookingCreation, AuthMiddleware.authenticateUser, BookingController.bookSeat);
  //   router.get('/bookings', Validator.bookingViewing, AuthMiddleware.authenticateAll, BookingController.getBookings);
  //   router.delete('/bookings/:bookingId', AuthMiddleware.authenticateUser, BookingController.deleteBooking);

  return router;
}
