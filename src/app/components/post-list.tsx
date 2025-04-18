import { Post } from "../components/post"

// Dados de exemplo para simular posts
const examplePosts = [
  {
    id: 1,
    title: "Primeiro dia de outono",
    content:
      "As folhas começam a cair e o ar fica mais fresco. Hoje observei como a natureza se transforma lentamente, trazendo novas cores e sensações. É um lembrete de que a mudança é constante e devemos apreciá-la.",
    date: "16 de abril, 2025",
  },
  {
    id: 2,
    title: "Reflexões sobre um livro",
    content:
      "Terminei de ler aquele romance que estava na minha lista há meses. As personagens pareciam tão reais, quase como amigos. Fiquei pensando em como a ficção pode nos conectar com partes de nós mesmos que nem sabíamos existir.",
    date: "14 de abril, 2025",
  },
  {
    id: 3,
    title: "Café da manhã perfeito",
    content:
      "Hoje preparei um café da manhã especial: pão caseiro com geleia de frutas vermelhas. O aroma preencheu toda a casa e me fez lembrar das manhãs de domingo na casa da minha avó. Pequenos prazeres que fazem toda a diferença.",
    date: "10 de abril, 2025",
  },
]

export function PostList() {
  return (
    <div className="space-y-6">
      {examplePosts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} date={post.date} />
      ))}
    </div>
  )
}
