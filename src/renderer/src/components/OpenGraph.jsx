import { useEffect, useState } from "react";
import classes from "../css/openGraph.module.css"


function OpenGraph({ url, src, className }) {
  const [ogData, setOgData] = useState(undefined);

  useEffect(() => {
    if (ogData === undefined) {
      window.electron.ipcRenderer.invoke("fetch:og", url).then((graph) => {
        setOgData(graph.result)
      })
    }
  }, ogData)

  function openUrl() {
    window.electron.ipcRenderer.invoke('open', url).then()
  }



  return (
    <div className={className}>
      {ogData ?
        <div className={classes.container} onClick={openUrl}>
          <span className={classes.title}>{ogData.ogTitle}</span>
          <span className={classes.discription}>{ogData.ogDescription}</span>
          <img className={classes.img} src={ogData.ogImage[0].url} />
          <div className={classes.src}>{ogData.favicon ? <img src={ogData.favicon} /> : ""}<span>{ogData.ogSiteName ? ogData.ogSiteName : src}</span></div>
        </div> : ""
      }
    </div >
  )
}


export default OpenGraph;
