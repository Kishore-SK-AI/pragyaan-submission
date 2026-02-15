import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowRightIcon, BoltIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export const HomePage: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-100 blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 font-display">
                                AI-Powered <span className="text-primary">Smart Triage</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                Hospital-grade risk assessment in <span className="text-primary font-semibold">15 seconds</span>.
                                Seamlessly integrated with VitalIQ's world-class care.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/patient-analysis">
                                    <Button size="lg" className="rounded-full px-8 shadow-xl shadow-blue-600/20">
                                        Start Triage Analysis <ArrowRightIcon className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="lg" className="rounded-full px-8">
                                        Staff Portal
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200"
                        >
                            {[
                                { label: 'Accuracy', value: '95%' },
                                { label: 'Faster Triage', value: '87%' },
                                { label: 'Patients', value: '50k+' },
                                { label: 'Availability', value: '24/7' },
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-sm text-slate-500 mt-1 uppercase tracking-wide font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 font-display">Why Choose AI Triage?</h2>
                        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                            Revolutionizing patient care with state-of-the-art machine learning models trained on millions of medical records.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BoltIcon,
                                title: 'Instant Assessment',
                                desc: 'Get immediate risk stratification and department recommendations based on vital signs and symptoms.',
                                color: 'bg-blue-100 text-blue-600'
                            },
                            {
                                icon: ShieldCheckIcon,
                                title: 'Clinical Accuracy',
                                desc: 'Our models are validated against thousands of real-world cases to ensure high reliability and safety.',
                                color: 'bg-emerald-100 text-emerald-600'
                            },
                            {
                                icon: ClockIcon,
                                title: 'Real-time Monitoring',
                                desc: 'Continuous tracking of patient vitals with automated alerts for deteriorating conditions.',
                                color: 'bg-amber-100 text-amber-600'
                            }
                        ].map((feature, idx) => (
                            <GlassCard key={idx} hoverEffect className="border-t-4 border-t-transparent hover:border-t-primary">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-5"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to modernize your triage process?</h2>
                    <p className="text-lg text-slate-300 mb-10">Join the thousands of healthcare professionals using our AI-powered tools today.</p>
                    <Link to="/patient-analysis">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                            Launch Demo Environment
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
