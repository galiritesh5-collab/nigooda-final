import { Link } from "react-router-dom";

const Footer = () => {
return ( <footer className="bg-slate-950 text-white mt-10 md:mt-14 border-t border-slate-800"> <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

      {/* Brand Section */}
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl font-bold mb-3">
          Nigooda
        </h2>

        <p className="text-slate-300 leading-7 text-sm">
          Discover better products, understand ingredients smarter,
          and make informed purchasing decisions through AI-powered
          product intelligence and product discovery.
        </p>
      </div>

      {/* Company */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-slate-300 uppercase tracking-wide">
          Company
        </h3>

        <div className="flex flex-col gap-3 text-slate-300 text-sm">

          <Link
            to="/about"
            className="hover:text-white transition"
          >
            About Us
          </Link>

          <Link
            to="/contact-us"
            className="hover:text-white transition"
          >
            Contact Us
          </Link>

        </div>
      </div>

      {/* Legal */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-slate-300 uppercase tracking-wide">
          Legal
        </h3>

        <div className="flex flex-col gap-3 text-slate-300 text-sm">

          <Link
            to="/privacy-policy"
            className="hover:text-white transition"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms-and-conditions"
            className="hover:text-white transition"
          >
            Terms & Conditions
          </Link>

          <Link
            to="/disclaimer"
            className="hover:text-white transition"
          >
            Disclaimer
          </Link>

          <Link
            to="/affiliate-disclosure"
            className="hover:text-white transition"
          >
            Affiliate Disclosure
          </Link>

          <Link
            to="/cookie-policy"
            className="hover:text-white transition"
          >
            Cookie Policy
          </Link>

          <Link
            to="/refund-policy"
            className="hover:text-white transition"
          >
            Refund Policy
          </Link>

        </div>
      </div>

      {/* Resources */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-slate-300 uppercase tracking-wide">
          Resources
        </h3>

        <div className="flex flex-col gap-3 text-slate-300 text-sm">

          <Link
            to="/how-ratings-work"
            className="hover:text-white transition"
          >
            How Ratings Work
          </Link>

          <Link
            to="/product-intelligence"
            className="hover:text-white transition"
          >
            Product Intelligence
          </Link>

          <Link
            to="/wishlist"
            className="hover:text-white transition"
          >
            Wishlist
          </Link>
          <Link
  to="/cookie-policy"
  className="hover:text-white transition"
>
  Cookie Policy
</Link>
<Link
  to="/refund-policy"
  className="hover:text-white transition"
>
  Refund Policy
</Link>
<Link
  to="/how-ratings-work"
  className="hover:text-white transition"
>
  How Ratings Work
</Link>
<Link
  to="/faq"
  className="hover:text-white transition"
>
  FAQ
</Link>

        </div>
      </div>

    </div>

    <div className="border-t border-slate-800 mt-8 pt-6">

      <p className="text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Nigooda. All rights reserved.
      </p>

      <p className="text-center text-slate-500 text-xs mt-3 max-w-3xl mx-auto">
        Product information, ingredient analysis, ratings, and insights
        provided on Nigooda are for informational purposes only and
        should not be considered medical, nutritional, legal, or
        professional advice.
      </p>

    </div>

  </div>
</footer>


);
};

export default Footer;
