import React, { useState } from "react";
import Center from "../styled/center";
import { connect } from "react-redux";

// Helper imgs
import cdn from "../assets/helpers/cdn.png";
import fa from "../assets/helpers/fa.png";
import figma from "../assets/helpers/figma.png";
import gh from "../assets/helpers/gh.png";
import gitlab from "../assets/helpers/gitlab.png";
import googleFonts from "../assets/helpers/google-fonts.png";
import photopea from "../assets/helpers/photopea.png";
import pixabay from "../assets/helpers/pixabay.png";
import so from "../assets/helpers/so.png";
import terminal from "../assets/helpers/terminal.png";
import unsplash from "../assets/helpers/unsplash.png";
import wordpress from "../assets/helpers/wordpress.png";
const { ipcRenderer } = window.require("electron");
const os = window.require("os");

function Helpers({ dir }) {
  const [helpers, setHelpers] = useState(true);
  const [page, setPage] = useState(1);

  ipcRenderer.on("toggle-helpers", () => setHelpers(!helpers));

  return (
    <div className="helpers">
      <Center>
        <i
          className={helpers ? "fas fa-times" : "fas fa-caret-down"}
          onClick={() => setHelpers(!helpers)}
        />
      </Center>
      {helpers && page === 1 ? (
        <>
          <img
            src={so}
            alt="StackOverflow"
            title="Open StackOverflow in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://stackoverflow.com/")
            }
          />
          <img
            src={gh}
            alt="GitHub"
            title="Open GitHub in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://github.com/")
            }
          />
          <img
            src={fa}
            alt="FontAwesome"
            title="Open FontAwesome in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://fontawesome.com/")
            }
          />
          <img
            src={cdn}
            alt="CDN.js"
            title="Open CDN.js in a browser"
            onClick={() => ipcRenderer.send("get-helper", "https://cdnjs.com/")}
          />
          <img
            src={figma}
            alt="Figma"
            title="Open Figma in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://www.figma.com/")
            }
          />
          <img
            src={terminal}
            alt="Terminal"
            title="Open Terminal (Linux/Ubuntu) in a folder"
            onClick={() => {
              const path = dir && dir.path ? dir.path : os.homedir();
              ipcRenderer.send("get-terminal", path);
            }}
          />
        </>
      ) : helpers && page === 2 ? (
        <>
          <img
            src={gitlab}
            alt="Gitlab"
            title="Open Gitlab in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://about.gitlab.com/")
            }
          />
          <img
            src={googleFonts}
            alt="Google Fonts"
            title="Open Google Fonts in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://fonts.google.com/")
            }
          />
          <img
            src={photopea}
            alt="Photopea"
            title="Open Photopea in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://www.photopea.com/")
            }
          />
          <img
            src={wordpress}
            alt="Wordpress"
            title="Open Wordpress in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://wordpress.com/")
            }
          />
          <img
            src={pixabay}
            alt="Pixabay"
            title="Open Pixabay in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://pixabay.com/")
            }
          />
          <img
            src={unsplash}
            alt="Unsplash"
            title="Open Unsplash in a browser"
            onClick={() =>
              ipcRenderer.send("get-helper", "https://unsplash.com/")
            }
          />
        </>
      ) : null}
      {helpers && page < 2 ? (
        <Center title="Next Page">
          <i className="fas fa-forward" onClick={() => setPage(2)} />
        </Center>
      ) : helpers && page > 1 ? (
        <Center title="Previous Page">
          <i className="fas fa-backward" onClick={() => setPage(1)} />
        </Center>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  dir: state.directories,
});

export default connect(mapStateToProps, null)(Helpers);
