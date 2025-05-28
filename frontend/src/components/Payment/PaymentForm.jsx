import { useState } from 'react';

export default function PaymentForm() {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(cardDetails, null, 2));
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Card Details</h2>
      
      {/* Cardholder Name */}
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

      {/* Card Number */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Card Number</label>
        <input
          type="text"
          value={cardDetails.number}
          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="4242 4242 4242 4242"
          required
        />
      </div>

      {/* Expiry and CVC */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Expiry Date</label>
          <input
            type="text"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
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
            onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="123"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        Pay Now
      </button>
    </form>
  );
}