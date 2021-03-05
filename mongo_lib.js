var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var MongoDBConnect = {
    ConnectToDB: async function (_mongoDbURL) {
        this.db = await MongoClient.connect(_mongoDbURL, { useUnifiedTopology: true });
        return this.db;
    },
    
    GetDataBase: function(_dbName){
        if(this.db) {
            this.dbo = this.db.db(_dbName);
            return this.dbo;
        }
    },
    
    GetCollection: function(_collectionName){
        if(this.dbo) {
            return this.dbo.collection(_collectionName);
        }
    }
}

module.exports = MongoDBConnect;