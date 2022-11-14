Run with npm
====================

1. Clone repo
2. change directory to server-app
3. Install required npm modules `npm i` or `npm install` or `yarn install`
4. In root create `.env` , copy paste the content of `.env.npm` into `.env`
5. Generate a **private key** (From any website or use any algorith )
6. Replace `YOUR_PRIVATE_KEY_HERE` with the generated **Private key** in `.env`
7. To run in development environment - `npm run dev`
8. To run in production - `npm start`

Run with docker
=======================

1. Run command `sudo docker-compose -f docker-compose.dev.yml up` for development
1. Run command `sudo docker-compose -f docker-compose.prod.yml up` for production

Api endpoints
=======================

- GET `/healthcheck` - to check the server status

- POST `/api/users` - to register user

  payload
    {
      "name":<USER NAME>,
      "password":<PASSWORD>,
      "confirmPassword":<PASSWORD>,
      "email":<USER EMAIL_ADDRESS>
    }

- POST `/api/sessions` - to create access / refresh token

  payload

    {
      "email":<USER EMAIL_ADDRESS>
      "password":<PASSWORD>,
    }

- GET `/api/sessions` - to check the user session

  In the headers send `REFRESH_TOKEN` with key `x-refresh`  
  and set `bearer token` with `ACCESS_TOKEN`

- DELETE `/api/sessions` - to logout user 

  In the headers send `REFRESH_TOKEN` with key `x-refresh`  
  and set `bearer token` with `ACCESS_TOKEN`

- POST `/api/scenarios` - to run the scenario

  There are 2 methods to run scenario

  - using the JSON object
  
  payload

    {
      "scenarioConfig": 
        {
          "scenario": {
            "delay": "0.5-1.5",
            "throttling": "50000",
            "workers": "4",
            "totalclients": "10",
            "duration": "5"
          },
          "requests": [
              {
                "method": "GET",
                "path": "/",
                "port": "443",
                "host": "www.example.com"
              },
              {
                "method": "POST",
                "path": "/",
                "port": "8082",
                "host": "localhost",
                "body": {
                    "name": "kanha",
                    "lastname": "agrawal"
                }
              }
            ]
        }
    }

  - using `.flex` file

  payload 
    {
      "flexfile": <FILE_DATA>
    }