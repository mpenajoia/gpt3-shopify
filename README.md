# OpenAI GPT-3 Internship Challenge

## How about a poem?

This project leverages [OpenAi's GPT-3 API](https://openai.com/api/) to return a computer generated poem based on topics or data that a user inputs into a form. 

## Run it

### `npm start`

Runs the app in the development mode.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### API Key
Go to https://beta.openai.com/signup
- Enter your email address and password
- Verify your email address
- Verify your phone number by entering the code that is sent to you via SMS
- Once logged in, go to https://beta.openai.com/account/api-keys to get your secret API key

You will need to make your own `.env` file and input your secret key to a variable I've called `REACT_APP_GPT3_KEY`. In the example below replace YOURKEY with your API inside your `.env` file:
```
REACT_APP_GPT3_KEY=YOURKEY
```


## How it know to write a poem

Per the code snippet below, by telling the `prompt` that GPT3 takes in explicitly that we are interested in a poem is really the only indication the AI has of what we want from it. You can change this to whatever you want if you want a different result other than a poem. 

```js
const defaultData = {
    prompt: `Write a poem about ${prompt}`,
    temperature: 0.5,
    max_tokens: 75,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }
  ```
Feel free to scour the [examples](https://beta.openai.com/examples/) on OpenAI's page for some ideas.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


