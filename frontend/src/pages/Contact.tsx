import React from 'react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export const Contact: React.FC = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">Get in touch</h2>
                            <p className="mt-4 leading-7 text-slate-600">
                                We're here to help. Chat to our friendly team 24/7 or visit us at our main campus.
                            </p>

                            <div className="mt-10 space-y-6">
                                <div className="flex gap-x-4">
                                    <div className="flex-none rounded-lg bg-blue-50 p-2 text-blue-600">
                                        <MapPinIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Visit us</h3>
                                        <p className="text-slate-600">VitalIQ Medical Campus, Thiruvallur District, Chennai, TN 600018</p>
                                    </div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="flex-none rounded-lg bg-emerald-50 p-2 text-emerald-600">
                                        <PhoneIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Call us</h3>
                                        <p className="text-slate-600">+91 44 1234 5678</p>
                                    </div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="flex-none rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                        <EnvelopeIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Email us</h3>
                                        <p className="text-slate-600">contact@vitaliq.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                            <GlassCard className="p-8 sm:p-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h3>
                                <form action="#" method="POST" className="space-y-6">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-900">First name</label>
                                            <div className="mt-2.5">
                                                <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-slate-900">Last name</label>
                                            <div className="mt-2.5">
                                                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">Email</label>
                                            <div className="mt-2.5">
                                                <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">Message</label>
                                            <div className="mt-2.5">
                                                <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <Button type="button">Send Message</Button>
                                    </div>
                                </form>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
