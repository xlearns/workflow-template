// eslint-disable-next-line no-undef
module.exports = {
  // 设置我们想要输出的错误信息
  meta: {
    messages: {
      invalidName: '提示的错误信息'
    }
  },
  create(context) {
    return {
      //Identifier: 任何标识符
      Identifier(node) {
        // node.name为匹配的字符串
        console.log(node);
        context.report({
          node,
          messageId: 'invalidName'
        });
      }
    };
  }
};
