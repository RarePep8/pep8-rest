const Firestore = require('@google-cloud/firestore');
const PROJECTID = process.env.PROJECT_ID;
const USER_COLLECTION = process.env.USER_COLLECTION;
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

