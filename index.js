const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbopr = require('./operation');


const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    // assert.equal(err, null);
    console.log('Connected Correctly');
    const db = client.db(dbname);
    // const collection = db.collection('dishes');
    // collection.insertOne({"name": "gm" , "description" : "test data 1 "},(err,result)=>{
    //     assert.equal(err,null);
    //     console.log('After Insert:');
    //     console.log(result.ops);
    //     collection.find({}).toArray((err,docs)=>{
    //         assert.equal(err,null);

    //         console.log('Found:\n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err,result)=>{
    //             assert.equal(err,null);
    //             client.close();
    //         });
    //     });
    // });
    dbopr.insertDocument(db, { name: 'ahsan', description: 'test' }, 'dishes')
        .then((result) => {
            console.log('Insert Document: \n', result.ops);

            return dbopr.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.log('Found Documents; \n', docs);

            return dbopr.updateDocument(db, { name: 'ahsan' }, { description: 'description updated' }, 'dishes')
        })
        .then((res) => {
            console.log('update document:\n', res.result);

            return dbopr.findDocuments(db, 'dishes');
        })
        .then((docs) => {
            console.log('Found updated Documents; \n', docs);

            return db.dropCollection('dishes')
        })
        .then((result) => {
            console.log('dropped collection;\n', result);
            client.close();
        })
        .catch((err) => console.log(err));;
})
    .catch((err) => console.log(err));
