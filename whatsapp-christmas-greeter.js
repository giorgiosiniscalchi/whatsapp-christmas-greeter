// ============================================
// 🎄 CHRISTMASGREETER - WhatsApp Greeting Assistant
// ============================================
// Version: 1.0.0
// Author: Giorgio Siniscalchi
// License: MIT
// Repository: github.com/giorgiosiniscalchi/christmasgreeter
// ============================================

(function() {
  'use strict';

  // ============================================
  // ⚙️ CONFIGURAZIONE PERSONALIZZABILE
  // ============================================
  const CONFIG = {
    // 📝 Template del messaggio - usa {nome} per il nome del contatto
    messaggioTemplate: "Tanti auguri di buon Natale {nome}! 🎄✨❤️",
    
    // 🎨 Aspetto del pulsante
    buttonText: "🎄",              // Testo/emoji del pulsante
    buttonColor: "#25D366",        // Colore (verde WhatsApp default)
    
    // 📍 Posizione del pulsante
    // Opzioni: "integrated", "above-input", "sidebar", "bottom-right", 
    //          "bottom-left", "top-right", "top-left"
    position: "integrated",
    
    // 🚫 Lista contatti da escludere (opzionale)
    // Inserisci i nomi ESATTI come appaiono in WhatsApp
    excludeList: [
      // "Mamma",
      // "Papà",
      // "Team Lavoro",
      // "+39 333 1234567"
    ],
    
    // 🎭 Messaggi personalizzati per contatti specifici (opzionale)
    customMessages: {
      // "Mario Rossi": "Buon Natale amico mio! 🎅",
      // "Laura Bianchi": "Auguri di cuore! ❤️🎄"
    },
    
    // 🔔 Mostra notifiche
    showNotifications: true,
    
    // 🐛 Modalità debug (mostra candidati per il nome)
    debug: false
  };

  // ============================================
  // 🔍 VERIFICA INSTALLAZIONE
  // ============================================
  if (document.getElementById('whatsapp-prefill-btn')) {
    console.log("⚠️ ChristmasGreeter già attivo! Rimuovi prima con: rimuoviChristmasGreeter()");
    return;
  }

  // ============================================
  // 🎯 ESTRAZIONE NOME CONTATTO
  // ============================================
  function estraiNomeContatto() {
    const strategie = [
      // Strategia 1: data-testid ufficiale
      () => {
        const el = document.querySelector('header [data-testid="conversation-info-header-chat-title"]');
        return el?.textContent?.trim();
      },
      
      // Strategia 2: Span con contenuto significativo
      () => {
        const spans = document.querySelectorAll('header span');
        for (const span of spans) {
          const text = span.textContent.trim();
          if (text && 
              text.length > 2 && 
              text.length < 100 &&
              !text.includes('-') &&
              !text.includes('status') &&
              !text.includes('outline') &&
              !text.match(/^[a-z]+\d+$/) &&
              !/^\d+$/.test(text)) {
            return text;
          }
        }
        return null;
      },
      
      // Strategia 3: Div con testo puro
      () => {
        const divs = document.querySelectorAll('header div');
        for (const div of divs) {
          const text = div.textContent.trim();
          if (text && 
              text.length > 2 && 
              text.length < 100 &&
              div.children.length === 0 &&
              !text.includes('online') &&
              !text.includes('digitando')) {
            return text;
          }
        }
        return null;
      },
      
      // Strategia 4: Fallback
      () => {
        const header = document.querySelector('header');
        if (header) {
          const text = header.textContent.trim().split('\n')[0];
          if (text && text.length > 2 && text.length < 100) {
            return text;
          }
        }
        return null;
      }
    ];

    for (const strategia of strategie) {
      try {
        const risultato = strategia();
        if (risultato) return risultato;
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  // ============================================
  // ✂️ ESTRAZIONE PRIMO NOME
  // ============================================
  function estraiPrimoNome(nomeCompleto) {
    if (!nomeCompleto) return null;
    
    // Rimuovi contenuto tra parentesi: "Mario Rossi (lavoro)" → "Mario Rossi"
    let pulito = nomeCompleto.replace(/\([^)]*\)/g, '').trim();
    
    // Prendi la prima parola
    const primoNome = pulito.split(/\s+/)[0];
    
    // Capitalizza correttamente
    return primoNome.charAt(0).toUpperCase() + primoNome.slice(1).toLowerCase();
  }

  // ============================================
  // 📝 PREFILL MESSAGGIO
  // ============================================
  function prefillMessaggio(testo) {
    const selettori = [
      'div[contenteditable="true"][data-tab="10"]',
      'div[contenteditable="true"][role="textbox"]',
      'footer div[contenteditable="true"]'
    ];

    let inputBox = null;
    for (const sel of selettori) {
      inputBox = document.querySelector(sel);
      if (inputBox) break;
    }

    if (!inputBox) {
      mostraNotifica("❌ Box di input non trovato", "error");
      return false;
    }

    inputBox.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, testo);
    inputBox.dispatchEvent(new Event('input', { bubbles: true }));
    inputBox.dispatchEvent(new Event('change', { bubbles: true }));
    
    return true;
  }

  // ============================================
  // 🔔 SISTEMA NOTIFICHE
  // ============================================
  function mostraNotifica(messaggio, tipo = "success") {
    if (!CONFIG.showNotifications) return;
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${tipo === "success" ? "#25D366" : tipo === "warning" ? "#FFA726" : "#E53935"};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = messaggio;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    if (!document.getElementById('christmasgreeter-styles')) {
      style.id = 'christmasgreeter-styles';
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transition = "opacity 0.3s, transform 0.3s";
      notification.style.opacity = "0";
      notification.style.transform = "translateX(400px)";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ============================================
  // 🎯 HANDLER CLICK PRINCIPALE
  // ============================================
  function handleButtonClick() {
    console.log("🎄 ChristmasGreeter attivato!");
    
    // 1. Estrai nome completo
    const nomeCompleto = estraiNomeContatto();
    if (!nomeCompleto) {
      mostraNotifica("❌ Apri una chat prima!", "error");
      return;
    }
    
    // 2. Controlla se è nella lista esclusioni
    if (CONFIG.excludeList.includes(nomeCompleto)) {
      mostraNotifica(`⏭️ ${nomeCompleto} è nella lista esclusioni`, "warning");
      console.log(`⏭️ Saltato: ${nomeCompleto} (nella lista esclusioni)`);
      return;
    }
    
    // 3. Estrai primo nome
    const primoNome = estraiPrimoNome(nomeCompleto);
    console.log(`✅ Nome trovato: ${primoNome} (${nomeCompleto})`);
    
    // 4. Genera messaggio (personalizzato o standard)
    let messaggio;
    if (CONFIG.customMessages[nomeCompleto]) {
      messaggio = CONFIG.customMessages[nomeCompleto];
      console.log(`🎭 Usando messaggio personalizzato per ${nomeCompleto}`);
    } else {
      messaggio = CONFIG.messaggioTemplate.replace('{nome}', primoNome);
    }
    
    // 5. Prefill
    const successo = prefillMessaggio(messaggio);
    if (successo) {
      mostraNotifica(`✅ Messaggio per ${primoNome} pronto!`);
      
      // Animazione pulsante
      button.style.transform = CONFIG.position === "integrated" ? "scale(0.9)" : "scale(0.9)";
      setTimeout(() => {
        button.style.transform = CONFIG.position === "integrated" ? "scale(1)" : "scale(1)";
      }, 100);
    }
  }

  // ============================================
  // 🐛 FUNZIONE DEBUG
  // ============================================
  function debugCandidati() {
    console.log("🔍 CHRISTMASGREETER - ANALISI DEBUG\n" + "=".repeat(60));
    
    const headerTest = document.querySelector('header [data-testid]');
    console.log("1. Header [data-testid]:", headerTest?.textContent);
    
    const headerSpans = document.querySelectorAll('header span');
    console.log(`2. Span in header (${headerSpans.length}):`);
    headerSpans.forEach((span, i) => {
      const text = span.textContent.trim();
      if (text && text.length > 0 && text.length < 100) {
        console.log(`   [${i}] "${text}"`);
      }
    });
    
    console.log("=".repeat(60));
  }

  if (CONFIG.debug) {
    debugCandidati();
    return;
  }

  // ============================================
  // 🎨 CREAZIONE PULSANTE
  // ============================================
  const button = document.createElement('button');
  button.id = 'whatsapp-prefill-btn';
  button.innerHTML = CONFIG.buttonText;
  button.title = "ChristmasGreeter - Clicca per auguri personalizzati";
  
  const baseStyle = `
    background: transparent;
    color: #8696a0;
    border: none;
    cursor: pointer;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    transition: all 0.2s ease;
    user-select: none;
  `;
  
  const positions = {
    "integrated": `
      ${baseStyle}
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0 4px;
    `,
    "above-input": `
      position: fixed;
      bottom: 75px;
      right: 30px;
      background: ${CONFIG.buttonColor};
      color: white;
      border: none;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
      z-index: 999999;
      cursor: pointer;
      transition: all 0.2s ease;
    `,
    "sidebar": `
      position: fixed;
      background: ${CONFIG.buttonColor};
      color: white;
      border: none;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-shadow: 0 2px 12px rgba(37, 211, 102, 0.3);
      z-index: 999999;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    `,
    "bottom-right": `
      position: fixed;
      background: ${CONFIG.buttonColor};
      color: white;
      border: none;
      bottom: 30px;
      right: 30px;
      border-radius: 50px;
      padding: 15px 25px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 999999;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    `,
    "bottom-left": `
      position: fixed;
      background: ${CONFIG.buttonColor};
      color: white;
      border: none;
      bottom: 30px;
      left: 30px;
      border-radius: 50px;
      padding: 15px 25px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 999999;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    `,
    "top-right": `
      position: fixed;
      background: ${CONFIG.buttonColor};
      color: white;
      border: none;
      top: 80px;
      right: 30px;
      border-radius: 50px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 999999;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    `,
    "top-left": `
      position: fixed;
      background: ${CONFIG.buttonColor};
      color: white;
      border: none;
      top: 80px;
      left: 30px;
      border-radius: 50px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 999999;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    `
  };
  
  button.style.cssText = positions[CONFIG.position] || positions["integrated"];

  // ============================================
  // 🎭 EVENTI HOVER & CLICK
  // ============================================
  button.addEventListener('mouseenter', () => {
    if (CONFIG.position === "integrated") {
      button.style.background = "rgba(255,255,255,0.1)";
      button.style.color = "#00a884";
    } else if (CONFIG.position === "sidebar") {
      button.style.transform = "translateY(-50%) scale(1.1)";
      button.style.boxShadow = "0 4px 16px rgba(37, 211, 102, 0.5)";
    } else {
      button.style.transform = "scale(1.05)";
      button.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.6)";
    }
  });

  button.addEventListener('mouseleave', () => {
    if (CONFIG.position === "integrated") {
      button.style.background = "transparent";
      button.style.color = "#8696a0";
    } else if (CONFIG.position === "sidebar") {
      button.style.transform = "translateY(-50%) scale(1)";
      button.style.boxShadow = "0 2px 12px rgba(37, 211, 102, 0.3)";
    } else {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "0 4px 15px rgba(37, 211, 102, 0.4)";
    }
  });

  button.addEventListener('mousedown', () => {
    if (CONFIG.position === "integrated") {
      button.style.transform = "scale(0.9)";
    } else if (CONFIG.position === "sidebar") {
      button.style.transform = "translateY(-50%) scale(0.95)";
    } else {
      button.style.transform = "scale(0.95)";
    }
  });

  button.addEventListener('mouseup', () => {
    if (CONFIG.position === "integrated") {
      button.style.transform = "scale(1)";
    } else if (CONFIG.position === "sidebar") {
      button.style.transform = "translateY(-50%) scale(1.1)";
    } else {
      button.style.transform = "scale(1.05)";
    }
  });

  button.addEventListener('click', handleButtonClick);

  // ============================================
  // 🚀 INSERIMENTO INTELLIGENTE NEL DOM
  // ============================================
  function inserisciPulsante() {
    if (CONFIG.position === "integrated") {
      const footer = document.querySelector('footer');
      if (!footer) {
        console.error("❌ Footer non trovato, uso posizione alternativa");
        button.style.cssText = positions["above-input"];
        document.body.appendChild(button);
        return;
      }
      
      const buttonContainer = footer.querySelector('div[role="button"]')?.parentElement?.parentElement;
      
      if (buttonContainer) {
        buttonContainer.insertBefore(button, buttonContainer.firstChild);
        console.log("✅ Pulsante integrato nella barra!");
      } else {
        const footerDiv = footer.querySelector('div');
        if (footerDiv) {
          footerDiv.insertBefore(button, footerDiv.firstChild);
        } else {
          footer.appendChild(button);
        }
      }
    } else {
      document.body.appendChild(button);
    }
  }

  inserisciPulsante();

  // ============================================
  // 🗑️ FUNZIONE GLOBALE RIMOZIONE
  // ============================================
  window.rimuoviChristmasGreeter = function() {
    const btn = document.getElementById('whatsapp-prefill-btn');
    if (btn) {
      btn.style.transition = "all 0.3s ease";
      btn.style.transform = "scale(0)";
      btn.style.opacity = "0";
      setTimeout(() => {
        btn.remove();
        console.log("✅ ChristmasGreeter rimosso!");
      }, 300);
      delete window.rimuoviChristmasGreeter;
    }
  };

  // ============================================
  // 🎉 MESSAGGIO SUCCESSO
  // ============================================
  console.log(`
╔════════════════════════════════════════════════╗
║  🎄 CHRISTMASGREETER v1.0.0 ATTIVATO! 🎄      ║
╚════════════════════════════════════════════════╝

✅ Pulsante installato in posizione: ${CONFIG.position}
📝 Template: "${CONFIG.messaggioTemplate}"
🚫 Contatti esclusi: ${CONFIG.excludeList.length}
🎭 Messaggi personalizzati: ${Object.keys(CONFIG.customMessages).length}

💡 COMANDI:
   • rimuoviChristmasGreeter() - Rimuovi il pulsante

🎄 Buon Natale! 
  `);

  mostraNotifica("🎄 ChristmasGreeter attivato!", "success");

})();
