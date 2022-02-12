const { MongoClient, ObjectId } = require("mongodb");
const data = require("../data/students.json")
// Connection URI
const uri = `mongodb://127.0.0.1:27017`;
const dbName = "StudentRegistrationSys"

// Create a new MongoClient
const client = new MongoClient(uri);

async function addAll() {
    const client = new MongoClient(uri)
    await client.connect()
    console.log("Connected!")
    const db = client.db(dbName)
    const results = await db.collection("Students").insertMany(data)
    console.log(results.insertedCount, results.insertedIds)
    console.log("Added")

    const students = db.collection("Students").find({studentName: "Wajeeh"})
    // console.log(await results.toArray())
    console.log("Added")
    
    const oneStudent = await db.collection("Students").findOne({studentName: "Wajeeh"})
    console.log(oneStudent)

    const byId = await db.collection("Students").findOne({_id: new ObjectId("62055b0a2e3dddd3fb19928e")})
    console.log(">>>>>>>>>>>")
    console.log(byId)
    
    client.close()


}




addAll()
