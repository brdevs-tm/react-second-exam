import React, { useState } from "react";
import PropTypes from "prop-types";
import { HidePassword, ShowPassword, RemoverMenu } from "../assets/img/Icons";

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinimumLength: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !passwordStrength.hasUpperCase ||
      !passwordStrength.hasNumber ||
      !passwordStrength.hasSymbol ||
      !passwordStrength.hasMinimumLength
    ) {
      alert(
        "Password must contain at least one uppercase letter, one number, one symbol, and be at least 8 characters long."
      );
      return;
    }
    setEmail("");
    setPassword("");
    closeModal();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const hasMinimumLength = newPassword.length >= 8;
    setPasswordStrength({
      hasUpperCase,
      hasNumber,
      hasSymbol,
      hasMinimumLength,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="relative bg-white w-[300px] h-[500px] flex flex-col justify-center items-center p-4 rounded-md">
        <button className="absolute top-5 right-5" onClick={closeModal}>
          <RemoverMenu width={"25px"} height={"25px"} />
        </button>
        <div className="flex items-center justify-center mb-4">
          <span className="mr-2 cursor-pointer">Login</span>
          <span>|</span>
          <span className="ml-2 cursor-pointer">Register</span>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="johncena@example.com"
                className="border-2 border-green-500 rounded-md transition-all duration-300 py-2 px-6 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  className="border-2 border-green-500 rounded-md transition-all duration-300 py-2 px-6 focus:border-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="absolute top-3 right-2">
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <HidePassword /> : <ShowPassword />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <span>True condition</span>
                <ul className="flex flex-col ml-4">
                  <li className="list-disc">
                    <span
                      className={`text-sm ${
                        passwordStrength.hasUpperCase
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      Has uppercase letter
                    </span>
                  </li>
                  <li className="list-disc">
                    <span
                      className={`text-sm ${
                        passwordStrength.hasNumber
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      Has number
                    </span>
                  </li>
                  <li className="list-disc">
                    <span
                      className={`text-sm ${
                        passwordStrength.hasSymbol
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      Has symbol
                    </span>
                  </li>
                  <li className="list-disc">
                    <span
                      className={`text-sm ${
                        passwordStrength.hasMinimumLength
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      Minimum length of 8 characters
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="submit"
                className="border-2 border-green-500 py-2 rounded-md text-white active:bg-white active:text-green-500 bg-green-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
