// src/utils/payment.ts
import { useCreateOrderMutation, useVerifyPaymentMutation } from "@/ReduxStore/features/api/transection";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}

export function useCoursePayment() {
  const [createOrder , { isLoading:orderCreating }] = useCreateOrderMutation();
  const [verifyPayment , { isLoading:paymentVerifying }] = useVerifyPaymentMutation();

  async function startCoursePayment(
    userId: string,
    courseId: string,
    amount: number // rupees
  ) {
    try {
      await loadRazorpayScript();

      // 1) Create order in backend (returns Razorpay order + public key)
      const order = await createOrder({ userId, courseId, amount }).unwrap();

      // 2) Open Razorpay Checkout
      const rzp = new window.Razorpay({
        key: order.key_id,          // prefer backend-provided key_id
        amount: order.amount,       // paise
        currency: order.currency,   // 'INR'
        name: "Course Purchase",
        description: "Access to the selected course",
        order_id: order.id,         // Razorpay order id
        notes: { userId, courseId },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const result = await verifyPayment({
              userId,
              courseId,
              amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            if (result.status === "success") {
              alert("✅ Payment Successful! Course unlocked.");
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (e) {
            console.error("Verification error:", e);
            alert("❌ Payment verification failed.");
          }
        },
        method: { upi: true, card: false, netbanking: false, wallet: false },
        theme: { color: "#3B82F6" },
      });

      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
      alert("Unable to initiate payment. Please try again.");
    }
  }

  return { startCoursePayment, orderCreating, paymentVerifying  };
}
