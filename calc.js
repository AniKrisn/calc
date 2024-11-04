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
mainView.textContent = 'hey';
stageView.textContent = 'stage';

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
