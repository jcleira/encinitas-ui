self.addEventListener('fetch', function(event) {
  const requestClone = event.request.clone();

  event.respondWith(
    fetch(event.request).then(response => {
      const requestUrl = new URL(event.request.url);
      // Only targeting requests to solana.com, this will not work on localhost
      // but also this won't capture any other API calls to other domains that the
      // dApp may make.
      if (/\.solana\.com$/.test(requestUrl.hostname)) {
        console.log('Request URL:', requestUrl.hostname);
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        logRequest(uniqueId, event, requestClone);

        const responseClone = response.clone();
        logResponse(uniqueId, event, responseClone);
      }

      return response;
    }).catch(error => {
      console.error('Fetch error:', error);
    })
  );
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
  fetch('http://localhost:3001/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    response.await;
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(textResponse => {
    console.log('Webhook response:', textResponse);
  })
  .catch(error => {
    console.error('Error sending data to webhook or handling response:', error);
  });
}
