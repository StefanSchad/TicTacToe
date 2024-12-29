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
    }
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
