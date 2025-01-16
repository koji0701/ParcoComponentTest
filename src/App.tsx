// src/App.tsx
import { ThemeProvider } from './theme/ThemeProvider';
import TSPHoldings from './components/TSPHoldings';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <TSPHoldings />
      </div>
    </ThemeProvider>
  );
}

export default App;