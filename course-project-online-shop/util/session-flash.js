function getSessionData(req) {
  const sesionData = req.session.flashData;
  req.session.flashData = null;
  return sesionData;
}

function flashDataToSession(req, data, action) {
  req.session.flashData = data;
  req.session.save(action);
}

module.exports = {
  flashDataToSession,
  getSessionData,
};
