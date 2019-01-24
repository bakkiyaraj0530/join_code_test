/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
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
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError,
// } from 'containers/App/selectors';
import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
import List from 'components/List';
// import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

// import SearchBikeFilter from 'components/SearchBikeFilter';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
// import { loadRepos } from '../App/actions';
// import  { getbikedetails }  from './actions';
import * as ActionCreators from './actions';

import { makeSelectBike } from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingDots from 'components/LoadingDots';

const UpdatingOverlay = styled.div`
    background: #FFFFFF;
    opacity:.2;
    z-index:1000;
    text-align:center;
    height:300px;
`;
/* eslint-disable react/prefer-stateless-function */
export class Searchthefbike extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.ReposList = this.ReposList.bind(this);
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.props.actions.getbikedetails(pageNumber);
    this.setState({activePage: pageNumber});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'input' ? target.value : '';
    const name = target.name;
    // console.log(name, value);
    this.state = intialState;
    this.setState({
      [name]: value
    });
    // console.log('handle change', event.target.id.value);
    // return false;  
    // this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.search);
    event.preventDefault();
  // const data = new FormData(event.target);
  //  console.log(values);
 }
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.actions.getbikedetails(1);
  }
  handletodateChange(date) {
    this.setState({
      starttoDate: date
    });
  }

  handlefromdateChange(date) {
    this.setState({
      startfromDate: date
    });
  }
  
  ReposList = (loading, repos) => {
    // if (loading) {
    //   return <List items={repos} component={RepoListItem} />;
    // }
  
    // if (error !== false) {
    //   const ErrorComponent = () => (
    //     <ListItem item="Something went wrong, please try again!" />
    //   );
    //   return <List component={ErrorComponent} />;
    // }
  
    if (repos !== false) {
      return <List items={repos} component={RepoListItem} />;
    }
  
    return null;
  }

  render() {
    const { searchbike, loading } = this.props;
    //  console.log('searchbike => ', searchbike);
    const reposListProps = {
      loading,
      // error,
      searchbike,
    };
    if (this.state.isLoading) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <div className="loading-dots"> <LoadingDots /></div>
            <UpdatingOverlay></UpdatingOverlay>
          </div>
        </div>
      );
    }
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          {/* <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection> */}
          <Section>            
            <Form onSubmit={this.handleSubmit}>
              
                <div className="col-md-6">
                  <Input name="searchs" type="text" value={this.state.value} placeholder="Search Bike" onChange={this.handleChange} />
                </div>

                {/* <Input
                  id="search"
                  type="text"
                  placeholder="Search Bike"
                  value={this.props.username}
                  // onChange={this.props.onChangeUsername}
                /> */}
              
              <div className="col-md-2 text-control">
                  {/* <DatePicker
                    selected={this.state.startfromDate}
                    onChange={this.handlefromdateChange}
                    /> */}
                <Input id="fromdate" type="text" placeholder="From Date"/>
              </div>
              <div className="col-md-2">
                    {/* <DatePicker
                      selected={this.state.starttoDate}
                      onChange={this.handletodateChange}
                    /> */}
                  <Input id="todate" type="text" placeholder="To date"/>
              </div>
              <div className="col-md-2">      
                  <button type="submit" value="Submit" >Submit</button>
                 {/* <button>Log In </button> */}
              </div>
            </Form>
              {this.ReposList(loading, searchbike)}
            {/* <ReposList {...reposListProps} /> */}
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
  // return {
  //   onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
  //   getBenefits: evt => dispatch(getbikedetails())
  //   // onSubmitForm: evt => {
  //   //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
  //   //   dispatch(loadRepos());
  //   // },
  // };
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

const intialState = {
  isLoading: true,
};
const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  searchbike: makeSelectBike(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
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
