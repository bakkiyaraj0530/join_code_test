/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { GoogleMap, Marker } from 'react-google-maps';

// import styled from 'styled-components';
// import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import List from 'components/List';
// import LoadingIndicator from 'components/LoadingIndicator';
// import RepoListItem from 'containers/RepoListItem';
import H2 from 'components/H2';

import CenteredSection from './CenteredSection';
import Section from './Section';
// import messages from './messages';
import * as ActionCreators from './actions';

import { makeSelectCaseDetails } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Contenalign from './Contenalign';

// import LoadingDots from 'components/LoadingDots';

// const UpdatingOverlay = styled.div`
//     background: #E1E5E8;
//     opacity:.2;
//     z-index:1000;
//     text-align:center;
//     height:300px;
// `;
/* eslint-disable react/prefer-stateless-function */
export class Casedetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = intialState;
  }

  componentDidMount() {
    console.log('caaaa', this.props.match.params.id);
    this.props.actions.getcasedetailsById(this.props.match.params.id);
  }

  render() {
    const content = this.props.casedetails && (
      <Contenalign>
        <div className="pull-right list-bike">
          <p>{this.props.casedetails.title}</p>
          {<p>{this.props.casedetails.occurred_at}</p>}
          <p>
            <strong>Stolen </strong>
            {new Date(this.props.casedetails.occurred_at).toDateString()} CET at{' '}
            {this.props.casedetails.address}
          </p>
          <p>
            {/* {
                  <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                  >
                   <Marker position={{ lat: -34.397, lng: 150.644 }} />
                  </GoogleMap>
                    } */}
          </p>
          <p>{this.props.casedetails.description}</p>
        </div>
      </Contenalign>
    );
    return (
      <article>
        <Helmet>
          <title>CASE DETAILS</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>

        <CenteredSection>
          <H2>Police Department of Berlin</H2>
        </CenteredSection>
        <div>
          <Section>{content}</Section>
        </div>
      </article>
    );
  }
}

Casedetails.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  match: PropTypes.object,
  casedetails: PropTypes.object,
};
const intialState = {
  isLoading: true,
  casedetails: {},
};
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

// const intialState = {
//   isLoading: true,
//   error: false,
// };
const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  casedetails: makeSelectCaseDetails(),
  // showerror: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'casedetails', reducer });
const withSaga = injectSaga({ key: 'casedetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Casedetails);
