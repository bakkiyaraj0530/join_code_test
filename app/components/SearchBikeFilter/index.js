import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FormStyles from './form-styles';
import { FormattedMessage } from 'react-intl';

import AtPrefix from './AtPrefix';
// import Input from './Input';

class SearchBikeFilter extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { handleSubmit, pristine, reset, submitting, intl } = this.props;
  return (
    <FormStyles onSubmit={handleSubmit} className="form-horizontal" id="searchbike" name="pharmacyLocatorForm">
      <label htmlFor="Search">
          <FormattedMessage {...messages.trymeMessage} />
          <AtPrefix>
             Search
          </AtPrefix>
            <Field
              name="search"
              component="input"
              type="text"
              placeholder="Search Bike"
            />
      </label>
      <label  htmlFor="Fromdate">
          <AtPrefix>          
            From Date
            </AtPrefix>
            <Field
              name="fromdate"
              component="input"
              type="text"
              placeholder="From Bike"
            />
      </label>
      <label  htmlFor="Todate">
          <AtPrefix>
             Search
          </AtPrefix>
            <Field
              name="todate"
              component="input"
              type="text"
              placeholder="To Date"
            />
      </label>
      <label  htmlFor="submit">
        <button type="submit">Log In </button>
      </label>    
    </FormStyles>
  )
  }
}
SearchBikeFilter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default reduxForm({
  form: 'SearchBikeFilter' // a unique identifier for this form
})(SearchBikeFilter)