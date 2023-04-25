// @ts-ignore
const serverSocket = io()

// @ts-ignore
Swal.fire({
  title: "Sing in",
  input: "text",
  inputValidator: (value) => {
      return !value && "¡Necesitas escribir un nombre de usuario para comenzar a chatear!"
  },
  allowOutsideClick: false
}).then(result => {
  const inputUser = document.querySelector('#inputUser')
  if (!(inputUser instanceof HTMLInputElement)) return
  inputUser.value = result.value
  serverSocket.emit('newUser', inputUser.value)
})

const btnSend = document.querySelector('#btnSend')

if (btnSend) {
    btnSend.addEventListener('click', evento => {
        const inputUser = document.querySelector('#inputUser')
        const inputMessage = document.querySelector('#inputMessage')

        if (!(inputUser instanceof HTMLInputElement) || !(inputMessage instanceof HTMLInputElement)) return

        const user = inputUser.value
        const message = inputMessage.value

        if (!user || !message) return

        serverSocket.emit('newMessage', { timestamp: Date.now(), user, message })
    })
}

const templateMessages = `
{{#if thereAreMessages }}
<ul>
    {{#each messages}}
    <li>({{this.date}}) {{this.user}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
<p>There aren't messages...</p>
{{/if}}
`
const createHtmlMessages = Handlebars.compile(templateMessages)

serverSocket.on('updateMessages', messages => {
    const divMessages = document.querySelector('#messages')
    if (divMessages) {
        // divMensajes.innerHTML = JSON.stringify(mensajes)
        divMessages.innerHTML = createHtmlMessages({ messages, thereAreMessages: messages.length > 0 })
    }
})

serverSocket.on('newUser', nombreUsuario => {
  // @ts-ignore
  Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: `"${nombreUsuario}" joined`,
      icon: "success"
  })
})
