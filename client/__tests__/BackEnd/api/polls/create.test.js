import { createMocks } from 'node-mocks-http';
import 'regenerator-runtime/runtime';
import createPoll from 'pages/api/polls/create';
import mongoose from 'mongoose';

const dbName = 'polliteTest';

describe('/api/polls/create', () => {
  const newPollDetails = {
    "title": "Howdy, I'm a poll here",
    "dates": ["11/09/2021", "16/10/2022"],
    "venues": [
      {
        "name": "Italiano",
        "latitude": "19.39",
        "longitude": "19.45",
        "imgUrl": "exampleURL",
        "rating": "No 1 of 623 restaurants",
        "num_reviews": "600",
        "price_level": "$$",
        "ranking": "No 1 of 623 restaurants",
        "cuisine": [
          "Italian", "Examplese", "Worldly"
        ]
      },
      {
        "name": "Francois",
        "latitude": "20.21",
        "longitude": "22.23",
        "imgUrl": "exampleURL",
        "rating": "No 1 of 623 restaurants",
        "num_reviews": "600",
        "price_level": "$$",
        "ranking": "No 1 of 623 restaurants",
        "cuisine": [
          "Italian", "Examplese", "Worldly",
        ]
      }
    ]
  };

  afterEach(() => {
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
})