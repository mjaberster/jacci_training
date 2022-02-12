const {MongoClient, ObjectId} = require("mongodb")

const studentsList = require("../data/students.json")

const host = "127.0.0.1" //localhost
const port = "27017"
const dbName = "StudentRegistrationApp"
const connectionString = `mongodb://${host}:${port}`
const atlasConnectionString = `mongodb+srv://mongouser:icsTfx!.sZYm2ku@cluster0.0dxyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
let client


const connectMongo = async () => {
    console.log("Hello..")
    client = new MongoClient(connectionString)
    console.log("client")
    try{
        await client.connect()
        console.log("connected")
    } catch(err) {
        console.log("An error has occured")
        console.log(err)
        throw err
    }
    
}

const closeConnection = () => {
    client.close()
}

const findStudent = async (student) => {
    await connectMongo()
    const db = client.db(dbName)
    console.log("db")
    const foundStudent = await db.collection("Students").findOne(student)
    console.log(foundStudent)
    closeConnection()
    return foundStudent
} 

const createStudent = async (student) => {
    await connectMongo()
    const db = client.db(dbName)
    const addedStudent = await db.collection("Students").insertOne(student)
    closeConnection()
    return addedStudent
}



module.exports = {findStudent, createStudent}
 

