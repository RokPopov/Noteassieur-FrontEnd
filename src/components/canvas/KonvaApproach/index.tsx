
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Timenote } from "../../../global"
import { stageAddNote, stageEditNote, stageNewtimenote, stageRemoveNote, stageSetTimeIn, stageSetTimeOut } from "../../../store/timenotes/actions"
import { selectAllTimenotes, selectMinMaxValueById, selectTimenotes } from "../../../store/timenotes/selectors"

export default function KonvaApproach() {
  const dispatch = useDispatch()




// import Player from "../VideoPlayer/Index";
import VideoList from "../VideoPlayer/VideoList";

export default function KonvaApproach() {
  const allNotes = useSelector(selectAllNotes);

  const dispatch = useDispatch();


  const [timelineValue, setTimeLine] = useState(0)
  const [playPause, setPlayPause] = useState(false)

  useEffect(() => {
    if (playPause) {
      setTimeout(() => {
        setTimeLine(timelineValue + 1)
      }, 1000)
    }
  }, [timelineValue, playPause])

  const notesAtPointInTime = useSelector(selectTimenotes(timelineValue))

  function timelineout(e: any) {
    console.log(e.target.value)
    setTimeLine(parseInt(e.target.value))
  }

  function removeNote(id: number, timenoteId: number) {
    dispatch(stageRemoveNote(id, timenoteId))
  }

  function newNote() {
    

    dispatch(stageAddNote(timelineValue))
  }

  function newTimenote() {
    dispatch(stageNewtimenote(timelineValue))
  }

  const buttonshow = notesAtPointInTime.length === 0 ? true : false

  const [id, setId] = useState<number>(0)
  const minMaxValue: Timenote | undefined = useSelector(selectMinMaxValueById(id))

  function setRange(id: number) {
    setId(id)
  }

  console.log(typeof minMaxValue?.timeIn)

  function setTimeIn(e: any) {
    const timeIn = e.target.value

    dispatch(stageSetTimeIn(timeIn, id))
  }

  function setTimeOut(e: any) {
    const timeOut = e.target.value

    dispatch(stageSetTimeOut(timeOut, id))
  }

  function editNote(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value

    const [noteId, timenoteId] = e.target.id.split(" ")

    dispatch(stageEditNote(content, parseInt(noteId), parseInt(timenoteId)))
  }

  const allTimeNotes = useSelector(selectAllTimenotes)

  const [videoLength, setVideoLength] = useState(500)

  const [deleteBtn, setDelete] = useState(false)
  const [opacityDelete, setstate] = useState(1)

  function hoverIn() {
    setDelete(!deleteBtn)
  }

  function hoverAway() {
    setTimeout(() => {
      setDelete(!deleteBtn)
    }, 1000)
  }

  return (
    <div>
      <div style={{ margin: "10px", display: "grid", gridTemplateColumns: `200px 200px` }}>
        <div style={{ border: "1px solid black", width: "200px", height: "200px", margin: "auto" }}>
          {notesAtPointInTime.map((timenote) => {
            return timenote.notes.map((note) => {
              return (
                <div>
                  {note.id === 1 ? (
                    <div>
                      {timenote.timeOut - timelineValue > 3 ? (
                        <div>
                          <small>range: </small>
                          <small>{timenote.timeIn} - </small>
                          <small>{timenote.timeOut} </small>
                          <button onClick={() => setRange(timenote.id)}>✍︎</button>
                        </div>
                      ) : (
                        <small>{timenote.timeOut - timelineValue} sec left</small>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {deleteBtn ? (
                    <button style={{ fontSize: "4px", opacity: `${opacityDelete}` }} onClick={() => removeNote(note.id, timenote.id)}>
                      ❌
                    </button>
                  ) : (
                    ""
                  )}
                  <textarea onMouseLeave={hoverAway} onMouseOver={hoverIn} draggable id={`${note.id.toString()} ${timenote.id.toString()}`} onChange={editNote} value={note.content} name="" cols={13} rows={3}></textarea>
                </div>
              )
            })
          })}
          <button style={{ display: `${!buttonshow ? `none` : ``}`, fontSize: "10px" }} onClick={newTimenote}>
            📝 new notes
          </button>
          <button style={{ fontSize: "9px" }} disabled={buttonshow} onClick={newNote}>
            ➕
          </button>
        </div>
        <div></div>
      </div>
      <div style={{ position: "relative", width: "500px", height: "15px", margin: "auto", boxShadow: "1px 1px 1px rgba(1,0,0,0.05)" }}>
        {allTimeNotes.map((timenote) => {
          return <small style={{ width: `${(500 / videoLength) * (timenote.timeOut - timenote.timeIn)}px`, position: "absolute", left: `${(500 / videoLength) * timenote.timeIn}px`, color: "#98B6D3", border: "none", fontSize: "2xp", boxShadow: "0px 1px 1px rgba(0,0,0,0.2)" }}>✍︎</small>
        })}
      </div>
      <input onChange={timelineout} defaultValue={timelineValue} style={{ width: "500px" }} type="range" min="0" max={`${videoLength}`} />
      <div>
        <button onClick={() => setPlayPause(!playPause)}>{!playPause ? "play" : "pause"}</button>
      </div>
      <p>time {timelineValue} in seconds</p>

      {id !== 0 ? (
        <div style={{ width: "500px", margin: "auto" }}>
          <small>In point: {minMaxValue?.timeIn}</small>
          <input onChange={setTimeIn} value={minMaxValue?.timeIn} style={{ width: "500px" }} type="range" min="0" max={`${videoLength}`} />
          <small>Out point: {minMaxValue?.timeOut}</small>
          <input onChange={setTimeOut} value={minMaxValue?.timeOut} style={{ width: "500px" }} type="range" min="0" max={`${videoLength}`} />
        </div>
      ) : (
        ""
      )}
    </div>
  )

    dispatch(stageNewNote());
  }

  function removeNote(id: number) {
    dispatch(stageRemoveNote(id));
  }

  function changeNote(e: textAreaOnChange) {
    const content = e.target.value;
    const id = parseInt(e.target.id);

    dispatch(stageChangeNote(id, content));
  }

  const [show, setShow] = useState(true);

  function minimize() {
    setShow(!show);
  }

  const display = show ? "none" : "";
  const gridsize = show ? 100 : 200;

  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: `${gridsize}px 200px` }}
      >
        <div>
          <button onClick={minimize} style={{ fontSize: "9px", margin: "5px" }}>
            {!show ? "minimize" : "maximize"}
          </button>
          <div style={{ display: `${display}` }}>
            {allNotes.map((note) => {
              return (
                <div key={note.id}>
                  <textarea
                    id={note.id.toString()}
                    onChange={changeNote}
                    defaultValue={note.content}
                    name=""
                    cols={13}
                    rows={3}
                  ></textarea>
                  <button onClick={() => removeNote(note.id)}>-</button>
                </div>
              );
            })}
            <br />
            <button onClick={newNote}>Add a note</button>
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid black",
              width: "400px",
              height: "200px",
              margin: "auto",
            }}
          >
            {allNotes.map((note) => {
              return <p>{note.content.length > 1 ? note.content : "_"}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
