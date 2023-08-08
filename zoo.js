var Biome;
(function (Biome) {
    Biome["Tundra"] = "Tundra";
    Biome["Taiga"] = "Taiga";
    Biome["DeciduousForest"] = "DeciduousForest";
    Biome["Grasslands"] = "Grasslands";
    Biome["Desert"] = "Desert";
    Biome["HighPlateaus"] = "HighPlateaus";
    Biome["TropicalForest"] = "TropicalForest";
})(Biome || (Biome = {}));
var Diet;
(function (Diet) {
    Diet["predator"] = "predator";
    Diet["herbivorous"] = "herbivorous";
})(Diet || (Diet = {}));
var zooPark = [];
function addRemoveAnimal(animal, aviary) {
    for (var i = 0; i < aviary.arrayOfAnimals.length; i++) {
        if (animal.id === aviary.arrayOfAnimals[i].id) {
            console.log("Animal ".concat(aviary.arrayOfAnimals[i].name, " deleted"));
            aviary.arrayOfAnimals.splice(i, 1);
            return;
        }
    }
    for (var i = 0; i < aviary.arrayOfAnimals.length; i++) {
        if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
            console.log("".concat(animal.diet, " and ").concat(aviary.arrayOfAnimals[i].diet, " cant live together!"));
            return;
        }
        if (animal.diet === "predator" &&
            animal.nameOfSpecies !== aviary.arrayOfAnimals[i].nameOfSpecies) {
            console.log("Predator ".concat(animal.nameOfSpecies, " cant live with other predator ").concat(aviary.arrayOfAnimals[i].nameOfSpecies, "!"));
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
    console.log("Animal ".concat(animal.name, " added"));
}
var bearMisha = {
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
var bearMansur = {
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
var giraffeSemen = {
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
var tundraWithWater = {
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
