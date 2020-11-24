# DFZ Service webstore

## Integrated with DFZ API

Features:

- Angular 10
- WebP Images
- Auth0 auth system
- MongoDB Database,  Mongoose ODM

## Features TODO:

    - Finish this README
    - Image upload system
    - Move newProduct component into admin section
    - Finish PayPal integration
    - Stripe integration
    - Vipps integration
    - Clean up 

## Enviroment Config

Re-build src/environments/environment.ts and environment.prod.ts


```typescript
    export const environment = {
        production: false,
        apiUrl: '****', // Used to define DFZ API location
        returnTo: 'http://localhost:4201/logout', // Must be valid URL on Auth0 config
     auth: {
      clientID: '**************',
      domain: '********', 
      audience: 'https://********/api/v2/', 
      redirect: 'http://localhost:4201/callback', // Or http(s)://hostUrl:/callback
      scope: 'openid profile email'
     }
    };
```

## Building

There are two options for building:
  Custom Build script, deploys via Git Commit, and Pull on remote server (EG. Staging Dev)

```bash
 npm run buildPull
```

Regular Angular Build (Requires Manual copy to server!)

```bash
  ng build --prod
```

**Build scripts do not currently generate WebP images! Must be done manually!**  

## Depends on DFZ API

[Link to DFZ API GitHub](https://github.com/dufferzz/dfzapi)
Configure .env as in DFZ API README.md

```bash
  git clone https://github.com/dufferzz/dfzapi.git
  npm i
  nodemon bin/www
````

# Current nginx config

```nginx

server {
  server_name testing.dufferz.net;


  location / {
    root /var/www/pub/store/;
    try_files $uri $uri/ /index.html =404;
  }

  gzip on;
  gzip_comp_level 6;
  gzip_vary on;
  gzip_types text/plain text/css application/json application/x-javascript application/javascript text/xml application/xml application/rss+xml text/javascript image/svg+xml application/vnd.ms-fontobject application/x-font-ttf font/opentype;


  add_header Cache-Control "public, no-transform";

  add_header X-Frame-Options "SAMEORIGIN";
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-XSS-Protection "1; mode=block";
  add_header X-Content-Type-Options nosniff;

  add_header Content-Security-Policy "img-src 'self' data: ;default-src 'self' https://api.dufferz.net https://dfz.eu.auth0.com https://www.paypal.com https://www.sandbox.paypal.com; style-src 'self' 'unsafe-inline'; script-src 'self' https://api.dufferz.net https://www.paypal.com https://www.sandbox.paypal.com; ";

  add_header X-Permitted-Cross-Domain-Policies master-only;
  add_header Referrer-Policy same-origin;
}
 [...]
```
