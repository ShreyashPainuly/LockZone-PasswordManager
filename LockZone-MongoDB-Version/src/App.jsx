// import { useState } from 'react'
// import Navbar from './components/Navbar'
// import Manager from './components/Manager'
// import Footer from './components/Footer'

// function App() {

//   return (
//     <>
//       <Navbar/>
//       <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//         <Manager/>
//       </div>
//       <Footer/>
//     </>
//   )
// }

// export default App

import { useState, useEffect, useRef } from 'react'

function App() {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async() => {
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
      console.log(passwords);
      setPasswordArray(passwords);
  }

  useEffect(() => {
      getPasswords()
  }, []);

  const copyText = (text) => {
      alert('Copied to clipboard!');
      navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
      passwordRef.current.type = "text"
      if (ref.current.src.includes("icons/eyecross.png")) {
          ref.current.src = "icons/eye.png"
          passwordRef.current.type = "password"
      }
      else {
          passwordRef.current.type = "text"
          ref.current.src = "icons/eyecross.png"
      }
  };

  const savePassword = async () => {
      if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
          const newPassword = { ...form, id: crypto.randomUUID() };
          setPasswordArray([...passwordArray, newPassword]);
          await fetch("http://localhost:3000/", {
              method: "POST",
              body: JSON.stringify(newPassword),
              headers: {"Content-Type": "application/json"}
          });
          setform({ site: "", username: "", password: "" });
          alert('Password saved successfully!');
      } else {
          alert('All fields must be at least 4 characters!');
      }
  };

  const deletePassword = async(id) => {
      console.log("Deleting password with id", id)
      let confirmation = confirm("Are you sure you want to delete this password?")
      if(confirmation) {
          setPasswordArray(passwordArray.filter(item=> item.id !== id));
          let res = await fetch("http://localhost:3000/", {method: "DELETE", body: JSON.stringify({id}), headers: {"Content-Type": "application/json"}})
          alert('Password deleted successfully!');
      }       
  };

  const editPassword = (id) => {
      console.log("Editing password with id", id)
      setform({...passwordArray.filter(i=> i.id === id)[0]})
      setPasswordArray(passwordArray.filter(item=> item.id !== id));
  };

  const handleChange = (e) => {
      setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className='bg-white shadow-md border-b border-gray-200'>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="logo font-bold text-2xl flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className='text-gray-900 font-extrabold tracking-tight'>
              Lock<span className='text-cyan-600'>ZONE</span>
            </span>
          </div>
          
          <button className='bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg'>
            <svg className='w-5 h-5' fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className='font-semibold text-sm'>GitHub</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="min-h-screen relative">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
                Your Password <span className="text-cyan-600">Vault</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium">
                Secure, Simple, and Always Accessible
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Credential</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-gray-700 text-sm font-semibold mb-2 block">Website URL</label>
                  <input
                    value={form.site}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="bg-gray-50 text-gray-900 rounded-lg border border-gray-300 w-full px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all placeholder-gray-400"
                    type="text"
                    name="site"
                    id="site"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-700 text-sm font-semibold mb-2 block">Username / Email</label>
                    <input
                      value={form.username}
                      onChange={handleChange}
                      placeholder="username@example.com"
                      className="bg-gray-50 text-gray-900 rounded-lg border border-gray-300 w-full px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all placeholder-gray-400"
                      type="text"
                      name="username"
                      id="username"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-semibold mb-2 block">Password</label>
                    <div className="relative">
                      <input
                        ref={passwordRef}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter strong password"
                        className="bg-gray-50 text-gray-900 rounded-lg border border-gray-300 w-full px-4 py-3 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all placeholder-gray-400"
                        type="password"
                        name="password"
                        id="password"
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                        onClick={showPassword}
                      >
                        <img
                          ref={ref}
                          className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
                          src="icons/eye.png"
                          alt="toggle visibility"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={savePassword}
                  className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Save Password
                </button>
              </div>
            </div>

            {/* Passwords List */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Passwords</h2>
                <span className="ml-auto bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-bold">
                  {passwordArray.length}
                </span>
              </div>

              {passwordArray.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg font-semibold">No passwords saved yet</p>
                  <p className="text-gray-500 text-sm mt-2">Add your first password above to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200 bg-gray-50">
                        <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Website</th>
                        <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Username</th>
                        <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm">Password</th>
                        <th className="text-center py-4 px-4 text-gray-700 font-bold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passwordArray.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors truncate max-w-xs">
                                {item.site}
                              </a>
                              <button 
                                onClick={() => copyText(item.site)}
                                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700 font-medium">{item.username}</span>
                              <button 
                                onClick={() => copyText(item.username)}
                                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-700 font-mono">{"•".repeat(item.password.length)}</span>
                              <button 
                                onClick={() => copyText(item.password)}
                                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => editPassword(item.id)}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
                                title="Edit"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => deletePassword(item.id)}
                                className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
                                title="Delete"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-white border-t border-gray-200 shadow-inner'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900">
                Lock<span className='text-cyan-600'>ZONE</span>
              </span>
            </div>

            {/* Creator Info */}
            <div className='flex items-center gap-2 text-gray-600'>
              <span className='text-sm font-medium'>Crafted with</span>
              <svg className='w-5 h-5 text-red-500' fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className='text-sm font-medium'>by</span>
              <span className='font-bold text-gray-900'>Shreyash Painuly</span>
            </div>

            {/* Links */}
            <div className='flex items-center gap-6 text-sm text-gray-600 font-medium'>
              <a href="#" className='hover:text-cyan-600 transition-colors'>Privacy</a>
              <a href="#" className='hover:text-cyan-600 transition-colors'>Terms</a>
              <a href="#" className='hover:text-cyan-600 transition-colors'>Contact</a>
            </div>
          </div>

          {/* Copyright */}
          <div className='mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm'>
            <p>© 2024 LockZONE. All rights reserved. Secure password management made simple.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
