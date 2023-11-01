const readline = require('readline');

const http = require('http');


const dotenv = require('dotenv').config(process.env);
const myAPIKey = dotenv.parsed.myAPIKey;

const {
    stdin: input,
    stdout: output,
} = require('process');


const rl = readline.createInterface({ input, output });

rl.question('Введите нужный город', function (city) {

    const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`;

    http.get(url, (res) => {
        let answer = '';
    
        res.on('data', (chunk) => answer += chunk)
        res.on('end', () => {
            const parsedWeather = JSON.parse(answer).current;

            console.log(parsedWeather)

            if (parsedWeather) {
                console.log('Скорость ветра: ', parsedWeather.wind_speed + 'м/с');
                console.log('Температура: ', parsedWeather.temperature + '°C');
            } else {
                console.log('Такого города нет!')
            }
            
            return rl.close();
        })
    }).on('error', (err) => {
        console.error(err);
        return rl.close();
    })
}); 