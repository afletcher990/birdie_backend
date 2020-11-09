import * as express from "express";
import Queries from "../data/queries";

export const visitApi = express.Router();

visitApi.get('/getAllData', async(_, res) => {
    try {
        res.json(await Queries.getAllData());
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getEventTypes', async(_, res) => {
    try {
        res.json(await Queries.getEventTypes());
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getVisitIds', async(_, res) => {
    try {
        res.json(await Queries.getVisitIds());
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getCaregivers', async(_, res) => {
    try {
        res.json(await Queries.getCaregivers());
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getCareRecipients', async(_, res) => {
    try {
        res.json(await Queries.getCareRecipients());
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getDatesWithVisits', async(_, res) => {
    try {
        res.json(await Queries.getDatesWithVisits());
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getDailyEvents', async(req, res) => {
    try {
        if (!req.query || !req.query.date || !req.query.careRecipientId) {
            res.status(406).send("Missing parameters. date and careRecipientId are mandatory");
            return;
        }
        const date: string = (req.query as {date: string}).date;
        const careRecipientId: string = (req.query as {careRecipientId: string}).careRecipientId;
        res.json(await Queries.getDailyEvents(date, careRecipientId));
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});

visitApi.get('/getVisitDetails', async(req, res) => {
    try {
        if (!req.query || !req.query.visitId) {
            res.status(406).send("No visitId specified");
            return;
        }
        const visitId: string = (req.query as {visitId: string}).visitId;
        res.json(await Queries.getVisitDetails(visitId));
    } catch(err) {
        res.status(503).send("Database unavailable");
    }
});
