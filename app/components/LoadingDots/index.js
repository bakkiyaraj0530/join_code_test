/**
*
* LoadingDots
*
*/

import React from 'react';
import styled from 'styled-components';
// import colors from '../HelperUtils/branding-colors';
const Loading = styled.div`
.saving{
  font-size:15rem;
  color: #0077C8;
}
.saving span {
    /**
     * Use the blink animation, which is defined above
     */
    animation-name: blink;
    /**
     * The animation should take 1.4 seconds
     */
    animation-duration: 1.4s;
    /**
     * It will repeat itself forever
     */
    animation-iteration-count: infinite;
    /**
     * This makes sure that the starting style (opacity: .2)
     * of the animation is applied before the animation starts.
     * Otherwise we would see a short flash or would have
     * to set the default styling of the dots to the same
     * as the animation. Same applies for the ending styles.
     */
    animation-fill-mode: both;
}

.saving span:nth-child(2) {
    /**
     * Starts the animation of the third dot
     * with a delay of .2s, otherwise all dots
     * would animate at the same time
     */
    animation-delay: .2s;
}

.saving span:nth-child(3) {
    /**
     * Starts the animation of the third dot
     * with a delay of .4s, otherwise all dots
     * would animate at the same time
     */
    animation-delay: .4s;
}
`;

function LoadingDots() {
  return (
    <Loading>
      <p className="saving"><span>.</span><span>.</span><span>.</span></p>
    </Loading>
  );
}

LoadingDots.propTypes = {

};

export default LoadingDots;
