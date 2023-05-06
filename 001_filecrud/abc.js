
const fs = require("fs")
const getFileData = (data) => {
    const mydata = JSON.stringify(data)

   
    fs.writeFile('test.json',mydata,()=>{
        console.log('file write succesfully');
 })
}

const viewFile = ()=> {

    const alldata = getdata()
    console.log(alldata);
}

const getdata = ()=>{
    try {
        const data = fs.readFileSync("test.json","utf-8")
        const mydata = JSON.parse(data)
        return mydata;
        
    } catch (error) {
        return[];
    }
}

module.exports = { getFileData,viewFile}