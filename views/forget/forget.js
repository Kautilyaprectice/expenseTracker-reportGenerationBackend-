document.getElementById("forgotPasswordForm").addEventListener('submit', function(event){
    event.preventDefault();

    const email = document.getElementById('email').value;
    axios.post('http://localhost:3000/password/forgotpassword', { email: email })
        .then((res) => {
            console.log(res.data);
            alert("Email sent successfully");
            window.location.href = "../login/login.html";
        })
        .catch(err => console.error(err));
});
