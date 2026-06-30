import React from 'react';
import Logo from '../common/Logo';
import SearchBar from './SearchBar';
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Center: Search Bar */}
      <div className="hidden lg:flex flex-1 justify-center max-w-3xl mx-4">
        <SearchBar />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span className="text-sm font-medium">English</span>
        </div>

        <Show when="signed-out">
          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 transition-all duration-500 hover:bg-gray-50 rounded-lg">
                Log in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-500 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                Sign up
              </button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-[#f64060] hover:underline">
              Start a new group
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </Show>
      </div>

      {/* Mobile Search Icon */}
      <div className="lg:hidden ml-auto mr-4 text-gray-600 cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
