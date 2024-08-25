import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Button, Input, Logo } from './index'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'



const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, settError] = useState('')
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        settError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            settError("")
        }
    }


    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} >
                    <div className='space-y-5'>
                        <Input
                            label="FullName: "
                            placeholder="Enter your Fullname: "
                            {...register("name", {
                                required: true
                            })}

                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="Enter your Password: "
                            type="password"
                            {...register("password", {
                                required: true,
                            })}

                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                                Sign In
                        </Button>

                    </div>

                </form>


            </div>

        </div>
    )
}

export default Signup
