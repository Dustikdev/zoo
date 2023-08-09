enum Biome { // разновидность биомов
  tundra = "Tundra",
  taiga = "Taiga",
  deciduousForest = "Deciduous forest",
  grasslands = "Grasslands",
  desert = "Desert",
  highPlateaus = "High plateaus",
  tropicalForest = "Tropical forest",
}

enum KindOfAnimal {
  bear = "Bear",
  giraffe = "Giraffe",
  beaver = "Beaver",
  dolphin = "Dolphin",
}

const modalImages: { [key: string]: string } = {
  'bear': './images/bear.jpg',
  'giraffe': './images/giraffe.jpg',
  'beaver': './images/beaver.jpg',
  'dolphin': './images/dolphin.jpg',
  'tundra': './images/tundra.jpg',
  'taiga': './images/taiga.jpg',
  'deciduousforest': './images/deciduousforest.jpg',
  'grasslands': './images/grasslands.jpg',
  'desert': './images/desert.jpg',
  'highplateaus': './images/highplateaus.jpg',
  'tropicalforest': './images/tropicalforest.jpg',
}


enum KindOfFood {
  fish = "Fish",
  leaf = "Leaf",
  meat = "Meat",
}

enum Diet { //хищник или травоядный
  predator = "Predator",
  herbivorous = "Herbivorous",
}

interface Aviary {
  //вольер
  biome: Biome;
  waterPresence: boolean;
  square: number;
  arrayOfAnimals: Animal[];
}

interface Species {
  //'вид' животного
  nameOfSpecies: KindOfAnimal;
  biome: Biome;
  waterNecessity: boolean;
  spaceNecessity: number;
  kindOfFood: KindOfFood;
  diet: Diet;
}

interface Animal extends Species {
  //сами конкретные животные
  id: number;
  name: string;
  dayFoodConsumption: number;
}

function checkConditions(animal: Animal, aviary: Aviary): string[] {
  //функция для проверки на все условия
  let messages: string[] = [];
  let square: number = 0;
  for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
    if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
      messages.push(
        `${animal.diet} and ${aviary.arrayOfAnimals[i].diet} cant live together!`
      );
    }
    if (
      animal.diet === `Predator` &&
      animal.nameOfSpecies !== aviary.arrayOfAnimals[i].nameOfSpecies
    ) {
      messages.push(
        `Predator ${animal.nameOfSpecies} cant live with other predator ${aviary.arrayOfAnimals[i].nameOfSpecies}!`
      );
    }
    square += aviary.arrayOfAnimals[i].spaceNecessity;
  }

  if (square + animal.spaceNecessity > aviary.square) {
    messages.push(`${aviary.square - square} meters are missing in the aviary`);
  }
  if (animal.biome !== aviary.biome) {
    messages.push("biomes not matched");
  }
  if (animal.waterNecessity && !aviary.waterPresence) {
    messages.push("biome does not have water");
  }
  return [...new Set(messages)];
}

function addRemoveAnimal(animal: Animal, aviary: Aviary) {
  //функция для добавления и удаления(если есть животное с таким ид) в вольер
  const messages = checkConditions(animal, aviary);
  for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
    if (animal.id === aviary.arrayOfAnimals[i].id) {
      console.log(
        `${aviary.arrayOfAnimals[i].nameOfSpecies} ${aviary.arrayOfAnimals[i].name} deleted`
      );
      aviary.arrayOfAnimals.splice(i, 1);
      console.log(aviary.arrayOfAnimals.length);
      return;
    }
  }
  if (messages.length === 0) {
    aviary.arrayOfAnimals.push(animal);
    console.log(`${animal.nameOfSpecies} ${animal.name} added`);
  } else {
    for (let item of messages) {
      console.log(item);
    }
  }
  console.log(aviary.arrayOfAnimals.length);
}

function addAviaryToZoo(aviary: Aviary) {
  //добавление вольеров в зоопарк
  zoo.push(aviary);
}

function countDayFood() {
  //подсчет еды во всем зоопарке
  let sum = 0;
  for (let aviary of zoo) {
    for (let item of aviary.arrayOfAnimals) {
      sum += item.dayFoodConsumption;
    }
  }
  console.log(`You need ${sum} food for all zoo every day`);
}

//описание инстансов

let zoo: Aviary[] = [];

const bearMisha: Animal = {
  id: 1,
  nameOfSpecies: KindOfAnimal.bear,
  biome: Biome.tundra,
  waterNecessity: false,
  spaceNecessity: 50,
  kindOfFood: KindOfFood.meat,
  diet: Diet.predator,
  name: "Misha",
  dayFoodConsumption: 5,
};

const bearMansur: Animal = {
  id: 2,
  nameOfSpecies: KindOfAnimal.bear,
  biome: Biome.tundra,
  waterNecessity: false,
  spaceNecessity: 50,
  kindOfFood: KindOfFood.meat,
  diet: Diet.predator,
  name: "Mansur",
  dayFoodConsumption: 5,
};
const giraffeSemen: Animal = {
  id: 3,
  nameOfSpecies: KindOfAnimal.giraffe,
  biome: Biome.grasslands,
  waterNecessity: false,
  spaceNecessity: 70,
  kindOfFood: KindOfFood.leaf,
  diet: Diet.herbivorous,
  name: "Semen",
  dayFoodConsumption: 10,
};

const giraffeNikita: Animal = {
  id: 4,
  nameOfSpecies: KindOfAnimal.giraffe,
  biome: Biome.grasslands,
  waterNecessity: true,
  spaceNecessity: 80,
  kindOfFood: KindOfFood.leaf,
  diet: Diet.herbivorous,
  name: "Nikita",
  dayFoodConsumption: 8,
};

const tundraWithWater: Aviary = {
  biome: Biome.tundra,
  waterPresence: true,
  square: 250,
  arrayOfAnimals: [],
};

const grasslandsWithoutWater: Aviary = {
  biome: Biome.grasslands,
  waterPresence: true,
  square: 200,
  arrayOfAnimals: [],
};

addAviaryToZoo(tundraWithWater);
addAviaryToZoo(grasslandsWithoutWater);
addRemoveAnimal(bearMisha, tundraWithWater);
addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(giraffeSemen, tundraWithWater);
addRemoveAnimal(giraffeNikita, grasslandsWithoutWater);
addRemoveAnimal(bearMisha, grasslandsWithoutWater);
countDayFood();

//in progress

function showModalWindow() {
  const modalWindow = document.querySelector(".modal-window");
  if (modalWindow !== null) {
    modalWindow.classList.add("visible");
  }
}

function cancelAdding() {
  const modalWindow = document.querySelector(".modal-window");
  const modalContainer = document.querySelector(".modal-container");
  if (modalWindow !== null && modalContainer !== null) {
    modalWindow.classList.remove("visible");
    modalContainer.innerHTML = "";
  }
}

function changeImage() { 
  const container = document.querySelector(".modal-container");
  const image = container?.querySelector('img')
  if (container !== null) {
    const secondChild = container.children[1];
    const select = secondChild.querySelector("select");
    select?.addEventListener('change', function() {
      const selectedElement = this.value.replace(/\s+/g, '').toLowerCase();
        if (image) {
          image.src = modalImages[selectedElement];
        }
    })
  }
}

function createSelect(enumObj: Record<string, string>): string {
  let selectString = `<select>`;
  for (const key in enumObj) {
    selectString += `<option value='${enumObj[key]}'>${enumObj[key]}</option>`;
  }
  selectString += "</select>";
  return selectString;
}

function addAnimal() {
  const modalContainer = document.querySelector(".modal-container");
  const markup = `<div class='images-container'>
<img src='./images/bear.jpg' alt=''>
</div>
<div class='question-container'>
<span>What species?</span>
${createSelect(KindOfAnimal)}
</div>
<div class='question-container'>
<span>Choose biome</span>
${createSelect(Biome)}
</div>
<div class='question-container'>
<span>Is this animal need water?</span>
<select>
<option value='Yes'>Yes</option>
<option value='No'>No</option>
</select>
</div>
<div class='question-container'>
<span>How much space it need?</span>
<input type='number'>
</div>
<div class='question-container'>
<span>What kind of food prefer?</span>
${createSelect(KindOfFood)}
</div>
<div class='question-container'>
<span>Is this predator or herbivorous</span>
${createSelect(Diet)}
</div>
<div class='question-container'>
<span>What name?</span>
<input type='text'>
</div>
<div class='question-container'>
<span>How many food need every day?</span>
<input type='number'>
</div>
<div class="bottom-buttons">
<button class="confirm" onclick='confirmAdding()'>
    Добавить
</button>
<button class="cancel" onclick='cancelAdding()'>
    Отменить
</button>
</div>`;
  if (modalContainer !== null) {
    modalContainer.insertAdjacentHTML("afterbegin", markup);
  } else {
    console.log("modal-container not found");
  }
  changeImage();
  showModalWindow();
}

function addAviary() {
  const modalContainer = document.querySelector(".modal-container");
  const markup = `<div class='images-container'>
<img src='./images/grasslands.jpg' alt=''>
</div>
<div class='question-container'>
<span>Choose biome</span>
${createSelect(Biome)}
</div>
<div class='question-container'>
<span>Does this biome have water?</span>
<select>
<option value='Yes'>Yes</option>
<option value='No'>No</option>
</select>
</div>
<div class='question-container'>
<span>What is the area?</span>
<input type='number'>
</div>
<div class="bottom-buttons">
<button class="confirm" onclick='confirmAdding()'>
    Добавить
</button>
<button class="cancel" onclick='cancelAdding()'>
    Отменить
</button>
</div>`;
  if (modalContainer !== null) {
    modalContainer.insertAdjacentHTML("afterbegin", markup);
  } else {
    console.log("modal-container not found");
  }
  changeImage();
  showModalWindow();
}
