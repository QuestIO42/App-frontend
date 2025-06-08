import { Lab } from "@/interfaces/Lab"

export const mockVirtualLabs: Lab[] = [
  {
    link: "https://legacy.vlab.dc.ufscar.br/",
    name: "DE10-standard (Agendamento)",
    description: "Laboratório de atendimento por agendamento",
    teacher: "Ricardo Menotti",
    image: "../../../public/labs/DE10.png",
    alt: "Laboratório disponível apenas para e-mails ufscar.br"
  },
  {
    link: "",
    name: "Tang Primer 20K (Fila)",
    description: "Laboratório de atendimento por fila",
    teacher: "Ricardo Menotti",
    image: "../../../public/labs/tangprimer.png",
    alt: "Laboratório disponível apenas para estudantes matriculados"
  },
]
