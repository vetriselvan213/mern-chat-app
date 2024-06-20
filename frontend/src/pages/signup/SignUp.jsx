import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import dummypic from "../../../public/dummypic.png"

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic:null
  });
  const [showPic, setShowPic] = useState("");

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(inputs);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setShowPic(file);
    setInputs({ ...inputs, profilePic: file });
  };

  console.log("data", inputs);

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center" style={{ color: "var(--clr-bitterseet)" }}>
          Sign Up <span style={{ color: "var(--clr-cerulean)" }}> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="avatar w-full flex justify-center p-3">
            <div className="w-24 rounded-full">
              {showPic ? (
                <img src={URL.createObjectURL(showPic)} alt="profile" />
              ) : (
                <img src={dummypic} alt="profile" />
              )}
            </div>
          </div>
          <span className="flex gap-4 w-full">
            <span className=" w-1/2">
              <div>
                <label className="label p-2">
                  <span className="text-base" style={{ color: "var(--clr-light-orange)" }}>Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full input input-bordered h-10"
                  value={inputs.fullName || ""}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  <span className="text-base" style={{ color: "var(--clr-light-orange)" }}>Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered h-10"
                  value={inputs.password || ""}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label ">
                  <span className="text-base" style={{ color: "var(--clr-light-orange)" }}>Profile Pic</span>
                </label>
                <input
                  type="file"
                  className="file-input w-full max-w-xs"
                  onChange={handleFileChange}
                />
              </div>
            </span>
            <span className="w-1/2">
              <div>
                <label className="label p-2">
                  <span className="text-base" style={{ color: "var(--clr-light-orange)" }}>Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full input input-bordered h-10"
                  value={inputs.username || ""}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base" style={{ color: "var(--clr-light-orange)" }}>Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full input input-bordered h-10"
                  value={inputs.confirmPassword || ""}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                />
              </div>

              <label className="label" style={{ color: "var(--clr-light-orange)" }}>Gender</label>    
              <GenderCheckbox
                onCheckboxChange={handleCheckboxChange}
                selectedGender={inputs.gender}
              />
            </span>
          </span>
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            style={{ color: "var(--clr-light-orange)"}}
          >
            Already have an account?
          </Link>
          <div>
            <button className={`btn btn-block btn-sm mt-2 text-white`} style={ inputs.gender === "female" ? {background:"var(--clr-bitterseet)"} : {background:"var(--clr-cerulean)"}} disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
