import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ContactBanner = () => {
  const nav = useNavigate();
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl lg:text-5xl font-bold mb-8">
        Ready to Take the Next Step?
      </h2>
      <p className="font-serif text-xl max-w-3xl mx-auto leading-relaxed mb-12">
        Whether you’re a student eager to learn, a mentor ready to guide, or a
        partner looking to collaborate — we’d love to hear from you. Reach out
        today and let’s shape the future of education together.
      </p>
      <button
        onClick={() => nav('/contact')}
        className=" shadow-md  cursor-pointer duration-500 transition-all px-8  py-5 mx-auto rounded-full sub-card"
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        <span className="text-center mx-auto flex items-center justify-center gap-2">
          Contact Us
          <ChevronRight className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
};

