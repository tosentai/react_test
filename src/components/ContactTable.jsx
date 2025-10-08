import React from "react";
import ContactRow from "./ContactRow";

function ContactTable({
    books,
    editingId,
    editData,
    editErrors,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onUpdateEditData,
}) {
    if (books.length === 0) {
        return (
            <p className="text-black text-center py-8">No data to display</p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black">
                <thead>
                    <tr className="bg-white">
                        <th className="border border-black p-2 text-left">
                            ID
                        </th>
                        <th className="border border-black p-2 text-left">
                            First Name
                        </th>
                        <th className="border border-black p-2 text-left">
                            Last Name
                        </th>
                        <th className="border border-black p-2 text-left">
                            Phone
                        </th>
                        <th className="border border-black p-2 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <ContactRow
                            key={book.id}
                            book={book}
                            isEditing={editingId === book.id}
                            editData={editData}
                            editErrors={editErrors}
                            onStartEdit={onStartEdit}
                            onCancelEdit={onCancelEdit}
                            onSaveEdit={onSaveEdit}
                            onUpdateEditData={onUpdateEditData}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContactTable;
