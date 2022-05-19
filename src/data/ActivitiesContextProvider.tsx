import React, { useState } from 'react';
import ActivitiesContext, { Activity, ActivitiesContexModel, ActivityType } from './activities-context';

const ActivitiesContextProvider: React.FC = (props) => {

    const [activities, setActivities] = useState<Activity[]>([
        {
            id: Math.random().toString(),
            title: 'Mi hora de dormir',
            description: 'Dormir pronto después de un día atareado',
            hour: '23:00',
            activityType: 'rest',
            imageUrl: '/assets/images/7b12ec4cd131e2e87c3dcadfb1e2e723.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Hora de trabajo',
            description: 'Trabajar en los proyectos pendientes',
            hour: '9:00',
            activityType: 'work',
            imageUrl: '/assets/images/57401.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Hora de recreación',
            description: 'Distraerme un rato en cualquier cosa menos el telefono',
            hour: '19:00',
            activityType: 'hobby',
            imageUrl: '/assets/images/HQ-Spiderman-Wallpapers.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Aprender Ionic para movil 2',
            description: 'Aprender en un día todo :C',
            hour: '17:00',
            activityType: 'work',
            imageUrl: '/assets/images/spiderman-telaranas.jpg',
            isCompleted: false
        }
    ]);

    const addActivity = (title: string, description: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch(activityType) {
            case 'rest':
                imageUrl = '/assets/images/spiderman-telaranas.jpg';
                break;
                case 'hobby':
                    imageUrl = '/assets/images/spiderman-telaranas.jpg';
                    break;
                    case 'work':
                imageUrl = '/assets/images/spiderman-telaranas.jpg';
                break;
                default:
                imageUrl = '/assets/images/spiderman-telaranas.jpg';
                break;
        };

        const activityDate = new Date();
        const hour = activityDate.getHours() + ':' + activityDate.getMinutes();

        const addActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false
        };

        setActivities(currActivities => {
            return [...currActivities, addActivity]
        })
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};
            updatedActivities[selectedActivityIndex] = updatedActivity;
            return updatedActivities;
        });
    };

    const activitiesContext: ActivitiesContexModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};

export default ActivitiesContextProvider;