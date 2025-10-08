import React from "react";

function ContactRow({
    book,
    isEditing,
    editData,
    editErrors,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onUpdateEditData,
}) {
    return (
        <tr>
            <td className="border border-black p-2">{book.id}</td>
            <td className="border border-black p-2">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={editData.firstName}
                            onChange={(e) =>
                                onUpdateEditData("firstName", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-black"
                        />
                        {editErrors.firstName && (
                            <p className="text-red-600 text-sm mt-1">
                                {editErrors.firstName}
                            </p>
                        )}
                    </div>
                ) : (
                    book.firstName
                )}
            </td>
            <td className="border border-black p-2">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={editData.lastName}
                            onChange={(e) =>
                                onUpdateEditData("lastName", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-black"
                        />
                        {editErrors.lastName && (
                            <p className="text-red-600 text-sm mt-1">
                                {editErrors.lastName}
                            </p>
                        )}
                    </div>
                ) : (
                    book.lastName
                )}
            </td>
            <td className="border border-black p-2">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={editData.phone}
                            onChange={(e) =>
                                onUpdateEditData("phone", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-black"
                        />
                        {editErrors.phone && (
                            <p className="text-red-600 text-sm mt-1">
                                {editErrors.phone}
                            </p>
                        )}
                    </div>
                ) : (
                    book.phone
                )}
            </td>
            <td className="border border-black p-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={() => onSaveEdit(book.id)}
                            className="px-2 py-1 bg-black text-white border border-black hover:bg-white hover:text-black mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancelEdit}
                            className="px-2 py-1 bg-white text-black border border-black hover:bg-black hover:text-white"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onStartEdit(book)}
                        className="px-2 py-1 bg-black text-white border border-black hover:bg-white hover:text-black"
                    >
                        Edit
                    </button>
                )}
            </td>
        </tr>
    );
}

export default ContactRow;
