import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import type { Role } from '../types';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<Role>('Doctor');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const roles: Role[] = ['Doctor', 'Nurse', 'Admin', 'Pharmacist', 'Receptionist'];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, selectedRole, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">
                        Sign in to access the hospital dashboard
                    </p>
                </div>

                <GlassCard className="border-t-4 border-t-primary shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Select Role
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {roles.map((role) => (
                                    <button
                                        type="button"
                                        key={role}
                                        onClick={() => setSelectedRole(role)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                                            selectedRole === role
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                                        }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full h-11 text-base"
                            isLoading={loading}
                        >
                            Sign In as {selectedRole}
                        </Button>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};
