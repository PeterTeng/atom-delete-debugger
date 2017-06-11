'use babel';

import AtomDeleteDebuggerView from './atom-delete-debugger-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDeleteDebuggerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDeleteDebuggerView = new AtomDeleteDebuggerView(state.atomDeleteDebuggerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDeleteDebuggerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-delete-debugger:toggle': () => this.toggle(),
      'atom-delete-debugger:delete-debugger': () => this.deleteDebugger()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDeleteDebuggerView.destroy();
  },

  serialize() {
    return {
      atomDeleteDebuggerViewState: this.atomDeleteDebuggerView.serialize()
    };
  },

  toggle() {
    console.log('AtomDeleteDebugger was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  async replace(regex, replacePattern, replacementPaths) {
    const promise = await atom.workspace.replace(regex, replacePattern, replacementPaths, (result, error) => {
      if (result) {
        console.log('result', result);
      } else {
        console.log('error', error);
      }
    });
    return promise;
  },

  async debuggerPaths(regex) {
    const filePaths = [];
    const promise = await atom.workspace.scan(regex, ({ filePath, matches }) => {
      filePaths.push(filePath);
    });
    return filePaths;
  },

  async deleteDebugger() {
    flags = 'gi'
    const expression = 'debugger;'
    const regex = RegExp(expression, flags);
    const filePaths = await this.debuggerPaths(regex);
    const promise = await this.replace(regex, '', filePaths);
    return promise;
  }

};
