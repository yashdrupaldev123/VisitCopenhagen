import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { createContext, useEffect, useState } from 'react';
import { fetchSiteSettings } from './Utils/fetchSiteSettings.js';
import { fetchAllUsers } from './Utils/fetchAllUsers.js';
export let basicSettingsContext = createContext();
function App() {
  let [siteSettings, setSiteSettings] = useState(null); // null for initial loading state
  let [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        let { data, error } = await fetchSiteSettings();
        if (error) {
          console.error("Error fetching site settings:", error);
        } else {
          setSiteSettings(data);
        }
      } catch (err) {
        console.error("Error in fetchSettings:", err);
      }
    };
    fetchSettings();

    const fetchUsers = async () => {
      try {
        let { users, error } = await fetchAllUsers();
        if (error) {
          console.error("Error fetching users:", error);
        } else {
          setUsers(users);
        }
      } catch (err) {
        console.error("Error in fetchUsers:", err);
      }
    };

    fetchUsers();
  }, []);

  let location = useLocation();

  // Show nothing or a loader while siteSettings is null (still loading)
  if (siteSettings === null) return null;
  if (users === null) return null;
  return (
    <basicSettingsContext.Provider value={{ siteSettings, users, setSiteSettings }}>
      {
        (!location.pathname.includes('/admin')) && <Header />
      }

      <main className='main-content'>
        <Outlet />
      </main>
      {
        (!location.pathname.includes('/admin')) && <Footer />
      }
    </basicSettingsContext.Provider>
  );
}

export default App