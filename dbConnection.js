const {
    MongoClient,
    ServerApiVersion,
    Collection
} = require("mongodb");
const uri = "mongodb+srv://serem:bApIzgvwyKE2k5Rp@cluster0.5mtadof.mongodb.net/?retryWrites=true&w=majority"


//create a mongoClient with a mongoClient Options to set the stable api version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

client.connect();

module.exports=client;