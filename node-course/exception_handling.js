const x = "hello"
try {
    x = 8
} catch(err){
    console.log("this is the catch message")
    console.log(err)
} finally {
    console.log("This is the finally message")
}