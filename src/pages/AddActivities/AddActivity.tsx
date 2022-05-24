import React, { useRef, useContext, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonButtons,
    IonMenuButton,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonToast,
    useIonToast,
    IonImg,
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import ActivitiesContext, { ActivityType } from '../../data/activities-context';
import { useHistory } from 'react-router-dom';
import usePhotoGallery from '../../hooks/usePhotoGallery';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { camera } from 'ionicons/icons';


const AddActivity: React.FC = () => {

    const [present, dismiss] = useIonToast();
  async function showActionMenu(path: string) {
    const result = await ActionSheet.showActions({
      title: path,
      message: 'Select an option to perform',
      options: [
        {
          title: 'cancel',
        },
        {
          title: 'Share',
        },
        {
          title: 'Remove',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });
    console.log('Action Sheet result:', result);
    console.log(result.index);

    if (result.index == 2) {
      deletePhoto(path);
      console.log("deleted");
    }

    present(result.index  + "", 3000);

  }

  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  console.log(photos);

    const history = useHistory();
    const activitiesCtxt = useContext(ActivitiesContext);

    const [toastMsg, setToastMsg] = useState<string>('');

    const titleInput = useRef<HTMLIonInputElement>(null);
    const descriptionInput = useRef<HTMLIonInputElement>(null);
    const activityTypeInput = useRef<HTMLIonSegmentElement>(null);

    const addActivity = () => {
        const title = titleInput.current?.value as string;
        const description = descriptionInput.current?.value as string;
        const activityType = activityTypeInput.current?.value as ActivityType;

        if (title && description && activityType) {
            activitiesCtxt.addActivity(title, description, activityType);
            setToastMsg('The activity has been saved!');
            history.replace('/all-activities');
        }
    };

    return (
        <React.Fragment>

            <IonToast isOpen={!!toastMsg} message={toastMsg} duration={4000} color="medium" onDidDismiss={() => setToastMsg('')}/>

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Add activity</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol className='ion-text-center'>
                                <IonSegment ref={activityTypeInput}>
                                    <IonSegmentButton value='work'>
                                        <IonLabel>Work</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value='rest'>
                                        <IonLabel>Rest</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value='hobby'>
                                        <IonLabel>Hobby</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position='floating'>
                                        Actividad
                                    </IonLabel>
                                    <IonInput ref={titleInput} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position='floating'>
                                        Descripcion
                                    </IonLabel>
                                    <IonInput ref={descriptionInput} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='ion-text-center ion-margin-top'>
                                <IonButton expand='block' fill='outline' onClick={addActivity}>
                                    Add activity
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            {photos.map((photo, index) => (
                                <IonCol size="6" key={index}>
                                    <IonImg onClick={() => showActionMenu(photo.filepath)} src={photo.webviewPath} />
                                </IonCol>
                        ))}
                        </IonRow>
                    </IonGrid>
                    <IonFab vertical='bottom' horizontal='center' slot='fixed'>
                        <IonFabButton onClick={() => takePhoto()}>
                            <IonIcon icon={camera}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AddActivity;