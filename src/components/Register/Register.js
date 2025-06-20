import { useState } from "react";

function Register({ onRouteChange, loadUser }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onSubmitRegister() {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    loadUser(user);
                    onRouteChange('home');
                }
            }); 
    }
    
    return (
        <div className='center-container'>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 blur-card">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username" id="username" onChange={onUsernameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={onSubmitRegister} />
                        </div>
                    </div>
                </main>
            </article>
        </div>
    );
}

export default Register;