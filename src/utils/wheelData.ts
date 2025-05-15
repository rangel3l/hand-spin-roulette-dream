
export interface WheelItem {
  text: string;
  fullscreenText: string;
  explanation: string;
}

// Definição dos 27 termos do sistema reprodutor para a roleta
// Os números de 1 a 27 na roleta correspondem a cada um dos termos
export const wheelItems: WheelItem[] = [
  // Posição 0 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 1 - Vesícula Seminal
  {
    text: "1",
    fullscreenText: "1",
    explanation: "Vesícula Seminal: Glândula que produz parte do líquido seminal, rico em nutrientes para os espermatozoides."
  },
  // Posição 2 - Tubas Uterinas
  {
    text: "2",
    fullscreenText: "2",
    explanation: "Tubas Uterinas: Tubos que conectam os ovários ao útero e são local de fecundação."
  },
  // Posição 3 - Ovários
  {
    text: "3",
    fullscreenText: "3",
    explanation: "Ovários: Glândulas femininas que produzem ovócitos e hormônios sexuais."
  },
  // Posição 4 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 5 - Vagina
  {
    text: "4",
    fullscreenText: "4",
    explanation: "Vagina: Canal que conecta o útero ao exterior, por onde passam os espermatozoides e a menstruação e por onde ocorre o parto."
  },
  // Posição 6 - Epidídimo
  {
    text: "5",
    fullscreenText: "5",
    explanation: "Epidídimo: Local onde os espermatozoides amadurecem e são armazenados."
  },
  // Posição 7 - Uretra
  {
    text: "6",
    fullscreenText: "6",
    explanation: "Uretra: Canal pelo qual a urina e o sêmen são expelidos no sistema reprodutor masculino."
  },
  // Posição 8 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 9 - Período Fértil
  {
    text: "7",
    fullscreenText: "7",
    explanation: "Período Fértil: Fase do ciclo menstrual com maior chance de engravidar, ocorrendo em torno da ovulação."
  },
  // Posição 10 - Endométrio
  {
    text: "8",
    fullscreenText: "8",
    explanation: "Endométrio: Camada interna do útero onde o embrião se implanta; é descamado durante a menstruação se não houver fecundação."
  },
  // Posição 11 - Testículos
  {
    text: "9",
    fullscreenText: "9",
    explanation: "Testículos: Órgãos que produzem espermatozoides e testosterona, fundamentais para a reprodução e desenvolvimento de características sexuais masculinas."
  },
  // Posição 12 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 13 - Bolsa Escrotal
  {
    text: "10",
    fullscreenText: "10",
    explanation: "Bolsa Escrotal: Bolsa que contém e protege os testículos, regulando sua temperatura para a produção de espermatozoides."
  },
  // Posição 14 - Menstruação
  {
    text: "11",
    fullscreenText: "11",
    explanation: "Menstruação: Descamação periódica do endométrio, parte do ciclo menstrual feminino."
  },
  // Posição 15 - Ductos Deferentes
  {
    text: "12",
    fullscreenText: "12",
    explanation: "Ductos Deferentes: Canais que transportam espermatozoides dos testículos até a uretra."
  },
  // Posição 16 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 17 - Ejaculação
  {
    text: "13",
    fullscreenText: "13",
    explanation: "Ejaculação: Processo pelo qual o sêmen é expelido através da uretra durante o orgasmo."
  },
  // Posição 18 - Sêmen
  {
    text: "14",
    fullscreenText: "14",
    explanation: "Sêmen: Fluido que contém espermatozoides e é liberado durante a ejaculação."
  },
  // Posição 19 - Fecundação
  {
    text: "15",
    fullscreenText: "15",
    explanation: "Fecundação: União do gameta masculino (espermatozoide) com o gameta feminino (ovócito) para formar um novo ser."
  },
  // Posição 20 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 21 - Pênis
  {
    text: "16",
    fullscreenText: "16",
    explanation: "Pênis: Órgão masculino responsável pela excreção de urina e deposição do sêmen no trato reprodutivo feminino."
  },
  // Posição 22 - Útero
  {
    text: "17",
    fullscreenText: "17",
    explanation: "Útero: Órgão muscular feminino onde o feto se desenvolve durante a gravidez."
  },
  // Posição 23 - Próstata
  {
    text: "18",
    fullscreenText: "18",
    explanation: "Próstata: Glândula masculina que produz parte do líquido seminal e envolve a uretra."
  },
  // Posição 24 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 25 - Espermatozoide
  {
    text: "19",
    fullscreenText: "19",
    explanation: "Espermatozoide: Célula reprodutora masculina que fecunda o óvulo."
  },
  // Posição 26 - Óvulo
  {
    text: "20",
    fullscreenText: "20",
    explanation: "Óvulo: Célula reprodutora feminina que, quando fecundada, desenvolve-se em um embrião."
  },
  // Posição 27 - Clitóris
  {
    text: "21",
    fullscreenText: "21",
    explanation: "Clitóris: Órgão feminino altamente sensível, importante para o prazer sexual."
  },
  // Posição 28 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 29 - Lábios Vaginais
  {
    text: "22",
    fullscreenText: "22",
    explanation: "Lábios Vaginais: Dobras de pele que protegem a entrada da vagina."
  },
  // Posição 30 - Vulva
  {
    text: "23",
    fullscreenText: "23",
    explanation: "Vulva: Conjunto de órgãos genitais externos femininos."
  },
  // Posição 31 - Hormônios Sexuais
  {
    text: "24",
    fullscreenText: "24",
    explanation: "Hormônios Sexuais: Substâncias que regulam as funções reprodutivas e características sexuais secundárias."
  },
  // Posição 32 - AGAIN
  {
    text: "AG",
    fullscreenText: "AGAIN",
    explanation: "Você tem direito a uma nova rodada! Gire novamente."
  },
  // Posição 33 - Puberdade
  {
    text: "25",
    fullscreenText: "25",
    explanation: "Puberdade: Período de desenvolvimento em que o corpo se torna capaz de reprodução."
  },
  // Posição 34 - Placenta
  {
    text: "26",
    fullscreenText: "26",
    explanation: "Placenta: Órgão temporário que fornece oxigênio e nutrientes ao feto durante a gravidez."
  },
  // Posição 35 - Cordão Umbilical
  {
    text: "27",
    fullscreenText: "27",
    explanation: "Cordão Umbilical: Estrutura que conecta o feto à placenta, transportando nutrientes e resíduos."
  },
];

