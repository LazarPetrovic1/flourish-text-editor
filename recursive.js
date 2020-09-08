function getR (obj) {
  console.log(`Traversing through ${obj.name}`)
  getRec(temp1.children)
}

function getRec (arr) {
  for (const item of arr) {
    if (item.type === 'file') {
      console.log(`ITEM: ${item.path}`)
    } else if (item.type === 'directory') {
      getRec(item.children)
    }
  }
}
