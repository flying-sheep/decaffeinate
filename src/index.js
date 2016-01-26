import MagicString from 'magic-string';
import parse from './utils/parse';
import patchBoolean from './patchers/patchBoolean';
import patchCommas from './patchers/patchCommas';
import patchComments from './patchers/patchComments';
import patchDeclarations from './patchers/patchDeclarations';
import patchEmbeddedJavaScript from './patchers/patchEmbeddedJavaScript';
import patchEquality from './patchers/patchEquality';
import patchKeywords from './patchers/patchKeywords';
import patchOf from './patchers/patchOf';
import patchPrototypeAccess from './patchers/patchPrototypeAccess';
import patchRegularExpressions from './patchers/patchRegularExpressions';
import patchReturns from './patchers/patchReturns';
import patchSemicolons from './patchers/patchSemicolons';
import patchSequences from './patchers/patchSequences';
import patchStringInterpolation from './patchers/patchStringInterpolation';
import patchString from './patchers/patchString';
import patchThis from './patchers/patchThis';
import preprocessBinaryExistentialOperator from './preprocessors/preprocessBinaryExistentialOperator';
import preprocessChainedComparison from './preprocessors/preprocessChainedComparison';
import preprocessClass from './preprocessors/preprocessClass';
import preprocessCompoundAssignment from './preprocessors/preprocessCompoundAssignment';
import preprocessConditional from './preprocessors/preprocessConditional';
import preprocessDo from './preprocessors/preprocessDo';
import preprocessFor from './preprocessors/preprocessFor';
import preprocessIn from './preprocessors/preprocessIn';
import preprocessNegatableOps from './preprocessors/preprocessNegatableOps';
import preprocessParameters from './preprocessors/preprocessParameters';
import preprocessRange from './preprocessors/preprocessRange';
import preprocessReturn from './preprocessors/preprocessReturn';
import preprocessSoakedMemberAccessOp from './preprocessors/preprocessSoakedMemberAccessOp';
import preprocessSoakedFunctionApplication from './preprocessors/preprocessSoakedFunctionApplication';
import preprocessSwitch from './preprocessors/preprocessSwitch';
import preprocessTry from './preprocessors/preprocessTry';
import preprocessWhile from './preprocessors/preprocessWhile';
import traverse from './utils/traverse';
import { patchCallOpening, patchCallClosing } from './patchers/patchCalls';
import { patchClassStart, patchClassEnd } from './patchers/patchClass';
import { patchConditionalStart, patchConditionalEnd } from './patchers/patchConditional';
import { patchExistentialOperatorStart, patchExistentialOperatorEnd } from './patchers/patchExistentialOperator';
import { patchForStart, patchForEnd } from './patchers/patchFor';
import { patchFunctionStart, patchFunctionEnd } from './patchers/patchFunctions';
import { patchObjectStart, patchObjectEnd } from './patchers/patchObject';
import { patchRestStart, patchRestEnd } from './patchers/patchRest';
import { patchSliceStart, patchSliceEnd } from './patchers/patchSlice';
import { patchSpreadStart, patchSpreadEnd } from './patchers/patchSpread';
import { patchSwitchStart, patchSwitchEnd } from './patchers/patchSwitch';
import { patchThrowStart, patchThrowEnd } from './patchers/patchThrow';
import { patchTryStart, patchTryEnd } from './patchers/patchTry';
import { patchWhileStart, patchWhileEnd } from './patchers/patchWhile';

export { default as run } from './cli';

/**
 * Decaffeinate CoffeeScript source code by adding optional punctuation.
 *
 * @param source
 * @returns {string}
 */
export function convert(source) {
  const ast = parse(source);
  const patcher = new MagicString(source);

  let wasRewritten = false;

  traverse(ast, (node) => {
    if (wasRewritten) {
      return false;
    }
    wasRewritten =
      preprocessClass(node, patcher) ||
      preprocessCompoundAssignment(node, patcher) ||
      preprocessFor(node, patcher) ||
      preprocessIn(node, patcher) ||
      preprocessNegatableOps(node, patcher) ||
      preprocessDo(node, patcher) ||
      preprocessConditional(node, patcher) ||
      preprocessBinaryExistentialOperator(node, patcher) ||
      preprocessParameters(node, patcher) ||
      preprocessRange(node, patcher) ||
      preprocessReturn(node, patcher) ||
      preprocessSwitch(node, patcher) ||
      preprocessSoakedFunctionApplication(node, patcher) ||
      preprocessSoakedMemberAccessOp(node, patcher) ||
      preprocessTry(node, patcher) ||
      preprocessWhile(node, patcher) ||
      preprocessChainedComparison(node, patcher);
  });

  if (wasRewritten) {
    console.log(patcher.toString());
    return convert(patcher.toString());
  }

  traverse(ast, (node, descend) => {
    if (node._rewritten) {
      return;
    }

    patchReturns(node, patcher);
    patchConditionalStart(node, patcher);
    patchWhileStart(node, patcher);
    patchRegularExpressions(node, patcher);
    patchOf(node, patcher);
    patchKeywords(node, patcher);
    patchThis(node, patcher);
    patchBoolean(node, patcher);
    patchPrototypeAccess(node, patcher);
    patchStringInterpolation(node, patcher);
    patchString(node, patcher);
    patchForStart(node, patcher);
    patchSliceStart(node, patcher);
    patchCallOpening(node, patcher);
    patchObjectStart(node, patcher);
    patchDeclarations(node, patcher);
    patchFunctionStart(node, patcher);
    patchClassStart(node, patcher);
    patchEquality(node, patcher);
    patchThrowStart(node, patcher);
    patchSpreadStart(node, patcher);
    patchSwitchStart(node, patcher);
    patchRestStart(node, patcher);
    patchTryStart(node, patcher);
    patchEmbeddedJavaScript(node, patcher);
    patchExistentialOperatorStart(node, patcher);

    descend(node);

    patchTryEnd(node, patcher);
    patchWhileEnd(node, patcher);
    patchThrowEnd(node, patcher);
    patchExistentialOperatorEnd(node, patcher);
    patchFunctionEnd(node, patcher);
    patchClassEnd(node, patcher);
    patchForEnd(node, patcher);
    patchObjectEnd(node, patcher);
    patchSliceEnd(node, patcher);
    patchCallClosing(node, patcher);
    patchSemicolons(node, patcher);
    patchSequences(node, patcher);
    patchCommas(node, patcher);
    patchSpreadEnd(node, patcher);
    patchSwitchEnd(node, patcher);
    patchRestEnd(node, patcher);
    patchConditionalEnd(node, patcher);
  });

  patchComments(patcher);

  return patcher.toString();
}
