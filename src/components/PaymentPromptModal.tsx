import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

// Define Razorpay type globally for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface PaymentPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  formData: ConsultationRequest | null;
}

// Utility function to load the Razorpay script
const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentPromptModal = ({ isOpen, onClose, onPay, formData }: PaymentPromptModalProps) => {
  
  // Load Razorpay script when the component mounts
  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const displayRazorpay = async () => {
    if (!formData) {
      toast.error("Form data missing. Please try submitting again.");
      onClose();
      return;
    }

    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!RAZORPAY_KEY_ID) {
      toast.error("Razorpay Key ID is missing. Please set VITE_RAZORPAY_KEY_ID in your .env file.");
      onClose();
      return;
    }

    // --- IMPORTANT: SERVER-SIDE INTEGRATION REQUIRED ---
    // In a real application, you must call your backend (e.g., a Netlify Function) 
    // here to securely create a Razorpay Order ID.
    
    // Mocking the API call response for the frontend structure:
    const mockOrderResponse = {
      order_id: 'order_mock_12345', // Replace with actual Order ID from backend
      amount: 9900, // Amount in paise (99 INR)
      currency: 'INR',
    };

    if (!window.Razorpay) {
      toast.error("Razorpay script failed to load. Please refresh.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID, // Use the checked Key ID
      amount: mockOrderResponse.amount,
      currency: mockOrderResponse.currency,
      name: "Unseen Lawyers Consultation",
      description: "Returning Client Consultation Fee",
      order_id: mockOrderResponse.order_id,
      handler: function (response: any) {
        // This handler is called on successful payment.
        // You MUST verify this payment on your backend using the response data (razorpay_payment_id, razorpay_order_id, razorpay_signature).
        toast.success("Payment successful! Verifying details...");
        console.log("Razorpay Response:", response);
        
        // Call the parent component's success handler
        onPay(); 
      },
      prefill: {
        // Prefill details from the contact form
        name: `${formData.firstName} ${formData.lastName}`, 
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#2563eb" // Primary color (Sapphire Blue)
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response: any) {
      toast.error(`Payment failed: ${response.error.description}`);
      console.error("Payment Failed:", response.error);
    });
    
    rzp1.open();
    onClose(); // Close the modal once the Razorpay window opens
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-secondary border-primary/20">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-gold" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-display text-foreground">
            Returning Client Consultation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            It looks like you've consulted with us before. To ensure dedicated time with our expert advocates, a small fee is required for subsequent requests.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="text-center text-4xl font-bold font-display text-gold">
            ₹99
          </div>
          <p className="text-sm text-muted-foreground text-center">
            This fee secures your dedicated consultation slot.
          </p>
          
          <Button
            onClick={displayRazorpay}
            className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-3 shadow-lg shadow-gold/20 group"
          >
            Pay ₹99 via Razorpay
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-muted-foreground hover:text-primary"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPromptModal;