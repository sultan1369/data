document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        alert('No user logged in!');
        window.location.href = 'login.html';
    } else {
        document.getElementById('userName').textContent = user.fullName;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userAge').textContent = user.age;
        document.getElementById('userGender').textContent = user.gender;
        document.getElementById('userPhone').textContent = user.phone;
        document.getElementById('userAddress').textContent = user.address;
        document.getElementById('userQualification').textContent = user.qualification;
    }
});
