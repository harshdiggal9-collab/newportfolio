import { FaWhatsapp } from "react-icons/fa";

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Open WhatsApp chat"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppFloat;
