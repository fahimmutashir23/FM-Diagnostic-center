import { Box, Button, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../Utils/Loading/Loading";
import moment from "moment/moment";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({discountPrice, id, testName, refetch}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [payment, setPayment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const date = moment().format("YYYY-MM-DD, h:mm a");
  
  

   if(!discountPrice){
    return
   }

   axiosSecure.post('/payment-intent', {price : discountPrice})
   .then(res => {
    setClientSecret(res.data.clientSecret)
   })

  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMsg("Something went wrong, Please submit valid information");
    } else {
      console.log("success", paymentMethod);
    }

    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      }
    );

    if (cardError) {
      setErrorMsg("Something went wrong, Please submit valid information");
    } 
    else{
  
      if(paymentIntent.status === "succeeded") {
        setPayment(paymentIntent.id);
        
        setLoading(false);
        setErrorMsg(" ");
        axiosSecure.put(`/tests/${id}?slot=1`)
        .then(() => {
          refetch()
        })

        const paymentInfo = {
          name : user?.displayName,
          email : user?.email,
          date : date,
          transactionID : paymentIntent.id,
          testName : testName,
          amount: discountPrice,
          status: 'pending'
        }
        
        axiosSecure.post('/payments', paymentInfo)
        .then(() => { })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Payment has been Succeeded",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Box>
      <Box component={"form"} onSubmit={handlePayment}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "black",
                "::placeholder": {
                  color: "#595959",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 6 }}
          >
            {loading ? (
              <Loading color="#fafdfb" height="25" width="25"></Loading>
            ) : (
              "Pay"
            )}
          </Button>
      </Box>
      <Typography>{errorMsg}</Typography>
      <Typography sx={{mt: 2, fontSize: "16px"}}>Transaction_ID : {payment}</Typography>
    </Box>
  );
};

export default CheckoutForm;
