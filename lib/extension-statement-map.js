'use babel';

const extensionLanguageMap = {
  '.js': ['debugger;?'],
  '.jsx': ['debugger;?'],
  '.rb': ['binding.pry', 'byebug'],
};

export default extensionLanguageMap;
