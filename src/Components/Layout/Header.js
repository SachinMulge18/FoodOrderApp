import React from 'react'
import HeaderCartButton from './HeaderCartButton';
import styles from './Header.module.css'
import mealsImg from "../../assets/meals.jpg";
const Header = props => {
    return(
    <>
        <header className={styles.header}>
            <h1>FoodOrderApp</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImg} alt="table of meals" />
        </div>
    </>
    );
};

export default Header;