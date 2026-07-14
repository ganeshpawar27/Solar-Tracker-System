import React from 'react';

const ResidentsTable = ({ data }) => {
    return (
        <div className="w-full">
            {/* Table Header Section */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-700">
                    Residents Directory 
                    <span className="ml-2 text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {data.length} Total
                    </span>
                </h3>
            </div>

            {/* Table Container with horizontal scroll for mobile */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Contact ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Address</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Aadhaar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.length > 0 ? (
                            data.map((resident) => (
                                <tr 
                                    key={resident.contactId} 
                                    className="hover:bg-blue-50/30 transition-colors group"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                                        {resident.contactId}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        {resident.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {resident.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {resident.address}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                                        {resident.aadhaar}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                                    No residents found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResidentsTable;