enum Biome {
  Tundra = "Tundra",
  Taiga = "Taiga",
  DeciduousForest = "DeciduousForest",
  Grasslands = "Grasslands",
  Desert = "Desert",
  HighPlateaus = "HighPlateaus",
  TropicalForest = "TropicalForest",
}

enum Diet {
  predator = "predator",
  herbivorous = "herbivorous",
}

let zooPark: Aviary[] = [];

interface Aviary {
  biome: Biome;
  waterPresence: boolean;
  square: number;
  arrayOfAnimals: Animal[];
}

interface Species {
  nameOfSpecies: string;
  biome: Biome;
  waterNecessity: boolean;
  spaceNecessity: number;
  kindOfFood: string;
  diet: Diet;
}

interface Animal extends Species {
  id: number;
  name: string;
  dayFoodConsumption: number;
}

function checkConditions(animal: Animal, aviary: Aviary): string[] {
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

function addRemoveAnimal(animal: Animal, aviary: Aviary) {
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
  square: 100,
  arrayOfAnimals: [],
};

addRemoveAnimal(bearMisha, tundraWithWater);
addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(giraffeSemen, grasslandsWithoutWater);
addRemoveAnimal(giraffeNikita, grasslandsWithoutWater);
