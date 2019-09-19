const express = require('express')
const app = express()

// 设置静态文件夹
app.use(express.static(__dirname))

const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('服务端连接成功')
  socket.on('message', msg => {
    // io.emit 是向大厅和所有房间广播
    io.emit('message', {
      user: '系统',
      content: msg,
      createAt: new Date().toLocaleString()
    })
  })
})

server.listen(4000)