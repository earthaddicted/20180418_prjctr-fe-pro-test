'use strict';

const pushButton = document.querySelector('.enable-push');
const disableButton = document.querySelector('.disable-push');

function subscribeUser(swReg) {
  swReg.pushManager.subscribe({
    userVisibleOnly: true,
  }).then(function(subscription) {
    console.log('User is subscribed.');
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function unSubscribeUser(swReg) {
  swReg.pushManager.getSubscription().then(function(subscription) {
    subscription.unsubscribe().then(function(successful) {
      console.log('User is unsubscribed.');
    }).catch(function(e) {
      console.log('Unsubscription failed');
    })
  }) 
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    pushButton.addEventListener('click', function() {
      subscribeUser(swReg);
    });

    disableButton.addEventListener('click', function() {
      unSubscribeUser(swReg);
    });

    swReg.pushManager.getSubscription()
      .then(function(subscription) {
        const isSubscribed = !(subscription === null);
        if (isSubscribed) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
      });
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
}
