// tslint:disable-next-line:no-submodule-imports
import * as mysql from 'mysql2/promise';
import FakeData from './fakeData';
import { Caregiver } from './types';

export default class Queries {

    public static async getAllData() {
        const results = await Queries.pool.query(`SELECT * FROM events`);
        return results[0];
    }

    public static async getEventTypes() {
        const results = await Queries.pool.query(`SELECT DISTINCT event_type FROM events`);
        return results[0];
    }

    public static async getVisitIds() {
        const results = await Queries.pool.query(`SELECT DISTINCT visit_id FROM events WHERE visit_id IS NOT NULL`);
        return results[0];
    }

    public static async getCaregivers() {
        const results = await Queries.pool.query(`SELECT DISTINCT caregiver_id FROM events WHERE caregiver_id IS NOT NULL`);
        const res: Caregiver[] = [];
        for (let i = 0; i < (results[0] as any).length; i++) {
            res.push({
                caregiver_id: (results[0] as any)[i].caregiver_id,
                name: FakeData.CareGivers[i % FakeData.CareGivers.length]
            });
        }
        return res;
    }

    public static async getCareRecipients() {
        const results = await Queries.pool.query(`SELECT DISTINCT care_recipient_id FROM events`);
        const res = results[0] as [];
        for (let i = 0; i < res.length; i++) {
            (res[i] as any).name = FakeData.CareRecipients[i % FakeData.CareRecipients.length];
        }
        return res;
    }

    public static async getDailyEvents(date: string, careRecipientId: string) {
        const results = await Queries.pool.query(`SELECT visit_id, caregiver_id, timestamp, event_type, payload FROM events WHERE 
            DATE(timestamp)='${date}' AND care_recipient_id='${careRecipientId}' ORDER BY timestamp`);
        const res = results[0] as [];
        res.forEach(item => {
            (item as any).caregiver_name = FakeData.caregiversMap.get((item as any).caregiver_id);
        });
        return res;
    }

    public static async getDatesWithVisits() {
        const results = await Queries.pool.query(`SELECT DISTINCT (DATE(timestamp)) as date FROM events ORDER BY date`);
        return results[0];
    }

    public static async getVisitDetails(visitId: string) {
        const results = await Queries.pool.query(`SELECT * FROM events WHERE visit_id='${visitId}' ORDER BY timestamp`);
        return results[0];
    }

    private static pool = mysql.createPool({
        host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
        port: 3306,
        user: "test-read",
        // tslint:disable-next-line:object-literal-sort-keys
        password: "xnxPp6QfZbCYkY8",
        database: "birdietest"
    });
}
