const container = document.querySelector('.container');
const viewport = document.createElement('viewport');
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

clearButton.textContent = "CLEAR";
delButton.textContent = "DELETE";
viewport.textContent = "0";

const buttonCount = 16;
for (let i = 0; i < buttonCount; i++) {
    const button = document.createElement('button'); 

    const buttonTexts = ['7', '8', '9', '÷', '4', '5', '6', 'x', '1', '2', '3', '-', '.', '0', '=', '+'];
    button.textContent = buttonTexts[i]; 
    button.className = 'butty';

    const dataAttributes = ['num', 'num', 'num', 'oper', 'num', 'num', 'num', 'oper', 'num', 'num', 'num', 'oper', 'oper', 'num', 'oper', 'oper'];
    button.setAttribute('data-type', dataAttributes[i]);
    
    if (i % 4 === 0) {
        const row = document.createElement('div');
        btnContainer.appendChild(row);
    }
    
    btnContainer.lastChild.appendChild(button);
}




