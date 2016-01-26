/**
 * Insert `return` statements where appropriate.
 *
 * @param {Object} node
 * @param {MagicString} patcher
 * @returns {boolean}
 */
export default function preprocessReturn(node, patcher) {
  return false;
  if (node.type !== 'Function') {
    return false;
  }

  if (node.parentNode.type === 'Constructor') {
    return false;
  }

  const { body } = node;

  if (!body) {
    return false;
  }

  let statement;

  if (body.type !== 'Block') {
    // TODO: remove this when inline blocks are a thing.
    statement = body;
  } else {
    statement = body.statements[body.statements.length - 1];
  }

  switch (statement.type) {
    case 'Return':
      return false;

    case 'Switch':

    default:
      patcher.insert(statement.range[0], 'return ');
      return true;
  }
}
