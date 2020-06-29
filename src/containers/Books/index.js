import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { setDataPerPage, updatePage } from '../../store/actions/books';
import FilterInput from '../../components/FilterInput';
import ResponsiveTable from '../../components/ResponsiveTable';
import './styles.scss';

const headers = {
  "id": "id",
  "book_author": "Author",
  "book_title": "Title",
  "book_publication_year": "Year",
  "book_publication_country": "Country",
  "book_publication_city": "City",
  "book_pages": "Pages"
}

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: []
    }
    this.setPageOnLoad();    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.page !== prevProps.page || this.state.filters !== prevState.filters) {
      this.fetchData();
    }
  }

  setPageOnLoad = () => {
    const { match, updatePage } = this.props;
    if (match.params['page']) {
      const pageNumber = match.params['page'].split('=')
      updatePage(Number(pageNumber[1]))
    } else {
      updatePage(1);
    }
  }
  onFilterInputChanged = (filters) => {
    this.setState({
      filters
    });
  }

  fetchData = () => {
    const { page, itemsPerPage, setDataPerPage } = this.props;
    const params = { page, itemsPerPage };
    const { filters } = this.state;
    if (Object.values(filters).length > 0) {
      params['page'] = 1;
      params['filters'] = filters;
    }

    axios
      .post('http://nyx.vima.ekt.gr:3000/api/books', params)
      .then((res) => {
        setDataPerPage(
          {
            page,
            data: res.data
          }
        )
      })
  }

  handlePageChange = (e, value) => {
    this.props.updatePage(value);
    window.history.pushState('', null, `?page=${value}`);
  }

  render() {
    const { page, dataPerPage, count, itemsPerPage } = this.props;
    const totalPages = Math.ceil(Number(count)/Number(itemsPerPage)) || 0;

    return (
      <div className="books">
        <FilterInput onChange={this.onFilterInputChanged} />
        <ResponsiveTable headers={headers} tableData={dataPerPage[page] || []} />
        <Pagination count={totalPages} page={page} onChange={this.handlePageChange} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  page: state.books.page,
  itemsPerPage: state.books.itemsPerPage,
  dataPerPage: state.books.dataPerPage,
  count: state.books.count
})

const mapDispatchToProps = dispatch => ({
  setDataPerPage: param => dispatch(setDataPerPage(param)),
  updatePage: param => dispatch(updatePage(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Books));

Books.propTypes = {
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  dataPerPage: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  setDataPerPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired
}
