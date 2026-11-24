# Guia simples: enviar o projeto para o GitHub usando PowerShell

Este guia mostra como colocar a landing page Mordi em um repositório do GitHub. Os comandos são executados no PowerShell do Windows.

## 1. Extraia o ZIP

1. Baixe o arquivo ZIP do projeto.
2. Clique com o botão direito nele e escolha **Extrair tudo**.
3. Deixe a pasta extraída em um local fácil de encontrar, como a Área de Trabalho.
4. Confirme que dentro da pasta estão `index.html`, `style.css`, `script.js` e `experiencia.html`.

**Importante sobre o vídeo:** coloque seu arquivo `videotop.mp4` dentro dessa mesma pasta, junto dos arquivos HTML. O nome precisa ser exatamente `videotop.mp4`.

## 2. Crie um repositório no GitHub

1. Entre em [https://github.com](https://github.com) e faça login.
2. Clique no botão **New repository**.
3. Escolha um nome, por exemplo `landing-mordi`.
4. Selecione **Public** se quiser publicar o site pelo GitHub Pages.
5. Para este primeiro envio, deixe desmarcadas as opções de README, `.gitignore` e licença. O projeto já terá seus próprios arquivos.
6. Clique em **Create repository**.
7. Na página seguinte, copie o endereço HTTPS do repositório. Ele será parecido com `https://github.com/SEU-USUARIO/landing-mordi.git`.

## 3. Abra o PowerShell dentro da pasta do projeto

A maneira mais simples:

1. Abra a pasta extraída no Explorador de Arquivos.
2. Clique na barra de endereço da pasta.
3. Digite `powershell` e pressione **Enter**.

O PowerShell abrirá diretamente dentro da pasta correta. Assim, você não precisa escrever o caminho manualmente.

## 4. Confira se o Git está instalado

Digite:

```powershell
git --version
```

Se aparecer algo como `git version 2.x.x`, está tudo certo. Se o comando não for reconhecido, instale o Git para Windows em [https://git-scm.com/download/win](https://git-scm.com/download/win), feche o PowerShell, abra novamente na pasta e repita o comando.

## 5. Faça o primeiro commit

Copie e execute estes comandos, um por vez:

```powershell
git init
git branch -M main
git add .
git status
git commit -m "Adiciona landing page de lanches"
```

O que cada comando faz:

- `git init`: prepara a pasta para usar Git.
- `git branch -M main`: define o nome da branch principal como `main`.
- `git add .`: seleciona os arquivos da pasta para serem enviados ao próximo commit.
- `git status`: mostra quais arquivos estão preparados para o commit.
- `git commit -m "..."`: salva uma versão do projeto no histórico local.

## 6. Conecte ao repositório do GitHub e envie

Use o endereço HTTPS que você copiou no passo 2. Troque o exemplo abaixo pelo seu endereço real:

```powershell
git remote add origin https://github.com/SEU-USUARIO/landing-mordi.git
git push -u origin main
```

O GitHub pode abrir uma tela para você confirmar sua autenticação. Siga as instruções que aparecerem.

Pronto: os arquivos do projeto estarão no seu repositório.

## 7. Publique o site com GitHub Pages

1. Abra o repositório no GitHub.
2. Entre em **Settings**.
3. No menu lateral, clique em **Pages**.
4. Na área **Build and deployment**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`.
6. Clique em **Save**.
7. Aguarde a publicação terminar. O GitHub mostrará o endereço do site nessa mesma tela.

O arquivo principal já está com o nome obrigatório `index.html`, então o GitHub Pages poderá usá-lo como página inicial.

## 8. Como enviar alterações depois

Quando você modificar o HTML, CSS, JavaScript ou adicionar o vídeo, abra o PowerShell novamente dentro da pasta e execute:

```powershell
git add .
git commit -m "Atualiza o site"
git push
```

Esses três comandos são o fluxo normal para enviar novas alterações depois do primeiro commit.

## Onde fica a página de vídeo?

A página separada é `experiencia.html`. Ela não aparece em nenhum link da navegação principal. Depois de publicar o site, o endereço será parecido com:

`https://SEU-USUARIO.github.io/landing-mordi/experiencia.html`

Atenção: ela fica fora da navegação, mas não é protegida por senha. Qualquer pessoa que descobrir o endereço poderá abri-la. A meta `noindex` apenas pede aos mecanismos de busca para não indexarem a página; não é um bloqueio de acesso.
