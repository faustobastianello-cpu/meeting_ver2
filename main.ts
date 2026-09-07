// Micro:bit - incontri automatici per vicinanza
// Incolla nell'editor JavaScript di MakeCode, poi torna alla vista Blocchi.

// ====== DA CAMBIARE SU OGNI SCHEDA ======
let MIO_NOME = "ugo"
// ========================================

let SOGLIA = -55        // meno negativo = deve stare piu' vicino
let nomiTrovati: string[] = []
let attivo = false

// ---- AVVIO ----
radio.setGroup(1)
radio.setTransmitPower(4)   // 0 = raggio minimo, 7 = massimo
nomiTrovati = []
attivo = false
basic.showString(MIO_NOME)

// ---- TASTO A: azzera la lista e avvia la ricerca ----
input.onButtonPressed(Button.A, function () {
    nomiTrovati = []
    attivo = true
    basic.showIcon(IconNames.Yes)
    basic.clearScreen()
})

// ---- TASTO B: mostra quanti incontri ----
input.onButtonPressed(Button.B, function () {
    basic.showNumber(nomiTrovati.length)
})

// ---- RICEZIONE: solo se vicino e mai visto prima ----
radio.onReceivedString(function (receivedString) {
    if (attivo) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > SOGLIA) {
            if (nomiTrovati.indexOf(receivedString) < 0) {
                nomiTrovati.push(receivedString)
                music.playTone(988, music.beat(BeatFraction.Quarter))
                basic.showString(receivedString)
                basic.clearScreen()
            }
        }
    }
})

// ---- INVIO CONTINUO DEL PROPRIO NOME ----
basic.forever(function () {
    radio.sendString(MIO_NOME)
    basic.pause(300)
})