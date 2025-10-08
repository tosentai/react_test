import React from "react";
import { useAddressBook } from "../hooks/useAddressBook";
import ContactForm from "./ContactForm";
import SearchBar from "./SearchBar";
import ContactTable from "./ContactTable";

function AddressBook() {
    const {
        books,
        searchTerm,
        setSearchTerm,
        editingId,
        editData,
        editErrors,
        addBook,
        startEdit,
        cancelEdit,
        saveEdit,
        updateEditData,
    } = useAddressBook();

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Address Book</h1>

            <ContactForm onAddContact={addBook} />

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <ContactTable
                books={books}
                editingId={editingId}
                editData={editData}
                editErrors={editErrors}
                onStartEdit={startEdit}
                onCancelEdit={cancelEdit}
                onSaveEdit={saveEdit}
                onUpdateEditData={updateEditData}
            />
        </div>
    );
}

export default AddressBook;
