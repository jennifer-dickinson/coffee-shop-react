import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import CoffeeShopContainer from '../components/CoffeeShopContainer';
import './CoffeeShop.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Coffee Shop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">The Coffee Shop</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CoffeeShopContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
