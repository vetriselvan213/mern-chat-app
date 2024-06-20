import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs) => {
    const { fullName, username, password, confirmPassword, gender, profilePic } = inputs;

    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      profilePic
    });
    if (!success) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("gender", gender);
      formData.append("profilePic", profilePic);
      
      const res = await axios.post("/api/auth/signup",formData,{
        headers: {
          "Content-Type":"multipart/form-data"
        }
      });

      console.log("Sign-up successful:", res.data);
      toast.success("Sign-up successful");

      if (res.error) {
        throw new Error(res.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(res.data));

      setAuthUser(res.data);
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender, 
  profilePic
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender || !profilePic) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
