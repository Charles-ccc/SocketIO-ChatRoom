const express = require('express')
const app = express()

// 设置静态文件夹
app.use(express.static(__dirname))

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const SYSTEM = '系统'
let socketObj = {}
let userColor = ['#00a1f4', '#0cc', '#f44336', '#795548', '#e91e63', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ffc107', '#607d8b', '#ff9800', '#ff5722']

io.on('connection', socket => {
  let username
  let color
  console.log('服务端连接成功')
  socket.on("message", msg => {
    // 如果用户名存在
    if (username) {
      // 判断是否为私聊专属
      const private = msg.match(/@([^ ]+) (.+)/)
      if (private) {
        // 私聊的用户 正则匹配的第一个分组
        const toUser = private[1]
        // 私聊的内容 正则匹配的第二个分组
        const content = private[2]
        // 从socketObj中获取私聊用户的socket
        const toSocket = socketObj[toUser]
        
        if (toSocket) {
          // 向私聊用户发消息
          toSocket.send({
            user: username,
            color,
            content,
            createAt: new Date().toLocaleString()
          })
        }
      } else {
        // io.emit 是向大厅和所有房间广播
        io.emit("message", {
          user: username,
          color,
          content: msg,
          createAt: new Date().toLocaleString()
        })
      }
    } else {
      // 首次进入把输入内容当作用户名
      username = msg
      color = shuffle(userColor)[0]
      // 向除了自己以外的人广播
      socket.broadcast.emit("message", {
        user: SYSTEM,
        color,
        content: `${username}加入了聊天`,
        createAt: new Date().toLocaleString()
      })
      // 把socketObj对象上对应的用户名赋为一个socket
      socketObj[username] = socket
    }
  })
})

// 打乱顺序
function shuffle(arr) {
  let len = arr.length, random
  while (0 !== len) {
    // 右移位运算符向下取整
    random = Math.random() * len-- >>> 0
    return [arr[len], arr[random]] = [arr[random], arr[len]]
  }
}
// 时间补零
function addZero(n) {
    return n < 10 ? '0' + n : '' + n;
}
server.listen(4000)