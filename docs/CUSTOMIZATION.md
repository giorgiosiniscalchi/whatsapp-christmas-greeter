# Customization Guide

## Message Templates

### Basic Template
```javascript
messaggioTemplate: "Merry Christmas {nome}! 🎄"
```

### Advanced Templates
```javascript
// Formal
messaggioTemplate: "Dear {nome}, wishing you a wonderful Christmas season!"

// Casual
messaggioTemplate: "Hey {nome}! 🎅 Merry Xmas!"

// Multilingual
messaggioTemplate: "Buon Natale {nome}! / Merry Christmas! 🎄"
```

## Button Customization

### Change Emoji
```javascript
buttonText: "🎅"  // Santa
buttonText: "🎁"  // Gift
buttonText: "⛄"  // Snowman
```

### Change Color
```javascript
buttonColor: "#E53935"  // Red
buttonColor: "#1E88E5"  // Blue
buttonColor: "#43A047"  // Green
```

### Change Position
See README for all 7 positions with visual examples.

## Exclusion List
```javascript
excludeList: [
  "Boss Name",           // Skip your boss
  "Ex Name",             // Skip... well, you know
  "Spam Group",          // Skip that noisy group
  "+1234567890"          // Skip unsaved numbers
]
```

## Custom Messages Per Contact
```javascript
customMessages: {
  "Best Friend Name": "Merry Christmas bestie! Miss you! 🎄❤️",
  "Mom": "Merry Christmas Mamma! Love you so much! ❤️🎅",
  "Colleague Name": "Happy Holidays! Looking forward to working together in 2025!"
}
```

## Advanced: Dynamic Messages

Want different messages based on time?
```javascript
const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
messaggioTemplate: `${greeting} {nome}! Merry Christmas! 🎄`;
```
