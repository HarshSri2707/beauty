import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../assets/notfound.png'
const NotFound = () => {
  return (
<div
  className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 bg-contain bg-center"
  style={{ backgroundImage: `url(${notfound})` }}
>
    <p></p>
  <Link
    to="/"
    className="bg-pink-50 text-black px-6 py-4 static top-50% rounded shadow hover:bg-pink-100 transition-all mt-60"
  >
    Go to Homepage
  </Link>
</div>


  );
};

export default NotFound;
