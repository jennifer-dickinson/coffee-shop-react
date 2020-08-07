import React, { Props, Component } from 'react';
import './CoffeeShopContainer.css';
import { IonCard, IonCardHeader, IonTitle, IonItem, IonButton, IonText} from '@ionic/react';

interface ContainerProps {

}

class Drink {
    name: string = '';
    time: number = 0;

    constructor (name: string, time: number) {
        this.name = name;
        this.time = time;
    }
}

export default class CoffeeShopContainer extends Component {

    state: any;

    constructor (props: Props<any>) {
        super(props);
        this.state = {
            drinkQueue: [],
            baristaDrink: null,
            coffeeCounter: null,
        };
    }

    addToQeueue(name: string, time: number) {
        this.state.drinkQueue.push(new Drink(name, time));
        console.log(this.state.drinkQueue);
        this.doBusiness();
    }

    doBusiness() {
        if (this.state.drinkQueue.length > 0 && this.state.coffeeCounter == null && this.state.baristaDrink == null) {
            this.state.baristaDrink = this.state.drinkQueue.shift();
            this.prepareDrink();
        }
        this.setState({state: this.state});
    }

    prepareDrink() {
        setTimeout( () => {
            this.state.coffeeCounter = this.state.baristaDrink;
            this.state.baristaDrink  = null;
            this.setState({ state : this.state});
            this.placeOnCounter();
        }, this.state.baristaDrink.time * 1000)
    }

    placeOnCounter() {
        setTimeout( () => {
            this.state.coffeeCounter = null;
            this.doBusiness();
        }, 3000);
    }

    render() {
        return (
            <div>
                <IonCard>
                    <IonCardHeader>
                        <IonTitle>The Menu</IonTitle>
                    </IonCardHeader>
                    <IonItem>
                        <IonButton onClick={() => this.addToQeueue("Espresso", 4)}>Espresso</IonButton>
                        <IonText slot="end">4 seconds</IonText>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={() => this.addToQeueue("Latte", 10)}>Latte</IonButton>
                        <IonText slot="end">10 seconds</IonText>
        
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={() => this.addToQeueue("Cappuccino", 15)}>Cappuccino</IonButton>
                        <IonText slot="end">15 seconds</IonText>
                    </IonItem>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonTitle>The Counter</IonTitle>
                        <DrinkItem drink={this.state.coffeeCounter} msg={"Nothing on the counter."}></DrinkItem>
                    </IonCardHeader>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonTitle>The Barista</IonTitle>
                        <DrinkItem drink={this.state.baristaDrink} msg={"Barista currently not making anything."}></DrinkItem>
                    </IonCardHeader>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonTitle>The Queue</IonTitle>
                        <QueueGenerator drinks={this.state.drinkQueue}></QueueGenerator>
                    </IonCardHeader>
                </IonCard>
            </div>
        )
    }


}

function QueueGenerator(props: {drinks: Drink[]}): JSX.Element {
   if (props.drinks.length === 0) {
       return ( 
        <IonItem>
            <IonText> Empty. </IonText>
        </IonItem>
       )
   }
   let counter = 0;
   return (
       <div>
           { props.drinks.map(drink => {
                return (<IonItem key={counter++}>{ drink.name } - { drink.time }</IonItem>)
           }) }
       </div>
   )
}

function DrinkItem(props: { drink: Drink; msg: string;}): JSX.Element {
    if (props.drink) {
        return (
            <IonItem>
                <IonText> {props.drink.name} {props.drink.time} </IonText>
            </IonItem>
        )
    } else {
        return (
            <IonItem>
                <IonText> {props.msg} </IonText>
            </IonItem>
        )
    }
}