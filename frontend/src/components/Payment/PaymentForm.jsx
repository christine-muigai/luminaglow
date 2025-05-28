import { useState } from 'react';

export default function PaymentForm() {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const validateCard = () => {
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 16) {
      alert("Card number must be 16 digits");
      return false;
    }
    if (!cardDetails.expiry || !cardDetails.expiry.includes('/')) {
      alert("Expiry date must be in MM/YY format");
      return false;
    }
    if (!cardDetails.cvc || cardDetails.cvc.length < 3) {
      alert("CVC must be 3 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCard()) {
      alert("Payment processing would start here!\n" + JSON.stringify(cardDetails, null, 2));
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails({...cardDetails, number: value});
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails({...cardDetails, expiry: value});
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Card Details</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Cardholder Name</label>
        <input
          type="text"
          value={cardDetails.name}
          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Card Number</label>
        <input
          type="text"
          value={cardDetails.number}
          onChange={handleCardNumberChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="4242 4242 4242 4242"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Expiry Date</label>
          <input
            type="text"
            value={cardDetails.expiry}
            onChange={handleExpiryChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">CVC</label>
          <input
            type="text"
            value={cardDetails.cvc}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').substring(0, 3);
              setCardDetails({...cardDetails, cvc: value});
            }}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="123"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        Pay Now
      </button>
    </form>
  );
}