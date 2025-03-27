import { useState, useRef } from 'react';

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      alert(`OTP Submitted: ${otpValue}`);
    } else {
      alert('Please enter a 6-character OTP.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-500">
          Enter OTP
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Please enter the 6-digit OTP sent to your email
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl font-bold rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
