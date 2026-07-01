import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'quill/dist/quill.snow.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/react";
import { AppContextProvider } from './context/AppContext.jsx';
import { Toaster } from 'react-hot-toast';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContextProvider>
        <Toaster />
        <App />
      </AppContextProvider>
    </ClerkProvider>
  </StrictMode>,
);
