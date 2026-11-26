import { Categoria, Ingrediente, Receita, Unidade } from '../types';
import { imagens } from './images';

const P: Categoria = 'Carnes e proteínas';
const H: Categoria = 'Hortifruti';
const L: Categoria = 'Laticínios';
const M: Categoria = 'Mercearia';
const T: Categoria = 'Temperos';
const O: Categoria = 'Outros';

const ing = (nome: string, quantidade: number, unidade: Unidade, categoria: Categoria): Ingrediente => ({
  nome, quantidade, unidade, categoria,
});

export const receitas: Receita[] = [
  // ---------- Café da manhã e lanches ----------
  {
    id: 'ovos-mexidos', nome: 'Ovos mexidos com pão', imagem: imagens['ovos-mexidos'],
    refeicoes: ['Café da manhã', 'Lanche'], tempo: 10, custo: 10, porcoes: 2,
    padrao: 'Vegetariano', dietas: ['Alta proteína'],
    alergenos: ['Ovo', 'Glúten', 'Trigo', 'Lactose', 'Leite de vaca'], eletrodomesticos: ['Fogão'],
    ingredientes: [ing('Ovos', 4, 'un', P), ing('Pão', 4, 'un', M), ing('Manteiga', 20, 'g', L), ing('Sal', 2, 'g', T)],
    preparo: [
      'Quebre os ovos em uma tigela, tempere com sal e bata com um garfo.',
      'Derreta a manteiga em uma frigideira em fogo baixo.',
      'Despeje os ovos e mexa devagar até ficarem cremosos.',
      'Sirva com o pão torrado.',
    ],
    nutricao: { kcal: 380, proteina: 20, carbo: 28, gordura: 20 },
  },
  {
    id: 'panqueca-banana', nome: 'Panqueca de banana e aveia', imagem: imagens['panqueca-banana'],
    refeicoes: ['Café da manhã', 'Lanche'], tempo: 15, custo: 8, porcoes: 2,
    padrao: 'Vegetariano', dietas: [],
    alergenos: ['Ovo', 'Glúten'], eletrodomesticos: ['Fogão'],
    ingredientes: [ing('Banana', 2, 'un', H), ing('Ovos', 2, 'un', P), ing('Aveia', 60, 'g', M), ing('Óleo de soja', 5, 'ml', O)],
    preparo: [
      'Amasse as bananas com um garfo até virar um purê.',
      'Misture os ovos e a aveia até formar uma massa homogênea.',
      'Aqueça uma frigideira untada com um fio de óleo.',
      'Cozinhe porções da massa por 2 minutos de cada lado.',
    ],
    nutricao: { kcal: 260, proteina: 10, carbo: 38, gordura: 7 },
  },
  {
    id: 'vitamina-banana', nome: 'Vitamina de banana com aveia', imagem: imagens['vitamina-banana'],
    refeicoes: ['Café da manhã', 'Lanche'], tempo: 5, custo: 9, porcoes: 2,
    padrao: 'Vegetariano', dietas: [],
    alergenos: ['Lactose', 'Leite de vaca', 'Glúten'], eletrodomesticos: ['Liquidificador'],
    ingredientes: [ing('Banana', 3, 'un', H), ing('Leite', 400, 'ml', L), ing('Aveia', 30, 'g', M)],
    preparo: [
      'Coloque o leite, as bananas e a aveia no liquidificador.',
      'Bata por cerca de 1 minuto até ficar liso.',
      'Sirva em seguida, bem gelado.',
    ],
    nutricao: { kcal: 230, proteina: 8, carbo: 40, gordura: 5 },
  },
  {
    id: 'sanduiche-queijo', nome: 'Sanduíche de queijo na chapa', imagem: imagens['sanduiche-queijo'],
    refeicoes: ['Café da manhã', 'Lanche'], tempo: 8, custo: 14, porcoes: 2,
    padrao: 'Vegetariano', dietas: [],
    alergenos: ['Glúten', 'Trigo', 'Lactose', 'Leite de vaca'], eletrodomesticos: ['Fogão'],
    ingredientes: [ing('Pão', 4, 'un', M), ing('Queijo', 120, 'g', L), ing('Manteiga', 15, 'g', L)],
    preparo: [
      'Monte os sanduíches colocando o queijo entre as fatias de pão.',
      'Passe um pouco de manteiga por fora do pão.',
      'Doure em uma frigideira por 2 a 3 minutos de cada lado, até o queijo derreter.',
    ],
    nutricao: { kcal: 340, proteina: 15, carbo: 28, gordura: 18 },
  },
  {
    id: 'salada-frutas', nome: 'Salada de frutas com limão', imagem: imagens['salada-frutas'],
    refeicoes: ['Café da manhã', 'Lanche'], tempo: 10, custo: 10, porcoes: 2,
    padrao: 'Vegano', dietas: [],
    alergenos: [], eletrodomesticos: [],
    ingredientes: [ing('Banana', 2, 'un', H), ing('Maçã', 2, 'un', H), ing('Limão', 1, 'un', H)],
    preparo: [
      'Lave e corte a maçã e a banana em cubos.',
      'Esprema o limão por cima para as frutas não escurecerem.',
      'Misture e sirva gelada.',
    ],
    nutricao: { kcal: 150, proteina: 2, carbo: 36, gordura: 0 },
  },

  // ---------- Almoço e jantar ----------
  {
    id: 'arroz-feijao-frango', nome: 'Arroz, feijão e frango grelhado', imagem: imagens['arroz-feijao-frango'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 45, custo: 30, porcoes: 4,
    padrao: 'Onívoro', dietas: ['Alta proteína'],
    alergenos: [], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Frango', 500, 'g', P), ing('Arroz', 200, 'g', M), ing('Feijão', 200, 'g', M),
      ing('Cebola', 1, 'un', H), ing('Alho', 3, 'un', H), ing('Óleo de soja', 30, 'ml', O), ing('Sal', 8, 'g', T),
    ],
    preparo: [
      'Cozinhe o feijão já demolhado na panela de pressão por cerca de 25 minutos.',
      'Refogue a cebola e o alho no óleo, junte o arroz e a água e cozinhe até secar.',
      'Tempere o frango com sal e alho e grelhe em frigideira quente até dourar dos dois lados.',
      'Sirva tudo junto.',
    ],
    nutricao: { kcal: 520, proteina: 38, carbo: 55, gordura: 14 },
  },
  {
    id: 'macarrao-molho', nome: 'Macarrão ao molho de tomate', imagem: imagens['macarrao-molho'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 25, custo: 16, porcoes: 4,
    padrao: 'Vegano', dietas: [],
    alergenos: ['Glúten', 'Trigo'], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Macarrão', 300, 'g', M), ing('Molho de tomate', 300, 'g', M), ing('Cebola', 1, 'un', H),
      ing('Alho', 2, 'un', H), ing('Azeite', 20, 'ml', O), ing('Orégano', 2, 'g', T), ing('Sal', 5, 'g', T),
    ],
    preparo: [
      'Cozinhe o macarrão em água fervente com sal até ficar al dente.',
      'Refogue a cebola e o alho no azeite.',
      'Junte o molho de tomate e o orégano e deixe apurar por 5 minutos.',
      'Misture o macarrão escorrido ao molho e sirva.',
    ],
    nutricao: { kcal: 380, proteina: 12, carbo: 72, gordura: 5 },
  },
  {
    id: 'frango-assado-batatas', nome: 'Frango assado com batatas', imagem: imagens['frango-assado-batatas'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 60, custo: 34, porcoes: 4,
    padrao: 'Onívoro', dietas: ['Alta proteína'],
    alergenos: [], eletrodomesticos: ['Forno'],
    ingredientes: [
      ing('Frango', 700, 'g', P), ing('Batata', 500, 'g', H), ing('Cebola', 1, 'un', H),
      ing('Alho', 3, 'un', H), ing('Colorau', 5, 'g', T), ing('Sal', 8, 'g', T), ing('Óleo de soja', 30, 'ml', O),
    ],
    preparo: [
      'Tempere o frango com sal, alho amassado e colorau e deixe descansar por 15 minutos.',
      'Corte as batatas e a cebola e espalhe em uma assadeira com um fio de óleo.',
      'Coloque o frango por cima e leve ao forno a 200 °C.',
      'Asse por cerca de 45 minutos, virando uma vez, até dourar.',
    ],
    nutricao: { kcal: 480, proteina: 40, carbo: 30, gordura: 22 },
  },
  {
    id: 'carne-moida-legumes', nome: 'Carne moída com legumes', imagem: imagens['carne-moida-legumes'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 35, custo: 32, porcoes: 4,
    padrao: 'Onívoro', dietas: ['Alta proteína', 'Low carb'],
    alergenos: [], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Carne moída', 500, 'g', P), ing('Abobrinha', 2, 'un', H), ing('Cenoura', 2, 'un', H),
      ing('Cebola', 1, 'un', H), ing('Alho', 2, 'un', H), ing('Molho de tomate', 150, 'g', M), ing('Sal', 6, 'g', T),
    ],
    preparo: [
      'Refogue a cebola e o alho e junte a carne moída, mexendo até soltar.',
      'Acrescente a cenoura e a abobrinha em cubos pequenos.',
      'Adicione o molho de tomate e o sal.',
      'Tampe e cozinhe por 15 minutos em fogo baixo.',
    ],
    nutricao: { kcal: 340, proteina: 30, carbo: 14, gordura: 18 },
  },
  {
    id: 'omelete-legumes', nome: 'Omelete de legumes', imagem: imagens['omelete-legumes'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 15, custo: 14, porcoes: 2,
    padrao: 'Vegetariano', dietas: ['Alta proteína', 'Low carb'],
    alergenos: ['Ovo', 'Lactose', 'Leite de vaca'], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Ovos', 6, 'un', P), ing('Tomate', 2, 'un', H), ing('Cebola', 1, 'un', H),
      ing('Queijo', 80, 'g', L), ing('Sal', 3, 'g', T), ing('Óleo de soja', 10, 'ml', O),
    ],
    preparo: [
      'Pique o tomate e a cebola em cubos pequenos.',
      'Bata os ovos com o sal e misture os legumes e o queijo.',
      'Despeje em uma frigideira untada em fogo médio.',
      'Tampe e cozinhe até firmar, virando se preferir.',
    ],
    nutricao: { kcal: 360, proteina: 26, carbo: 6, gordura: 26 },
  },
  {
    id: 'strogonoff-frango', nome: 'Strogonoff de frango', imagem: imagens['strogonoff-frango'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 40, custo: 32, porcoes: 4,
    padrao: 'Onívoro', dietas: ['Alta proteína'],
    alergenos: ['Lactose', 'Leite de vaca'], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Frango', 500, 'g', P), ing('Creme de leite', 200, 'g', L), ing('Molho de tomate', 100, 'g', M),
      ing('Cebola', 1, 'un', H), ing('Arroz', 200, 'g', M), ing('Óleo de soja', 15, 'ml', O), ing('Sal', 6, 'g', T),
    ],
    preparo: [
      'Corte o frango em cubos e tempere com sal.',
      'Doure o frango e a cebola picada no óleo.',
      'Junte o molho de tomate e cozinhe por 10 minutos.',
      'Desligue o fogo, misture o creme de leite e sirva com arroz.',
    ],
    nutricao: { kcal: 510, proteina: 36, carbo: 50, gordura: 18 },
  },
  {
    id: 'sopa-legumes', nome: 'Sopa de legumes', imagem: imagens['sopa-legumes'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 35, custo: 14, porcoes: 4,
    padrao: 'Vegano', dietas: [],
    alergenos: [], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Batata', 300, 'g', H), ing('Cenoura', 2, 'un', H), ing('Abobrinha', 1, 'un', H),
      ing('Cebola', 1, 'un', H), ing('Alho', 2, 'un', H), ing('Azeite', 15, 'ml', O), ing('Sal', 6, 'g', T),
    ],
    preparo: [
      'Refogue a cebola e o alho no azeite.',
      'Junte a batata, a cenoura e a abobrinha em cubos.',
      'Cubra com água, adicione sal e cozinhe por 25 minutos.',
      'Sirva inteira ou bata parte no liquidificador para engrossar.',
    ],
    nutricao: { kcal: 150, proteina: 3, carbo: 28, gordura: 3 },
  },
  {
    id: 'arroz-feijao-ovo', nome: 'Arroz, feijão e ovo frito', imagem: imagens['arroz-feijao-ovo'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 30, custo: 16, porcoes: 4,
    padrao: 'Vegetariano', dietas: [],
    alergenos: ['Ovo'], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Arroz', 200, 'g', M), ing('Feijão', 200, 'g', M), ing('Ovos', 4, 'un', P),
      ing('Cebola', 1, 'un', H), ing('Alho', 2, 'un', H), ing('Óleo de soja', 30, 'ml', O), ing('Sal', 8, 'g', T),
    ],
    preparo: [
      'Cozinhe o feijão na panela de pressão e tempere com cebola e alho refogados.',
      'Prepare o arroz refogando o alho no óleo e cozinhando com água e sal.',
      'Frite os ovos em óleo quente até a clara firmar.',
      'Monte os pratos e sirva.',
    ],
    nutricao: { kcal: 450, proteina: 18, carbo: 62, gordura: 13 },
  },
  {
    id: 'peixe-grelhado-legumes', nome: 'Peixe grelhado com brócolis', imagem: imagens['peixe-grelhado-legumes'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 30, custo: 36, porcoes: 2,
    padrao: 'Onívoro', dietas: ['Alta proteína', 'Low carb'],
    alergenos: ['Peixe'], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Peixe', 400, 'g', P), ing('Brócolis', 300, 'g', H), ing('Cenoura', 1, 'un', H),
      ing('Limão', 1, 'un', H), ing('Azeite', 15, 'ml', O), ing('Sal', 4, 'g', T),
    ],
    preparo: [
      'Tempere o peixe com sal e suco de limão e deixe por 10 minutos.',
      'Grelhe em frigideira com azeite por 4 minutos de cada lado.',
      'Cozinhe o brócolis e a cenoura no vapor ou em água fervente por 5 minutos.',
      'Sirva o peixe com os legumes.',
    ],
    nutricao: { kcal: 310, proteina: 36, carbo: 10, gordura: 13 },
  },
  {
    id: 'salada-atum', nome: 'Salada de atum', imagem: imagens['salada-atum'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 10, custo: 20, porcoes: 2,
    padrao: 'Onívoro', dietas: ['Alta proteína', 'Low carb'],
    alergenos: ['Peixe'], eletrodomesticos: [],
    ingredientes: [
      ing('Atum em lata', 2, 'un', P), ing('Alface', 1, 'un', H), ing('Tomate', 2, 'un', H),
      ing('Cebola', 1, 'un', H), ing('Limão', 1, 'un', H), ing('Azeite', 15, 'ml', O), ing('Sal', 2, 'g', T),
    ],
    preparo: [
      'Lave e rasgue a alface; corte o tomate e a cebola.',
      'Escorra o atum e misture aos legumes.',
      'Tempere com azeite, limão e sal e sirva.',
    ],
    nutricao: { kcal: 250, proteina: 26, carbo: 9, gordura: 12 },
  },
  {
    id: 'legumes-salteados', nome: 'Arroz com legumes salteados', imagem: imagens['legumes-salteados'],
    refeicoes: ['Almoço', 'Jantar'], tempo: 25, custo: 20, porcoes: 4,
    padrao: 'Vegano', dietas: [],
    alergenos: ['Soja'], eletrodomesticos: ['Fogão'],
    ingredientes: [
      ing('Arroz', 200, 'g', M), ing('Brócolis', 200, 'g', H), ing('Cenoura', 2, 'un', H),
      ing('Abobrinha', 1, 'un', H), ing('Alho', 2, 'un', H), ing('Molho de soja', 30, 'ml', O), ing('Azeite', 15, 'ml', O),
    ],
    preparo: [
      'Cozinhe o arroz com água e uma pitada de sal.',
      'Corte os legumes em pedaços pequenos.',
      'Salteie o alho e os legumes no azeite em fogo alto por 5 minutos.',
      'Finalize com o molho de soja e sirva sobre o arroz.',
    ],
    nutricao: { kcal: 300, proteina: 8, carbo: 56, gordura: 5 },
  },
];

export const buscarReceita = (id: string) => receitas.find((r) => r.id === id);
