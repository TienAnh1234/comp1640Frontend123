import { Major } from "./major";

export class Student {

    constructor(
        public id?: number,
        public realName?: string,
        public email?: string,
        public birtday?: Date,
        public imageUrl?: string,
        public major?: Major,

    ){}

}
