import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4">
      
      <h1 className="text-7xl font-bold text-indigo-600">404</h1>

      <h2 className="text-2xl font-semibold text-slate-800 mt-4">
        Page Not Found ❌
      </h2>

      <p className="text-slate-500 mt-2">
        Sorry , you are trying to access a page that doesn't exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md"
      >
        Go Back to Dashboard 
      </button>

    </div>
  );
}

export default NotFound;
