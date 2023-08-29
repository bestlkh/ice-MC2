# MC^2=E

![Travis Build Status](https://travis-ci.com/bestlkh/ice-MC2.svg?token=wxassxLjuZDp7LSybmeD&branch=master)

A collaborative math equation editing software.

## Environment Variables
For database saving for reading previous conversations, you must set the following environment variables:
`DB_SAVE=true`, or run `DB_SAVE=true node app.js`.

To utilize OpenAI's GPT-3, you must set the following environment variables:
`OPENAI_API_KEY` to the secret key in your account.

## How to Run

### Docker

Pull the latest docker image from `050125095678.dkr.ecr.us-west-2.amazonaws.com/ice-mc2:latest`.

This is a private ECS repository, you have to have access to AWS to use it.

Start the image by running `docker run -p <port>:8080 -d ice-mc2`.

### Node.js

You must have Node.js 18 installed.

Run `npm install && node deployment.js && node app.js`.
