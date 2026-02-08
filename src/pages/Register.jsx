import { useState } from "react";
import LoadingIndicator from '../components/LoadingIndicator';
import { registerRun } from "../services/userService";
import useFormInput from "../hooks/useForm";

export default function Register() {

    const { values, handleChange } = useFormInput({
        username: "",
        email: "",
        password1: "",
        password2: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true);
        setError(null);

        try {
            await registerRun(values)
            setSuccessMessage("Registration Successful!")
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
            setIsLoading(false)
        }
    };

    if (isLoading) return <div className="flex items-center justify-center"><LoadingIndicator /></div>
    if (successMessage) return <p className="flex items-center justify-center text-2xl text-green-500">{successMessage}</p>;

    return (
        <div className="max-w-md mx-auto my-10 mt-10 p-6 bg-gray-50 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">username:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    ></input>{" "}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">email:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    ></input>{" "}
                </div >
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password1"
                        value={values.password1}
                        onChange={handleChange}
                    ></input>{" "}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">confirm password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password2"
                        value={values.password2}
                        onChange={handleChange}
                    ></input>{" "}
                </div>
                <div className="flex items-center justify-center">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <br />
                <div className="flex items-center justify-center">
                    <button className="mt-4 md:mt-0 rounded bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" disabled={isLoading} onClick={handleSubmit}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}