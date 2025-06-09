import { Lab } from "@/interfaces/Lab"

export const mockVirtualLabs: Lab[] = [
  {
    link: "https://legacy.vlab.dc.ufscar.br/",
    name: "DE10-standard",
    description: "Laboratório de atendimento por agendamento",
    type: "Agendamento",
    image: "../../../public/labs/DE10.png",
    alt: "Laboratório disponível apenas para e-mails ufscar.br"
  },
  {
    link: "https://queue.vlab.dc.ufscar.br/",
    name: "Tang Primer 20K (Fila)",
    description: "Laboratório de atendimento por fila",
    type: "Fila - Inscritos no GitHub",
    image: "../../../public/labs/tangprimer.png",
    alt: "Laboratório disponível apenas para estudantes matriculados"
  },
]
