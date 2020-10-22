import React from 'react'
import Modal from '../Modal'

function ThemeComponent ({ setEditorTheme, setModalBottom }) {
  return (
    <section>
      <Modal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            size={10}
            className='modal-select'
            onChange={e => {
              setEditorTheme(e.target.value)
              window.require(
                `ace-builds/src-noconflict/theme-${e.target.value}`
              )
              setModalBottom(false)
            }}
          >
            <option value='ambiance'>Ambiance</option>
            <option value='chaos'>Chaos</option>
            <option value='chrome'>Chrome</option>
            <option value='clouds'>Clouds</option>
            <option value='clouds_midnight'>Clouds Midnight</option>
            <option value='cobalt'>Cobalt</option>
            <option value='crimson_editor'>Crimson</option>
            <option value='dawn'>Dawn</option>
            <option value='dracula'>Dracula</option>
            <option value='dreamweaver'>Dreamweaver</option>
            <option value='eclipse'>Eclipse</option>
            <option value='github'>GitHub</option>
            <option value='gob'>Gob</option>
            <option value='gruvbox'>Gruvbox</option>
            <option value='idle_fingers'>Idle Fingers</option>
            <option value='iplastic'>IPlastic</option>
            <option value='katzenmilch'>Cat's milk</option>
            <option value='kr_theme'>KR Theme</option>
            <option value='kuroir'>Kuroir</option>
            <option value='marbivore'>Marbivore</option>
            <option value='marbivore_soft'>Marbivore Soft</option>
            <option value='mono_industrial'>Mono Industrial</option>
            <option value='monokai'>Monokai</option>
            <option value='nord_dark'>Nord dark</option>
            <option value='pastel_on_dark'>Pastel on dark</option>
            <option value='solarized_dark'>Solarized dark</option>
            <option value='solarized_light'>Solarized light</option>
            <option value='sqlserver'>SQL server</option>
            <option value='terminal'>Terminal</option>
            <option value='textmate'>Textmate</option>
            <option value='tomorrow'>Tomorrow</option>
            <option value='tomorrow_night'>Tomorrow night</option>
            <option value='tomorrow_night_blue'>Tomorrow night blue</option>
            <option value='tomorrow_night_bright'>Tomorrow night bright</option>
            <option value='tomorrow_night_eighties'>
              Tomorrow night eighties
            </option>
            <option value='twilight'>Twilight</option>
            <option value='vibrant_ink'>Vibrank Ink</option>
            <option value='xcode'>XCode</option>
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

export default ThemeComponent
