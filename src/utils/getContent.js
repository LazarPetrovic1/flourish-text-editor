import { readFile } from './readFile'

export const getContent = (file, setContent, setSelected, setTabs, tabs) => {
  if (file.type === 'file') {
    setContent(readFile(file.path))
    setTabs([...tabs, { selected: file }])
    setSelected({ ...file })
  }
}
