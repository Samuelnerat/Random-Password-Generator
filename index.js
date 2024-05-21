// const password = document.getElementById('Password');
// const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890!#@$%&*?/'
// const passswordLength = 12;

function generatePassword () {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890!#@$%&*?/'
    const passswordLength = 12;
    let password = "";

    for (let i = 0; i <= passswordLength; i++) {
        const randomNumber = Math.floor(Math.random() * characters.length);
        password += characters.substring(randomNumber,randomNumber+1);
    }
    document.getElementById('Password').value = password;
}
function copyPassword () {
    const copyText = document.getElementById('Password');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

