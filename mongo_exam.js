var mongo = require('mongodb');
var config = require('./config');
var MongoDBConnect = require('./mongo_lib');

var _mongoDbURL = config._mongoDbURL;
var _dbName = config._dbName;
var _collectionName = config._collectionName;


MongoDBConnect.ConnectToDB(_mongoDbURL).then((db) => {
    var dbo = MongoDBConnect.GetDataBase(_dbName);
    var coll = MongoDBConnect.GetCollection(_collectionName);

    function updateRow(_id, _t, _v) {
        return new Promise((resolve, error) => {

            var o_id = new mongo.ObjectID(_id);
            var myquery = { "_id": o_id };
            var newvalues = { $set: { _t, _v: _v.toString()} };

            coll.updateOne(myquery, newvalues, function (err, res) {
                if (err) {
                    error(err);
                    return;
                }

                console.log("1 document updated");
                resolve();
            });
        });
    }

    var _id = "571fd15840c4ed0d240d7d6c";
    var _t = "JobInterview";
    var _v = "TAKE-ME!";

    updateRow(_id, _t, _v).then(() => {
        db.close();
    }).catch(err => {
        console.log(err);
    })


}).catch((err) => {
    console.log(err);
});

