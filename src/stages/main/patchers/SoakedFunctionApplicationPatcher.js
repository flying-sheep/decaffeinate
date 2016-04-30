import NodePatcher from './../../../patchers/NodePatcher.js';

export default class SoakedFunctionApplicationPatcher extends NodePatcher {
  patchAsExpression() {
    throw this.error('cannot patch soaked function application (e.g. `a?()`) yet');
  }
}
