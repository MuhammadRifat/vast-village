export const checkEmail = (loggedInUser, setLoggedInUser) => {
    fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loggedInUser.email })
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setLoggedInUser({...data, darkMode: loggedInUser.darkMode});
            }
        })
}