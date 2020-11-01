import app from '../src/application'
import * as request from 'supertest';

describe('We are grateful to you for doing this it.', () => {
  it('thanks you', async () => {
    await request(app)
      .get('/hello')
      .expect(200)
      .expect(function(res) {
        expect(res.body.greetings).toContain('Thank you');
      });
  })
});

describe('Test get care recipient list', () => {
    it('getCareRecipients API', async (done) => {
        await request(app)
            .get('/getCareRecipients')
            .expect(200)
            .expect(function (res) {
                expect(res.body).toHaveLength(3);
                done();
            });
    })
});

describe('Test get carers list', () => {
    it('getCaregivers API', async (done) => {
        await request(app)
            .get('/getCaregivers')
            .expect(200)
            .expect(function (res) {
                expect(res.body[0].name).toBe("Rex Terry");
                expect(res.body[10].caregiver_id).toBe("35a0ccb6-9339-4c12-a7f5-35883ec002f6");
                done();
            });
    })
});

describe('Test daily events', () => {
    it('getDailyEvents - No params', async (done) => {
        await request(app)
            .get('/getDailyEvents')
            .expect(406) // should fail with no params
            done();
    })
    it('getDailyEvents - No date', async (done) => {
        await request(app)
            .get('/getDailyEvents/?careRecipientId=df50cac5-293c-490d-a06c-ee26796f850')
            .expect(406) // should fail with no date
        done();
    })
    it('getDailyEvents - No careRecipientId', async (done) => {
        await request(app)
            .get('/getDailyEvents/?date=2019-05-09')
            .expect(406) // should fail with no date
        done();
    })
    it('getDailyEvents - Good query params', async (done) => {
        await request(app)
            .get('/getDailyEvents/?date=2019-05-09&careRecipientId=df50cac5-293c-490d-a06c-ee26796f850d')
            .expect(200) // should work with both
            .expect(function (res) {
                expect(res.body).toHaveLength(105);
                expect(res.body[5].caregiver_id).toBe("49775586-020b-431d-9e84-614993670130");
                expect(res.body[10].visit_id).toBe("2ddc37a6-521f-11e9-b63f-06a80bfbb33e");
                done();
            });
    })
});
