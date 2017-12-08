const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const config = require('./config')
const app = express()

let proxyTable = config.dev.proxyTable

for (let key in proxyTable){
  app.use(key, proxy(proxyTable[key]));
}

// Object.keys(proxyTable).forEach(function (value, index, array) {
//   app.use(value, proxy(proxyTable[index]));
// })

app.use(express.static(path.join(__dirname, 'dist')))
app.listen(8080, () =>{
  console.log('server is running in http://localhost:8080')
})
