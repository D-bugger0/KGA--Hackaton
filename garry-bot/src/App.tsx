import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout'; // Import Layout
import LandingPage from './Pages/Landing/landing_page';
import OnboardingPage from './Pages/Onboarding/OnboardingPage';
import HomePage from './Pages/Home/HomePage';

function App() {
  return (
    <LanguageProvider>
      <MainLayout> {/* Everything inside here inherits the theme */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </LanguageProvider>
  );
}

export default App;