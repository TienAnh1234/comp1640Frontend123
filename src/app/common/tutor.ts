import { Major } from "./major";

export class Tutor {

    constructor(
        public id: number,
        public realName: string,
        public gmail: string,
        public birtday: Date,
        public imageUrl :string,
        public major :Major
    ){}


}
