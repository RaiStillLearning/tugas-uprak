import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_h5kshrd", // ganti dengan service ID dari EmailJS
        "template_gj6s7ul", // ganti dengan template ID
        formRef.current,
        "vte4W1hlupUwmqOaF" // ganti dengan user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent, thank you!");
          formRef.current?.reset();
        },
        (error) => {
          alert("Failed to send message, please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", padding: "2rem" }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "480px" }}
      >
        <h2 className="mb-4 text-center">Contact Us</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control w-100"
            id="name"
            name="user_name"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control w-100"
            id="email"
            name="user_email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control w-100"
            id="subject"
            name="subject"
            placeholder="Subject"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control w-100"
            id="message"
            name="message"
            rows={4}
            placeholder="Write your message here..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
