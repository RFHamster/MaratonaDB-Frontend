export class ProblemaTelaInicial {
    Id?: string;
    IdOriginal?: string;
    titulo?: string;
    origem?: string;
    tema?: string;
    faixa?: string;
}

export class ProblemaInsert {
    usuario?: string;
	titulo?: string;
	idOriginal?: string;
	origem?: string;
	faixa?: string;
	assuntos?: string[];
	problema?: Set<File>;
	solucao?: Set<File>;
	conteudoDicas?: string[];
}