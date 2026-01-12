import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DollarSign, ArrowRight } from 'lucide-react';

interface PaymentPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
}

const PaymentPromptModal: React.FC<PaymentPromptModalProps> = ({ isOpen, onClose, onPay }) => {
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
            onClick={onPay}
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