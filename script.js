// pokemon api

const fetchPokemon = async () => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/sylveon`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // json data
    const data = await response.json();

    const sylveon = data.name;
    const spriteUrl = data.sprites.front_default;

    console.log(`name: ${sylveon}`);
    console.log(`spriteUrl: ${spriteUrl}`);

    const headerDiv = document.querySelector(".header-div");
    headerDiv.innerHTML = `
    <h1>｡ ₊°༺❤︎ my valentine? ❤︎༻°₊ ｡</h1>
  <img src="${spriteUrl}" alt="${sylveon}">  
  <h1 id="yay"></h1>    
    `;

    return { name: sylveon, sprite: spriteUrl };
  } catch (error) {
    console.error("There was a problem fetching the Pokémon data:", error);
  }
};
fetchPokemon();

const questions = [
  {
    question: "Which region would you take Sylveon on a picnic date?",
    options: ["Kanto", "Kalos", "Hoenn", "Galar"],
    answer: "Kalos",
  },
  {
    question: "What type is Sylveon?",
    options: ["Psychic", "Normal", "Dark", "Fairy"],
    answer: "Fairy",
  },
  {
    question: "Hows does Sylveon show affection?",
    options: ["Moonblast", "Dazzling Gleam", "Play Rough", "Charm"],
    answer: "Dazzling Gleam",
  },
  {
    question: "What is Sylveon's signature?",
    options: ["Pixilate", "Serene Grace", "Cute Charm", "Magic Bounce"],
    answer: "Cute Charm",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  let quizContainer = document.getElementById("quiz");
  document.getElementById("question").innerText =
    questions[currentQuestion].question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questions[currentQuestion].options.forEach((option) => {
    let button = document.createElement("button");

    button.innerText = option;
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    checkQuiz();
  }
}

function checkQuiz() {
  if (score >= 3) {
    document.getElementById("quiz-container").innerHTML = `
            <h2 class='questions'>What is your star sign</h2>
            <select id="star-sign">
                <option value="aries">Aries</option>
                <option value="taurus">Taurus</option>
                <option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option>
                <option value="leo">Leo</option>
                <option value="virgo">Virgo</option>
                <option value="libra">Libra</option>
                <option value="scorpio">Scorpio</option>
                <option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option>
                <option value="aquarius">Aquarius</option>
                <option value="pisces">Pisces</option>
            </select>
            <button onclick="checkStarSign()" id='button-submit'>Submit</button>
        `;
  } else {
    alert("Maybe next year... ");
    location.reload();
  }
}

function checkStarSign() {
  let userSign = document.getElementById("star-sign").value;
  if (userSign) {
    document.getElementById("quiz-container").innerHTML = `
    <h1>'₊˚⊹♡ you passed the test! ♡⊹˚₊'</h1>
            <button id='contact'><a href="https://pokeapi.co/" target='_blank'>instagram</a></button>
            <button id='contact'><a href="https://pokeapi.co/about" target='_blank'>snapchat</a></button>
            <button id='contact'><a href="https://pokeapi.co/docs/v2" target='_blank'>email</a></button>
        `;
  } else {
    alert("Oops! Wrong star sign. Try again!");
  }
}

loadQuestion();
