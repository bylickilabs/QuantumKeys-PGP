// Überprüfen, ob OpenPGP.js verfügbar ist
if (typeof openpgp === 'undefined') {
    alert("Fehler: OpenPGP.js konnte nicht geladen werden.");
    console.error("OpenPGP.js konnte nicht geladen werden!");
} else {
    console.log("OpenPGP.js erfolgreich geladen!");
}

async function generateKeys() {
    console.log("Starte Schlüsselerstellung...");

    const options = {
        userIds: [{ name: 'Benutzer', email: 'user@example.com' }],
        numBits: 2048,  // Minimale Schlüssellänge
        passphrase: 'MySecretPassphrase'  // Passphrase für den privaten Schlüssel
    };

    try {
        // Generiere den Schlüssel
        const key = await openpgp.generateKey(options);

        // Den öffentlichen und privaten Schlüssel anzeigen
        console.log("Schlüssel erfolgreich generiert!");
        document.getElementById("publicKey").value = key.publicKeyArmored;
        document.getElementById("privateKey").value = key.privateKeyArmored;

    } catch (error) {
        console.error("Fehler bei der Schlüsselerstellung:", error);
        alert("Fehler bei der Schlüsselerstellung. Bitte überprüfe die Konsole für Details.");
    }
}

// Download der Schlüssel
function downloadKey(type) {
    const keyContent = type === 'public' ? document.getElementById("publicKey").value : document.getElementById("privateKey").value;
    const blob = new Blob([keyContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = type === 'public' ? 'public_key.asc' : 'private_key.asc';
    link.click();
}