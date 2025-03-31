import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
            <p className="mt-4 text-gray-400">The event you are looking for does not exist or has been removed.</p>
            <button
                onClick={() => navigate(-1)} // Navigate to the previous page
                className="mt-6 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
            >
                Go Back
            </button>
           
        </div>
    );
};

export default ErrorPage;
