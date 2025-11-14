import { useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router";

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';

import DoctorsIndex from '@/pages/doctors/Index';
import DoctorsShow from '@/pages/doctors/Show';
import DoctorsCreate from '@/pages/doctors/Create';
import DoctorsEdit from '@/pages/doctors/Edit';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if(token){
      setLoggedIn(true);
    }

  }, []);

  const onLogin = (auth, token) => {
    setLoggedIn(auth);

    if(auth){
      localStorage.setItem('token', token)
    }
    else {
      localStorage.removeItem('token');
    }
  };

  // return (
  //   <>
  //     <Router>
  //       <Navbar onLogin={onLogin} loggedIn={loggedIn} />
  //       <Routes>
  //         <Route path='/' element={<Home onLogin={onLogin} loggedIn={loggedIn} />} />

  //         <Route path="/doctors" element={<DoctorsIndex />} />
  //         <Route path="/doctors/:id" element={<doctorsShow loggedIn={loggedIn} />} />

  //       </Routes>
  //     </Router>
  //   </>
  // )

  return (
    <Router>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" loggedIn={loggedIn} onLogin={onLogin} />
        <SidebarInset>
          <SiteHeader />
          {/* <Navbar onLogin={onLogin} loggedIn={loggedIn} /> */}

          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-2 ">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 md:px-6 lg:px-8">
                {/* Main content */}
                <Routes>
                  <Route
                    path="/"
                    element={<Home onLogin={onLogin} loggedIn={loggedIn} />}
                  />

                  <Route path="/doctors" element={<DoctorsIndex />} />
                  <Route
                    path="/doctors/:id"
                    element={<doctorsShow loggedIn={loggedIn} />}
                  />
                  <Route
                    path="/doctors/:id/edit"
                    element={<doctorsEdit />}
                  />
                  <Route path="/doctors/create" element={<DoctorsCreate />} />
                </Routes>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Router>
  );
}