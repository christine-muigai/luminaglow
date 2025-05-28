import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePaymentSuccess = (response) => {
    navigate('/payment-success', {
      state: {
        transactionId: response.transactionId,
        amount: response.amount
      }
    });
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <PaymentForm onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
      </div>
    </div>
  );
};

export default CheckoutPage;