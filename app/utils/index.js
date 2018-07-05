export function snakeToTitle(word) {
    var title = word.split('_').map((word) => {
      return (word.replace(/^\w/, c => c.toUpperCase()))
    }).reduce((acc, cur) => acc + ' ' + cur)
    return title
  }
