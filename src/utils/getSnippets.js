export const getSnippets = name => {
  switch (name) {
    case 'abap':
      return 'snippets/abap'
    case 'abc':
      return 'snippets/abc'
    case 'fla':
    case 'swf':
      return 'snippets/actionscript'
    case 'ada':
      return 'snippets/ada'
    case 'alda':
      return 'snippets/alda'
    case 'applescript':
      return 'snippets/applescript'
    case 'aql':
      return 'snippets/aql'
    case 'ascii':
      return 'snippets/ascii'
    case 'asl':
      return 'snippets/asl'
    case 'bat':
      return 'snippets/batch'
    case 'cpp':
    case 'c':
      return 'snippets/c_cpp'
    case 'clj':
    case 'cljs':
    case 'cljc':
    case 'edn':
      return 'snippets/clojure'
    case 'cbl':
    case 'cob':
    case 'cpy':
      return 'snippets/cobol'
    case 'coffee':
      return 'snippets/coffee'
    case 'cfm':
    case 'cfc':
      return 'snippets/coldfusion'
    case 'cs':
      return 'snippets/csharp'
    case 'csp':
      return 'snippets/csp'
    case 'css':
      return 'snippets/css'
    case 'dart':
      return 'snippets/dart'
    case '':
      return 'snippets/dockerfile'
    case 'ejs':
      return 'snippets/ejs'
    case 'elm':
      return 'snippets/elm'
    case 'erl':
    case 'hrl':
      return 'snippets/erlang'
    case 'fs':
      return 'snippets/fsharp'
    case 'gitignore':
      return 'snippets/gitignore'
    case 'glsl':
      return 'snippets/glsl'
    case 'go':
      return 'snippets/golang'
    case 'graphql':
      return 'snippets/graphqlschema'
    case 'haml':
      return 'snippets/haml'
    case 'hbs':
    case 'handlebars':
      return 'snippets/handlebars'
    case 'hjson':
      return 'snippets/hjson'
    case 'html':
    case 'htm':
      return 'snippets/html'
    case 'ini':
      return 'snippets/ini'
    case 'io':
      return 'snippets/io'
    case 'jack':
      return 'snippets/jack'
    case 'jade':
      return 'snippets/jade'
    case 'java':
    case 'jar':
      return 'snippets/java'
    case 'js':
    case 'vue':
      return 'snippets/javascript'
    case 'json':
      return 'snippets/json'
    case 'jsp':
      return 'jsp'
    case 'jsx':
      return 'snippets/jsx'
    case 'latex':
      return 'snippets/latex'
    case 'less':
      return 'snippets/less'
    case 'lisp':
      return 'snippets/lisp'
    case 'ls':
      return 'snippets/livescript'
    case 'lsl':
      return 'snippets/lsl'
    case 'lua':
      return 'snippets/lua'
    case 'md':
      return 'snippets/markdown'
    case 'mysql':
      return 'snippets/mysql'
    case 'perl':
      return 'snippets/perl'
    case 'pgsql':
      return 'snippets/pgsql'
    case 'php':
      return 'snippets/php'
    case 'pig':
      return 'snippets/pig'
    case 'py':
      return 'snippets/python'
    case 'qml':
      return 'snippets/qml'
    case 'r':
      return 'snippets/r'
    case 'rdoc':
      return 'snippets/rdoc'
    case 'red':
      return 'snippets/red'
    case 'rhtml':
      return 'snippets/rhtml'
    case 'rst':
      return 'snippets/rst'
    case 'rb':
      return 'snippets/ruby'
    case 'rs':
    case 'rlib':
      return 'snippets/rust'
    case 'sass':
      return 'snippets/sass'
    case 'scala':
    case 'sc':
      return 'snippets/scala'
    case 'scss':
      return 'snippets/scss'
    case 'sh':
      return 'snippets/sh'
    case 'sjs':
      return 'snippets/sjs'
    case 'slim':
      return 'snippets/slim'
    case 'sql':
      return 'snippets/sql'
    case 'svg':
      return 'snippets/svg'
    case 'tex':
      return 'snippets/tex'
    case 'txt':
      return 'snippets/text'
    case 'tsx':
      return 'snippets/tsx'
    case 'twig':
      return 'snippets/twig'
    case 'ts':
      return 'snippets/typescript'
    case 'vbs':
      return 'snippets/vbscript'
    case 'xml':
      return 'snippets/xml'
    case 'yaml':
    case 'yml':
      return 'snippets/yaml'
    default:
      return 'snippets/plain_text'
  }
}
