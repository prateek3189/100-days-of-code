function getSessionErrorData(req, data) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...data,
    };
  }

  req.session.inputData = null;
  return sessionInputData;
}

function flashErrorToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data,
  };

  req.session.save(action);
}

module.exports = {
  getSessionErrorData,
  flashErrorToSession,
};
