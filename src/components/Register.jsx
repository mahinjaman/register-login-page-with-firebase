import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../AuthProvider/UserProvider';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { sendEmailVerification, updateProfile } from 'firebase/auth';
const Register = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);
    const { createUser, forgetPassword } = useContext(UserContext);
    const img = 'https://i.ibb.co/4dNffG6/blank-profile-picture-973460-640.webp';
    const handleSubmit = e => {
        setErrorMessage('')
        setSuccessMessage('')
        e.preventDefault();
        const name = e.target.name.value;
        const email = emailRef.current.value;
        const password = e.target.password.value;
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert('Please enter a valid email address');
            setErrorMessage('Please enter a valid email address');
            return;
        }
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)){
            alert('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character')
            setErrorMessage('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character');
            return;
        }
        console.log(name, email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                sendEmailVerification(user)
                    .then(() => {
                        alert('Please check your email and verify your password')
                    })
                    .catch(err => {
                        setErrorMessage(err.message);
                        console.log(err.message);

                    })
                updateProfile(user, {
                    displayName: name,
                    photoURL: img,
                })
                setSuccessMessage('Login successful');
                console.log(user);
            })
            .catch(err => {
                setErrorMessage(err.message);
                console.log(err.message);

            })
    }

    const handleForgetPassword = email => {
        forgetPassword(email)
            .then(() => {
                alert('Please check your email and reset your password')
            })
            .catch(err => {
                setErrorMessage(err.message);
                console.log(err.message);
            }
           );
    }  

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col w-full">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card shrink-0 md:w-5/12 shadow-2xl bg-base-100">
                    <form className="card-body w-full" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                        </div>

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
                                    <a href="#" className="label-text-alt link link-hover" onClick={handleForgetPassword}>Forgot password?</a>
                                </label>

                                <label className="label">
                                    <p className="label-text-alt">Already have an account?Please <Link to={'/login'}>Login</Link> </p>
                                </label>
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                        {
                            errorMessage &&
                            <div >
                                <p className='text-red-500'>{errorMessage}</p>
                            </div>
                        }

                        {
                            successMessage &&
                            <div >
                                <p className='text-green-500'>{successMessage}</p>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;