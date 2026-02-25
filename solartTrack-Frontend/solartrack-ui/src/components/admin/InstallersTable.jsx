import React from 'react';

const InstallersTable = ({ data, onDelete, onEdit, onAddClick }) => {
    return (
        <div className="w-full">
            {/* 🛠️ TABLE ACTIONS HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Installers Directory</h3>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {data.length} Authorized Agencies Verified
                    </p>
                </div>
                <button 
                    onClick={onAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="text-lg leading-none">+</span> Add New Installer
                </button>
            </div>

            {/* 📊 TABLE CONTAINER */}
            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Agency ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Official Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">License No</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.length > 0 ? (
                            data.map((installer) => (
                                <tr 
                                    key={installer.contactId} 
                                    className="hover:bg-slate-50 transition-colors group"
                                >
                                    <td className="px-6 py-4 text-sm font-mono text-blue-600 font-medium">
                                        #{installer.contactId}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-700">{installer.name}</div>
                                        <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">Verified Partner</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {installer.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-mono font-bold border border-gray-200">
                                            {installer.licenseNo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => onEdit(installer)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Edit Installer"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => onDelete(installer.contactId)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete Installer"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-gray-300 text-4xl mb-2 flex justify-center">📁</div>
                                    <div className="text-gray-400 font-medium">No installers found in the registry.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstallersTable;