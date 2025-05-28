export const processPayment = async (cardDetails) => {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      const isSuccess = Math.random() > 0.2; 

      if (isSuccess) {
        resolve({
          transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
          amount: '99.99', 
          timestamp: new Date().toISOString()
        });
      } else {
        reject(new Error('Payment failed. Please check your card details and try again.'));
      }
    }, 1500); 
  });
};