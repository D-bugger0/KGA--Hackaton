import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout'; // Import Layout
import LandingPage from './Pages/Landing/landing_page';
import OnboardingPage from './Pages/Onboarding/OnboardingPage';

function App() {
  return (
    <LanguageProvider>
      <MainLayout> {/* Everything inside here inherits the theme */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
      </MainLayout>
    </LanguageProvider>
  );
}

export default App;