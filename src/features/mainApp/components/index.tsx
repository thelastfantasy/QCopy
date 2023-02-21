import { writeText } from "@tauri-apps/api/clipboard";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

function MainApp() {
  const [filenames, setFilenames] = useState<string[]>([]);
  const [shortNames, setShortNames] = useState<string[]>([]);
  const [showShortNames, setShowShortNames] = useState(false);

  async function copyFilename(copyShort = false) {
    if (!filenames || filenames.length === 0) return;

    if (copyShort) {
      writeText(shortNames.join("\n"));
    } else {
      writeText(filenames.join("\n"));
    }
    // const yes = await ask("确定操作?", "确认");
  }

  async function fileDrop() {
    const unlisten = await appWindow.onFileDropEvent((event) => {
      if (event.payload.type === "hover") {
        console.log("User hovering", event.payload.paths);
      } else if (event.payload.type === "drop") {
        console.log("User dropped", event.payload.paths);
        setFilenames(event.payload.paths);
      } else {
        console.log("File drop cancelled");
      }
    });
  }

  async function filterVideoFilesAndCopyFileName(paths: string[]) {
    const videoExtensions = [".mkv", ".mp4", ".webm", ".rm", ".rmvb", ".avi"];

    const noExtensionFiles = paths.map((path) => {
      for (const ext of videoExtensions) {
        if (path.endsWith(ext)) {
          return path.slice(0, -ext.length);
        }
      }
      return path;
    });

    writeText(noExtensionFiles.join("\n"));
  }

  function clearFiles() {
    setFilenames([]);
  }

  useEffect(() => {
    fileDrop();
  }, []);

  useEffect(() => {
    setShortNames(filenames.map((file) => file.split("\\").pop() || ""));
  }, [filenames]);

  function ActionBar() {
    return filenames.length > 0 ? (
      <div>
        <div>
          <p style={{ color: "skyblue", textAlign: "left", paddingLeft: 20 }}>
            文件数：{filenames.length}
          </p>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showShortNames"
              checked={showShortNames}
              onChange={() => setShowShortNames(!showShortNames)}
            />
            {showShortNames ? "显示文件名" : "显示完整路径"}
          </label>
        </div>
        <button
          onClick={() => filterVideoFilesAndCopyFileName(shortNames)}
          title="* 当前去后缀名功能仅对视频文件有效"
        >
          复制无后缀文件名
        </button>
        &nbsp;
        <button onClick={() => copyFilename(true)}>复制文件名</button>&nbsp;
        <button onClick={() => copyFilename()}>复制完整路径</button>&nbsp;
        <button style={{ background: "#f66" }} onClick={clearFiles}>
          清空
        </button>
      </div>
    ) : (
      <></>
    );
  }

  return (
    <>
      <div className="container">
        <h1>拖拽文件到窗口内</h1>

        <ActionBar />

        <div
          className="file-list"
          style={{ background: filenames.length ? "#fff" : "#2f2f2f" }}
        >
          <ul>
            {showShortNames
              ? shortNames.map((file, index) => <li key={index}>{file}</li>)
              : filenames.map((file, index) => <li key={index}>{file}</li>)}
          </ul>
        </div>

        {/* <ActionBar /> */}
      </div>
    </>
  );
}

export default MainApp;
