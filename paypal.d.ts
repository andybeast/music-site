// paypal.d.ts
interface PayPalOrderData {
    purchase_units: Array<{
      amount: {
        value: string;
      };
    }>;
  }
  
  interface PayPalOrderActions {
    create: (data: PayPalOrderData) => Promise<string>;
    capture: () => Promise<any>;
  }
  
  interface PayPalActions {
    order: PayPalOrderActions;
  }
  
  interface PayPalButtonProps {
    createOrder: (data: any, actions: PayPalActions) => Promise<string>;
    onApprove: (data: any, actions: PayPalActions) => Promise<void>;
  }
  
  interface PayPalButtons {
    render: (selector: string) => void;
  }
  
  interface PayPal {
    Buttons: (props: PayPalButtonProps) => PayPalButtons;
  }
  
  interface Window {
    paypal: PayPal;
  }