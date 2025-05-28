import { Link } from 'react-router-dom';

const PaymentSuccess = ({ transactionId, amount }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <div className="mb-4">
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Payment Successful!</h2>
      <p className="text-gray-600 mb-4">Thank you for your payment.</p>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-gray-700">Transaction ID: <span className="font-semibold">{transactionId}</span></p>
        <p className="text-gray-700">Amount Paid: <span className="font-semibold">${amount}</span></p>
      </div>
      
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;