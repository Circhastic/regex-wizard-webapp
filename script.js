document.addEventListener('DOMContentLoaded', function() {
    const switchDFAButton = document.getElementById('switch_dfa');
    const showCFGButton = document.getElementById('show_cfg');
    const simulateRegexButton = document.getElementById('simulate_regex');
    const currentRegexElement = document.getElementById('current_regex');
    const currentAlphabetElement = document.getElementById('current_alphabet');
    const inputField = document.getElementById('input');
    let currentDFA = 1;
    let currentAlphabet = 1;
    const regexOptions = {
        1: "(a+b) (a+b)* (aa+bb) (ab+ba) (a+b)* (aba+baa)",
        2: "(11+00) (1+0)* (101+111+01) (00*+11*) (1+0+11)"
    };
    const placeholderOptions = {
        1: "baabaaba",
        2: "00111011"
    };
    const alphabetOptions = {
        1: "a, b",
        2: "0, 1"
    }

    switchDFAButton.addEventListener('click', function() {
        // Switch between DFA choices
        currentDFA = currentDFA === 1 ? 2 : 1;
        currentAlphabet = currentAlphabet === 1 ? 2 : 1;
        // Update the content of the <p id="current_regex"> element
        currentRegexElement.textContent = regexOptions[currentDFA];
        currentAlphabetElement.textContent = alphabetOptions[currentAlphabet];
        // Update the placeholder of the input field
        inputField.placeholder = placeholderOptions[currentDFA];
        // Clear the input field
        inputField.value = '';
        console.log('Switched DFA to:', currentDFA);
    });

    showCFGButton.addEventListener('click', function() {
        // TODO CFG not yet implemented
        console.log('Show CFG button clicked');
    });

    simulateRegexButton.addEventListener('click', function() {
        // Fetch request to FastAPI backend
        fetch(`https://dfa-validator.onrender.com/check_word/${currentDFA}/${encodeURIComponent(inputField.value)}`)

        .then(response => response.json())
        .then(data => {
            console.log('Simulation result:', data);
            // You can update the UI based on the simulation result here
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});