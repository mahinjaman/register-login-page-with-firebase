import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../AuthProvider/UserProvider';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const { LoginUser, resetPassword, GoogleSignIn } = useContext(UserContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef(null);
    const handleSubmit = e => {
        setErrorMessage('')
        setSuccessMessage('')
        e.preventDefault();
        const email = emailRef.current.value;
        const password = e.target.password.value;
        LoginUser(email, password)
            .then(result => {
                const user = result.user;
                setSuccessMessage('Login successful');
                console.log(user);
            })
            .catch(err => {
                setErrorMessage(err.message);
                console.log(err.message);

            })
    }
    const handleForgetPassword = email => {
        resetPassword(email)
            .then(() => {
                alert('Please check your email and reset your password')
            })
            .catch(err => {
                setErrorMessage(err.message);
                console.log(err.message);
            }
            );
    }

    const handleGoogleSignIn = () => {
        setErrorMessage('')
        setSuccessMessage('')
        GoogleSignIn()
            .then(result => {
                const user = result.user;
                setSuccessMessage('Login successful');
                console.log(user);
            })
            .catch(err => {
                setErrorMessage(err.message);
                console.log(err.message);

            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col w-full">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card shrink-0 md:w-5/12 shadow-2xl bg-base-100">
                    <form className="card-body w-full" onSubmit={handleSubmit}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <div className='relative'>
                                <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="w-full input input-bordered" required />
                                <span onClick={() => setShowPassword(!showPassword)} className='absolute top-4 right-5'>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                            </div>

                            <div className='flex justify-between'>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover" onClick={()=>handleForgetPassword(emailRef.current.value)}>Forgot password?</a>
                                </label>

                                <label className="label">
                                    <p className="label-text-alt">New To this site? Please <Link className='underline' to={'/register'}>Register</Link> </p>
                                </label>
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>

                        <div className='flex flex-col justify-center items-center gap-4 py-5'> 
                            <p>Or SignIn With</p>
                            <div className='flex gap-3'>
                                <button className='btn' onClick={handleGoogleSignIn}>Google</button>
                                <button className='btn' >Github</button>
                                <button className='btn' >Twitter</button>
                            </div>
                        </div>
                        {
                            errorMessage &&
                            <div >
                                <p className='text-red-500 text-center'>{errorMessage}</p>
                            </div>
                        }

                        {
                            successMessage &&
                            <div >
                                    <p className='text-green-500 text-center'>{successMessage}</p>
                            </div>
                        }
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;