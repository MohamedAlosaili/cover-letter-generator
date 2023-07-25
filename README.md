# [Cover Letter Generator](https://cover-letter-email-generator.vercel.app/) 📝

## Description

Generate your Cover Letter Email with the help of AI

> This version of the [main branch](https://github.com//MohamedAlosaili/cover-letter-generator) was created with Nodejs + ejs and vanilla-js

![Page screenshot](/public/assets/page-screenshot.png)

## Motivation

I used to have a hard time writing cover letters from scratch. I would always struggle to find the right phrases and structures, and my letters would often end up sounding generic. But now, I can use GPT to generate a starting point for my cover letters. I just need to make a few changes, and I'm good to go!

## How it works

To make sure your cover letter is tailored to the job you're applying for, you'll need to fill out some basic info like your name, the company you're applying to, your skills, experience, and the position you're applying for. The more info you provide, the more accurate the result will be. But don't worry, there are also some optional fields you can fill out if you want.

## Setup Project Locally

Make sure you have [nodejs](https://nodejs.org) installed

Add `.env.local` file in the root directory of the project, then add your [OpenAI](https://platform.openai.com/account/api-keys) API Key:

```bash
OPENAI_KEY=# Your API KEY

```

Run the development server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

> You can add [nodemon](https://www.npmjs.com/package/nodemon) to restart the server when file changes are detected automatically.

Open [http://localhost:5000](http://localhost:5000)