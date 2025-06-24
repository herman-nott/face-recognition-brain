import { useState } from "react";

function Signin({ onRouteChange, loadUser }) {
    const [signInEmailorUsername, setSignInEmailorUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [error, setError] = useState(false);

    function onEmailOrUsernameChange(event) {
        setSignInEmailorUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setSignInPassword(event.target.value);
    }

    function onSubmitSignIn() {
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emailOrUsername: signInEmailorUsername,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user && user.id) {                    
                    setError('');
                    loadUser(user);
                    onRouteChange('home');
                } else {
                    setError('Incorrect username or password');
                }
            })
            .catch(() => setError('Server error. Please try again later.'));;
    }

    return (
        <div className='center-container'>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 blur-card">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email or Username</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="login" id="login" onChange={onEmailOrUsernameChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
            {error && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
                &#10006; {error}
            </p>
            )}
        </div>
    );
}

export default Signin;