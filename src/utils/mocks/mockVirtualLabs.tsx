import { Lab } from "@/interfaces/Lab"

export const mockVirtualLabs: Lab[] = [
  {
    link: "https://legacy.vlab.dc.ufscar.br/",
    name: "DE10-standard",
    description: "Laboratório de atendimento por agendamento",
    type: "Agendamento",
    image: "./labs/DE10.png",
    alt: "Laboratório disponível apenas para e-mails ufscar.br"
  },
  {
    link: "https://legacy.vlab.dc.ufscar.br/camera.php",
    name: "Tang Primer 20K",
    description: "Laboratório de atendimento por fila",
    type: "Fila - Inscritos no GitHub",
    image: "./labs/tangprimer.png",
    alt: "Laboratório disponível apenas para estudantes matriculados"
  },
]
