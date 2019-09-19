const express = require('express')
const app = express()

app.use(express.static(__dirname))
// 通过node的http模块创建server服务
const server = require('http').createServer(app)
// WebSocket 依赖HTTP协议握手
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  socket.send('说好不哭')
   socket.on('message', function(msg) {
     console.log('msg=>', msg)
     socket.send('如果你是DJ，你会爱我吗')
   })
})

server.listen(3000)