import { useState, useEffect } from "preact/hooks";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: preact.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: preact.JSX.TargetedEvent<HTMLFormElement, Event>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Error sending the message. Please try again.");
      }
    } catch (error) {
      setStatus("Error");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit}>
      <div class="flex flex-col gap-4 ">
        <div class="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            class="w-full mb-2 p-2 border rounded bg-white text-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            class="w-full mb-2 p-2 border rounded bg-white text-black"
            required
          />
        </div>

        <textarea
          type="text"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          class="w-full mb-2 p-2 border rounded bg-white text-black resize-none"
          required
          rows={4}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={` w-40 bg-orange text-white py-2 rounded-md transition-transform duration-300 ${
            isSubmitting
              ? "cursor-not-allowed opacity-50"
              : "hover:scale-105 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
        {status && (
          <p class="mt-2 text-orange/70 z-40 text-center text-xl tracking-wide ">
            {status}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
