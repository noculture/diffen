import path from "path";
import { FailedUpload } from "../errors/responses";

export default class UploadController {
  static async handleUpload(req, res) {
    let file = req.files.file;
    const url = path.resolve(`./uploads/${file.name}`);

    file.mv(url, function(err) {
      if (err) return FailedUpload.respond(res);

      res.json({
        message: "success",
        url
      });
    });
  }
}
