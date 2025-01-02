let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle'; // Startspieler: 'circle' oder 'cross'

function init() {
    render();
}

// Die render-Funktion generiert die Tabelle und fügt sie in den Container ein
function render() {
    const content = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Berechnet den Index im Array
            const field = fields[index];

            let symbol = '';
            if (field === 'circle') {
                symbol = generateCircleSVG();
            } else if (field === 'cross') {
                symbol = generateCrossSVG();
            }

            // Hinzufügen der onclick-Funktion
            tableHTML += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;
}

// Funktion, die beim Klicken auf ein Feld ausgeführt wird
function handleClick(index, cell) {
    if (fields[index] === null) {
        // Füge "circle" oder "cross" in das passende Feld im Array ein
        fields[index] = currentPlayer;

        // HTML-Code für das Symbol einfügen
        if (currentPlayer === 'circle') {
            cell.innerHTML = generateCircleSVG();
            currentPlayer = 'cross'; // Wechsel zum nächsten Spieler
        } else {
            cell.innerHTML = generateCrossSVG();
            currentPlayer = 'circle'; // Wechsel zum nächsten Spieler
        }

        // Entferne die onclick-Funktion des Feldes
        cell.onclick = null;

        // Prüfe, ob das Spiel vorbei ist
        const winner = checkWinner();
        if (winner) {
            drawWinningLine(winner.combination);
            // alert(`${winner.player} gewinnt!`);
        }
    }
}

//Neustart des Spiels
function restartGame(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render();
}

// Funktion, die alle möglichen Gewinnkombinationen überprüft
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von oben links nach unten rechts
        [2, 4, 6], // Diagonale von oben rechts nach unten links
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { player: fields[a], combination }; // Gibt den Gewinner und die Kombination zurück
        }
    }

    return null; // Kein Gewinner
}

// Funktion, die eine Linie für die Gewinnkombination zeichnet
function drawWinningLine(combination) {
    const content = document.getElementById('content');
    const table = content.querySelector('table');
    const cells = table.querySelectorAll('td');

    // Hole die Positionen der Zellen der Gewinnkombination
    const startCell = cells[combination[0]];
    const endCell = cells[combination[2]];

    // Berechne die Positionen für die Linie
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = content.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 - contentRect.left;
    const startY = startRect.top + startRect.height / 2 - contentRect.top;
    const endX = endRect.left + endRect.width / 2 - contentRect.left;
    const endY = endRect.top + endRect.height / 2 - contentRect.top;

    // Erstelle eine Linie und füge sie in den DOM ein
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = '#FFFFFF'; // Farbe der Linie
    line.style.height = '5px';
    line.style.width = `${Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)}px`;
    line.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    line.style.transformOrigin = '0 50%';
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;

    content.appendChild(line);
}

// Generiert den SVG-Code für einen Kreis
function generateCircleSVG() {
    return `
    <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="#00B0EF" stroke-width="10" fill="none" />
    </svg>`;
}

// Generiert den SVG-Code für ein Kreuz
function generateCrossSVG() {
    return `
    <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10" stroke-linecap="round" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10" stroke-linecap="round" />
    </svg>`;
}

// Spiel initialisieren
init();
