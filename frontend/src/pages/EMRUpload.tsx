import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { DocumentArrowUpIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    uploadDate: string;
    status: 'success' | 'error';
}

export const EMRUploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);

        // Simulate upload
        setTimeout(() => {
            const newFile: UploadedFile = {
                id: Date.now().toString(),
                name: selectedFile.name,
                size: formatFileSize(selectedFile.size),
                uploadDate: new Date().toLocaleString(),
                status: 'success'
            };

            setUploadedFiles([newFile, ...uploadedFiles]);
            setSelectedFile(null);
            setUploading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        EMR File Upload
                    </h1>
                    <p className="text-slate-600">
                        Upload Electronic Medical Records for patient documentation
                    </p>
                </div>

                {/* Upload Section */}
                <GlassCard className="mb-8 border-t-4 border-t-secondary shadow-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">
                            Upload New EMR File
                        </h3>

                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                dragActive
                                    ? 'border-primary bg-blue-50'
                                    : 'border-slate-300 hover:border-primary'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <DocumentArrowUpIcon className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                            
                            {selectedFile ? (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-slate-700">
                                        Selected File:
                                    </p>
                                    <p className="text-lg font-semibold text-primary">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {formatFileSize(selectedFile.size)}
                                    </p>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <p className="text-lg font-medium text-slate-700 mb-2">
                                        Drag and drop your file here
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        or click to browse
                                    </p>
                                </div>
                            )}

                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                            
                            <label htmlFor="file-upload">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    Choose File
                                </Button>
                            </label>
                        </div>

                        <div className="mt-4 text-xs text-slate-500">
                            Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                        </div>

                        {selectedFile && (
                            <div className="mt-6">
                                <Button
                                    onClick={handleUpload}
                                    isLoading={uploading}
                                    className="w-full"
                                >
                                    {uploading ? 'Uploading...' : 'Upload File'}
                                </Button>
                            </div>
                        )}
                    </div>
                </GlassCard>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                    <GlassCard className="border-t-4 border-t-green-500 shadow-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                Uploaded Files
                            </h3>

                            <div className="space-y-3">
                                {uploadedFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            {file.status === 'success' ? (
                                                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                            ) : (
                                                <XCircleIcon className="h-6 w-6 text-red-600" />
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-900">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {file.size} • Uploaded on {file.uploadDate}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                View
                                            </button>
                                            <button className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                )}
            </div>
        </div>
    );
};
