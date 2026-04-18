document.getElementById("signin-btn").addEventListener("click", () => {
    // 1.get the username input
    const userInput = document.getElementById("input-userName");
    const userInputValue = userInput.value
    console.log(userInputValue);
    // 2. get the password input
    const passwordInput = document.getElementById("input-password");
    const passwordInputValue = passwordInput.value
    // 3.match both 
        // 3.1 -> true:::: alert! >> homepage
        if(userInputValue === "admin" && passwordInputValue === "admin123"){
            alert("Sign in successfully")

            window.location.assign("/home.html")
        }
        // 3.2 -> false:::: alert! >> return
        else{
            alert("Sign in Failed");
            return;
        }

})