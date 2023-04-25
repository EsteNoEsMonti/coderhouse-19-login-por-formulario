// @ts-ignore
const socket = io()

// log out
const formLogout = document.querySelector('#formLogout')

if (formLogout instanceof HTMLFormElement) {
  formLogout.addEventListener('submit', async event => {
    event.preventDefault()

    const { status } = await fetch('/sessions', {
      method: 'DELETE'
    })

    if (status === 200) {
      window.location.href = '/login'
    } else {
      console.log('[logout] estado inesperado: ' + status)
    }

  })
}

// add product
const form_addProduct = document.querySelector('#form_addProduct')

if (form_addProduct instanceof HTMLFormElement) {
    form_addProduct.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(form_addProduct)
        const data = {}
        formData.forEach((value, key) => (data[key] = value));

        fetch('/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
}

// @ts-ignore
const templateRealTimeProducts = Handlebars.compile(`
{{#if hasDocs }}
    {{#each docs}}
    <ul>
      <li><b>_id:</b> {{this._id}}</li>
      <li><b>id:</b> {{this.id}}</li>
      <li><b>title:</b> {{this.title}}</li>
      <li><b>description:</b> {{this.description}}</li>
      <li><b>code:</b> {{this.code}}</li>
      <li><b>price:</b> {{this.price}}</li>
      <li><b>status:</b> {{this.status}}</li>
      <li><b>stock:</b> {{this.stock}}</li>
      <li><b>category:</b> {{this.category}}</li>
      <hr/>
    </ul>
    {{/each}}
{{else}}
<p>There aren't products 😔</p>
{{/if}}
`)

socket.on('products', products => {
    const thereAreProducts = products.length > 0
    // alert('recibi los videojuegos: ' + JSON.stringify(videojuegos[videojuegos.length - 1]))
    const divLlist = document.querySelector('#productsList')
    if (divLlist instanceof HTMLDivElement) {
        divLlist.innerHTML = templateRealTimeProducts({
            products,
            thereAreProducts
        })
    }
})