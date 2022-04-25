import React, { memo, useEffect } from "react";
import { addToast } from "../../services/actions/toast.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onSuccessfulCheckout } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";

const Pay = ({
  currencyFormatter,
  totalAmount,
  deleiveryAmount,
  data,
  counts,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const loadScript = (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.integrity =
      "sha384-GAdNOhResEX9ACZZqU2hBnD03IV4Ic/IzhsS2ToFvEpkwIcrNEHrlc914Hfn4KoQ";
    script.crossOrigin = "anonymous";
    return script;
  };

  const handlePayment = async (amount_in_paisa, email, contact, address) => {
    const amount = amount_in_paisa * 100;
    const options = {
      name: "Buddyshop",
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount,
      handler: async (response) => {
        const values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: amount,
        };
        const transaction = await axios.post("/user/checkout/payment", {
          data,
          counts,
          address,
          values,
        });
        if (!transaction?.data?.error) {
          navigate("/");
          dispatch(onSuccessfulCheckout());
        }
      },
      prefill: {
        email: email,
        contact: contact,
      },
      theme: {
        color: "#458abf",
      },
    };

    const order = await axios.post("/user/checkout/order", {
      amount,
    });
    options.order_id = order.data.data.id;
    options.amount = order.data.data.amount;
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", () => {
      dispatch(addToast({ message: "Payment unseccessful", color: "danger" }));
    });
  };

  useEffect(() => {
    const script = loadScript("https://checkout.razorpay.com/v1/checkout.js");
    document.body.appendChild(script);
    script.onerror = () => {
      dispatch(
        addToast({
          message: "Error loading razorpay payment script",
          color: "danger",
        })
      );
    };

    return () => {
      // script && document.body.removeChild(script);
      // const elements = document.getElementsByClassName("razorpay-container");
      // while (elements.length > 0) {
      //   document.body.removeChild(elements[0]);
      // }
    };
  });

  const checkoutHandler = async () => {
    const getIndex = () => {
      const isSelected = document.getElementsByName("isSelectedAddress");
      if (!isSelected) return -1;
      for (let index = 0; index < isSelected.length; index++) {
        if (isSelected[index].checked) return index;
      }
      return -1;
    };

    const address = getIndex();
    if (address === -1)
      dispatch(addToast({ message: "Please add an address first!" }));
    else {
      await handlePayment(
        totalAmount + deleiveryAmount,
        user?.email,
        user?.address[address]?.phone[0],
        user?.address[address]
      );
    }
  };

  return (
    <button onClick={checkoutHandler}>
      Pay {currencyFormatter(totalAmount + deleiveryAmount)}
    </button>
  );
};

export default memo(Pay);
