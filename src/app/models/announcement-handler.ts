export class AnnouncemenetHandler {
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