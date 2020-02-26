const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-server-sdk');
const client = Stitch.initializeDefaultAppClient('reader-evzqx');
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('brickpack');


exports.client = client
exports.db = db
