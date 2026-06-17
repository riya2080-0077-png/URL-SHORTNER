const userSessions = {};

function setuser(sessionId, user) {
    userSessions[sessionId] = user;
}

function getuser(sessionId) {
    return userSessions[sessionId];
}

module.exports = {
    setuser,
    getuser,
};
