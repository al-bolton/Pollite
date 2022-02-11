import { createMocks } from 'node-mocks-http';
import 'regenerator-runtime/runtime';
import createPoll from 'pages/api/polls/create';
import mongoose from 'mongoose';
import Poll from 'data/models/poll.model.ts';
import DateChoiceModel from 'data/models/dateChoice.model.ts';
import VenueModel from 'data/models/venue.model.ts';

const dbName = 'polliteTest';

describe('/api/polls/create', () => {
  const newPollDetails = {
    "title": "Howdy, I'm a poll here",
    "dates": ["11/09/2021", "16/10/2022"],
    "venues": [
      {
        "name": "Italiano",
        "latitude": 19.39,
        "longitude": 19.45,
        "imgUrl": "exampleURL",
        "rating": "No 1 of 623 restaurants",
        "num_reviews": 600,
        "price_level": "$$",
        "ranking": "No 1 of 623 restaurants",
        "cuisine": [
          "Italian", "Examplese", "Worldly"
        ]
      },
      {
        "name": "Francois",
        "latitude": 20.21,
        "longitude": 22.23,
        "imgUrl": "exampleURL",
        "rating": "No 1 of 623 restaurants",
        "num_reviews": 600,
        "price_level": "$$",
        "ranking": "No 1 of 623 restaurants",
        "cuisine": [
          "Italian", "Examplese", "Worldly",
        ]
      }
    ]
  };

  afterEach(async () => {
    await Poll.deleteMany();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it('should establish a database connection and return the appropriate response code', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: { ContentType: 'application/json' },
      body: newPollDetails,
    });

    await createPoll(req, res);

    expect(res._getStatusCode()).toBe(201);
  });

  it('should create a new poll in the database with the provided details', async () => {
    // Send poll to be created
    const { req, res } = createMocks({
      method: 'GET',
      headers: { ContentType: 'application/json' },
      body: newPollDetails,
    });
    await createPoll(req, res);

    const dbPoll = await Poll.findOne({ title: newPollDetails.title })
      .populate({ path: 'dates', model: DateChoiceModel })
      .populate({ path: 'venues', model: VenueModel });;

    // Check poll title
    expect(dbPoll.title).toEqual(newPollDetails.title);

    // Check poll dates
    expect(dbPoll.dates.map(date => date.dateString)).toEqual(newPollDetails.dates)

    // Check poll venues
    for (let i = 0; i < dbPoll.venues.length; i++) {
      expect(dbPoll.venues[i]).toMatchObject(newPollDetails.venues[i])
    }
  });

  it('should return the relevant poll code when a poll is created', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: { ContentType: 'application/json' },
      body: newPollDetails,
    });
    await createPoll(req, res);
    const pollCode = JSON.parse(res._getData()).code;

    const dbPoll = await Poll.findOne({ linkCode: pollCode });
    expect(dbPoll).not.toBeNull();
  })
})