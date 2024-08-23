import React from 'react';

const ThankYou = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700">
          Thank you for accepting the invite. We will contact you with updates very soon.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;