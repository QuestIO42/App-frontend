import PlayIcon from "../svgComponents/icons/PlayIcon";
import WaveformIcon from "../svgComponents/icons/WaveformIcon";

interface IconGroupProps {
  onIconClick: (value: string) => void;
  disabled: boolean;
}
export default function IconGroup(IconGroup: IconGroupProps) {

  const handleClick = (value: string) => {
    switch(value){
      case 'waveform':
        if (!IconGroup.disabled) IconGroup.onIconClick(value);
        break;
      case 'play':
        if (!IconGroup.disabled) IconGroup.onIconClick(value);
        break;
      default:
        console.log("oh no")
    }
  }

  return(
    <>
      <div className="flex gap-8 flex-row">
        <div className={`flex gap-2 ${IconGroup.disabled ? "" : "cursor-pointer transition transform duration-300 active:scale-90"}`} onClick={() => handleClick('waveform')} >
          <WaveformIcon></WaveformIcon>
          <p>waveform</p>
        </div>
        <div className={`flex gap-2 ${IconGroup.disabled ? "" : "cursor-pointer transition transform duration-300 active:scale-90"}`} onClick={() => handleClick('play')} >
          <PlayIcon></PlayIcon>
          <p>run</p>
        </div>
      </div>
    </>
  )
}
