function LoginAuth(values){
    let error = {}
    const password_pattern = /^[a-zA-Z0-9]{2,}$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "") {
        error.email="Email should not be empty"
    }
     else {
        error.email=""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password should be 2 letters long."
    } else {
        error.password=""
    }

    return error;
}

export default LoginAuth