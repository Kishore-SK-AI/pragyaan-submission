import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { BeakerIcon, HeartIcon, TruckIcon, UserIcon, ComputerDesktopIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

export const Services: React.FC = () => {
    const services = [
        {
            title: 'AI Triage Analysis',
            description: 'Instant risk assessment and department recommendation using advanced machine learning models.',
            icon: BeakerIcon,
            color: 'text-blue-600 bg-blue-50'
        },
        {
            title: 'Emergency Care',
            description: '24/7 rapid response for critical cases with optimized bed allocation.',
            icon: TruckIcon,
            color: 'text-red-600 bg-red-50'
        },
        {
            title: 'Cardiology',
            description: 'Specialized cardiac care with real-time monitoring and specialist consultation.',
            icon: HeartIcon,
            color: 'text-rose-600 bg-rose-50'
        },
        {
            title: 'General Consultation',
            description: 'Expert medical advice and treatment for common ailments and health checkups.',
            icon: UserIcon,
            color: 'text-emerald-600 bg-emerald-50'
        },
        {
            title: 'Telemedicine',
            description: 'Remote consultations with top specialists from the comfort of your home.',
            icon: ComputerDesktopIcon,
            color: 'text-indigo-600 bg-indigo-50'
        },
        {
            title: '24/7 Support',
            description: 'Round-the-clock medical support and patient assistance services.',
            icon: ChatBubbleBottomCenterTextIcon,
            color: 'text-amber-600 bg-amber-50'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display">Our Services</h2>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Comprehensive healthcare solutions powered by technology and medical expertise.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {services.map((service) => (
                        <GlassCard key={service.title} hoverEffect className="flex flex-col items-start">
                            <div className={`rounded-xl p-3 mb-4 ${service.color}`}>
                                <service.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-semibold leading-8 text-slate-900">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-base leading-7 text-slate-600">
                                {service.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};
