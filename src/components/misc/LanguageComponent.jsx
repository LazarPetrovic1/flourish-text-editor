import React from 'react'
import Modal from '../Modal'

function LanguageComponent ({
  autoDetectLanguage,
  setLanguage,
  setModalBottom
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <Modal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            size={10}
            className='modal-select'
            onChange={e => {
              if (e.target.value === 'autodetect') {
                return autoDetectLanguage()
              } else {
                setLanguage(e.target.value)
                window.require(
                  `ace-builds/src-noconflict/mode-${e.target.value}`
                )
              }
              setModalBottom(false)
            }}
          >
            <option value='autodetect'>Auto detect language</option>
            <option value='abap'>Abap</option>
            <option value='abc'>Abc</option>
            <option value='actionscript'>ActionScript</option>
            <option value='ada'>Ada</option>
            <option value='alda'>Alda</option>
            <option value='applescript'>AppleScript</option>
            <option value='aql'>Aql</option>
            <option value='ascii'>Ascii</option>
            <option value='asl'>Asl</option>
            <option value='c_cpp'>C/C++</option>
            <option value='clojure'>Clojure</option>
            <option value='cobol'>COBOL</option>
            <option value='coffee'>Coffee</option>
            <option value='coldfusion'>ColdFusion</option>
            <option value='csharp'>C#</option>
            <option value='csp'>CSP</option>
            <option value='css'>CSS</option>
            <option value='dart'>Dart</option>
            <option value='dockerfile'>Dockerfile</option>
            <option value='ejs'>EJS</option>
            <option value='elm'>Elm</option>
            <option value='elrlang'>Erlang</option>
            <option value='fsharp'>F#</option>
            <option value='gitignore'>Gitignore</option>
            <option value='glsl'>GLSL</option>
            <option value='golang'>Go/Golang</option>
            <option value='graphqlschema'>GraphQL</option>
            <option value='haml'>Haml</option>
            <option value='handlebars'>Handlebars</option>
            <option value='hjson'>HJSON</option>
            <option value='html'>HTML</option>
            <option value='ini'>Windows settings (ini)</option>
            <option value='io'>IO</option>
            <option value='jack'>Jack</option>
            <option value='jade'>Jade</option>
            <option value='java'>Java</option>
            <option value='javascript'>JavaScript</option>
            <option value='json'>JSON API</option>
            <option value='jsp'>JSP</option>
            <option value='jsx'>JavaScript React (JSX)</option>
            <option value='latex'>LaTeX</option>
            <option value='less'>Less</option>
            <option value='lisp'>Lisp</option>
            <option value='livescript'>LiveScript</option>
            <option value='lsl'>LSL</option>
            <option value='lua'>Lua</option>
            <option value='markdown'>Github Markdown</option>
            <option value='mysql'>MySQL</option>
            <option value='perl'>PERL</option>
            <option value='pgsql'>PGSQL</option>
            <option value='php'>PHP</option>
            <option value='pig'>Pig</option>
            <option value='python'>Python</option>
            <option value='qml'>QML</option>
            <option value='r'>R/Rlang</option>
            <option value='rdoc'>RDOC</option>
            <option value='red'>Red</option>
            <option value='rhtml'>RHTML</option>
            <option value='rst'>RST</option>
            <option value='ruby'>Ruby</option>
            <option value='rust'>Rust</option>
            <option value='sass'>SASS</option>
            <option value='scala'>Scala</option>
            <option value='scss'>Sassy CSS/SCSS</option>
            <option value='sh'>Bash/Terminal</option>
            <option value='sjs'>SJS</option>
            <option value='slim'>Slim</option>
            <option value='sql'>SQL</option>
            <option value='svg'>SVG</option>
            <option value='tex'>TEX</option>
            <option value='txt'>Plaintext</option>
            <option value='tsx'>TypeScript React</option>
            <option value='twig'>Twig</option>
            <option value='typescript'>TypeScript</option>
            <option value='vbscript'>VBScript</option>
            <option value='xml'>XML</option>
            <option value='yaml'>YAML</option>
          </select>
          <div
            style={{
              fontSize: '1.2rem',
              cursor: 'pointer',
              textAlign: 'center',
              border: '1px solid white',
              margin: '1rem 0',
              padding: '0.5rem 1rem'
            }}
            onClick={() => setModalBottom(false)}
          >
            Close
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default LanguageComponent
