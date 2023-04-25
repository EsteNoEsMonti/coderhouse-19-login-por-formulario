const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const inputFirstname = document.querySelector('#inputFirstname')
    const inputLastname = document.querySelector('#inputLastname')
    const inputEmail = document.querySelector('#inputEmail')
    const inputAge = document.querySelector('#inputAge')
    const inputPassword = document.querySelector('#inputPassword')

    if (
      inputFirstname instanceof HTMLInputElement &&
      inputLastname instanceof HTMLInputElement &&
      inputEmail instanceof HTMLInputElement &&
      inputAge instanceof HTMLInputElement &&
      inputPassword instanceof HTMLInputElement
    ) {

      const userData = {
        firstName: inputFirstname.value,
        lastName: inputLastname.value,
        email: inputEmail.value,
        age: inputAge.value,
        password: inputPassword.value,
      }

      const userCreated = await fetch('/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(res => res.json())
      .finally(() => window.location.href = '/login')
    }
  })
}