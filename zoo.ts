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
  for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
    if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
      console.log(
        `${animal.diet} and ${aviary.arrayOfAnimals[i].diet} cant live together!`
      );
      messages.push(`${animal.diet} and ${aviary.arrayOfAnimals[i].diet} cant live together!`)
      //   return;
    }
    if (
      animal.diet === "predator" &&
      animal.nameOfSpecies !== aviary.arrayOfAnimals[i].nameOfSpecies
    ) {
      console.log(
        `Predator ${animal.nameOfSpecies} cant live with other predator ${aviary.arrayOfAnimals[i].nameOfSpecies}!`
      );
      messages.push(`Predator ${animal.nameOfSpecies} cant live with other predator ${aviary.arrayOfAnimals[i].nameOfSpecies}!`)
      //   return;
    }
  }
  if (animal.biome !== aviary.biome) {
    console.log('biomes not matched');
    messages.push('biomes not matched')
    if (animal.waterNecessity && !aviary.waterPresence) {
      console.log('biome does not have water');
      messages.push('biome does not have water')
    }
    // return;
  }
  return messages;
}

function addRemoveAnimal(animal: Animal, aviary: Aviary) {
  for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
    if (animal.id === aviary.arrayOfAnimals[i].id) {
      console.log(`Animal ${aviary.arrayOfAnimals[i].name} deleted`);
      aviary.arrayOfAnimals.splice(i, 1);
      return;
    }
  }

  for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
    if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
      console.log(
        `${animal.diet} and ${aviary.arrayOfAnimals[i].diet} cant live together!`
      );
      return;
    }
    if (
      animal.diet === "predator" &&
      animal.nameOfSpecies !== aviary.arrayOfAnimals[i].nameOfSpecies
    ) {
      console.log(
        `Predator ${animal.nameOfSpecies} cant live with other predator ${aviary.arrayOfAnimals[i].nameOfSpecies}!`
      );
      return;
    }
  }

  if (animal.biome !== aviary.biome) {
    console.log("biomes not matched");
    if (animal.waterNecessity && !aviary.waterPresence) {
      console.log("biome does not have water");
    }
    return;
  }
  aviary.arrayOfAnimals.push(animal);
  console.log(`Animal ${animal.name} added`);
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

const tundraWithWater: Aviary = {
  biome: Biome.Tundra,
  waterPresence: true,
  square: 250,
  arrayOfAnimals: [],
};

addRemoveAnimal(bearMisha, tundraWithWater);
addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(bearMansur, tundraWithWater);
addRemoveAnimal(giraffeSemen, tundraWithWater);
console.log(tundraWithWater.arrayOfAnimals.length);
// addRemoveAnimal(bearMisha, tundraWithWater);
// addRemoveAnimal(bearMisha, tundraWithWater);
// addRemoveAnimal(bearMisha, tundraWithWater);
