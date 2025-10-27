import React from 'react';

const Footer = () => {
    return (
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
    )
}

export default Footer;
