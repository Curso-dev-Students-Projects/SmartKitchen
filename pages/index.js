function Home() {
	return (
		<>
			<div className="container">
				<h1>
					<code>
						O SmartKitchen será um sistema de gerenciamento de estoque residencial. Com ele,
						pode-se controlar o que entra e sai da sua despensa, recebe alertas sobre produtos
						próximos do vencimento e até sugestões de receitas usando os ingredientes disponíveis.
					</code>
				</h1>
			</div>
			<style jsx>{`
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				html,
				body {
					height: 100%;
					width: 100%;
					overflow: hidden;
					font-family: "Helvetica", sans-serif;
				}

				.container {
					position: fixed; /* Mantém a div fixa na tela */
					top: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #1e1e2e;
				}

				h1 {
					color: white;
					background-color: #282843;
					padding: 20px;
					border-radius: 10px;
					text-align: center;
					max-width: 90%; /* Limita a largura para evitar que fique muito grande */
					word-wrap: break-word; /* Garante que o texto quebre corretamente */
				}

				code {
					color: lightblue;
				}

				b {
					color: blue;
				}
			`}</style>
		</>
	);
}

export default Home;
