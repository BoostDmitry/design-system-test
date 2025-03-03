export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Enforce that the default import is named 'cn' when importing from 'clsx'.",
    },
    fixable: 'code',
    hasSuggestion: true,
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'clsx') {
          return;
        }

        node.specifiers.forEach(function (specifier) {
          if (
            specifier.type === 'ImportDefaultSpecifier' &&
            specifier.local.name !== 'cn'
          ) {
            context.report({
              node: specifier,
              message: `Always import the default as 'cn' when importing from 'clsx'.`,

              fix: (fixer) => {
                return fixer.replaceText(specifier, 'cn');
              },
            });
          }
        });
      },
    };
  },
};
