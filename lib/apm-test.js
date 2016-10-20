'use babel';

import ApmTestView from './apm-test-view';
import { CompositeDisposable } from 'atom';

export default {

  apmTestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.apmTestView = new ApmTestView(state.apmTestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.apmTestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'apm-test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.apmTestView.destroy();
  },

  serialize() {
    return {
      apmTestViewState: this.apmTestView.serialize()
    };
  },

  toggle() {
    console.log('ApmTest v0.1.0 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
