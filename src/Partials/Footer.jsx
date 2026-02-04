import React from 'react';

const Footer = () => {
  const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/Products?filter=haircare" },
  { name: "Blog", href: "/Blog" },
];

const productLinks = [
  { name: "Skin Care", href: "/Products?filter=skincare" },
  { name: "Hair Care", href: "/Products?filter=haircare" },
  { name: "Makeup", href: "/Products?filter=makeup" },
];

const socialLinks = [
  {
    href: "https://instagram.com",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.627.074-3.083.398-4.242 1.557-1.159 1.159-1.483 2.615-1.557 4.242-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.074 1.627.398 3.083 1.557 4.242 1.159 1.159 2.615 1.483 4.242 1.557 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.627-.074 3.083-.398 4.242-1.557 1.159-1.159 1.483-2.615 1.557-4.242.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.627-.398-3.083-1.557-4.242-1.159-1.159-2.615-1.483-4.242-1.557-1.28-.058-1.688-.072-4.947-.072z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zM18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
    ),
  },
  {
    href: "https://twitter.com",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.4.69-.631 1.49-.631 2.342 0 1.616.823 3.043 2.072 3.878a4.647 4.647 0 01-2.108-.583v.06c0 2.257 1.605 4.138 3.737 4.566a4.647 4.647 0 01-2.103.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995c-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 002.323-2.41l.002-.001z" />
                </svg>
    ),
  },
  {
    href: "https://github.com",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
    ),
  },
];

  return (
    <footer className=" text-gray-100 pt-12 pb-4 border-t-1  bg-gray-900
     border-gray-800
    "
    >
      <div className="max-w-10xl mx-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 lg:gap-x-25 gap-y-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">TheGlamStreet</h3>
            <p className="text-sm">
              Your trusted source for makeup and skincare recommendations.
              Discover the best products for your beauty routine.
            </p>
          </div>

          {/* Navigation Links */}
<div>
  <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
  <ul className="space-y-2">
    {quickLinks.map((link) => (
      <li key={link.name}>
        <a href={link.href} className="text-sm hover:text-pink-500 transition">
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>


   {/* Product Links */}
        <div className="block md:hidden">
  <h3 className="text-lg font-semibold text-white mb-4">Product Link</h3>
  <ul className="space-y-2">
    {productLinks.map((link) => (
      <li key={link.name}>
        <a href={link.href} className="text-sm hover:text-pink-500 transition">
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>

         
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe for the latest beauty tips and product updates.</p>
            <div className="flex hover:focus:outline-none focus:outline-none focus:ring-1 focus:ring-pink-500">
              <input
                type="email"
                placeholder="Your email"
                className="w-40 p-1 text-sm border border-gray-300 rounded-l-md over:focus:outline-none focus:outline-none focus:ring-1 focus:ring-gray-500 "
              />
              <button className="bg-white/90 text-gray-900 px-4 py-2 rounded-r-md hover:bg-white transition">
                Subscribe
              </button>
            </div>
          </div>

           {/* Social Media */}
         <div className="lg:ml-10">
  <h3 className="text-lg font-semibold text-white/85 mb-4">Follow Us</h3>
  <div className="flex space-x-4">
    {socialLinks.map((social, index) => (
      <a href={social.href} key={index} className="transition">
        {social.icon}
      </a>
    ))}
  </div>
</div>

   {/* Product Links */}
        <div className="hidden md:block">
  <h3 className="text-lg font-semibold text-white mb-4">Product Link</h3>
  <ul className="space-y-2">
    {productLinks.map((link) => (
      <li key={link.name}>
        <a href={link.href} className="text-sm hover:text-pink-500 transition">
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TheGlamStreet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;