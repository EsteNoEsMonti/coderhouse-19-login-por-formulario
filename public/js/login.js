const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const inputEmail = document.querySelector('#inputEmail')
    const inputPassword = document.querySelector('#inputPassword')

    if (
      inputEmail instanceof HTMLInputElement &&
      inputPassword instanceof HTMLInputElement
    ) {

      const userData = {
        email: inputEmail.value,
        password: inputPassword.value,
      }

      const { status } = await fetch('/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (status === 201) {
        window.location.href = '/products'
      } else {
        alert('[login] estado no tan inesperado: ' + status + ' te debes registrar')
        window.location.href = '/register'
      }
    }
  })
}