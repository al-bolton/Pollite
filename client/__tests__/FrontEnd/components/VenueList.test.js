import { render, screen } from '@testing-library/react';
import VenueList from 'components/VenueList/VenueList';

describe('VenueList', () => {
  const venueMocks = [
    {
      "_id": "61f15338f1058b655c1fb9fd",
      "name": "Italiano",
      "latitude": 19.39,
      "longitude": 19.45,
      "imgUrl": "exampleURL",
      "rating": "No 1 of 623 restaurants",
      "num_reviews": 600,
      "price_level": "$$",
      "ranking": "No 1 of 623 restaurants",
      "cuisine": [
        "Italian",
        "Examplese",
        "Worldly"
      ],
      "votes": 0,
      "__v": 0
    },
    {
      "_id": "61f15338f1058b655c1fb9fe",
      "name": "Francois",
      "latitude": 20.21,
      "longitude": 22.23,
      "imgUrl": "exampleURL",
      "rating": "No 1 of 623 restaurants",
      "num_reviews": 600,
      "price_level": "$$",
      "ranking": "No 1 of 623 restaurants",
      "cuisine": [
        "Italian",
        "Examplese",
        "Worldly"
      ],
      "votes": 0,
      "__v": 0
    }
  ];

  it('should render loading spinner when still loading', () => {
    render(<VenueList venues={venueMocks} addRemoveVenue={jest.fn()} isLoading={true} />);
    const spinnerElement = screen.getByTestId(/loading-spinner/i)
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should render venues when finished loading', () => {
    render(<VenueList venues={venueMocks} addRemoveVenue={jest.fn()} isLoading={false} />);

    const spinnerElement = screen.queryByTestId(/loading-spinner/i)
    expect(spinnerElement).not.toBeInTheDocument();

    const venueElements = screen.getAllByTestId(/venue-card/i);
    expect(venueElements.length).toBeGreaterThan(0);
  });

  it('should render the correct amount of venues when finished loading', () => {
    render(<VenueList venues={venueMocks} addRemoveVenue={jest.fn()} isLoading={false} />);

    const venueElements = screen.getAllByTestId(/venue-card/i);
    expect(venueElements).toHaveLength(2);
  });
})