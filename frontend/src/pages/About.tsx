import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, BuildingOffice2Icon, TrophyIcon } from '@heroicons/react/24/outline';

export const About: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2853&q=80"
                        alt=""
                        className="h-full w-full object-cover object-center opacity-20"
                    />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display"
                    >
                        About VitalIQ
                    </motion.h1>
                    <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                        We are redefining emergency care through the power of artificial intelligence, ensuring every patient receives the right care at the right time.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Mission</h2>
                        <p className="mt-4 text-slate-600 leading-relaxed">
                            To revolutionize the triage process in hospitals by leveraging advanced machine learning algorithms. We aim to reduce waiting times, minimize human error, and optimize resource allocation in emergency departments globally.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Vision</h2>
                        <p className="mt-4 text-slate-600 leading-relaxed">
                            A future where technology and healthcare professionals work in perfect harmony, creating a healthcare system that is efficient, accessible, and life-saving for everyone.
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {[
                            {
                                name: 'Expert Team',
                                description: 'Founded by a team of medical professionals and AI researchers.',
                                icon: UserGroupIcon
                            },
                            {
                                name: 'World-Class Facility',
                                description: 'Integrated with top-tier hospital infrastructure for seamless operations.',
                                icon: BuildingOffice2Icon
                            },
                            {
                                name: 'Award Winning',
                                description: 'Recognized for innovation in healthcare technology.',
                                icon: TrophyIcon
                            },
                        ].map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                    <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};
