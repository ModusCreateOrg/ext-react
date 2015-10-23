import React from 'react';

/**
 * This is a stateless component. It's only aware of the values supplied to it.
 * It receives props as an object argument. We only expect `symbol` as a property.
 * @param  {String} props.symbol Symbol string
 */
export default ({ symbol }) => (
  <div className={`symbol icon-${symbol}`}>
    <span className="text">{symbol}</span>
  </div>
);
