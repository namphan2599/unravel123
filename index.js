const axios = require('axios');
const fs = require('fs');

const getJoke = async () => {
    try {
        const { data } = await axios.get('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist');
        
        if(data.type === 'single') {
            return { joke : data.joke }
        } else {
            return {
                setup: data.setup,
                delivery: data.delivery
            }
        }
        
    } catch (err) {
        console.error(err.message);
        return {};
    }
};




const generate = async () => {
    const joke = await getJoke();

    if(!joke) return;


    if(joke.hasOwnProperty('joke')) {
        
        fs.writeFileSync("README.md", `## ${joke.joke}`);
    } else {
        fs.writeFileSync("README.md", `## ${joke.setup}</br>- ${joke.delivery}`);
    }
};

generate();