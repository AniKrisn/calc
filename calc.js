const container = document.querySelector('.container');
const btnContainer = document.querySelector('.btn-container');
const viewport = document.querySelector('.viewport');

const stageView = document.createElement('div');
const mainView = document.createElement('div');
const clearContainer = document.createElement('div');
const clearButton = document.createElement('clearbtn');
const delButton = document.createElement('delbtn');

stageView.className = 'stageview';
mainView.className = 'mainview';
clearContainer.className = 'clearct';
clearButton.className = 'clearbtn';
delButton.className = 'delbtn';

container.insertBefore(viewport, container.querySelector('.btn-container'));
container.insertBefore(clearContainer, container.querySelector('.btn-container'));
viewport.appendChild(stageView);
viewport.appendChild(mainView);
clearContainer.appendChild(clearButton);
clearContainer.appendChild(delButton);
clearButton.setAttribute('data-type', 'clear');
delButton.setAttribute('data-type', 'del');

clearButton.textContent = "CLEAR";
delButton.textContent = "DELETE";
mainView.setAttribute('data-placeholder', '0');
mainView.textContent = '';
stageView.textContent = '';

const buttonCount = 16;
for (let i = 0; i < buttonCount; i++) {
    const button = document.createElement('button'); 

    const buttonTexts = 
    ['7', '8', '9', '÷',
     '4', '5', '6', '×',
     '1', '2', '3', '−',
     '.', '0', '=', '+'];
    button.textContent = buttonTexts[i];

    const dataAttributes = 
    ['num', 'num', 'num', 'oper',
    'num', 'num', 'num', 'oper',
    'num', 'num', 'num', 'oper',
    'oper', 'num', 'eq', 'oper'];
    button.setAttribute('data-type', dataAttributes[i]);
    
    if (i % 4 === 0) {
        const row = document.createElement('div');
        btnContainer.appendChild(row);
    }
    
    btnContainer.lastChild.appendChild(button);
}

function evaluate() {
    const expression = stageView.textContent;

    const numbers = expression.split(/[\+\-\×÷]/).map(num => parseFloat(num));
    const operators = expression.split(/[0-9]+(\.[0-9]+)?/).filter(Boolean);

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i].trim();
        const nextNumber = numbers[i + 1];

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '×':
                result *= nextNumber;
                break;
            case '÷':
                result /= nextNumber;
                break;
        }
    }

    mainView.textContent = result.toString();
}

let main = 0;
let stage = 0;
container.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        if (e.target.getAttribute('data-type') === 'num') {
            mainView.textContent += e.target.textContent;
            main = mainView.textContent;
        }
        
        if (e.target.getAttribute('data-type') === 'oper') {
            // operator only if num
            if (main.trim() !== '') {
                stage = main;
                console.log(stage);
                stageView.textContent = main;
                stageView.textContent += ' ' + e.target.textContent;
                mainView.textContent = '';
            }
        }

        if (e.target.getAttribute('data-type') === 'eq') {
            stageView.textContent += main;
            evaluate();
            stageView.textContent = ''; 
        }
    }

    if (e.target.matches('clearbtn')) {
        mainView.textContent = '';
        stageView.textContent = '';
    }

    if (e.target.matches('delbtn')) {
        mainView.textContent = mainView.textContent.slice(0, -1);
    }
});
