// Layout.tsx

import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=' flex flex-col min-w-screen justify-between'>
        <div className=' flex'>
        <VerticalNavbar />
        
        <main className=' h-screen w-full overflow-y-auto scrollbar pb-4'>
            {children}
        </main>
        </div>
    </div>
  );
};

export default Layout;
