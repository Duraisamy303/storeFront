import React, { useEffect } from 'react';
import Razorpay from 'razorpay';

const RazorpayModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const options = {
        key: 'rzp_test_tEMCtcfElFdYts',
        amount: 10000, // amount in paise (100 paise = 1 rupee)
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Payment',
        image: '/your_logo.png', // path to your logo
        handler: function(response) {
          alert(response.razorpay_payment_id);
          onClose(); // Close the modal after payment completion
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9876543210',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#F37254',
        },
      };
      const razorpay = new Razorpay(options);
      razorpay.open();
    }
  }, [isOpen, onClose]);

  return null; // Render nothing for the modal content, as Razorpay handles it internally
};

export default RazorpayModal;
