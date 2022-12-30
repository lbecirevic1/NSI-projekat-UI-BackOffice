export class AnnouncementHandler {
    constructor(
        public id: number,
        public identifier: string,
        public subscriptionIdentifier: string,
        public subscriberIdentifier: string,
        public subscriptionEntryIdentifier: string,
        public lastTimeNotified: Date,
        public numberOfSentAnnouncements: number,
        public createDate: Date,
        public modiifiedDate: Date
    ) { }
}

export interface IAnnouncementHandler {
    id: number,
    identifier: string,
    subscriptionIdentifier: string,
    subscriberIdentifier: string,
    subscriptionEntryIdentifier: string,
    lastTimeNotified: string,
    numberOfSentAnnouncements: number,
    createDate: string,
    modifiedDate: string
}