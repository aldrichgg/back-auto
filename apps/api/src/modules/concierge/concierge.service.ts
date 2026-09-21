import { Injectable } from '@nestjs/common';

export interface ConciergeService_Service {
  id: string;
  type: string;
  title: string;
  description: string;
  yieldBonus?: string;
}

@Injectable()
export class ConciergeService {
  getServices(): ConciergeService_Service[] {
    return [
      {
        id: '1',
        type: 'museum',
        title: 'Exibição em Museus & Feiras',
        description: 'Seu ativo exposto em feiras internacionais de prestígio. Rendimento adicional de até 3% a.a.',
        yieldBonus: '+3% a.a.',
      },
      {
        id: '2',
        type: 'filming',
        title: 'Cessão para Filmagens & Editoriais',
        description: 'Parcerias com marcas de luxo e produções cinematográficas.',
        yieldBonus: '+1.5% a.a.',
      },
      {
        id: '3',
        type: 'transport',
        title: 'Transporte Especializado',
        description: 'Transporte seguro para leilões Christie\'s, RM Sotheby\'s e Bonhams.',
      },
      {
        id: '4',
        type: 'maintenance',
        title: 'Manutenção Preventiva & Restauração',
        description: 'Manutenção realizada por especialistas certificados pelos fabricantes originais.',
      },
      {
        id: '5',
        type: 'insurance',
        title: "Seguro Internacional Apex Lloyd's",
        description: 'Cobertura global com resseguradoras Lloyd\'s de Londres.',
      },
    ];
  }

  getManager() {
    return {
      name: 'Carlos Eduardo Fonseca',
      title: 'Diretor de Patrimônio & Relação com Investidores',
      photoUrl: 'https://cdn.apexcapital.com.br/team/carlos.jpg',
      whatsapp: '+5511998765432',
      email: 'carlos.fonseca@apexcapital.com.br',
      calendlyUrl: 'https://calendly.com/apex-capital/reuniao',
    };
  }
}
