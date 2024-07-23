import './styles.css'
import { SubmitHandler, useForm } from 'react-hook-form';

const Form = () => {

    type DataType = {
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    }

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, watch } = useForm<DataType>()

    const onSubmit: SubmitHandler<DataType> = (data) => {
        console.log(data)
        reset()
    }

    const validateConfirmPassword = (value: string) => {
        const password = watch('password');
        if (value !== password) {
            return "Passwords do not match";
        }
        return true;
    };

    return (
        <div className='form-div'>
            <h2>Register User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-div'>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" {...register("name", {
                        required: "Name is required.",
                        pattern: {
                            value: /^[a-zA-Z\s]+$/,
                            message: "Invalid name."
                        }
                    })} />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" {...register("password", {
                        required: "Password is required.",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                            message: "Password must contain one capital letter, one lowercase letter, one number and one symbol."
                        }
                    })} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className='input-div'>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="text" id="confirmPassword" {...register("confirmPassword", {
                        required: "Password confirmation is required.",
                        validate: validateConfirmPassword
                    })} />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>

                <div className='button-div'>
                    <button type="submit">
                        Submit
                    </button>
                </div>

                {isSubmitSuccessful && <p>Data was submitted successfully.</p>}
            </form >
        </div >
    )

};

export default Form;