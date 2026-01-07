import mongoose from "mongoose";
import House from "../models/House.js";

class DashboardController {
  async show(req, res) {
    const { user_id } = req.headers;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: "user_id inválido" });
    }

    const houses = await House.find({ user: user_id });

    return res.json(houses);
  }
}

export default new DashboardController();
