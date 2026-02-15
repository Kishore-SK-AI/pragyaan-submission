import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
    ArrowRightIcon,
    BellIcon,
    UsersIcon,
    ClockIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    Legend
} from 'recharts';

interface Patient {
    _id: string;
    patientId: string;
    name: string;
    age: number;
    gender: string;
    department: string;
    riskPercent: number;
    status: string;
}

export const DashboardHome: React.FC = () => {

    const [patients, setPatients] = React.useState<Patient[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await fetch('/api/patients');
            const data = await res.json();

            if (data.success) {
                const sorted = [...data.data].sort(
                    (a: Patient, b: Patient) =>
                        (b.riskPercent || 0) - (a.riskPercent || 0)
                );
                setPatients(sorted);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: patients.length,
        critical: patients.filter(p => p.riskPercent >= 70).length,
        waiting: patients.filter(p => p.status === "Active").length,
        avgWait: '12m'
    };

    const COLORS = [
        '#3B82F6',
        '#EF4444',
        '#F59E0B',
        '#10B981',
        '#8B5CF6',
        '#EC4899',
        '#14B8A6',
        '#F97316'
    ];

    const deptMap: any = {};
    let colorIndex = 0;

    patients.forEach(p => {
        if (!deptMap[p.department]) {
            deptMap[p.department] = {
                name: p.department,
                value: 1,
                color: COLORS[colorIndex % COLORS.length]
            };
            colorIndex++;
        } else {
            deptMap[p.department].value++;
        }
    });

    const deptData = Object.values(deptMap);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Hospital Overview
                    </h1>
                    <p className="text-slate-500">
                        Real-time insight into patient flow and department status.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <BellIcon className="h-5 w-5 mr-2" />
                        Alerts
                    </Button>
                    <Button size="sm" onClick={fetchPatients}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Patients', value: stats.total, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Critical Risk', value: stats.critical, icon: BellIcon, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Avg Wait Time', value: stats.avgWait, icon: ClockIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Departments', value: deptData.length + ' Active', icon: ChartBarIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                ].map((stat, idx) => (
                    <GlassCard key={idx} className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Department Chart */}
                <GlassCard className="col-span-1">
                    <h3 className="font-semibold text-slate-800 mb-4">
                        Department Load
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deptData.map((entry: any, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Priority Queue Table */}
                <GlassCard className="col-span-2 overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-slate-800">
                            Priority Queue (Highest Risk First)
                        </h3>
                        <Button variant="ghost" size="sm">
                            View All
                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-4 py-3">Patient ID</th>   {/* ✅ NEW COLUMN */}
                                    <th className="px-4 py-3">Patient</th>
                                    <th className="px-4 py-3">Age/Gender</th>
                                    <th className="px-4 py-3">Department</th>
                                    <th className="px-4 py-3">Risk</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center">
                                            Loading patients...
                                        </td>
                                    </tr>
                                ) : patients.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center">
                                            No patients found
                                        </td>
                                    </tr>
                                ) : (
                                    patients.map((p) => (
                                        <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 text-slate-600 font-medium">
                                                {p.patientId}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-900">
                                                {p.name}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">
                                                {p.age} / {p.gender}
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {p.department}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        p.riskPercent >= 70
                                                            ? 'danger'
                                                            : p.riskPercent >= 40
                                                            ? 'warning'
                                                            : 'success'
                                                    }
                                                >
                                                    {p.riskPercent}%
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
