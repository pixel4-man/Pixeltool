import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Categories } from './pages/Categories';
import { CategoryDetail } from './pages/CategoryDetail';
import { ToolRunner } from './pages/ToolRunner';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { UserProfile, CategoryId } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string>('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const navigate = (route: string, param?: string) => {
    setCurrentRoute(route);
    setRouteParam(param || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home navigate={navigate} openSearch={() => setSearchModalOpen(true)} />;
      case 'explore':
        return <Explore initialSearch={routeParam} navigate={navigate} />;
      case 'categories':
        return <Categories navigate={navigate} />;
      case 'category':
        return <CategoryDetail categoryId={routeParam as CategoryId} navigate={navigate} />;
      case 'tool':
        return <ToolRunner toolId={routeParam} navigate={navigate} />;
      case 'pricing':
        return <Pricing navigate={navigate} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login navigate={navigate} setUser={setUser} />;
      case 'signup':
        return <Signup navigate={navigate} setUser={setUser} />;
      case 'dashboard':
        return user ? (
          <Dashboard user={user} navigate={navigate} logout={() => setUser(null)} />
        ) : (
          <Login navigate={navigate} setUser={setUser} />
        );
      default:
        return <Home navigate={navigate} openSearch={() => setSearchModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EDE4] text-[#222222] font-sans transition-colors">
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        user={user}
        openSearch={() => setSearchModalOpen(true)}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer navigate={navigate} />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        navigate={navigate}
      />
    </div>
  );
}
