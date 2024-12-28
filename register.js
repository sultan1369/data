document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        qualification: document.getElementById('qualification').value,
        password: document.getElementById('password').value,
    };

    const request = indexedDB.open('UserDB', 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore('users', { keyPath: 'email' });
        store.createIndex('email', 'email', { unique: true });
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        store.add(user);
        alert('Registration successful!');
        window.location.href = 'login.html';
    };

    request.onerror = () => {
        alert('Error registering user!');
    };
});
