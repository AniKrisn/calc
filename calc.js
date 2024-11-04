const container = document.querySelector('.container');
const viewport = document.createElement('viewport');
const stageView = document.createElement('stageView');
const clearContainer = document.createElement('clearct');
const clearButton = document.createElement('clearbtn');
const delButton = document.createElement('delbtn');
const btnContainer = document.querySelector('.btn-container');

viewport.className = 'viewport';
clearContainer.className = 'clearct';
clearButton.className = 'clearbtn';
delButton.className = 'delbtn';

container.insertBefore(viewport, container.querySelector('.btn-container'));
container.insertBefore(clearContainer, container.querySelector('.btn-container'));
clearContainer.appendChild(clearButton);
clearContainer.appendChild(delButton);
clearButton.setAttribute('data-type', 'clear');
delButton.setAttribute('data-type', 'del');

clearButton.textContent = "CLEAR";
delButton.textContent = "DELETE";
viewport.setAttribute('data-placeholder', '0');
viewport.textContent = '';

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
    'oper', 'num', 'oper', 'oper'];
    button.setAttribute('data-type', dataAttributes[i]);
    
    if (i % 4 === 0) {
        const row = document.createElement('div');
        btnContainer.appendChild(row);
    }
    
    btnContainer.lastChild.appendChild(button);
}

var res = 0;
container.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        if (e.target.getAttribute('data-type') === 'num') {
            viewport.textContent += e.target.textContent;
            res = viewport.textContent;
        }
        else if (e.target.getAttribute('data-type') === 'oper') {
            if (res) {
                stage = res;
                viewport.textContent += e.target.textContent;
                res = viewport.textContent;
                console.log(stage);
                console.log(res);

            }
        }
    }

    if (e.target.matches('clearbtn')) {
        viewport.textContent = '';
    }

    if (e.target.matches('delbtn')) {
        viewport.textContent = viewport.textContent.slice(0, -1);
    }
});

