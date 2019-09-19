const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.listen(3000)

const Server = require('ws').Server
const ws = new Server({ port: 9999 })  // 设置服务器端口号

ws.on('connection', function(socket) {
  socket.on('message', function(msg) {
    console.log('msg=>', msg)  // 客户端发来的消息
    // send方法来给客户端发消息
    socket.send(`Hello，这里是服务端收到了: ${msg}`)
  })
})

