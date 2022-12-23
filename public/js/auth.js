
const miFormulario = document.querySelector('form');




miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for( let el of miFormulario.elements) {
        if( el.name.length > 0) {
            formData[el.name] = el.value
        }
    }
    
    fetch(window.location.hostname.includes('localhost')
    ?'http://localhost:8080/api/auth/login'
    :'https://restserver-curso-node-nik.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
    })
    .then( resp => resp.json())
    .then( ({ msg, token }) => {
        if(msg) {
            return console.error(msg)
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    
    .catch (err => {
        console.log(err)
    })

});



function handleCredentialResponse(response) {

    //  Google Token : ID_TOKEN
    // console.log('id_token', response.credential);
    const body = { id_token: response.credential }

    fetch(window.location.hostname.includes('localhost')
    ?'http://localhost:8080/api/auth/google'
    :'https://restserver-curso-node-nik.herokuapp.com/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
    })
    .then(resp => resp.json())
    .then(({ token }) => {
        // localStorage.setItem('email', resp.usuario.correo);
        window.location = 'chat.html';
        localStorage.setItem('token', token);
        
    })
    
    
    .catch(console.warn);

}


const button = document.getElementById('google_signout');
button.onclick = () => {
    
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()
    
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}


