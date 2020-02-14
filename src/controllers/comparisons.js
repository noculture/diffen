import Differentiator from "../differentiator";
import db from "../db";
import { MalformedRoute, ComparisonNotFound } from "../errors/responses";

export default class ComparisonController {
  static async compare(req, res) {
    const diff = new Differentiator();
    try {
      const changes = diff.readAndCompare(
        req.body.firstUrl,
        req.body.secondUrl
      );
      await db.comparison.create({
        firstStudentName: req.body.firstStudent,
        firstFileUrl: req.body.firstUrl,
        secondStudentName: req.body.secondStudent,
        secondFileUrl: req.body.secondUrl,
        results: changes
      });
      return res.json(changes);
    } catch {
      return res.status(500).json({
        status: "INTERNAL_ERROR",
        error: "Internal server error"
      });
    }
  }

  static async getRecords(req, res) {
    const details = await db.comparison.findAll({ limit: 100 });
    res.json(details);
  }

  static async rerun(req, res) {
    if (Number.isNaN(Number(req.params.id))) throw new MalformedRoute();
    const diff = new Differentiator();
    try {
      const details = await db.comparison.findOne({
        where: { id: req.params.id }
      });
      const changes = diff.readAndCompare(
        details.firstFileUrl,
        details.secondFileUrl
      );
      await db.comparison.update({ changes }, { where: { id: req.params.id } });
      return res.json(changes);
    } catch {
      return ComparisonNotFound.respond(res);
    }
  }
}
