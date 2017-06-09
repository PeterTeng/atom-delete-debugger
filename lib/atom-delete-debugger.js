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
      'atom-delete-debugger:toggle': () => this.toggle()
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
  }

};
