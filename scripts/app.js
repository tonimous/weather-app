const form = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const feedback = document.querySelector('.feedback');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')


 



const updateUI = (data) => {
    
    // const cityDets = data.cityDetails;
    // const weather = data.weather;
    // Math.floor(weather.Temperature.Metric.Value);
    
    // destructuring properties with the same function as above 
    const {cityDetails, weather} = data; 

    let temperature = Math.floor(weather.Temperature.Metric.Value);

    // update details 
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${temperature}</span>
    <span>&deg;C</span>
    </div>
    `;
    
    // remove the class d-none 
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    };

        // update the day/night imgs 

    // let timeSrc = null;

    // if(weather.IsDayTime){
    //     timeSrc = 'pine-tree.png';
    // }else {
    //     timeSrc = 'forest.png';
    // }

    // ternary operator leting us write the code above in less lines 
    // we seperate the condition we want to evaluate with a ? and then on the left is tru on the right false 

    let timeSrc = weather.IsDayTime ? 'pine-tree.png' : 'forest.png';

    time.setAttribute('src', timeSrc); 

    const iconSrc = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    
    return {
        // cityDetails: cityDetails,
        // weather: weather
        
        // shortHand Notation which does the exact same job as above 
        
        cityDetails,
        weather
    };

};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get city value 
    const city = form.city.value.trim();
    form.reset();
    
    // update the ui with a new city 
    updateCity(city)
    .then((data) => {
        updateUI(data); 
        console.log(data);
        feedback.textContent = '';
    })
    .catch(err => {
        console.log(err);
        feedback.textContent = 'Please type a valid city name.';
        card.classList.add('d-none');
    });

    // set local storage 
    localStorage.setItem('city', city);

});

// we create an if statement outside of the submit function because we want the page to check the local storage when the page is load 

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};



