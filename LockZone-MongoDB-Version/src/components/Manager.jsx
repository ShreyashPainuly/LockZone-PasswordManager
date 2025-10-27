import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
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
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
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
            const newPassword = { ...form, id: uuidv4() };
            
            // Save to backend first
            await fetch("http://localhost:3000/", {
                method: "POST",
                body: JSON.stringify(newPassword),
                headers: {"Content-Type": "application/json"}
            });
            
            // Update state
            setPasswordArray([...passwordArray, newPassword]);
            
            // Clear form - THIS WAS THE FIX!
            setform({ site: "", username: "", password: "" });
            
            toast.success('Password saved successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } else {
            toast.error('All fields must be at least 4 characters!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
        }
    };

    const deletePassword = async(id) => {
        console.log("Deleting password with id", id)
        let confirmation = confirm("Are you sure you want to delete this password?")
        if(confirmation) {
            setPasswordArray(passwordArray.filter(item=> item.id !== id));
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", 
                body: JSON.stringify({id}), 
                headers: {"Content-Type": "application/json"}
            })
            toast.success('Password deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
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
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
        </>
    );
};

export default Manager;
