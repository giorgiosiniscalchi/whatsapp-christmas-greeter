# 🎄 ChristmasGreeter

> **Lo script per i pigri che non vogliono rinunciare a mandare gli auguri personalizzati a tutti!**

Un semplice script JavaScript che aggiunge un pulsante magico a WhatsApp Web per precompilare messaggi di auguri personalizzati con il nome di ogni contatto. Perfetto per Natale, compleanni, o qualsiasi occasione speciale! 

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Web-25D366?logo=whatsapp)](https://web.whatsapp.com)

---

## 🇮🇹 Italiano

### 🎯 Cos'è ChristmasGreeter?

ChristmasGreeter è uno script leggero che si integra perfettamente in WhatsApp Web, aggiungendo un pulsante discreto per automatizzare la creazione di messaggi personalizzati. 

**Cosa fa:**
- ✅ Legge automaticamente il nome del contatto dalla chat aperta
- ✅ Estrae il primo nome (anche da contatti salvati come "Mario Rossi (lavoro)")
- ✅ Precompila un messaggio personalizzato con il loro nome
- ✅ **NON invia automaticamente** - tu controlli sempre prima di premere invio!

### 🚀 Installazione Rapida

1. **Apri [WhatsApp Web](https://web.whatsapp.com)**
2. **Premi F12** (o Cmd+Option+I su Mac) per aprire la Console
3. **Copia e incolla** tutto il contenuto di `christmasgreeter.js`
4. **Premi INVIO**
5. **Fatto!** 🎉 Vedrai apparire un pulsante 🎄

### 📖 Come Usarlo

1. **Apri una chat** con un contatto
2. **Clicca sul pulsante 🎄** (di default appare integrato nella barra dei messaggi)
3. Il messaggio apparirà **precompilato** con il nome del contatto
4. **Controlla** che sia tutto ok
5. **Premi INVIO** per inviare manualmente

**Esempio:**
```
Chat aperta: "Mario Rossi (lavoro)"
↓
Click su 🎄
↓
Messaggio precompilato: "Tanti auguri di buon Natale Mario! 🎄✨❤️"
```

### ⚙️ Personalizzazione

Modifica la sezione `CONFIG` all'inizio dello script:

```javascript
const CONFIG = {
  // 📝 Il tuo messaggio personalizzato
  messaggioTemplate: "Tanti auguri di buon Natale {nome}! 🎄✨❤️",
  
  // 🎨 Emoji/testo del pulsante
  buttonText: "🎄",
  
  // 📍 Posizione del pulsante
  // Opzioni: "integrated", "above-input", "sidebar", "bottom-right"...
  position: "integrated",
  
  // 🚫 Escludi contatti specifici
  excludeList: [
    "Mamma",
    "Team Lavoro"
  ],
  
  // 🎭 Messaggi personalizzati per contatti specifici
  customMessages: {
    "Mario Rossi": "Buon Natale amico mio! 🎅",
    "Laura Bianchi": "Auguri di cuore! ❤️🎄"
  }
};
```

### 🎨 Posizioni Disponibili

| Posizione | Descrizione | Screenshot |
|-----------|-------------|------------|
| `integrated` ⭐ | Integrato nella barra (come pulsante nativo) | Consigliata! |
| `above-input` | Sopra la casella di testo | Sempre visibile |
| `sidebar` | Lato sinistro dello schermo | Non invadente |
| `bottom-right` | Angolo in basso a destra | Stile floating |
| ... | Vedi documentazione completa | |

### 🛡️ Sicurezza & Privacy

- ✅ **100% locale** - tutto viene eseguito nel tuo browser
- ✅ **Nessun dato inviato** a server esterni
- ✅ **Open source** - puoi leggere tutto il codice
- ✅ **Controllo manuale** - ogni messaggio deve essere inviato da te
- ✅ **Non usa API WhatsApp** - solo manipolazione DOM lato client

⚠️ **Nota importante:** Questo script è pensato per uso personale e sporadico. Inviare messaggi di massa potrebbe violare i termini di servizio di WhatsApp.

### 🗑️ Rimozione

Per rimuovere il pulsante, digita nella Console:
```javascript
rimuoviChristmasGreeter()
```

### 🤝 Contribuire

Contributi, issue e feature request sono benvenuti!

1. Fai un Fork del progetto
2. Crea il tuo Feature Branch (`git checkout -b feature/NuovaFunzione`)
3. Commit delle modifiche (`git commit -m 'Aggiunta nuova funzione'`)
4. Push al Branch (`git push origin feature/NuovaFunzione`)
5. Apri una Pull Request

### 📝 Changelog

#### v1.0.0 (Dicembre 2024)
- 🎉 Release iniziale
- ✨ Supporto per 7 posizioni diverse del pulsante
- 🎭 Messaggi personalizzati per contatto
- 🚫 Lista esclusioni
- 🔔 Sistema di notifiche

### ⚠️ Disclaimer

Questo script è fornito "così com'è" senza garanzie. L'uso è a tuo rischio. Gli autori non sono responsabili per eventuali conseguenze derivanti dall'uso dello script, inclusa la violazione dei termini di servizio di WhatsApp.

### 📄 Licenza

MIT License - Vedi file [LICENSE](LICENSE) per dettagli.

---

## 🇬🇧 English

### 🎯 What is ChristmasGreeter?

ChristmasGreeter is a lightweight script that seamlessly integrates into WhatsApp Web, adding a discreet button to automate personalized greeting messages.

**What it does:**
- ✅ Automatically reads the contact name from the open chat
- ✅ Extracts the first name (even from contacts saved as "John Smith (work)")
- ✅ Pre-fills a personalized message with their name
- ✅ **Does NOT send automatically** - you always control before hitting send!

### 🚀 Quick Installation

1. **Open [WhatsApp Web](https://web.whatsapp.com)**
2. **Press F12** (or Cmd+Option+I on Mac) to open the Console
3. **Copy and paste** the entire content of `christmasgreeter.js`
4. **Press ENTER**
5. **Done!** 🎉 You'll see a 🎄 button appear

### 📖 How to Use

1. **Open a chat** with a contact
2. **Click the 🎄 button** (default: integrated in the message bar)
3. The message will appear **pre-filled** with the contact's name
4. **Check** that everything is correct
5. **Press ENTER** to send manually

**Example:**
```
Open chat: "John Smith (work)"
↓
Click 🎄
↓
Pre-filled message: "Merry Christmas John! 🎄✨❤️"
```

### ⚙️ Customization

Edit the `CONFIG` section at the beginning of the script:

```javascript
const CONFIG = {
  // 📝 Your custom message template
  messaggioTemplate: "Merry Christmas {nome}! 🎄✨❤️",
  
  // 🎨 Button emoji/text
  buttonText: "🎄",
  
  // 📍 Button position
  // Options: "integrated", "above-input", "sidebar", "bottom-right"...
  position: "integrated",
  
  // 🚫 Exclude specific contacts
  excludeList: [
    "Mom",
    "Work Team"
  ],
  
  // 🎭 Custom messages for specific contacts
  customMessages: {
    "John Smith": "Merry Christmas my friend! 🎅",
    "Jane Doe": "Warm wishes! ❤️🎄"
  }
};
```

### 🛡️ Security & Privacy

- ✅ **100% local** - everything runs in your browser
- ✅ **No data sent** to external servers
- ✅ **Open source** - you can read all the code
- ✅ **Manual control** - every message must be sent by you
- ✅ **No WhatsApp API** - only client-side DOM manipulation

⚠️ **Important note:** This script is designed for personal and occasional use. Sending mass messages may violate WhatsApp's terms of service.

### 🗑️ Removal

To remove the button, type in the Console:
```javascript
rimuoviChristmasGreeter()
```

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 Changelog

#### v1.0.0 (December 2024)
- 🎉 Initial release
- ✨ Support for 7 different button positions
- 🎭 Custom messages per contact
- 🚫 Exclusion list
- 🔔 Notification system

### ⚠️ Disclaimer

This script is provided "as is" without warranties. Use at your own risk. The authors are not responsible for any consequences resulting from the use of the script, including violation of WhatsApp's terms of service.

### 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🎄 Auguri!

Questo progetto è nato da una pigra sera di dicembre... perché mandare auguri personalizzati dovrebbe essere facile, non faticoso! 

Se ti è stato utile, lascia una ⭐ su GitHub!

**P.S.** A chi ha ricevuto i miei auguri grazie a questo script: non odiatemi, vi voglio bene! ❤️

---

**Made with ❤️ (and a bit of laziness) by Giorgio Siniscalchi**

🎅 *"Working smarter, not harder - even during holidays!"*
