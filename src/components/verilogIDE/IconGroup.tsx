import PlayIcon from "../svgComponents/icons/PlayIcon";
import SaveIcon from "../svgComponents/icons/SaveIcon";
import WaveformIcon from "../svgComponents/icons/WaveformIcon";

interface IconGroupProps {
  onIconClick: (value: string) => void;
  isModified: boolean;
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
        <div className="cursor-pointer flex gap-2 transition transform duration-300 active:scale-90" onClick={() => handleClick('waveform')} >
          <WaveformIcon></WaveformIcon>
          <p>waveform</p>
        </div>

        <div className="cursor-pointer flex gap-2" onClick={() => handleClick('save')} >
          <SaveIcon></SaveIcon>
          <p className={IconGroup.isModified ? "text-cinza transition transform duration-300 active:scale-90" : "text-[#a8a7a7]"}>salvar</p>
        </div>

        <div className="cursor-pointer flex gap-2 transition transform duration-300 active:scale-90" onClick={() => handleClick('play')} >
          <PlayIcon></PlayIcon>
          <p>run</p>
        </div>
      </div>
    </>
  )
}
