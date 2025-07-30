# 📦 BoxBoxBox - F1 Dashboard

A modern Formula 1 dashboard web application built with React, Vite, and Tailwind CSS. **BoxBoxBox** - because every F1 fan knows the pit stop radio call! 🏁

## ✨ Features

- 🏎️ **F1-Inspired Design**: Modern glassmorphism UI with F1 team colors
- 📊 **Real-time Statistics**: Live race data, standings, and performance metrics
- 📅 **Race Schedule**: Upcoming events and calendar integration
- 🏆 **Championship Tracking**: Driver and constructor standings
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🎨 **Modern UI**: Framer-style design with smooth animations

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
Background: #0A0A0F (Almost black, like night races)
Cards: #141419 (Subtle elevation)
Accent: #FF1E42 (F1 Red, slightly warmer)
Text Primary: #FFFFFF (Pure white)
Text Secondary: #A1A1AA (Cool gray)

/* Team Colors */
Red Bull: #1E41FF (Blue) + #FFB800 (Yellow)
Ferrari: #DC143C (Ferrari Red)
Mercedes: #00D2BE (Teal) + #C0C0C0 (Silver)
McLaren: #FF8000 (Papaya) + #47C7FC (Blue)
```

### Typography
- **Primary Font**: Inter (clean, modern, excellent for data)
- **Monospace**: JetBrains Mono (for timing data, telemetry)
- **Hero**: 48px (project name)
- **H1**: 32px (page titles)
- **H2**: 24px (section headers)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.jsx  # Navigation and branding
│   └── Sidebar.jsx # Navigation menu
├── pages/         # Page components
│   └── Dashboard.jsx # Main dashboard
├── hooks/         # Custom React hooks
│   └── useF1Data.js # Data management
├── services/      # API services
│   └── f1Api.js   # F1 API integration
├── utils/         # Utility functions
│   └── helpers.js # Helper functions
├── App.jsx        # Main app component
├── main.jsx       # React entry point
└── index.css      # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd f1-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Design Features

### Glassmorphism Cards
- Subtle backdrop blur effects
- Semi-transparent backgrounds
- Smooth hover animations
- Gradient overlays

### Live Indicators
- Pulsing green dots for live data
- Real-time status updates
- Connection status indicators

### Interactive Elements
- Hover lift effects on cards
- Smooth transitions
- Micro-interactions
- Responsive animations

### Team Branding
- F1 team color coding
- National flag emojis
- Position indicators (gold, silver, bronze)
- Team-specific styling

## 🔮 Future Enhancements

- [ ] Real F1 API integration (Ergast API)
- [ ] Live race telemetry
- [ ] Driver profiles with statistics
- [ ] Team comparison tools
- [ ] Historical data visualization
- [ ] Interactive charts and graphs
- [ ] Push notifications for race events
- [ ] PWA support for mobile
- [ ] Dark/Light theme toggle
- [ ] User preferences and customization

## 🎨 Customization

### Colors
The app uses F1-inspired colors defined in `tailwind.config.js`:

- `f1-accent`: #FF1E42 (F1 red)
- `f1-bg`: #0A0A0F (Dark background)
- `f1-card`: #141419 (Card background)
- Team-specific colors for Red Bull, Ferrari, Mercedes, McLaren

### Components
The app includes several custom Tailwind components:

- `.glass-card` - Glassmorphism card component
- `.status-card` - Status widget with hover effects
- `.btn-primary` - Primary button with gradient
- `.btn-secondary` - Secondary button
- `.live-indicator` - Live status indicator
- `.nav-pill` - Navigation pill component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **F1 Community** - For the inspiration and memes
- **Ergast API** - For F1 data (future integration)
- **Tailwind CSS** - For the amazing utility-first framework
- **Vite** - For the lightning-fast build tool

---

**BoxBoxBox** - Your F1 Command Center 🏎️📦📦📦 