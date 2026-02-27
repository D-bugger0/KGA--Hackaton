import { Routes, Route, } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout'; // Import Layout
import LandingPage from './Pages/Landing/landing_page';
import OnboardingPage from './Pages/Onboarding/OnboardingPage';
import HomePage from './Pages/Home/HomePage';
import { useEffect } from 'react';

function App() {

   useEffect(() => {
    const bannerStyle = [
      'font-size: 14px',
      'font-family: monospace',
      'background: #D92626', // Scalable Red
      'color: white',
      'padding: 8px 16px',
      'border-radius: 4px',
      'font-weight: bold'
    ].join(';');

    console.log('%c 👨‍💻 ARCHITECT DETECTED 👨‍💻 ', bannerStyle);
    console.log('You dug deep enough to find the source. Here is a challenge for you:');
    console.log('');
    console.log('❓ RIDDLE: "I have keys, but no locks. I have a space, but no room. You can enter, but can never leave. What am I?"');
    console.log('');
    console.log('Know the answer? Connect and message "Mo_Codes" on LinkedIn:');
    console.log('https://www.linkedin.com/in/moholeng-mokoena-00a097278/');
  }, []);
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