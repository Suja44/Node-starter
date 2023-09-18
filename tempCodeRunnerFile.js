const axios = require("axios");

async function getjoke() {
  try {
    const response = await axios("https://v2.jokeapi.dev/joke/Any");
    if (response.data.joke) {
      console.log(response.data.joke);
    }else{
        console.log(respone.data)
    }
  } catch (err) {
    console.log(err);
  }
}

getjoke();
