document.addEventListener('DOMContentLoaded', () => {
    const request = indexedDB.open('UserDB', 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const cursorRequest = store.openCursor();
        const tableBody = document.querySelector('#userTable tbody');

        cursorRequest.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                const user = cursor.value;
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.gender}</td>
                    <td>${user.phone}</td>
                    <td>${user.address}</td>
                    <td>${user.qualification}</td>
                `;

                tableBody.appendChild(row);
                cursor.continue();
            }
        };

        cursorRequest.onerror = () => {
            alert('Error fetching user data!');
        };
    };

    request.onerror = () => {
        alert('Error opening database!');
    };
});
