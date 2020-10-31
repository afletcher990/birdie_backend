import queries from "./queries";
import { Caregiver } from './types';

export default class FakeData {
    // These names should really come from a separate table in the main database, but as there is no table
    // these are random generated names so we can get a user friendly name
    public static CareRecipients = [
        "Keri Wolf",
        "Zahra Povey",
        "Montana Dickens",
    ];

    public static CareGivers = [
        "Rex Terry",
        "Sherlyn Montgomery",
        "Kendra Stewart",
        "Karlie Dorsey",
        "Lilah Sullivan",
        "Ariel Douglas",
        "Kristian Arroyo",
        "Porter Noble",
        "Jeffery Andrade",
        "Haley Howard",
        "Clark Haynes",
        "Odin Barnett",
        "Rahim Kavanagh",
        "Kornelia Preece",
        "Jake Figueroa",
        "Usaamah Skinner",
        "Adelle Conway",
        "Skyla Cresswell",
        "Alexis Nelson",
        "Harry Black",
        "Clare Travis",
        "Aisling Wiley",
        "Aryan Mora",
        "Elisha Reeves",
        "Lewis Duffy",
        "Chris Anthony",
        "Pamela Buckner",
        "Asiyah Tanner",
        "Riley-Jay Williams",
        "Gregor Henson",
        "Gerald Hunter",
        "Ella-May Ali",
        "Reo Fuentes",
        "Neal Corbett",
        "Bianca Lister",
        "Yuvraj Rivers",
        "Johnathan Cullen",
        "Shakeel Robles",
        "Rylan Charles",
        "Humaira Hays",
        "Chandni Parry",
        "Matylda Andrade",
        "Isma Osborne",
        "Katelin Cook"
    ];

    public static caregiversMap:Map<string, string> = new Map();

    public static async setupFakeData() {
        const results:Caregiver[] = await queries.getCaregivers();
        results.forEach(item => {
            FakeData.caregiversMap.set(item.caregiver_id, item.name)
        })
    }
}