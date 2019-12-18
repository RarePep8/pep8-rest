const config = require('../../config');

const Firestore = require('@google-cloud/firestore');
const PROJECTID = config.firestore.projectId;
const USER_COLLECTION = config.firestore.collections.users;
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true,
});

exports.addUser = (username, hash) => {
    return firestore.collection(USER_COLLECTION).doc(username).set({
        username: username,
        hash: hash
    });
}

exports.checkUserExists = (username) => {
    return firestore.collection(USER_COLLECTION).doc(username).get().then((docUser) => docUser.exists);
}

