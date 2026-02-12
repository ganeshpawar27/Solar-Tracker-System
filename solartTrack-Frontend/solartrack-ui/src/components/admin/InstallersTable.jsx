import React from 'react';

const InstallersTable = ({ data, onDelete, onEdit, onAddClick }) => {
    return (
        <div>
            <div>
                <h3>Installers Directory ({data.length})</h3>
                <button onClick={onAddClick}>+ Add New Installer</button>
            </div>

            <table border="1">
                <thead>
                    <tr>
                        <th>Contact ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>License No</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((installer) => (
                            <tr key={installer.contactId}>
                                <td>{installer.contactId}</td>
                                <td>{installer.name}</td>
                                <td>{installer.email}</td>
                                <td>{installer.licenseNo}</td>
                                <td>
                                    <button onClick={() => onEdit(installer)}>Edit ✏️</button>
                                    <button onClick={() => onDelete(installer.contactId)}>Delete 🗑️</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No installers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InstallersTable;