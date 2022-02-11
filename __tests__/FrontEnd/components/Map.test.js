import { render, screen, fireEvent } from '@testing-library/react';
import Map from 'components/Map/Map';

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
const selectedVenueMocks = [
  {
    "_id": "61f15338f1058b655c1fb9fd",
    "name": "Celtics",
    "latitude": 19.39,
    "longitude": 19.45,
    "imgUrl": "exampleURL",
    "rating": "No 1 of 664 restaurants",
    "num_reviews": 600,
    "price_level": "$$",
    "ranking": "No 1 of 664 restaurants",
    "cuisine": [
      "Irish",
      "Examplese",
      "Worldly"
    ],
    "votes": 0,
    "__v": 0
  },
  {
    "_id": "61f15338f1058b655c1fb9fe",
    "name": "Anglophiles",
    "latitude": 20.21,
    "longitude": 22.23,
    "imgUrl": "exampleURL",
    "rating": "No 1 of 664 restaurants",
    "num_reviews": 600,
    "price_level": "$$",
    "ranking": "No 1 of 664 restaurants",
    "cuisine": [
      "British",
      "Examplese",
      "Worldly"
    ],
    "votes": 0,
    "__v": 0
  }
];
const coordinateMocks = {
  lat: 51.50664715370115,
  lng: -0.12668398689018545
}
const mockSelectFn = jest.fn();

const mockMap = <Map
  setCoordinates={jest.fn()}
  coordinates={coordinateMocks}
  setBounds={jest.fn()}
  venues={venueMocks}
  selectedVenues={selectedVenueMocks}
  addRemoveVenue={mockSelectFn}
/>

describe('Map', () => {
  it('should render a Google Maps component', () => {
    render(mockMap);
    const mapElement = screen.getByTestId(/map-container/i);
    expect(mapElement).toBeInTheDocument();
  });

  it('should render venue markers for each venue', () => {
    render(mockMap);
    const mapElement = screen.getAllByAltText(/Image for/i);
    expect(mapElement).toHaveLength(venueMocks.length + selectedVenueMocks.length);
  });

  it('should render the correct amount of venue markers for selected and non-selected venues', () => {
    render(mockMap);

    const nonSelectedMarkers = screen.getAllByTestId(/venue-marker-selected:false/);
    expect(nonSelectedMarkers).toHaveLength(venueMocks.length);

    const selectedMarkers = screen.getAllByTestId(/venue-marker-selected:true/);
    expect(selectedMarkers).toHaveLength(selectedVenueMocks.length);
  });

  it('should call the addRemoveVenue function when either a non-selected or selected venue is clicked', () => {
    render(mockMap);
    const nonSelectedMarkers = screen.getAllByTestId(/venue-marker-selected:false/);
    fireEvent.click(nonSelectedMarkers[0]);
    expect(mockSelectFn.mock.calls.length).toBe(1);

    const selectedMarkers = screen.getAllByTestId(/venue-marker-selected:true/);
    fireEvent.click(selectedMarkers[0]);
    expect(mockSelectFn.mock.calls.length).toBe(2);
  });
});