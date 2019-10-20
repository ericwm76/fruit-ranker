import './css/base.scss';

let rankedFruits = [];

const submitBtn = document.querySelector('#submit')
const main = document.querySelector('main')
const fruitList = document.querySelector('#fruit-list')
const tasteScore = document.querySelector('#taste-num')
const consScore = document.querySelector('#cons-num')
const versScore = document.querySelector('#vers-num')
const portScore = document.querySelector('#port-num')
const longScore = document.querySelector('#long-num')

const submitFruit = (e) => {
  e.preventDefault();
  if (fruitList.value && tasteScore.value && consScore.value && versScore.value && portScore.value && longScore.value) {
    createNewFruit();
  }
  clearMain();
  displayFruits();
  clearInputs();
}

const clearMain = () => {
  main.innerHTML = "";
}

const clearInputs = () => {
  fruitList.selectedIndex = 0;
  tasteScore.value = "";
  consScore.value = "";
  versScore.value = "";
  portScore.value = "";
  longScore.value = "";
}

const createNewFruit = () => {
  let newFruit = new Fruit(fruitList.value, tasteScore.value, consScore.value, versScore.value, portScore.value, longScore.value);
  // debugger;
  rankedFruits.push(newFruit);
  rankedFruits.sort((fruitA, fruitB) => fruitB.avg - fruitA.avg);
  console.log(rankedFruits);
  return newFruit;
}

const displayFruits = () => {
  rankedFruits.forEach((fruit, i) => {
    main.insertAdjacentHTML("beforeend", 
    `<div class="card">
      <h2>${fruit.name}</h2>
      <h3>Peak taste: ${fruit.taste}</h3>
      <h3>Consistency: ${fruit.consistency}</h3>
      <h3>Versatility: ${fruit.versatility}</h3>
      <h3>Portability: ${fruit.portability}</h3>
      <h3>Longevity: ${fruit.longevity}</h3>
      <h3>Average: ${fruit.avg}</h3>
      <h2>Rank: ${i + 1}
    </div>`
  )
  })
}

class Fruit {
  constructor(name, taste, consistency, versatility, portability, longevity) {
    this.name = name;
    this.taste = parseInt(taste);
    this.consistency = parseInt(consistency);
    this.versatility = parseInt(versatility);
    this.portability = parseInt(portability);
    this.longevity = parseInt(longevity);
    this.avg = (this.taste + this.consistency + this.versatility + this.portability + this.longevity) / 5;
  }
}

submitBtn.addEventListener('click', submitFruit)