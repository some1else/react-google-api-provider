import React, { Component } from 'react'

export default class GAPIProvider extends Component {
  state = {
    isAPILoaded: false,
  }

  componentDidMount = async () => {
    const gapi = await loadGAPI('https://apis.google.com/js/api.js')
    const res = await gapi.load('client', start)
    this.setState({ isAPILoaded: true })
  }

  render () {
    const { children } = this.props
    const { isAPILoaded } = this.state
    return isAPILoaded ? children : <p>Loading</p>
  }
}

function loadGAPI(src) {
  return new Promise((resolve, reject) => {
    const ref = document.getElementsByTagName('script')[0]
    const script = document.createElement('script')
    script.onload = () => {
      resolve(window.gapi)
    }
    script.onerror = reject
    script.src = src
    ref.parentNode.insertBefore(script, ref)
  })
}

function start() {
  const { gapi } = window || {}
  // 2. Initialize the JavaScript client library.
  return gapi && gapi.client.init({
    'apiKey': process.env.REACT_APP_GAPI_API_KEY,
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': process.env.REACT_APP_GAPI_CLIENT_ID,
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}