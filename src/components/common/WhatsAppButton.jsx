import { FaInstagram } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const instagramDirectUrl = 'https://www.instagram.com/direct/t/17844793224557863/';

    return (
        <a
            href={instagramDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            aria-label="Message us on Instagram"
        >
            <FaInstagram className="whatsapp-icon" />
        </a>
    );
};

export default WhatsAppButton;
