
//global variables
let counter = 0;
const projectsArr = [
    {
        name: "Perfection",
        description: 'Based on the game "Perfection", players must sort shapes into their matching placeholder before the time is up. Can you make it on the leaderboard?',
        languages: ["JavaScript", "React", "Firebase", "HTML5", "CSS3", "Sass"],
        image: "./assets/movie-generator.png",
        liveLink: "https://perfection-game.netlify.app/",
        codeLink: "https://github.com/Jaimerine/perfection-game"
    },
    {
        name: "Movie Generator",
        description: 'A pair programmed project using "The Movie Database" API to generate a randomly suggested movie within a preferred genre. Drill down to find additional similar movies.',
        languages: ["JavaScript", "HTML5", "CSS3", "Sass"],
        image: "./assets/movie-generator.png",
        liveLink: "https://Jaime-Olga.github.io/movie-generator",
        codeLink: "https://github.com/Jaime-Olga/movie-generator"
    },
    {
        name: "Haikus Highway",
        description: 'A Haiku generator that will suggest words based on what you enter within the required syllable count to complete a valid Haiku. Checkout the Haiku Collection for inspiration.',
        languages: ["JavaScript", "React", "Firebase", "HTML5", "CSS3", "Sass"],
        image: "./assets/haikus-highway.png",
        liveLink: "https://haikushighway.netlify.app/",
        codeLink: "https://github.com/teamAwesomenessest/haikusHighway"
    },
    {
        name: "Where's Molly-O",
        description: `A (much cuter) adaptation of "Where's Waldo" where players search for my dog, Molly. Be sure to start the timer to see how long it takes you!`,
        languages: ["jQuery", "HTML5", "CSS3"],
        image: "./assets/molly-o.png",
        liveLink: "https://jaimerine.github.io/wheres-molly-o/",
        codeLink: "https://github.com/Jaimerine/wheres-molly-o"
    },
    {
        name: "News + Trumpitity",
        description: 'A news app with top headlines provided by the "New York Times" API paired with Donald Trump quotes from the "What Does Trump Think?" API.',
        languages: ["jQuery", "HTML5", "CSS3"],
        image: "./assets/trumpicity.png",
        liveLink: "https://jaimerine.github.io/trumpitity",
        codeLink: "https://github.com/Jaimerine/trumpitity"
    },
]

//validate and send contact message
const sendMessage = (event, form) => {

    event.preventDefault();

    //inputs + errors
    const name = document.querySelector('#name');
    const nameErr = document.querySelector('#name-error');
    const email = document.querySelector('#email');
    const emailErr = document.querySelector('#email-error');
    const message = document.querySelector('#message');
    const messageErr = document.querySelector('#message-error');

    //if inputs are empty/invalid, call function to show error + add event listener on change
    let isError = false;

    //name field
    if (!name.value.trim()) {
        isError = true;
        handleErrorMsg(name, nameErr);
    }

    //message field
    if (!message.value.trim()) {
        isError = true;
        handleErrorMsg(message, messageErr);
    }

    //email field
    const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegEx.test(email.value)) {
        isError = true;
        handleErrorMsg(email, emailErr);
    }

    //send and clear form
    if (!isError) {
        form.submit();
        form.reset();
    }
}

//handle input errors
const handleErrorMsg = (input, inputErr) => {
    //show error
    inputErr.style.visibility = 'unset';
    //set event listener to hide error on value change, if not empty
    input.addEventListener('input', () => {
        if (input.value) {
            inputErr.style.visibility = "hidden";
        } else {
            inputErr.style.visibility = "unset";
        }
    });
}

//show next item in carrossel
const showWork = (direction) => {

    //increment/decrement item counter
    if (direction === 'right') {
        counter++;
    } else if (direction === 'left') {
        counter--;
    } else {
        counter = 0;
    }

    //reset counter if at end of array
    if (counter === projectsArr.length) {
        counter = 0;
    } else if (counter < 0) {
        counter = projectsArr.length - 1;
    }

    //set item to display
    const workItem = projectsArr[counter];

    //update html
    document.querySelector(".work-item h3").textContent = workItem.name;
    document.querySelector(".work-item p").textContent = workItem.description;
    document.querySelector(".work-item img").src = workItem.image;
    document.querySelector(".live-link").href = workItem.liveLink;
    document.querySelector(".code-link").href = workItem.codeLink;

    //construct language icons
    const languageList = document.querySelector(".work-item .icons");
    languageList.innerHTML = '';
    workItem.languages.forEach((icon) => {
        const li = document.createElement("li");
        const i = document.createElement("i");
        i.classList.add(`devicon-${icon.toLowerCase()}-plain`);
        i.setAttribute('aria-label', icon);
        li.appendChild(i);
        languageList.appendChild(li);
    })
}

const attachAnimationObservers = () => {

    const options = {
        root: null, //use the document's viewport as the container
        rootMargin: '0px', //% or px - offsets added to each side of the intersection 
        threshold: 0.2 //percentage of the target element which is visible
    }

    let callback = (entries) => {
        entries.forEach(entry => {

            //if entry (section) is visible - according with the params set in `options`, add `is-visible` class, else remove
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }

        });
    }

    //create intersection observer instance by calling its constructor and passing callback function to be run whenever a threshold is crossed in one direction or the other:
    let observer = new IntersectionObserver(callback, options);

    //attach observer to each section
    document.querySelectorAll('section').forEach(section => { observer.observe(section) });

}

//initialize
const init = () => {
    showWork();
    attachAnimationObservers();
    
    //event listeners on carrossel arrows
    const carrosselRight = document.querySelector('.fa-chevron-circle-right');
    const carrosselLeft = document.querySelector('.fa-chevron-circle-left');
    carrosselRight.addEventListener('click', () => showWork('right'));
    carrosselLeft.addEventListener('click', () => showWork('left'));

    //event listener on contact form
    const contactForm = document.querySelector('form');
    contactForm.addEventListener('submit', () => sendMessage(event, contactForm));
};

init();