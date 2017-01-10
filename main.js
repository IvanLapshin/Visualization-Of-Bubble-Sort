var SAVE_KEY = "save";
var RED_COLOR = "#e74c3c";
var BLUE_COLOR = "#27ae60";
var PARENT_DIV = "arrayVisualization";
var EMPTY_STRING = "";

var sortState = {
	currentArray : [],
	outStep : 0,
	inStep : 0
};


function runSort() {
	(function go() {
    setTimeout(function () { 
      nextSortStep();
      if (document.getElementById('nextStep').style.visibility !== 'hidden') {
        go();
      }
    }, 250);
  })();
}

function nextSortStep() {
	var currentSortState = loadSortState();
	var currentOutStep = currentSortState.outStep;
	var currentInStep = currentSortState.inStep;
	var currentElementStep = document.getElementById(currentInStep);
	if (currentOutStep > 1) {
		var currentInStepPlusOne = currentInStep + 1;
		if (currentSortState.currentArray[currentInStep] > currentSortState.currentArray[currentInStepPlusOne]) {			
			var child1 = currentElementStep;
			var child2 = document.getElementById(currentInStepPlusOne);
			var parent = document.getElementById(PARENT_DIV);
			parent.insertBefore(child2, child1);
			child1.id = EMPTY_STRING + currentInStepPlusOne;
			child2.id = EMPTY_STRING + currentInStep;

			var c = currentSortState.currentArray[currentInStep];
			currentSortState.currentArray[currentInStep] = currentSortState.currentArray[currentInStepPlusOne];
			currentSortState.currentArray[currentInStepPlusOne] = c;
		}
		if ( ++currentInStep >= currentOutStep) {
			currentInStep = 0;
			currentOutStep--;
		}
		currentElementStep.style.backgroundColor = BLUE_COLOR
		document.getElementById(currentInStep).style.backgroundColor = RED_COLOR;
		currentSortState.inStep = currentInStep;
		currentSortState.outStep = currentOutStep;
	} else { 
	  document.getElementById('nextStep').style.visibility = 'hidden';
	  document.getElementById('runSort').style.visibility = 'hidden';
	}
	saveSortState(currentSortState);
}

function initArray() {
  var array = randomMassiveForSort();
	createArrayVisualizationOnPage(array);
	sortState.currentArray = array;
	sortState.outStep = array.length;
	document.getElementById("0").style.backgroundColor = RED_COLOR;
	saveSortState(sortState);
}

function createArrayVisualizationOnPage(array) {
	var block;
	var node;
	for (var i = 0; i < array.length; i++) {
		block = document.createElement("div");
		block.id = EMPTY_STRING + i;
		block.style.height = array[i] + "0px";
		node = document.createTextNode(array[i]);
		block.appendChild(node);
		block.classList.add("column");
		var parentDiv = document.getElementById(PARENT_DIV);
		parentDiv.appendChild(block);
	}
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

function randomIntegerFromZero(max) {
  var rand =  Math.random() * (max + 1) - 0.5;
  rand = Math.round(rand);
  return rand;
}

function saveSortState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadSortState() {
  return JSON.parse(localStorage.getItem(SAVE_KEY));
}
