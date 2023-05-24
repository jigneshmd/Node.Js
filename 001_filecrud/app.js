const yargs = require("yargs")
// const fs = require("fs")
const file1 = require("./file")

yargs.command({
    command : "add" ,
    builder : {
        name : {
            type : String
        },
        email : {
            type : String
        }  
    },
    handler : function (argv){
        console.log(argv.email);
        const data = {
            name : argv.name,
            email : argv.email
        }
        // console.log(data);
        file1.getFileData(data)
    }
}) 
    yargs.command({
        command :"view",
        handler : function(argv){
            file1.viewFile()
        }
    })



yargs.argv