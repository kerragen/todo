import { useState, useEffect, useRef } from 'react'

function Timer({ timerMin = 0, timerSec = 0 }) {
  const STATUS = {
    STARTED: false,
  }

  const [minutes, setMinutes] = useState(timerMin)
  const [seconds, setSeconds] = useState(timerSec)
  const [status, setStatus] = useState(STATUS.STARTED)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (status) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalRef.current)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [minutes, seconds, status])

  const onTimerStart = () => {
    setStatus(true)
  }

  const onTimerStop = () => {
    setStatus(false)
  }

  return (
    <span>
      <div>
        <button className="icon icon-play" type="button" aria-label="Start timer" onClick={onTimerStart} />
        <button className="icon icon-pause" type="button" aria-label="Pause timer" onClick={onTimerStop} />
        <span className="timer">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
    </span>
  )
}

export default Timer
