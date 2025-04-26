// Ecriture construction
const NB_JOUEURS = 7;
const tbody = document.querySelector('tbody');

function creerTr(picture_str, negative_bool, type_str) {
    const tr  = document.createElement('tr');
    const td  = document.createElement('td');
    const img = document.createElement('img');
    tbody.appendChild(tr);
    tr.appendChild(td);
    td.appendChild(img);
    img.src = picture_str + '.svg';
    for ( let i = 1; i <= NB_JOUEURS; i++ ) {
        const td = document.createElement('td');
        tr.appendChild(td);
        if (picture_str !== 'nom')
            td.className = 'j' + String(i);
        if (negative_bool) {
            const button = document.createElement('button');
            td.appendChild(button);
            button.textContent = '+';
        }
        if (type_str !== null) {
            const input = document.createElement('input');
            td.appendChild(input);
            input.type = type_str;
        }
    }
}

creerTr(      'nom', false, 'text');
creerTr('merveille', false, 'number');
creerTr(   'tresor', false, 'number');
creerTr('militaire', true , 'number');
creerTr(   'bleues', false, 'number');
creerTr(   'jaunes', false, 'number');
creerTr(   'vertes', false, 'number');
creerTr('violettes', false, 'number');
creerTr(    'total', false,  null);


// Logique additionneur
let joueurs = [];
for (let i = 1; i <= NB_JOUEURS; i++)
    joueurs.push(document.querySelectorAll('.j' + String(i) + ' input'));
const totaux = document.querySelectorAll('tr:last-child td:not(:first-child)');

function additionneur(no_joueur) {
    let S = 0;
    for (const input of joueurs[no_joueur]) {
        const button = input.previousElementSibling;
        if (button !== null && button.textContent === '-')
            S -= Math.abs(parseInt(input.value) || 0);
        else
            S += parseInt(input.value) || 0;
    }
    totaux[no_joueur].textContent = String(S);
}

for (let i = 0; i < NB_JOUEURS; i++) {
    for (input of joueurs[i]) {
        input.addEventListener('input', () => { additionneur(i); })
    }
}


// Reinitialisateur
const choixReset = document.getElementById('choixReset');
const reset      = document.getElementById('reset');
const annuler    = document.getElementById('annuler');
const confirm    = document.getElementById('confirm');

function reseter() {
    annulation();
    for (const joueur of joueurs) {
        for (const input of joueur)
            input.value = '';
    }
    for (const button of document.querySelectorAll('table button'))
        button.textContent = '+';
    for (const total of totaux)
        total.textContent = '';
}

function annulation() {
    confirm.style.display = 'none';
    choixReset.style.display = '';
}

function confirmation() {
    choixReset.style.display = 'none';
    confirm.style.display = '';
}

confirm.style.display = 'none';
choixReset.addEventListener('click', confirmation);
annuler.addEventListener('click', annulation);
reset.addEventListener('click', reseter);


// Negative input
const btns   = document.querySelectorAll('table button');
const inputs = document.querySelectorAll('tr:nth-child(4) input')

function changeButton(input, btn) {
    if (btn.textContent === '+')
        btn.textContent = '-';
    else
        btn.textContent = '+';
}

function sortie(input, btn) {
    if (btn.textContent === '-')
        input.value = '-' + input.value;
    btn.style.display = 'none';
}

function entree(input, btn) {
    if (btn.textContent === '-')
        input.value = input.value.substring(1);
    btn.style.display = '';
}

for (const btn of btns)
    btn.style.display = 'none';
for (let i = 0; i < NB_JOUEURS; i++) {
    btns[i].addEventListener('pointerdown', (e) => {
        e.preventDefault();
        changeButton(inputs[i], btns[i]);
        additionneur(i);
    });
    inputs[i].addEventListener('focus', () => { entree(inputs[i], btns[i]); });
    inputs[i].addEventListener('blur', () => { sortie(inputs[i], btns[i]); });
}
