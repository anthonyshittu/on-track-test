import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Books from '../containers/Books';
import data from './data.json';

const mockStore = configureStore();

describe('Books Container', () => {
  it('should render table', () => {
    const mockSetDataPerPage = jest.fn();
    const mockUpdatePage = jest.fn();
    const store = mockStore({
      books: {
        page: 1,
        itemsPerPage: 20,
        dataPerPage: {1: data},
        count: 2425
      }
    });
    const component = mount(
      <Provider store={store}>
        <Router>
          <Books setDataPerPage={mockSetDataPerPage} updatePage={mockUpdatePage} />
        </Router>
      </Provider>
    );
    expect(component.find('.table__loading').length).toBe(0);
    expect(component.find('tr').length).toBe(21);
    expect(component.find('ul').length).toBe(1);
    expect(component.find('li').length).toBe(9);
    expect(component.find('button').at(6).props()["aria-label"]).toBe('Go to page 122');
  });
});
