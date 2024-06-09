function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin || false;
  req.session.save(action);
}

function destroyUserSession(req) {
  req.session.uid = null;
  req.session.isAuth = null;
}

module.exports = {
  createUserSession,
  destroyUserSession,
};
