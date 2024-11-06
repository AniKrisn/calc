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
mainView.style.fontSize = '3rem'; 
mainView.style.transition = 'font-size 0.2s ease'; 

let equalsJustPressed = false;
//let waitingForNumber = false; // negative numbers

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
    'dot', 'num', 'eq', 'oper'];
    button.setAttribute('data-type', dataAttributes[i]);
    
    if (i % 4 === 0) {
        const row = document.createElement('div');
        btnContainer.appendChild(row);
    }
    
    btnContainer.lastChild.appendChild(button);
}


container.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const dataType = e.target.getAttribute('data-type');
        
        if (dataType === 'num') {
            if (equalsJustPressed) {
                mainView.textContent = '';
                stageView.textContent = '';
                equalsJustPressed = false;
            }
            mainView.textContent += e.target.textContent;
            //waitingForNumber = false;
            updateFontSize();
        }
        
        else if (dataType === 'dot') {
            // Only add dot if there isn't one already in the current number
            if (!mainView.textContent.includes('.')) {
                // If mainView is empty, add a leading zero
                if (mainView.textContent === '') {
                    mainView.textContent = '0';
                }
                mainView.textContent += '.';
                //waitingForNumber = false;
                updateFontSize();
            }
        }
        
        else if (dataType === 'oper') {
            if (mainView.textContent.trim() === '') return;

            // Remove trailing decimal point if exists
            if (mainView.textContent.endsWith('.')) {
                mainView.textContent = mainView.textContent.slice(0, -1);
            }
            
            stageView.textContent += ' ' + mainView.textContent;
            stageView.textContent += ' ' + e.target.textContent;
            mainView.textContent = '';
            updateFontSize();
            
            // Check if we have enough tokens for automatic evaluation
            const tokens = stageView.textContent.trim().split(/\s+/).filter(Boolean);
            if (tokens.length >= 4) { // This means we have: number operator number operator
                const currentExpression = tokens.slice(0, 3).join(' '); // Take first 3 tokens
                stageView.textContent = ' ' + tokens[3]; // Keep the last operator
                
                // Temporarily set stageView to the expression we want to evaluate
                const tempStageView = stageView.textContent;
                stageView.textContent = currentExpression;
                evaluate();
                
                // If evaluation was successful, set up for the next operation
                if (mainView.textContent !== 'Error') {
                    stageView.textContent = ' ' + mainView.textContent + tempStageView;
                    mainView.textContent = '';
                    updateFontSize();
                }
            }
        }
        
        else if (dataType === 'eq') {
            if (mainView.textContent.trim() === '') return;
            
            // Remove trailing decimal point if exists
            if (mainView.textContent.endsWith('.')) {
                mainView.textContent = mainView.textContent.slice(0, -1);
            }
            
            stageView.textContent += ' ' + mainView.textContent;
            evaluate();
            updateFontSize();
            equalsJustPressed = true;
        }
    }

    else if (e.target.matches('clearbtn')) {
        mainView.textContent = '';
        stageView.textContent = '';
        updateFontSize();
    }
    
    else if (e.target.matches('delbtn')) {
        mainView.textContent = mainView.textContent.slice(0, -1);
        updateFontSize();
    }
});


function evaluate() {
    const expression = stageView.textContent.trim();
    
    if (!expression) return;
    
    const normalizedExpression = expression.replace(/−/g, '-');
    const tokens = normalizedExpression.split(/\s+/).filter(Boolean);
    
    if (tokens.length < 3) return;
    
    let result = parseFloat(tokens[0]);
    
    if (isNaN(result)) return;
    
    for (let i = 1; i < tokens.length - 1; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);
        
        if (isNaN(nextNumber)) return;
        
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
                if (nextNumber === 0) {
                    mainView.textContent = 'Error';
                    updateFontSize();
                    return;
                }
                result /= nextNumber;
                break;
            default:
                return;
        }
    }
    
    if (!isFinite(result) || isNaN(result)) {
        mainView.textContent = 'Error';
        updateFontSize();
        return;
    }
    
    const formattedResult = Number.isInteger(result) ? 
        result.toString() : 
        result.toFixed(10).replace(/\.?0+$/, '');
    
    mainView.textContent = formattedResult;
    stageView.textContent = '';
    updateFontSize();
}


function updateFontSize() {
    const length = mainView.textContent.length;
    if (length > 15) {
        mainView.style.fontSize = '1.5rem';
    } else if (length > 8) {
        mainView.style.fontSize = '2rem';
    } else {
        mainView.style.fontSize = '3rem';
    }
}
