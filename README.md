## Diagram

```mermaid
    graph TB;
    subgraph L1["Logic Layer (Custom Hook)"]
        direction TB
        H1["useAddressBook<br/>───────<br/><b>Manages:</b> Books state, search, editing,<br/>validation with regex patterns<br/><b>Returns:</b> books, searchTerm, setSearchTerm,<br/>editingId, editData, editErrors,<br/>addBook, startEdit, cancelEdit,<br/>saveEdit, updateEditData"]
    end

    subgraph L2["Root Layer"]
        App["App<br/><i>Composition root - no state</i>"]
    end

    subgraph L3["Container Layer"]
        AddressBook["AddressBook<br/>───────<br/><b>Consumes:</b> useAddressBook()<br/><b>Manages:</b> Data flow coordination<br/><b>No local state</b>"]
    end

    subgraph L4["Feature Components"]
        direction LR
        F1["ContactForm<br/>───────<br/><b>State:</b> formData, errors<br/><b>Props:</b> onAddContact<br/><b>Validates:</b> Required fields,<br/>name (letters only),<br/>phone (digits + symbols)"]
        F2["SearchBar<br/>───────<br/><b>Props:</b> searchTerm, onSearchChange<br/><i>Presentational - minimal state</i>"]
        F3["ContactTable<br/>───────<br/><b>Props:</b> books[], editingId, editData,<br/>editErrors, handlers<br/><i>Presentational - no state</i>"]
    end

    subgraph L5["List Components"]
        direction TB
        ContactRow["ContactRow<br/>───────<br/><b>Props:</b> book, isEditing, editData,<br/>editErrors, handlers<br/><b>Renders:</b> Inline editing with validation,<br/>error messages in red<br/><i>Presentational - no state</i>"]
    end

    H1 -.->|consumes| AddressBook

    App --> AddressBook
    AddressBook --> F1
    AddressBook --> F2
    AddressBook --> F3

    F3 --> ContactRow

    style H1 fill:#000,stroke:#000,stroke-width:2px
    style App fill:#000,stroke:#000,stroke-width:2px
    style AddressBook fill:#000,stroke:#000,stroke-width:2px
    style F1 fill:#000,stroke:#000,stroke-width:1px
    style F2 fill:#000,stroke:#000,stroke-width:1px
    style F3 fill:#000,stroke:#000,stroke-width:1px
    style ContactRow fill:#000,stroke:#000,stroke-width:1px

```

## Design Patterns Used in Address Book Project

### 1. Custom Hooks Pattern

**Description**: Extracting business logic into a custom `useAddressBook` hook for reusability and separation of logic from UI.

### 2. Container/Presentational Pattern

**Description**: Separating components into containers (handle logic) and presentational components (handle appearance).

**Container Component**:

```javascript
// AddressBook.jsx - handles logic
function AddressBook() {
  const { books, addBook, ... } = useAddressBook(); // logic
  return <ContactTable books={books} ... />; // passes data
}
```

**Presentational Components**:

```javascript
// ContactRow.jsx - handles appearance
function ContactRow({ book, isEditing, ... }) {
  return <tr>...</tr>; // only rendering
}
```

### 3. Composition Pattern

**Description**: Building complex UI from simple components.

**Implementation**:

```javascript
AddressBook
  ├── ContactForm
  ├── SearchBar
  └── ContactTable
      └── ContactRow (multiple)
```

### 4. Props Down, Callbacks Up Pattern

**Description**: Unidirectional data flow - data flows down via props, changes return up via callback functions.

**Example**:

```javascript
// Data down ⬇️
<ContactRow book={book} editData={editData} />

// Changes up ⬆️
<button onClick={() => onSaveEdit(book.id)}>Save</button>
```

### 5. State Lifting Pattern

**Description**: Lifting state to common parent component for synchronizing child components.

**Implementation**:

```javascript
// State lifted to AddressBook
const { books, searchTerm, editingId } = useAddressBook();

// Passed to different child components
<SearchBar searchTerm={searchTerm} />
<ContactTable books={books} editingId={editingId} />
```

### 6. Conditional Rendering Pattern

**Description**: Displaying different content based on conditions.

**Implementation**:

```javascript
{filteredBooks.length === 0 ? (
  <p>No data to display</p>
) : (
  <table>...</table>
)}

{isEditing ? (
  <input ... />
) : (
  book.firstName
)}
```

### 7. Single Responsibility Principle

**Description**: Each component responsible for one specific function.
**Examples**:

-   `ContactForm` - only adding contacts
-   `SearchBar` - only search functionality
-   `ContactRow` - only displaying/editing one row
-   `useAddressBook` - only data management

### 8. Validation Pattern

**Description**: Centralized validation using regex patterns.

**Implementation**:

```javascript
const validateForm = (data) => {
    // Name validation - only letters
    if (!/^[a-zA-Z\s]+$/.test(data.firstName)) {
        errors.firstName = "Only letters allowed";
    }
    // Phone validation - digits and symbols
    if (!/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
        errors.phone = "Invalid phone format";
    }
};
```
