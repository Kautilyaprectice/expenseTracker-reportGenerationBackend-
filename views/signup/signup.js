const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(event){
    event.preventDefault();

    const  name = document.getElementById('name').value;
    const  email = document.getElementById('email').value;
    const  password = document.getElementById('password').value;

    const registerUser = {
        name: name,
        email: email,
        password: password
    };

    const clearForm = () => {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }

    if(name && email && password){
        axios.post("http://localhost:3000/user/signup", registerUser)
            .then((res) => {
                if(res.status === 201){
                    window.location.href = "../login/login.html";
                }
                clearForm();
            })
            .catch((err) => {
                if(err.response && err.response.status === 403){
                    alert("User already exists");
                }
                else{
                    console.error(err);
                }
                clearForm();
            });
    }
    else{
        alert("Enter all details");
    }

});