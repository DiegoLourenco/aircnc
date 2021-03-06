const Spot = require("../models/Spot");

module.exports = {
  async show(request, response) {
    const { user_id: user } = request.headers;
    const spots = await Spot.find({ user });

    return response.json(spots);
  }
};
