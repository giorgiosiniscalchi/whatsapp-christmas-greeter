// ============================================
// CHRISTMASGREETER - CONFIGURATION EXAMPLES
// ============================================

// EXAMPLE 1: Minimal Setup
const CONFIG_MINIMAL = {
  messaggioTemplate: "Merry Christmas {nome}! 🎄",
  buttonText: "🎄",
  position: "integrated"
};

// EXAMPLE 2: Corporate/Professional
const CONFIG_PROFESSIONAL = {
  messaggioTemplate: "Season's greetings, {nome}! Wishing you a wonderful holiday season and a prosperous New Year.",
  buttonText: "🎄",
  buttonColor: "#1565C0",
  position: "top-right",
  showNotifications: false
};

// EXAMPLE 3: Casual/Friends
const CONFIG_CASUAL = {
  messaggioTemplate: "Yooo {nome}! 🎅 Merry Xmas! Let's catch up soon! 🎄✨",
  buttonText: "🎅",
  buttonColor: "#E53935",
  position: "sidebar"
};

// EXAMPLE 4: Family-Focused with Exclusions
const CONFIG_FAMILY = {
  messaggioTemplate: "Buon Natale {nome}! Ti voglio bene! ❤️🎄",
  buttonText: "❤️",
  position: "integrated",
  excludeList: ["Work Group", "Boss"],
  customMessages: {
    "Mamma": "Buon Natale Mamma! Ti amo tantissimo! ❤️🎄🎅",
    "Papà": "Auguroni Papà! Sei il migliore! 🎄⭐"
  }
};

// EXAMPLE 5: Multilingual
const CONFIG_MULTILINGUAL = {
  messaggioTemplate: "Merry Christmas {nome}! 🎄 / Feliz Navidad! / Joyeux Noël!",
  buttonText: "🌍🎄",
  position: "above-input"
};

// EXAMPLE 6: Birthday Version
const CONFIG_BIRTHDAY = {
  messaggioTemplate: "Happy Birthday {nome}! 🎂🎉 Hope you have an amazing day!",
  buttonText: "🎂",
  buttonColor: "#FF6F00",
  position: "integrated"
};

// EXAMPLE 7: New Year
const CONFIG_NEWYEAR = {
  messaggioTemplate: "Happy New Year {nome}! 🎆 May 2025 bring you joy and success!",
  buttonText: "🎆",
  buttonColor: "#FFD700",
  position: "bottom-right"
};
