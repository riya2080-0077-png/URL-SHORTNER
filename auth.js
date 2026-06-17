const sessionIdTOuserMap = new Map();

function setuser(id,user){
    sessionIdTouserMap.set(id,user);
}

function getuser(id){
    return sessionIdToMap.get(id);
}

module.exports = {
    setuser,
    getuser
};