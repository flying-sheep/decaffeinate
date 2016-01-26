import isImplicitlyReturned from '../utils/isImplicitlyReturned';

/**
 * Inserts return keywords
 *
 * @param {Object} node
 * @param {MagicString} patcher
 */
export default function patchReturns(node, patcher) {
  const iir = isImplicitlyReturned(node);
  if (!!node._implicitReturn ^ iir) {
    console.log(node);
    throw new Error('DISAGREEMENT');
  }
  if (iir) {
    patcher.insert(node.range[0], 'return ');
  }
}
