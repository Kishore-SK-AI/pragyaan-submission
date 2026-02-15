import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

export const PatientCustom: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Patient Customization
                    </h1>
                    <p className="text-slate-500">
                        Manage custom patient protocols and specific requirements.
                    </p>
                </div>
                <Button>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Custom Protocol
                </Button>
            </div>

            <GlassCard className="min-h-[400px] flex items-center justify-center text-slate-400">
                <div className="text-center">
                    <p className="text-lg font-medium">No custom protocols defined</p>
                    <p className="text-sm">Get started by adding a new protocol for specific patient needs.</p>
                </div>
            </GlassCard>
        </div>
    );
};
