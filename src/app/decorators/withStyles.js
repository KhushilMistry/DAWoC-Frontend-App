import React, {PropTypes} from 'react';
import {isFunction, get as _get, isEmpty, isArray, forEach, map} from 'lodash';
import withStylesIsomorphic from 'isomorphic-style-loader/lib/withStyles';

//theme must be the last argument of insertCss function
export const insertCss = (styles, theme) => {
  if (isEmpty(styles)) {
    return;
  }
  if (!isArray(styles)) {
    styles = [styles];
  }

  //create an array of style remove functions.
  const removeFns = map(styles, style => {

    if (isEmpty(style)) {
      return () => {
      }
    }

    //_processCss is present when dynamic loader is used
    if (style._processCss && theme) {
      const processedCss = style._processCss(theme); //dynamically load styles from theme provided
      return style._insertCss(processedCss);
    }

    if (style.use) {
      return (style.use() || {}).unuse;
    }

    return style._insertCss();
  });

  return () => forEach(removeFns, styleRemoveFn => isFunction(styleRemoveFn) && styleRemoveFn());
};

export default (styles, params = {}) => {

  return (ComposedComponent) => {
    return class WithStyles extends withStylesIsomorphic(styles)(ComposedComponent) {

      static contextTypes = {
        insertCss: PropTypes.func
      };

      componentWillMount() {
        const that = this;

        // use isomorphic withStyle loader only when insertCss is available in context
        if (_get(that, 'context.insertCss')) {
          return super.componentWillMount(); //calling withStylesIsomorphic componentWillMount
        }

        // loading styles manually.
        that.removeCss = insertCss(styles);
        return that.removeCss;
      }

      componentWillUnmount() {
        const that = this;

        // use isomorphic withStyle loader only when insertCss is available in context
        if (_get(that, 'context.insertCss')) {
          return super.componentWillUnmount();
        }

        //used when isomorphic loader is not used but inserted manually
        return isFunction(that.removeCss) && that.removeCss();
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
  };
};
