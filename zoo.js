"use strict";
var Biome;
(function (Biome) {
    Biome["tundra"] = "Tundra";
    Biome["taiga"] = "Taiga";
    Biome["deciduousForest"] = "DeciduousForest";
    Biome["grasslands"] = "Grasslands";
    Biome["desert"] = "Desert";
    Biome["highPlateaus"] = "HighPlateaus";
    Biome["tropicalForest"] = "TropicalForest";
})(Biome || (Biome = {}));
var KindOfAnimal;
(function (KindOfAnimal) {
    KindOfAnimal["bear"] = "Bear";
    KindOfAnimal["giraffe"] = "Giraffe";
    KindOfAnimal["beaver"] = "Beaver";
    KindOfAnimal["dolphin"] = "Dolphin";
})(KindOfAnimal || (KindOfAnimal = {}));
var KindOfFood;
(function (KindOfFood) {
    KindOfFood["fish"] = "Fish";
    KindOfFood["leaf"] = "Leaf";
    KindOfFood["meat"] = "Meat";
})(KindOfFood || (KindOfFood = {}));
var Diet;
(function (Diet) {
    Diet["predator"] = "Predator";
    Diet["herbivorous"] = "Herbivorous";
})(Diet || (Diet = {}));
function checkConditions(animal, aviary) {
    //функция для проверки на все условия
    let messages = [];
    let square = 0;
    for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
        if (animal.diet !== aviary.arrayOfAnimals[i].diet) {
            messages.push(`${animal.diet} and ${aviary.arrayOfAnimals[i].diet} cant live together!`);
        }
        if (animal.diet === `Predator` &&
            animal.nameOfSpecies !== aviary.arrayOfAnimals[i].nameOfSpecies) {
            messages.push(`Predator ${animal.nameOfSpecies} cant live with other predator ${aviary.arrayOfAnimals[i].nameOfSpecies}!`);
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
function addRemoveAnimal(animal, aviary) {
    //функция для добавления и удаления(если есть животное с таким ид) в вольер
    const messages = checkConditions(animal, aviary);
    for (let i = 0; i < aviary.arrayOfAnimals.length; i++) {
        if (animal.id === aviary.arrayOfAnimals[i].id) {
            console.log(`${aviary.arrayOfAnimals[i].nameOfSpecies} ${aviary.arrayOfAnimals[i].name} deleted`);
            aviary.arrayOfAnimals.splice(i, 1);
            console.log(aviary.arrayOfAnimals.length);
            return;
        }
    }
    if (messages.length === 0) {
        aviary.arrayOfAnimals.push(animal);
        console.log(`${animal.nameOfSpecies} ${animal.name} added`);
    }
    else {
        for (let item of messages) {
            console.log(item);
        }
    }
    console.log(aviary.arrayOfAnimals.length);
}
function addAviaryToZoo(aviary) {
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
let zoo = [];
const bearMisha = {
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
const bearMansur = {
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
const giraffeSemen = {
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
const giraffeNikita = {
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
const tundraWithWater = {
    biome: Biome.tundra,
    waterPresence: true,
    square: 250,
    arrayOfAnimals: [],
};
const grasslandsWithoutWater = {
    biome: Biome.grasslands,
    waterPresence: true,
    square: 200,
    arrayOfAnimals: [],
};
addAviaryToZoo(tundraWithWater);
addAviaryToZoo(grasslandsWithoutWater);
addRemoveAnimal(bearMisha, tundraWithWater);
// addRemoveAnimal(bearMansur, tundraWithWater);
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
function createSelect(enumObj) {
    let selectString = '<select class="biome-select">';
    for (const key in enumObj) {
        selectString += `<option value="${enumObj[key]}">${enumObj[key]}</option>`;
    }
    selectString += "</select>";
    return selectString;
}
function addAnimal() {
    const modalContainer = document.querySelector(".modal-container");
    const markup = `<div class="images-container">
<img src="./images/bear.jpg" alt="bear">
</div>
<div class="question-container">
<span>What species?</span>
${createSelect(KindOfAnimal)}
</div>
<div class="question-container">
<span>Choose biome</span>
${createSelect(Biome)}
</div>
<div class="question-container">
<span>Is this animal need water?</span>
<input type="text">
</div>
<div class="question-container">
<span>How much space it need?</span>
<input type="text">
</div>
<div class="question-container">
<span>What kind of food prefer?</span>
<input type="text">
</div>
<div class="question-container">
<span>Is this predator or herbivorous</span>
${createSelect(Diet)}
</div>
<div class="question-container">
<span>What name?</span>
<input type="text">
</div>
<div class="question-container">
<span>How many food need every day?</span>
<input type="number">
</div>`;
    if (modalContainer !== null) {
        modalContainer.insertAdjacentHTML("afterbegin", markup);
        // modalContainer.innerHTML = markup;
    }
    else {
        console.log("modal-container not found");
    }
    showModalWindow();
}
