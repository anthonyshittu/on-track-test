import React from 'react';
import { mount } from 'enzyme';
import ResponsiveTable from '../components/ResponsiveTable';
import data from './data.json'

const headers = {
  "id": "id",
  "book_author": "Author",
  "book_title": "Title",
  "book_publication_year": "Year",
  "book_publication_country": "Country",
  "book_publication_city": "City",
  "book_pages": "Pages"
}

describe('Responsive Table', () => {
  it('should render empty table and show the loading', () => {
    const component = mount(
      <ResponsiveTable headers={{}} tableData={[]} />
    );
    expect(component.find('.table__loading').length).toBe(1);
  });
  it('should render 20 row', () => {
    const component = mount(
      <ResponsiveTable headers={headers} tableData={data} />
    );
    expect(component.find('.table__loading').length).toBe(0);
    expect(component.find('tr').length).toBe(21);
  });
});
