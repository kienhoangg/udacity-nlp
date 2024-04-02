function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  let result = document.getElementById('results')
  if (Client.checkForName(formText) === 1) {
    alert('Input text is required')
    result.innerHTML = ''
    return
  }

  console.log('::: Form Submitted :::')
  fetch('http://localhost:8081/test')
    .then((res) => res.json())
    .then(function (res) {
      console.log(res)
      // Call meaningcloud sentimen api
      const formdata = new FormData()
      formdata.append('key', res.apiKey)
      formdata.append('txt', formText)

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      }
      const response = fetch(
        'https://api.meaningcloud.com/sentiment-2.1',
        requestOptions,
      )
        .then((response) => ({
          status: response.status,
          body: response.json(),
        }))
        .then(({ status, body }) => {
          body.then((data) => {
            console.log(data.status)
            result.innerHTML = JSON.stringify(data.status)
          })
        })
        .catch((error) => console.log('error', error))
    })
}

export { handleSubmit }
