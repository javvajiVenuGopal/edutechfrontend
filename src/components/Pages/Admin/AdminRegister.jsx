import { useState } from "react";
import { registerAdmin } from "../../../Apiroute"; // adjust path if needed
import toast from "react-hot-toast";

function AdminRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    is_active: true
  });

  //  Only SUPERADMIN allowed
  const role = localStorage.getItem("role");

  if (role !== "SUPERADMIN") {
    return (
      <h2 className="text-center mt-20 text-red-500 text-xl">
        Access Denied ❌
      </h2>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerAdmin(formData);

      toast.success(res.data.message || "Admin created successfully ✅");

      setFormData({
        email: "",
        password: "",
        role: "",
        is_active: true
      });
    } catch (err) {
      toast.error(
        err.response?.data?.detail || "Admin creation failed ❌"
      );
    }
  };

  const roles = [
    "SUPERADMIN",
    "ADMIN",
    "SUPPORT_ADMIN",
    "FINANCIAL_ADMIN",
    "CONTENT_ADMIN"
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[420px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Admin 
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* ROLE */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="">Select Role</option>

          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* ACTIVE STATUS */}
        <label className="flex items-center gap-2 mb-5">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          Active Account
        </label>

        {/* SUBMIT BUTTON */}
       <button
  type="submit"
  className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white py-3 rounded-lg font-semibold"
>
  Register Admin 
</button>
      </form>
    </div>
  );
}

export default AdminRegister;
