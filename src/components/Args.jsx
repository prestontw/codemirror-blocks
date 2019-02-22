import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ASTNode} from '../ast';
import {span} from '../types';
import {DropTarget, DropTargetContainer, DropTargetSibling} from './DropTarget';

// NOTE: `location` is required in case `children` is empty!
//       Otherwise, it can be omitted.
export default class Args extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(ASTNode)).isRequired,
    location: span,
  }

  render() {
    let {children} = this.props;
    const elems = [];
    elems.push(<DropTarget key={'drop-0'}
                           index={0}
                           location={children.length ? children[0].from : this.props.location} />);
    children.forEach((child, index) => {
      elems.push(<DropTargetSibling node={child} left={index} right={index+1} key={'node-'+index} />);
      elems.push(<DropTarget key={'drop-'+(index+1)}
                             index={index+1}
                             location={child.to} />);
    });
    console.log("@Args.elems", elems);
    return (<DropTargetContainer>{elems}</DropTargetContainer>);
  }
}
