/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';
import Contenalign from './Contenalign';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';
import NoImageLogo from './no-image-icon.jpg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const linkto = styled(Link)`
display: inline-flex;
padding: 0.25em 2em;
margin: 1em;
text-decoration: none;
border-radius: 4px;
-webkit-font-smoothing: antialiased;
-webkit-touch-callout: none;
user-select: none;
cursor: pointer;
outline: 0;
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-weight: bold;
font-size: 16px;
border: 2px solid #41addd;
color: #41addd;

&:active {
  background: #41addd;
  color: #fff;
}
`;
export class RepoListItem extends React.PureComponent {
  render() {
    const { item } = this.props;
     // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    // if (item.owner.login !== this.props.currentUser) {
    //   nameprefix = `${item.owner.login}/`;
    // }

    // Put together the content of the repository
    const content = item && item.title && (
      <Contenalign>
      <div class="pull-right list-bike">
          <RepoLink  href={item['source'].html_url} target="_blank">
            <p>{item.title}</p>
          </RepoLink>
          {<p>{item.description}</p>}
          <p>{new Date(item.occurred_at).toDateString()}</p>
          <p>{new Date(item.updated_at).toDateString()}</p>        
          <p>{item.address}</p>
      </div>
      <div class="pull-left list-bike-img">
         <Link to={'/casedetails/'+item.id} >
          <img src={(item['media'].image_url_thumb === null || item['media'].image_url_thumb == '') ? NoImageLogo : item['media'].image_url_thumb} ></img>
          </Link> 
        {/* <RepoLink  href={'/casedetails/'+item.id} >
          <img src={(item['media'].image_url_thumb === null || item['media'].image_url_thumb == '') ? NoImageLogo : item['media'].image_url_thumb} ></img>
        </RepoLink> */}
      </div>
      </Contenalign>
    );

    // Render the content into a list item
    return <ListItem key={`repo-list-item-${item}`} item={content} />;
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
  }),
)(RepoListItem);
