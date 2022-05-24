import React, { useContext, useState } from 'react';
import {  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonMenuButton, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonButton, IonModal, IonIcon, useIonToast, IonToast, IonAlert } from '@ionic/react';
import ActivitiesContext, { Activity } from '../../data/activities-context';
import classes from './AllActivities.module.css';
import CompleteModalActivity from '../../components/CompleteActivityModal';
import { checkmarkOutline, informationCircle, star } from 'ionicons/icons';

const AllActivities: React.FC = () => {
    
    const [showToast1, setShowToast1] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);

    const [activityToComplete, setActivityToComplete] = useState<Activity>();

    const activitiesCtxt = useContext(ActivitiesContext);

    const openCompleteModal = (activity: Activity) => {
        setActivityToComplete(activity);
    };

    const closeModal = () => {
        setActivityToComplete(undefined);
    };

    return (
        <React.Fragment>
            <IonModal isOpen={!!activityToComplete}>
                <CompleteModalActivity activity={activityToComplete as Activity} dismissModal={closeModal}/>
            </IonModal>

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>All activities</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        { activitiesCtxt.activities.map(activity => (
                        <IonRow key={activity.id}>
                            <IonCol className="ion-text-center">
                                <IonCard>
                                    <img src={activity.imageUrl} alt="Activity"/>
                                    <IonCardHeader>
                                        <IonCardSubtitle>{activity.hour}</IonCardSubtitle>
                                        <IonCardTitle>{activity.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{activity.description}</p>
                                        <IonItem lines="none">
                                            { !activity.isCompleted ?
                                            <IonButton
                                                className={classes.CenterElement}
                                                fill="clear"
                                                onClick={() => openCompleteModal(activity)}>
                                                Complete Activity
                                            </IonButton>
                                            :
                                            <IonIcon color="success" className={classes.CenterElement} icon={checkmarkOutline} />
                                            }
                                            <IonButton onClick={() => setShowToast1(true)} expand="block">Frase motivadora</IonButton>
                                            <IonToast
                                                isOpen={showToast1}
                                                onDidDismiss={() => setShowToast1(false)}
                                                message="Al final todo va a estar bien y si no esta bien entonces no es el final"
                                                duration={1000}
                                            />

                                            <IonButton onClick={() => setShowAlert1(true)} expand="block">Alerta</IonButton>
                                            <IonAlert
                                                isOpen={showAlert1}
                                                onDidDismiss={() => setShowAlert1(false)}
                                                cssClass='my-custom-class'
                                                header={'Alert'}
                                                subHeader={'Actividad'}
                                                message={'La actividad no se ha completado'}
                                                buttons={['Terminar', 'Cancelar']}
                                            />
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        ))
                        }
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AllActivities;