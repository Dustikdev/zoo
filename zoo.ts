enum Biome { // разновидность биомов
  Tundra = "Tundra",
  Taiga = "Taiga",
  DeciduousForest = "DeciduousForest",
  Grasslands = "Grasslands",
  Desert = "Desert",
  HighPlateaus = "HighPlateaus",
  TropicalForest = "TropicalForest",
}

enum Diet { //хищник или травоядный
  predator = "predator",
  herbivorous = "herbivorous",
}

interface Aviary { //вольер
  biome: Biome;
  waterPresence: boolean;
  square: number;
  arrayOfAnimals: Animal[];
}

interface Species { //"вид" животного
  nameOfSpecies: string;
  biome: Biome;
  waterNecessity: boolean;
  spaceNecessity: number;
  kindOfFood: string;
  diet: Diet;
}

interface Animal extends Species { //сами конкретные животные
  id: number;
  name: string;
  dayFoodConsumption: number;
}

function checkConditions(animal: Animal, aviary: Aviary): string[] { //функция для проверки на все условия
  let messages: string[] = [];
  let square: number = 0;
  for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
    if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
      messages.push(
        `${animal.diet} and ${aviary.arrayOfAnimals[i].diet} cant live together!`
      );
    }
    if (
      animal.diet === `predator` &&
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
  return messages;
}

function addRemoveAnimal(animal: Animal, aviary: Aviary) { //функция для добавления и удаления(если есть животное с таким ид) в вольер
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

function addAviaryToZoo(aviary: Aviary) { //добавление вольеров в зоопарк
  zoo.push(aviary)
}

function countDayFood() { //подсчет еды во всем зоопарке
  let sum = 0;
  for(let aviary of zoo) {
    for(let item of aviary.arrayOfAnimals) {
      sum += item.dayFoodConsumption;
    }
  }
  console.log(`You need ${sum} food for all zoo every day`)
}

//описание инстансов

let zoo: Aviary[] = [];

const bearMisha: Animal = {
  id: 1,
  nameOfSpecies: "bear",
  biome: Biome.Tundra,
  waterNecessity: false,
  spaceNecessity: 50,
  kindOfFood: "meat",
  diet: Diet.predator,
  name: "Misha",
  dayFoodConsumption: 5,
};

const bearMansur: Animal = {
  id: 2,
  nameOfSpecies: "bear",
  biome: Biome.Tundra,
  waterNecessity: false,
  spaceNecessity: 50,
  kindOfFood: "meat",
  diet: Diet.predator,
  name: "Mansur",
  dayFoodConsumption: 5,
};
const giraffeSemen: Animal = {
  id: 3,
  nameOfSpecies: "giraffe",
  biome: Biome.Grasslands,
  waterNecessity: false,
  spaceNecessity: 70,
  kindOfFood: "leafs",
  diet: Diet.herbivorous,
  name: "Semen",
  dayFoodConsumption: 10,
};

const giraffeNikita: Animal = {
  id: 4,
  nameOfSpecies: "giraffe",
  biome: Biome.Grasslands,
  waterNecessity: true,
  spaceNecessity: 80,
  kindOfFood: "leafs",
  diet: Diet.herbivorous,
  name: "Nikita",
  dayFoodConsumption: 8,
};

const tundraWithWater: Aviary = {
  biome: Biome.Tundra,
  waterPresence: true,
  square: 250,
  arrayOfAnimals: [],
};

const grasslandsWithoutWater: Aviary = {
  biome: Biome.Grasslands,
  waterPresence: true,
  square: 200,
  arrayOfAnimals: [],
};

addAviaryToZoo(tundraWithWater);
addAviaryToZoo(grasslandsWithoutWater)
addRemoveAnimal(bearMisha, tundraWithWater);
// addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(giraffeSemen, grasslandsWithoutWater);
addRemoveAnimal(giraffeNikita, grasslandsWithoutWater);
countDayFood()
