function generatePassword() {
    const length = document.getElementById('length').value;
    let characters = '';
    if (document.getElementById('lowercase').checked) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (document.getElementById('uppercase').checked) {
        characters += 'ABCDEFGHIJKLMNOPRSTUVWXYZ';
    }
    if (document.getElementById('numbers').checked) {
        characters += '1234567890';
    }
    if (document.getElementById('special').checked) {
        characters += '!#@$%&*?/';
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * characters.length);
        password += characters.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById('Password').value = password;

    evaluateStrength(password);
}

// function savePassword() {
//     const password = document.getElementById('Password').value;
//     let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];

//     if (!savedPasswords.includes(password)) {
//         savedPasswords.push(password);
//         localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));

//         // Add password to history
//         const historyList = document.getElementById('history-list');
//         const listItem = document.createElement('li');
//         listItem.textContent = password;
//         historyList.appendChild(listItem);

//         showSaveConfirmation();
//     }
// }

function savePassword() {
    const password = document.getElementById('Password').value;
    let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];

    if (!savedPasswords.includes(password)) {
        savedPasswords.push(password);
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));

        // Add password to history with a delete button
        addPasswordToHistory(password);
        showSaveConfirmation();
    }
}

function addPasswordToHistory(password) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = password;

    // Create a delete button (dustbin icon)
    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = '&#128465;'; // Dustbin icon
    deleteButton.classList.add('delete-icon');
    deleteButton.addEventListener('click', function() {
        deletePassword(password, listItem);
    });

    listItem.appendChild(deleteButton);
    historyList.appendChild(listItem);
}

function deletePassword(password, listItem) {
    let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
    savedPasswords = savedPasswords.filter(pwd => pwd !== password);
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    listItem.remove();
}


function showSaveConfirmation() {
    const overlay = document.getElementById('save-confirmation-overlay');
    const cancelBtn = document.getElementById('cancel-overlay');

    overlay.style.display = 'flex';

    overlay.removeEventListener('click', handleOverlayClick);
    cancelBtn.removeEventListener('click', closeOverlay);

    overlay.addEventListener('click', handleOverlayClick);
    cancelBtn.addEventListener('click', closeOverlay);

    function handleOverlayClick(event) {
        if (event.target === overlay) {
            closeOverlay();
        }
    }

    function closeOverlay() {
        overlay.style.display = 'none';
    }
}

document.getElementById('toggle-password-visibility').addEventListener('click', function() {
    const passwordField = document.getElementById('Password');
    const eyeIcon = document.getElementById('toggle-password-visibility');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        eyeIcon.textContent = '👁️';
    }
});

document.getElementById('toggle-history').addEventListener('click', function() {
    const history = document.getElementById('history');
    history.style.display = history.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('close-history').addEventListener('click', function() {
    document.getElementById('history').style.display = 'none';
});

function evaluateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    const strengthMeter = document.getElementById('strength-meter');
    strengthMeter.style.width = (strength * 20) + '%';
    strengthMeter.style.backgroundColor = strength < 3 ? 'red' : strength < 4 ? 'orange' : 'green';
}

function copyPassword() {
    const passwordField = document.getElementById('Password');
    
    if (passwordField.value) {
        // Select the password field
        passwordField.select();
        passwordField.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text to the clipboard
        document.execCommand('copy');
        
        // Provide feedback to the user
        alert('Password copied to clipboard');
    } else {
        alert('No password to copy');
    }
}


// function loadSavedPasswords() {
//     const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
//     const historyList = document.getElementById('history-list');
//     historyList.innerHTML = '';

//     savedPasswords.forEach(password => {
//         const listItem = document.createElement('li');
//         listItem.textContent = password;
//         historyList.appendChild(listItem);
//     });
// }

// window.addEventListener('load', loadSavedPasswords);

function loadSavedPasswords() {
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
    savedPasswords.forEach(password => {
        addPasswordToHistory(password);
    });
}

window.onload = loadSavedPasswords;
