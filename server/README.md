# Push Api Template Server

## Project Setup

```sh
npm install
```

### Run Server

```sh
npm run start
```

### Generate VAPID keys

You can use web-push library to generate a pair
```
const vapidKeys = webpush.generateVAPIDKeys();
console.log(vapidKeys);
```
And add it to your .env file 