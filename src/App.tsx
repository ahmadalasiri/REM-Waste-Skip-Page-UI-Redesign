import { SkipSelectionPage } from "./pages/SkipSelectionPage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <SkipSelectionPage />
    </ThemeProvider>
  );
}

export default App;
