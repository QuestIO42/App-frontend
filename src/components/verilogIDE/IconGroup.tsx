import PlayIcon from "../svgComponents/icons/PlayIcon";
import SaveIcon from "../svgComponents/icons/SaveIcon";
import WaveformIcon from "../svgComponents/icons/WaveformIcon";

interface IconGroupProps {
  onIconClick: (value: string) => void;
  disabled: boolean;
}
export default function IconGroup({ onIconClick, disabled }: IconGroupProps) {

  const handleClick = (value: string) => {
    switch(value){
      case 'waveform':
        if (!disabled) onIconClick(value)
        break;
      case 'play':
        if (!disabled) onIconClick(value)
        break;
      default:
        console.log("oh no")
    }
  }

  return(
    <>
      <div className="flex gap-8 flex-row">
        <div className={`cursor-pointer flex gap-2 ${disabled ? "" : "transition transform duration-300 active:scale-90"}`} onClick={() => handleClick('waveform')} >
          <WaveformIcon></WaveformIcon>
          <p>waveform</p>
        </div>
        <div className={`cursor-pointer flex gap-2 ${disabled ? "" : "transition transform duration-300 active:scale-90"}`} onClick={() => handleClick('play')} >
          <PlayIcon></PlayIcon>
          <p>run</p>
        </div>
      </div>
    </>
  )
}
