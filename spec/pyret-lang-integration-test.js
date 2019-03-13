import CodeMirrorBlocks from '../src/CodeMirrorBlocks';
import pyret from '../src/languages/pyret';
import { store } from '../src/store';

import { click, keyDown, insertText } from './support/simulate';
import TestUtils from 'react-dom/test-utils';
import { wait, cleanupAfterTest } from './support/test-utils';

const DELAY = 500;

describe('Pyret-lang integration', function () {
  beforeEach(function () {
    const fixture = `<div id="root">
    <div id="cmb-editor" class="editor-container" />
    </div>`;
    document.body.insertAdjacentHTML('afterbegin', fixture);
    const container = document.getElementById('cmb-editor');
    this.cmb = new CodeMirrorBlocks(container, { value: "" }, pyret);
    this.cmb.setBlockMode(true);
    this.toggle = document.getElementsByClassName('blocks-toggle-btn');
    console.log(this.toggle);
  });

  afterEach(function () {
    cleanupAfterTest('root', store);
  });

  it('should have the same text after hitting toggle', async function () {
    this.cmb.setValue('3 + 5');
    await wait(DELAY);
    // expect(this.toggle.length).toEqual(1);
    // for (let button of this.toggle)
    //   click(button);
    this.cmb.setBlockMode(false);
    await wait(DELAY);
    expect(this.cmb.getValue()).toBe('3 + 5');
  })
})