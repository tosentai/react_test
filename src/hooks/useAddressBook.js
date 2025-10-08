import { useState } from "react";

export const useAddressBook = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [editErrors, setEditErrors] = useState({});

    const validateForm = (data) => {
        const newErrors = {};

        if (!data.firstName || data.firstName.trim() === "") {
            newErrors.firstName = "The first name is required";
        } else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/.test(data.firstName)) {
            newErrors.firstName = "The first name must contain only letters";
        }

        if (!data.lastName || data.lastName.trim() === "") {
            newErrors.lastName = "The last name is required";
        } else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/.test(data.lastName)) {
            newErrors.lastName = "The last name must contain only letters";
        }

        if (!data.phone || data.phone.trim() === "") {
            newErrors.phone = "The phone is required";
        } else if (!/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
            newErrors.phone =
                "The phone must contain only numbers and valid symbols";
        } else if (data.phone.replace(/[\s\-\+\(\)]/g, "").length < 10) {
            newErrors.phone = "The phone must contain at least 10 digits";
        }

        return newErrors;
    };

    const addBook = (bookData) => {
        const validationErrors = validateForm(bookData);

        if (Object.keys(validationErrors).length > 0) {
            return { success: false, errors: validationErrors };
        }

        const newBook = {
            id: Date.now(),
            firstName: bookData.firstName.trim(),
            lastName: bookData.lastName.trim(),
            phone: bookData.phone.trim(),
        };

        setBooks((prev) => [...prev, newBook]);
        return { success: true };
    };

    const startEdit = (book) => {
        setEditingId(book.id);
        setEditData({ ...book });
        setEditErrors({});
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({});
        setEditErrors({});
    };

    const saveEdit = (id) => {
        const validationErrors = validateForm(editData);

        if (Object.keys(validationErrors).length > 0) {
            setEditErrors(validationErrors);
            return false;
        }

        setBooks((prev) =>
            prev.map((book) => (book.id === id ? { ...editData } : book))
        );
        setEditingId(null);
        setEditData({});
        setEditErrors({});
        return true;
    };

    const updateEditData = (field, value) => {
        setEditData((prev) => ({ ...prev, [field]: value }));

        if (editErrors[field]) {
            setEditErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const filteredBooks = books.filter(
        (book) =>
            book.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.phone.includes(searchTerm)
    );

    return {
        books: filteredBooks,
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
        validateForm,
    };
};
