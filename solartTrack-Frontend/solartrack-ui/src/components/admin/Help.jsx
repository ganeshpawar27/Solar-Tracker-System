import React from 'react';

const Help = () => {
    return (
        <div className="animate-in fade-in zoom-in duration-500">
            {/* Page Title */}
            <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Guide 📖</h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-widest mt-1">
                    SolarTrack Operations Manual
                </p>
            </div>

            {/* Step-by-Step Workflow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Step 1: Verification */}
                <div className="bg-white p-8 rounded-3xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-blue-200">
                        1
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-3 text-blue-600">Review Requests</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        Navigate to the <span className="text-gray-900 font-bold italic">Requests</span> tab. Here you will find applications from residents. 
                        Verify their **System Type** and **Capacity (KW)** before clicking **Approve** or **Reject**.
                    </p>
                </div>

                {/* Step 2: Assignment */}
                <div className="bg-white p-8 rounded-3xl border border-amber-50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-amber-200">
                        2
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-3 text-amber-600">Deploy Installers</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        Go to the <span className="text-gray-900 font-bold italic">Assign</span> tab. Select an approved resident and match them with an 
                        authorized **Installer Agency**. This triggers the installation process.
                    </p>
                </div>

                {/* Step 3: Management */}
                <div className="bg-white p-8 rounded-3xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-lg shadow-emerald-200">
                        3
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-3 text-emerald-600">Manage Directory</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        Maintain your <span className="text-gray-900 font-bold italic">Residents</span> and <span className="text-gray-900 font-bold italic">Installers</span> databases. 
                        You can update agency license details or delete inactive records to keep the system clean.
                    </p>
                </div>
            </div>

            {/* Quick Tips & Support */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
                    <span className="text-2xl">⚡</span>
                    <div>
                        <h5 className="font-bold text-blue-900 text-sm">Real-time Updates</h5>
                        <p className="text-xs text-blue-700/70 mt-1 font-medium leading-relaxed">
                            Always use the **Refresh 🔄** button on table views to ensure you are seeing the latest data directly from the Spring Boot backend.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 flex items-start gap-4">
                    <span className="text-2xl">🔒</span>
                    <div>
                        <h5 className="font-bold text-red-900 text-sm">Security Protocol</h5>
                        <p className="text-xs text-red-700/70 mt-1 font-medium leading-relaxed">
                            Log out of your session whenever you are finished. Your Admin dashboard has full authority over subsidy approvals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-300 font-bold uppercase tracking-[0.3em]">
                    Department of Renewable Energy | System v1.0
                </p>
            </div>
        </div>
    );
};

export default Help;