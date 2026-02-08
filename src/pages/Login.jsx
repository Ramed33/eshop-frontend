import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginRun } from "../services/userService";
import LoadingIndicator from '../components/LoadingIndicator';
import useFormInput from "../hooks/useForm";

export default function Login() {

    const navigate = useNavigate();

    const { values, handleChange } = useFormInput({
        email: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await loginRun(values)
            setSuccessMessage("Login Successful !")
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh);
            navigate('/');
        }
        catch (error) {
            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if (errorMessages && errorMessages.length > 0) {
                        setError(errorMessages[0]);
                    }
                })
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="flex items-center justify-center"><LoadingIndicator /></div>
    if (successMessage) return <p className="flex items-center justify-center text-2xl text-green-500">{successMessage}</p>;

    return (
        <div className="max-w-md mx-auto my-10 mt-10 p-6 bg-gray-50 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">email:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    ></input>{" "}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    ></input>{" "}
                </div>
                <div className="flex items-center justify-center">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <br />
                <div className="flex items-center justify-center">
                    <button className="mt-4 md:mt-0 rounded bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={isLoading} onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}