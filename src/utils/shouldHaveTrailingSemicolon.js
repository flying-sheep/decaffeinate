import isExpressionResultUsed from '../utils/isExpressionResultUsed';
import isImplicitlyReturned from '../utils/isImplicitlyReturned';
import { isStatement, isStaticMethod } from '../utils/types';

/**
 * Determines whether a node should have a semicolon after it.
 *
 * @param {Object} node
 * @returns {boolean}
 */
export default function shouldHaveTrailingSemicolon(node) {
  console.log(node.type, isStatement(node));
  if (isStatement(node)) {
    switch (node.type) {
      case 'Block':
      case 'Class':
      case 'ClassProtoAssignOp':
      case 'Conditional':
      case 'Constructor':
      case 'ForIn':
      case 'ForOf':
      case 'Switch':
      case 'While':
        return false;

      case 'AssignOp':
        return !isStaticMethod(node);

      default:
        return true;
    }
  } else {
    return false;
  }
  //const { parentNode } = node;
  //
  //if (!parentNode) {
  //  return false;
  //}
  //
  //switch (parentNode.type) {
  //  case 'Block':
  //    break;
  //
  //  case 'Function':
  //    if (parentNode.body !== node) {
  //      return false;
  //    }
  //    break;
  //
  //  case 'Class':
  //    return false;
  //
  //  case 'Conditional':
  //    if (node.type === 'Block') {
  //      return false;
  //    } else if (parentNode.condition === node) {
  //      return false;
  //    } else if (isExpressionResultUsed(parentNode)) {
  //      // No semicolons in "a ? b : c" from "if a then b else c".
  //      return false;
  //    }
  //    break;
  //
  //  default:
  //    if (parentNode && parentNode.type === 'Try') {
  //      if (node === parentNode.body && node.type !== 'Block') {
  //        // Add a semicolon after the single-statement `try` body.
  //        return true;
  //      }
  //    }
  //    return false;
  //}
  //
  //switch (node.type) {
  //  case 'Block':
  //  case 'ClassProtoAssignOp':
  //  case 'Constructor':
  //  case 'ForIn':
  //  case 'ForOf':
  //  case 'JavaScript':
  //  case 'Try':
  //  case 'While':
  //  case 'Switch':
  //    return false;
  //
  //  case 'Conditional':
  //    return isExpressionResultUsed(node);
  //
  //  case 'Class':
  //    return !node.nameAssignee || isImplicitlyReturned(node);
  //
  //  case 'AssignOp':
  //    return !isStaticMethod(node);
  //
  //  default:
  //    return true;
  //}
}
