let socket = io()
let list = document.getElementById('list')
let input = document.getElementById('input')
let sendBtn = document.getElementById('sendBtn')

function send() {
  console.log(socket.connected)
  let value = input.value
  console.log(value)
  if (value) {
    socket.emit('message', value)
    input.value = ''
  } else {
    alert('输入内容不能为空')
  }
}
sendBtn.onclick = send

function enterSend(event) {
  let code = event.keyCode
  if (code === 13) send()
}
input.onkeydown = function(event) {
  enterSend(event)
}

// 监听与服务端的连接
socket.on('connect', () => {
  console.log('连接成功')
})
socket.on('message', data => {
  console.log(data)
  let li = document.createElement('li')
  li.className = 'list-group-item'
  // 如果用户id与传过来的id相同就表示是自己
  // li.style.textAlign = userId === data.id ? 'right' : 'left';
  li.innerHTML = `
    <p style="color: #ccc;">
      <span class="user" style="color:${data.color}">${data.user} </span>
      ${data.createAt}
    </p>
    <p class="content" style="background-color: ${data.color}">${data.content}</p>`
  list.appendChild(li)
  // 将聊天区域的滚动条设置到最新内容的位置
  list.scrollTop = list.scrollHeight
})