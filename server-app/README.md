# Prerequisites

1. Clone the repo in your environment
1. Navigate to `server-app` folder and run script `syncLib.sh` (Linux) or `syncLib.bat`(Windows) to fetch the latest main flexbench lib in context of server-app project. The folder `lib` is copied from root path, but has been added in .gitignore.
1. Docker and docker-compose must be installed if `Run with docker` is selected
1. Node 16 or later to be installed on host if `Run with npm` is selected

# Run with npm

1. Clone repo
1. change directory to server-app
1. Install required npm modules `npm i` or `npm install` or `yarn install`
1. In root create `.env` , copy paste the content of `.env.npm` into `.env`
1. Generate a **private key** (From any website or use any algorithm, eg. https://jwt.io/)
1. Replace `YOUR_PRIVATE_KEY_HERE` with the generated **Private key** in `.env`
1. To run in development environment, set `NODE_ENV=development` in your `.env` file and run: `npm run dev`
1. To run in production, set `NODE_ENV=production` in your `.env` file and run: `npm start`

# Run with docker

1. Run command `docker-compose -f docker-compose.dev.yml up --build` for development
1. Run command `docker-compose -f docker-compose.prod.yml up --build` for production

> NODE_ENV: This variable is set by the target on a multi stage Dockerfile, and can have the following values: 
> - development
> - production

 

# APIs

Flexbench by default is not using authorization. If you want to change this, locate the relative .env or .env.docker file and set `REQUIRE_AUTH` to `true` 

> Inside the `postman` folder you can find and import the file `Flexbench.postman_collection.json`, having a collection of requests for the above endpoints

## Endpoints

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
      "email":<USER EMAIL_ADDRESS>,
      "password":<PASSWORD>
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


