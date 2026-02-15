import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
    ArchiveBoxIcon,
    ArrowPathIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

export const Inventory: React.FC = () => {
    const inventoryItems = [
        { id: 'INV-001', name: 'Paracetamol 500mg', category: 'Medicine', stock: 1250, status: 'In Stock' },
        { id: 'INV-002', name: 'Surgical Masks', category: 'Supplies', stock: 450, status: 'Low Stock' },
        { id: 'INV-003', name: 'Sterile Gloves (M)', category: 'Supplies', stock: 800, status: 'In Stock' },
        { id: 'INV-004', name: 'Amoxicillin 250mg', category: 'Medicine', stock: 0, status: 'Out of Stock' },
        { id: 'INV-005', name: 'Syringes 5ml', category: 'Equipment', stock: 2000, status: 'In Stock' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Inventory Management
                    </h1>
                    <p className="text-slate-500">
                        Track medical supplies, medicines, and equipment.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <ArrowPathIcon className="h-5 w-5 mr-2" />
                        Sync
                    </Button>
                    <Button>
                        <ArchiveBoxIcon className="h-5 w-5 mr-2" />
                        Add Item
                    </Button>
                </div>
            </div>

            <GlassCard>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button variant="outline" size="sm">
                            <FunnelIcon className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3">Item ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Stock Level</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {inventoryItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 text-slate-600 font-medium">{item.id}</td>
                                    <td className="px-4 py-3 text-slate-900 font-medium">{item.name}</td>
                                    <td className="px-4 py-3 text-slate-500">{item.category}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.stock}</td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={
                                                item.status === 'In Stock' ? 'success' :
                                                    item.status === 'Low Stock' ? 'warning' : 'danger'
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};
