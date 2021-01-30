// Copyright © 2019-2021 Brandon Li. All rights reserved.

/**
 * Custom component plugin for docsify. All commands are delimited with `<!--::` and `::-->`.
 *
 * ## Defining Components.
 *   Components are defined with:
 *     (1) name - the name of the component when reused.
 *     (2) template - a function that returns replacement HTML (markdown not currently supported).
 *
 *     For example:
 *         ```md
 *         <!--::
 *         component {
 *           name: 'component-name',
 *           template: data => `
 *             <div>${data.title}</div>
 *             <div>${data.description}</div>
 *           `
 *         }
 *         ::-->
 *         ```
 *
 * ## Using Components
 *   Components are simpled used by providing the component name and the data object.
 *   ```md
 *   <!--::
 *   component-name {
 *     title: 'Title',
 *     description: 'Description'
 *   }
 *   ::-->
 *   ```
 * ## Variables
 *   This plugin also supports variables to be used in templates/components.
 *
 *   Usage looks like:
 *   ```md
 *   <!--:: var {title: 'Title'} ::-->
 *
 *   <!--::
 *   component-name {
 *     title: title,
 *     description: 'Description'
 *   }
 *   ::-->
 *   ```
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

// constants
const START_DELIMITER = '<!--::';
const END_DELIMITER = '::-->';
const VARIABLE_COMMAND = 'var';
const COMPONENT_COMMAND = 'component';

const plugin = hook => {
  hook.afterEach(html => {

    // Parse the HTML into tokens, where the first token doesn't contain a component command.
    const tokens = html.split(START_DELIMITER);
    const start = tokens.shift();

    tokens.forEach((token, index) => {

      // Parse the command (ie. var, component, etc.) from the token.
      const command = token.substring(0, token.indexOf('{')).trim();

      // Parse the data object from the token.
      // eslint-disable-next-line no-eval
      const data = eval(`(${token.substring(token.indexOf('{'), token.indexOf(END_DELIMITER))})`);

      // Parse the rest of the token, which has no component commands and is regular HTML.
      tokens[index] = token.substring(token.indexOf(END_DELIMITER) + END_DELIMITER.length);

      if (command === VARIABLE_COMMAND) {

        // Add each of the variables to the global window object.
        for (const variable in data) {
          window[variable] = data[variable];
        }
      }
      else if (command === COMPONENT_COMMAND) {

        // Add the component definition to window.$docsify.components.
        window.$docsify.components = {
          ...window.$docsify.components,
          [data.name]: data.template
        };
      }
      else {

        // Get the html from the template function, trimming whitespace for each line.
        const html = window.$docsify.components[command](data)
          .split('\n')
          .map(line => line.trim())
          .join('\n');

        // Add the html to the token.
        tokens[index] = html + tokens[index];
      }
    });

    return [ start, ...tokens ].join('');
  });
};

if (window) {
  window.$docsify = window.$docsify || {};

  // Register the plugin.
  window.$docsify.plugins = [
    plugin,
    ...window.$docsify.plugins
  ];
}