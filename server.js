let express = require('express');

let app = express();
const {
    MongoClient,
    ServerApiVersion,
    Collection
} = require("mongodb");
const uri = "mongodb+srv://serem:bApIzgvwyKE2k5Rp@cluster0.5mtadof.mongodb.net/?retryWrites=true&w=majority"

let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


//create a mongoClient with a mongoClient Options to set the stable api version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function runDBconnect() {
    try {
        //connects the client to the server
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    }
    catch (ex) {
        console.error(ex);
    }
};


app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/api/cats', (req, res) => {
    getAllCats((err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: 'get all calls sucessful'
            });
        }
    });
});


app.post('/api/cat', (req, res) => {
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({
                statuscode: 201,
                data: result,
                message: 'success'
            });
        }
    });
});

function postCat(cat, callback) {
    collection.insertOne(cat, callback);
}

function getAllCats(callback) {
    collection.find({}).toArray(callback);
}


app.listen(port, () => {
    console.log('server started');
    runDBconnect();
});