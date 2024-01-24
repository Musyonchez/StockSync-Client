import React, { SyntheticEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (form.current) {
      try {
        const result = await emailjs.sendForm(
          "service_egqpylm",
          "template_n0p2raj",
          form.current,
          "yOUbsktS4SUx-Q6pB"
        );
        alert("Thank you for successful submission! We will contact you soon.");
      } catch (error) {}
    }
  };

  return (

    <>
    <div className=" hidden md:flex flex-row h-full my-auto justify-between">
      <div className="flex flex-col flex-1 md:pl-10 lg:pl-28 lg:pt-14">
        <h1 className="font-extrabold text-5xl mb-4 text-emerald-500">
          Your feedback <br /> helps us improve
        </h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          We highly value your feedback as it plays a crucial <br /> role in
          enhancing our services to better serve you.
        </p>
        <h2 className="text-2xl mb-6 text-emerald-500">Need Assistance?</h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          We are here to assist you, and we would be <br /> delighted to connect
          with you for any queries or concerns.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Anticipate our response within 48 hours.
        </p>
      </div>

      <div className="flex flex-col flex-1 md:px-5 lg:px-10">
        <form className="space-y-2" onSubmit={sendEmail} ref={form}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="form-firstName">First name</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white"
              type="text"
              id="form-firstName"
              name="first_name"
              placeholder="Enter firstname"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="form-lastName">Last name</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white"
              type="text"
              id="form-lastName"
              name="last_name"
              placeholder="Enter lastname"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="form-phoneNumber">Phone Number</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white"
              type="tel"
              id="form-phoneNumber"
              name="phone_number"
              placeholder="Enter number"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="form-email">Email</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white"
              type="email"
              id="form-email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="form-message">Message</label>
            <textarea
              className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white"
              id="form-message"
              name="message"
              rows={4} // Change this line to use a number instead of a string
              placeholder="Enter message"
              required
            />
          </div>
          <button
            className="bg-emerald-500 px-4 py-2 rounded-full text-white"
            type="submit"
          >
            Send Message &rarr;
          </button>
        </form>
      </div>
    </div>
    


    <div className="flex md:hidden flex-col items-center justify-center px-4">
  <h1 className="font-extrabold text-3xl mb-4 text-emerald-500">Your Feedback</h1>
  <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
    Helps us improve our services to better serve you.
  </p>
  <form className="space-y-3 w-full" onSubmit={sendEmail} ref={form}>
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor="form-firstName">First name</label>
      <input
        className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white w-full"
        type="text"
        id="form-firstName"
        name="first_name"
        placeholder="Enter firstname"
        required
      />
    </div>
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor="form-lastName">Last name</label>
      <input
        className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white w-full"
        type="text"
        id="form-lastName"
        name="last_name"
        placeholder="Enter lastname"
        required
      />
    </div>
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor="form-phoneNumber">Phone Number</label>
      <input
        className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white w-full"
        type="tel"
        id="form-phoneNumber"
        name="phone_number"
        placeholder="Enter number"
        required
      />
    </div>
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor="form-email">Email</label>
      <input
        className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white w-full"
        type="email"
        id="form-email"
        name="email"
        placeholder="Enter email"
        required
      />
    </div>
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor="form-message">Message</label>
      <textarea
        className="rounded-md px-4 py-2 bg-gray-700 dark:bg-gray-950 text-white w-full"
        id="form-message"
        name="message"
        rows={4}
        placeholder="Enter message"
        required
      />
    </div>
    <button className="bg-emerald-500 px-4 py-2 rounded-full text-white w-full" type="submit">
      Send Message &rarr;
    </button>
  </form>
</div>

    </>
  );
};

export default ContactForm;
