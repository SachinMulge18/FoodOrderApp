import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CartContext from "../../store/Cart-Context";
import CheckOut from "./CheckOut";

//  <li key={item.id}>{item.name}</li>)}

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `₹ ${cartCtx[0].totalAmount.toFixed(2)}`;
  const hasItems = cartCtx[0].items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx[0].removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx[0].addItem({ ...item, amount: 1 });
  };

  const orederHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-b82d6-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx[0].items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx[0].ClearCart();
    console.log(userData, "@@@@@@");
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx[0].items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orederHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModelContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amt </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  const isSubmittingModalContent = <p>Sending Order Data.</p>;
  const didSubmitModalContent = (
    <>
      <p>Succesfully Sent The Order.</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal>
      {!isSubmitting && !didSubmit && cartModelContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
