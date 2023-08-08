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
function checkConditions(animal, aviary) {
    var messages = [];
    var square = 0;
    for (var i = 0; i < aviary.arrayOfAnimals.length; i++) {
        if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
            messages.push("".concat(animal.diet, " and ").concat(aviary.arrayOfAnimals[i].diet, " cant live together!"));
        }
        if (animal.diet === "predator" &&
            animal.nameOfSpecies !== aviary.arrayOfAnimals[i].nameOfSpecies) {
            messages.push("Predator ".concat(animal.nameOfSpecies, " cant live with other predator ").concat(aviary.arrayOfAnimals[i].nameOfSpecies, "!"));
        }
        square += aviary.arrayOfAnimals[i].spaceNecessity;
    }
    if (square + animal.spaceNecessity > aviary.square) {
        messages.push("".concat(aviary.square - square, " meters are missing in the aviary"));
    }
    if (animal.biome !== aviary.biome) {
        messages.push("biomes not matched");
    }
    if (animal.waterNecessity && !aviary.waterPresence) {
        messages.push("biome does not have water");
    }
    return messages;
}
function addRemoveAnimal(animal, aviary) {
    var messages = checkConditions(animal, aviary);
    for (var i = 0; i < aviary.arrayOfAnimals.length; i++) {
        if (animal.id === aviary.arrayOfAnimals[i].id) {
            console.log("".concat(aviary.arrayOfAnimals[i].nameOfSpecies, " ").concat(aviary.arrayOfAnimals[i].name, " deleted"));
            aviary.arrayOfAnimals.splice(i, 1);
            console.log(aviary.arrayOfAnimals.length);
            return;
        }
    }
    if (messages.length === 0) {
        aviary.arrayOfAnimals.push(animal);
        console.log("".concat(animal.nameOfSpecies, " ").concat(animal.name, " added"));
    }
    else {
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var item = messages_1[_i];
            console.log(item);
        }
    }
    console.log(aviary.arrayOfAnimals.length);
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
var giraffeNikita = {
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
var tundraWithWater = {
    biome: Biome.Tundra,
    waterPresence: true,
    square: 250,
    arrayOfAnimals: [],
};
var grasslandsWithoutWater = {
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
