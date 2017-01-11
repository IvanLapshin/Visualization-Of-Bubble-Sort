var SAVE_KEY = "save";
var RED_COLOR = "#e74c3c";
var BLUE_COLOR = "#27ae60";
var PARENT_DIV = "arrayVisualization";
var PARENT_DIV_ELEMENT;
var EMPTY_STRING = "";
var HIDDEN = "hidden";

var sortState = {
  currentArray : [],
  outStep : 0,
  inStep : 0
};

function runSort() {
  sortWithStepInterval(250);
}

function nextSortStep() {
  var currentSortState = loadSortState();
  var currentOutStep = currentSortState.outStep;
  var currentInStep = currentSortState.inStep;
  var currentElementStep = document.getElementById(currentInStep);

  if (currentOutStep < 2) {
    document.getElementById('nextStep').style.visibility = HIDDEN;
    document.getElementById('runSort').style.visibility = HIDDEN;
    return;
  }  

  var currentInStepPlusOne = currentInStep + 1;
  if (currentSortState.currentArray[currentInStep] > currentSortState.currentArray[currentInStepPlusOne]) {     
    exchangeElements(currentElementStep, currentInStep, currentInStepPlusOne, currentSortState);
  }

  if ( ++currentInStep >= currentOutStep) {
    currentInStep = 0;
    currentOutStep--;
  }

  currentElementStep.style.backgroundColor = BLUE_COLOR
  document.getElementById(currentInStep).style.backgroundColor = RED_COLOR;
  
  currentSortState.inStep = currentInStep;
  currentSortState.outStep = currentOutStep;
  saveSortState(currentSortState);
}

function exchangeElements(currentElementStep, currentInStep, currentInStepPlusOne, currentSortState) {
  var child1 = currentElementStep;
  var child2 = document.getElementById(currentInStepPlusOne);
  PARENT_DIV_ELEMENT.insertBefore(child2, child1);
  child1.id = EMPTY_STRING + currentInStepPlusOne;
  child2.id = EMPTY_STRING + currentInStep;

  var c = currentSortState.currentArray[currentInStep];
  currentSortState.currentArray[currentInStep] = currentSortState.currentArray[currentInStepPlusOne];
  currentSortState.currentArray[currentInStepPlusOne] = c;
}

function initArray() {
  var array = randomMassiveForSort();

  PARENT_DIV_ELEMENT = document.getElementById(PARENT_DIV);
  createArrayVisualizationOnPage(array);
  
  sortState.currentArray = array;
  sortState.outStep = array.length;
  saveSortState(sortState);
}

function createArrayVisualizationOnPage(array) {
  var block;
  for (var i = 0; i < array.length; i++) {
    block = document.createElement("div");
    block.id = EMPTY_STRING + i;
    block.style.height = array[i] + "0px";
    block.innerHTML = array[i];
    block.classList.add("column");
    PARENT_DIV_ELEMENT.appendChild(block);
  }
  document.getElementById("0").style.backgroundColor = RED_COLOR;
}

function randomMassiveForSort() {
  var currentRandomFigure;
  var result = [];
  var figuresArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 
                    12, 13, 14, 15, 16, 17, 18, 19, 20];
  for (var i = 0; i < 20; i++) {
    currentRandomFigure = randomIntegerFromZero(figuresArr.length - 1);
    result.push(figuresArr[currentRandomFigure]);
    figuresArr.splice(currentRandomFigure, 1);
  }
  return result;
}

function sortWithStepInterval(interval) {
  setTimeout(function () { 
    nextSortStep();
    if (document.getElementById('nextStep').style.visibility !== HIDDEN) {
      sortWithStepInterval(interval);
    }
  }, interval);
}

function randomIntegerFromZero(max) {
  return Math.round(Math.random() * (max + 1) - 0.5);
}

function saveSortState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadSortState() {
  return JSON.parse(localStorage.getItem(SAVE_KEY));
}
