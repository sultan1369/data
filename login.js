document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const request = indexedDB.open('UserDB', 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const userRequest = store.get(email);

        userRequest.onsuccess = () => {
            const user = userRequest.result;
            if (user && user.password === password) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password!');
            }
        };

        userRequest.onerror = () => {
            alert('User not found!');
        };
    };
});
