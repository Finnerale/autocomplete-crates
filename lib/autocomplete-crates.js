'use babel';

import axios from 'axios'

const search = crate => `https://crates.io/api/v1/crates?page=1&per_page=20&q=${crate}&sort=`

export default {

  provide() {
    return {
      selector: '.source.toml',
      inclusionPriority: 1,
      excludeLowerPriority: true,
      suggestionPriority: 2,

      getSuggestions({
        editor,
        bufferPosition,
        scopeDescriptor,
        prefix
      }) {

        // Avoids completion for '[..]' sections and 'crate = {..}'
        if(bufferPosition.column !== prefix.length) {
          return [];
        }

        {
          // Is this inside the [dependencies] section?
          const text = editor.getTextInBufferRange([[0, 0], bufferPosition])
          const last_bracket = text.lastIndexOf('[')
          if(last_bracket == -1) {
            return []
          }
          const last_section = text.substring(last_bracket, last_bracket + 14)
          if(last_section != '[dependencies]') {
            return []
          }
        }

        return new Promise(resolve => {

          axios.get(search(prefix)).then(({data}) => {

            const suggestions = data.crates.map(({
              name,
              max_version,
              description
            }) => ({
              text: `${name} = "${max_version}"`,
              description
            }))

            resolve(suggestions)

          })
        })
      }
    }
  },

  activate(state) {},

  deactivate() {},

  serialize() {}

};
