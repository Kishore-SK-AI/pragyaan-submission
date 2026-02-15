import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

interface Patient {
    _id: string;
    patientId: string;
    name: string;
    age: number;
    gender: string;
    department: string;
    riskPercent: number;
    status: string;
    symptoms?: string[];
    waitTime?: number;
}

const QueueColumn: React.FC<{ title: string; patients: Patient[]; color: string; accentColor: string; isDoctor: boolean; onTreated: (patientId: string) => void }> = ({ title, patients, color, accentColor, isDoctor, onTreated }) => (
    <div className="flex-1 min-w-[300px] bg-slate-50/50 rounded-xl p-4 border border-slate-200/60">
        <div className={`flex justify-between items-center mb-4 pb-2 border-b ${accentColor}`}>
            <h3 className={`font-bold ${color} flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full bg-current`}></span>
                {title}
            </h3>
            <span className="bg-white px-2 py-0.5 rounded-md text-xs font-bold text-slate-500 shadow-sm">{patients.length}</span>
        </div>

        <div className="space-y-3">
            {patients.map(p => {
                const riskLevel = p.riskPercent >= 70 ? 'High' : p.riskPercent >= 40 ? 'Medium' : 'Low';

                return (
                    <GlassCard key={p._id} className={`p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${riskLevel === 'High' ? 'border-l-red-500' : riskLevel === 'Medium' ? 'border-l-amber-500' : 'border-l-emerald-500'
                        }`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-semibold text-slate-900">{p.name}</h4>
                                <p className="text-xs text-slate-500">ID: {p.patientId}</p>
                            </div>
                            <Badge variant={riskLevel === 'High' ? 'danger' : riskLevel === 'Medium' ? 'warning' : 'success'}>
                                {p.riskPercent}%
                            </Badge>
                        </div>

                        <div className="text-xs text-slate-600 mb-3 line-clamp-2">
                            {p.department} - {p.age}y/{p.gender}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                            <div className="flex items-center text-xs text-slate-400 font-medium">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                {p.status}
                            </div>
                            <div className="flex items-center gap-2">
                                {isDoctor && (
                                    <button 
                                        onClick={() => onTreated(p.patientId)}
                                        className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                                    >
                                        Treated
                                    </button>
                                )}
                                <button className="text-slate-400 hover:text-primary">
                                    <EllipsisHorizontalIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                );
            })}
        </div>
    </div>
);

export const PriorityQueuePage: React.FC = () => {
    const { user } = useAuth();
    const [patients, setPatients] = React.useState<Patient[]>([]);
    const [loading, setLoading] = React.useState(true);

    const isDoctor = user?.role === 'Doctor';

    React.useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/patients');
            const data = await res.json();

            if (data.success) {
                const mapped = data.data.map((p: Patient) => ({
                    ...p,
                    waitTime: Math.floor(Math.random() * 60)
                }));

                const sorted = mapped.sort(
                    (a: Patient, b: Patient) => (b.riskPercent || 0) - (a.riskPercent || 0)
                );
                setPatients(sorted);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTreated = async (patientId: string) => {
        if (!confirm(`Are you sure you want to mark patient ${patientId} as treated?`)) {
            return;
        }

        try {
            const res = await fetch(`/api/doctor/patients`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId }),
                credentials: 'include',
            });

            const data = await res.json();

            if (data.success) {
                // Refresh the patient list
                fetchPatients();
            } else {
                alert(data.message || 'Failed to mark patient as treated');
            }
        } catch (error) {
            console.error("Error marking patient as treated:", error);
            alert('Failed to mark patient as treated');
        }
    };

    const highRisk = patients.filter(p => p.riskPercent >= 70);
    const mediumRisk = patients.filter(p => p.riskPercent >= 40 && p.riskPercent < 70);
    const lowRisk = patients.filter(p => p.riskPercent < 40);

    if (loading) {
        return <div className="p-10 text-center text-slate-500">Loading priority queue...</div>;
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Priority Queue</h1>
                    <p className="text-slate-500">AI-optimized patient triage order (Live Data)</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={fetchPatients} variant="outline" size="sm">
                        Refresh
                    </Button>
                    <Button>Auto-Assign Beds</Button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-6 h-full min-w-max">
                    <QueueColumn title="Critical / Emergency" patients={highRisk} color="text-red-700" accentColor="border-red-200" isDoctor={isDoctor} onTreated={handleTreated} />
                    <QueueColumn title="Urgent Care" patients={mediumRisk} color="text-amber-700" accentColor="border-amber-200" isDoctor={isDoctor} onTreated={handleTreated} />
                    <QueueColumn title="Standard Consultation" patients={lowRisk} color="text-emerald-700" accentColor="border-emerald-200" isDoctor={isDoctor} onTreated={handleTreated} />
                </div>
            </div>
        </div>
    );
};
