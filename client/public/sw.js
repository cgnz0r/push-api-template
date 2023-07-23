const ACTIONS = {
    AWESOME: {
        action: 'awesome',
        title: 'Awesome!',
        icon: '/awesome.png'
    }
}

self.addEventListener('install', async event => { });

self.addEventListener('activate', async event => { });

self.addEventListener('push', async event => {
    if (!event.data) return;

    const text = event.data.text();

    const options = {
        body: text,
        icon: '/app-icons/icon-144x144.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        actions: [
            ACTIONS.AWESOME
        ],
    };

    await self.registration.showNotification('Notification via Server and Push API', options);
});

self.addEventListener('notificationclick', async event => {
    const { action } = event;
    event.notification.close(); // for android, it needs explicit close

    console.log(`user pressed '${action}' action`, event);

    switch (action) {
        case ACTIONS.AWESOME.action: {
            event.waitUntil(
                self.clients.matchAll({
                    type: 'window',
                }).then(allClients => {
                    console.log('allClients', allClients);
                    const firstClient = allClients[0];

                    if (!firstClient && self.clients.openWindow) {
                        self.clients.openWindow('http://localhost:4174/awesome.png');
                        return;
                    }

                    if (firstClient && !firstClient.focused) {
                        firstClient.focus();
                        console.log('focus')
                    }
                })
            )
            break;
        }
        default: {
            // user clicked on notification
        }
    }
});

self.addEventListener('notificationclose', async event => {
    console.log('notification was closed', event);
})