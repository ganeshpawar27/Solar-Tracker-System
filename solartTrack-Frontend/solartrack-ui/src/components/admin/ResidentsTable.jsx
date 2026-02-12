import React from 'react';

const ResidentsTable = ({ data }) => {
    return (
        <div>
            <h3>Residents Directory ({data.length})</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Contact ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Aadhaar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((resident) => (
                            <tr key={resident.contactId}>
                                <td>{resident.contactId}</td>
                                <td>{resident.name}</td>
                                <td>{resident.email}</td>
                                <td>{resident.aadhaar}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No residents found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ResidentsTable;