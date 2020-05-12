import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    bacon: 0.7,
    meat: 1.2
};

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 10,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const updatedPrice = INGEDIENT_PRICES[type] + oldPrice;
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) =>{
     const oldCount = this.state.ingredients[type];
     if(oldCount > 0){
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGEDIENT_PRICES[type];

        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
     }
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Order placed!')
    }
    //  130. Calculating the Ingredient Sum -- completed
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice} />
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                    ingredientsAdded = {this.addIngredientHandler}
                    ingredientsRemoved = {this.removeIngredientHandler}
                    disabled = { disabledInfo }
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler} />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;