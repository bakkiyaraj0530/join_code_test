/*
 * Search Case incident page
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import styled from 'styled-components';
// import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import List from 'components/List';
import RepoListItem from 'containers/RepoListItem';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
// import messages from './messages';
import H2 from 'components/H2';
import * as ActionCreators from './actions';

import { makeSelectBike, makeSelectError, makeSelecttotalCount} from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingDots from 'components/LoadingDots';

const UpdatingOverlay = styled.div`
    background: #E1E5E8;
    opacity:.2;
    z-index:1000;
    text-align:center;
    height:300px;
`;
/* eslint-disable react/prefer-stateless-function */
export class Searchthefbike extends React.Component {

  constructor(props) {
    super(props);
    this.state = intialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlefromdateChange = this.handlefromdateChange.bind(this);
    this.handletodateChange = this.handletodateChange.bind(this);

    // this.ReposList = this.ReposList.bind(this);
  }
  handlePageChange(pageNumber) {
    const payload = {
      pageno: pageNumber
    }
    this.props.actions.getbikedetails(payload);
    this.setState({activePage: pageNumber + 1});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  reset() {
    location.reload();
  }
  handleSubmit(event) {
    let validate = false;
    const fromdatevalue = this.formatDate(this.state.fromDate);
    const toDatevalue = this.formatDate(this.state.toDate);
    validate = (fromdatevalue < toDatevalue) ? true : false;
    const dateErrord = {
      dateError: validate
    }
    this.state(dateErrord);
    const payload = {
      bikedesc: this.state.value,
      fromdatevalue,
      toDatevalue,
      pageno: 1
    }
    this.props.actions.getbikedetails(payload);
    event.preventDefault();
    event.target.reset();

 }
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.actions.getcaseCount();
    const payload = {
      pageno: 1
    }
    this.props.actions.getbikedetails(payload);
  }
  formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    const final = (monthIndex.length === 1) ? `0${monthIndex}` : monthIndex;
    const newDate = `${final}/${day}/${year}`;
    return (new Date(newDate).getTime());
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchbike && nextProps.showerror == null) {
        prevState.isLoading = false;
    }
    if (nextProps.searchbike == null && nextProps.showerror) {
      prevState.isLoading = false;
      prevState.error = true;
    }
  }
  
  handletodateChange(date) {
    this.setState({
      toDate: date
    });
  }

  handlefromdateChange(date) {
    this.setState({
      fromDate: date
    });
  }
  
  ReposList = (loading, repos) => {
    if (repos !== false) {
      return <List items={repos} component={RepoListItem} />;
    }
    return null;
  }

  render() {
    const { searchbike, loading, totalcount} = this.props;
    if (!(this.state.isLoading) && this.state.error) {
        return (
        <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-danger text-center">Oops, something went wrong.</div>
        </div>
      </div>
      );
    } 
    if (this.state.isLoading) {
      return (
        <div className="row">
          <div className="col-xs-12">
              <UpdatingOverlay>
              <div className="loading-dots"> <LoadingDots /></div>
              </UpdatingOverlay>
          </div>
        </div>
      );
    }
    if (this.state.dateError) { 
      return (
        <div className="row">
          <div className="col-xs-12">
              <div className="alert alert-danger text-center">Error:  Please select From date much earlier than To date .</div>
          </div>
        </div>
      );
    }
    const content = (searchbike.length === 0 ) ? 'No Results' : this.ReposList(loading, searchbike);
    return (
      <article>
        <Helmet>
          <title>Search Incidence</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        
        <CenteredSection>
              <H2>
                Police Department of Berlin
              </H2>
        </CenteredSection>
        <div className="col-lg-2"><p>Total : {totalcount && totalcount.length}</p></div>
        <div>
          <Section> 
            <Form onSubmit={this.handleSubmit} id="searchincidence">              
                <div className="col-md-4">
                  <Input name="searchs" type="text" className="input-lg" value={this.state.value} placeholder="Search case descriptions" onChange={this.handleChange} />
                </div>
              <div className="col-md-2 text-control">
                  <DatePicker
                    placeholder="From "
                    selected={this.state.fromDate}
                    onChange={this.handlefromdateChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    />
              </div>
              <div className="col-md-2">
                  <DatePicker
                    placeholder="To "
                    selected={this.state.toDate}
                    onChange={this.handletodateChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
              </div>
              <div className="col-md-4">      
                  <button type="submit" value="Submit" className="btn btn-default" >Find Cases</button>
                  <button type="button" onClick={this.reset} className="btn btn-default" >Clear</button> 
              </div>
            </Form>
            {content}
          </Section>
          <div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={(e) => { this.handlePageChange(this.state.activePage)}}
            />
          </div>
        </div>
      </article>
    );
  }
}

Searchthefbike.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  searchbike: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

const intialState = {
  isLoading: true,
  error: false,
  activePage: 1,
  fromDate: new Date(),
  toDate: new Date(),
  dateError: false,
};
const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  searchbike: makeSelectBike(),
  totalcount: makeSelecttotalCount(),
  showerror: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'searchbike', reducer });
const withSaga = injectSaga({ key: 'searchbike', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Searchthefbike);
