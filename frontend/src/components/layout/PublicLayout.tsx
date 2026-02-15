import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const PublicLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            VitalIQ
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="outline" size="sm">Staff Login</Button>
                        </Link>
                        <Link to="/patient-analysis">
                            <Button size="sm" className="shadow-lg shadow-blue-500/20">
                                Start Triage
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2024 VitalIQ AI Triage System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
