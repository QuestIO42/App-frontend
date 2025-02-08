import ModalCurso from "@/components/ModalCurso";
import Button from "@/components/utility/Button";
import { useState } from "react";

export default function Test() {

  const [modalVisivel, setModal] = useState(false)
  const mostrarModal = () => {
    setModal(true)
  }



  return(
    <div>
      <Button
        onClick={mostrarModal}
        className="text-verde-300"
        variant="secondary"
        text="criar novo curso"
        size="small"
      />
      { modalVisivel &&
        <div className="mb-14 sm:mb-0">
          <ModalCurso onClose={()=>setModal(false)}  />
        </div>
      }

      </div>
  )
}
