import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const cartId = searchParams.get("cartId");

    useEffect(() => {
        if (orderId && cartId) {
            axios.get(`http://localhost:8083/payment/success?orderId=${orderId}&cartId=${cartId}`)
                .then(() => {
                    toast.success("Payment successful & cart cleared!");
                })
                .catch(() => {
                    toast.error("Something went wrong while clearing cart!");
                });
        }
    }, [orderId, cartId]);

    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p>Your order has been placed and your cart is now empty.</p>
        </div>
    );
};

export default PaymentSuccess;