import React from "react";

export type ActivityType = 'rest' | 'work' | 'hobby';

export interface Activity{
    id: string;
    title: string;
    description: string;
    hour: string;
    activityType: ActivityType;
    imageUrl: string;
    isCompleted: boolean;
}

export interface ActivitiesContexModel{
    activities: Activity[];
    addActivity: (tittle: string, description: string, activityType: ActivityType) => void;
    completeActivity: (activityId: string) => void;
}

const ActivitiesContext = React.createContext<ActivitiesContexModel>({
    activities: [],
    addActivity: () => {},
    completeActivity: () => {}
});

export default ActivitiesContext;