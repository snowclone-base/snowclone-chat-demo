# Snowclone Chat App Demo

The purpose of this minimal chat app is to demonstrate how to use Snowclone Local to deploy and configure a backend for use with a basic React app.

## Installation

1. Clone this repo
2. Run `npm install`

## Setup

1. Run `docker compose up` from the project's root directory
2. To upload the database schema and listener files, run the following commands:

```
curl -H "Authorization: Bearer blizzard" -F 'file=@postgrest-schema.sql' http://localhost:5175/schema
```

```
curl -H "Authorization: Bearer blizzard" -F 'file=@listener.sql' http://localhost:5175/schema
```

## Usage

1. Start the app using `npm run dev`
2. Go to http://localhost:5176 and try out the app!

## Notes

- View auto generated API docs at http://localhost:8081 (excluding logins currently)
- To test end user login functionality, run the following command to receive a JWT token for the default user that has been automatically set up. Save that new JWT token in the `.env` file as `VITE_JWT_TOKEN`and verify that messages can still be sent and received.

```
curl -X POST -H 'Content-Type: application/json' -d '{"email": "user@snowclone.com", "pass": "snowclone"}' http://localhost:3000/rpc/login
```

- We have provided default values for the `.env`. Feel free to change them and add the `.env` file to `.gitignore` before making any public commits.
- If you wish to change the value of the default `PGRST_JWT_SECRET`, you can obtain a valid `VITE_JWT_TOKEN` by going to https://jwt.io and entering the following data payload along with your secret:

```
{
  "role": "dev_admin"
}
```
