
export function formatINR(amount) {
    if (typeof amount !== 'number') {
      amount = parseFloat(amount);
    }
    
    return amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR',
    }).replace('₹', '₹ ');
  }

  export function formatAadhaarNumber(value) {
    const cleaned = value.replace(/\D/g, '');
  
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
  
    return formatted;
  };
  
  