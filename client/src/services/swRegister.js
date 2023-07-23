import axios from 'axios';
import { urlB64ToUint8Array } from '@/helpers/urlB64ToUint8Array';

async function initPushManagerSubscription(registration) {
    const response = await axios.get('http://localhost:5000/public-key');
    const publicKey = response.data.key;

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicKey)
    });

    await axios.post('http://localhost:5000/subscription', { subscription });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async function () {
        const registration = await navigator.serviceWorker.register('/sw.js');

        const answer = await Notification.requestPermission()
        if (answer === 'granted') {
            await initPushManagerSubscription(registration);
        }
    })
}