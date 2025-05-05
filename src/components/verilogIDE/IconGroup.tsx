import PlayIcon from "../svgComponents/icons/PlayIcon";
import SaveIcon from "../svgComponents/icons/SaveIcon";
import WaveformIcon from "../svgComponents/icons/WaveformIcon";

interface IconGroupProps {
  onIconClick: (value: string) => void;
}
export default function IconGroup(IconGroup: IconGroupProps) {

  const handleClick = (value: string) => {
    switch(value){
      case 'waveform':
        IconGroup.onIconClick(value)
        break;
      case 'save':
        IconGroup.onIconClick(value)
        break;
      case 'play':
        IconGroup.onIconClick(value)
        break;
      default:
        console.log("oh no")
    }
  }

  return(
    <>
      <div className="flex gap-8 flex-row">
        <div className="cursor-pointer flex gap-2" onClick={() => handleClick('waveform')} >
          <WaveformIcon></WaveformIcon>
          <p>waveform</p>
        </div>

        <div className="cursor-pointer flex gap-2" onClick={() => handleClick('save')} >
          <SaveIcon></SaveIcon>
          <p>salvar</p>
        </div>

        <div className="cursor-pointer flex gap-2" onClick={() => handleClick('play')} >
          <PlayIcon></PlayIcon>
          <p>run</p>
        </div>
      </div>
    </>
  )
}
