import './css/base.scss';

let rankedFruits = [];
let images = [
  { name: 'apple', url: 'https://images.pexels.com/photos/588587/pexels-photo-588587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'banana', url: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' },
  { name: 'blackberry', url: 'https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'blueberry', url: 'https://images.pexels.com/photos/1395958/pexels-photo-1395958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'grapefruit', url: 'https://images.pexels.com/photos/814533/pexels-photo-814533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'kumquat', url: 'https://images.pexels.com/photos/2170351/pexels-photo-2170351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'peach', url: 'https://images.pexels.com/photos/42218/food-fresh-fruit-isolated-42218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'pear', url: 'https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'plum', url: 'https://images.pexels.com/photos/209378/pexels-photo-209378.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  { name: 'watermelon', url: 'https://images.pexels.com/photos/59830/melons-water-melons-fruit-green-59830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
]

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

const saveToStorage = (arr) => {
  localStorage.setItem('array', JSON.stringify(arr));
};

const startOnLoad = () => {
  let storedItems = JSON.parse(localStorage.getItem('array'));

  if (storedItems === null) {
    rankedFruits = [];
  } else {
    rankedFruits = storedItems.map(fruit => {
      const { name, taste, consistency, versatility, portability, longevity } = fruit;
      return new Fruit(name, taste, consistency, versatility, portability, longevity)
    });

    rankedFruits.sort((fruitA, fruitB) => fruitB.avg - fruitA.avg);
    displayFruits();
  }
}

const createNewFruit = () => {
  let newFruit = new Fruit(fruitList.value, tasteScore.value, consScore.value, versScore.value, portScore.value, longScore.value);
  rankedFruits.push(newFruit);
  rankedFruits.sort((fruitA, fruitB) => fruitB.avg - fruitA.avg);
  saveToStorage(rankedFruits);
  return newFruit;
}

const displayFruits = () => {
  rankedFruits.forEach((fruit, i) => {
    let picture = images.find(image => image.name === fruit.name.toLowerCase())
    main.insertAdjacentHTML("beforeend", 
      `<div class="card">
        <h2>${fruit.name}</h2>
        <h3>Peak taste: ${fruit.taste}</h3>
        <h3>Consistency: ${fruit.consistency}</h3>
        <h3>Versatility: ${fruit.versatility}</h3>
        <h3>Portability: ${fruit.portability}</h3>
        <h3>Longevity: ${fruit.longevity}</h3>
        <h3>Average: ${fruit.avg}</h3>
        <h2>Rank: ${i + 1}</h2>
        <img src=${picture.url} />
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

startOnLoad();
submitBtn.addEventListener('click', submitFruit)