# Get Started

## エディタのセットアップ

公式ドキュメントを参照し、エディタのセットアップを行なってください。

https://docs.astro.build/en/editor-setup/


## XML サイトマップの設定

ベース作成時に XML サイトマップの設定を行ってください。
XMLサイトマップが不要な場合は各設定とパッケージの削除を行ってください。

### 設定手順
1〜3 の箇所に本番オリジンを指定する

1. `astro.config.mjs`の`defineConfig`の`site`

![https://i.gyazo.com/d45223831659218bc8353c9c06cb051d.png](https://i.gyazo.com/d45223831659218bc8353c9c06cb051d.png)

2. `.env.example`の`PUBLIC_ORIGIN`
![https://i.gyazo.com/ae5b6d43eaaacd96411a8cf946cc81cc.png](https://i.gyazo.com/ae5b6d43eaaacd96411a8cf946cc81cc.png)


3. `robots.txt`
![https://i.gyazo.com/87f785f7fee941e5181c2967939fede1.png](https://i.gyazo.com/87f785f7fee941e5181c2967939fede1.png)


## meta.yml フォルダについて

`meta.yml`はプロジェクト全体で共有したい値を扱います。

- ベースの meta 情報
- public domain
  など

## FLOCSS設計について

基本方針として、マルチクラスはなるべく使用しないようにお願いします。

- components: 最小単位を定義
- layout: レイアウトBlockを定義する（header, sidebar, footer）
- project: c-, l-, 以外の全てを定義する

## Tailwind CSSについて

UtilityクラスとしてTailwind CSSを導入しています。
プロジェクトで読み込んだUtilityクラスのみが出力されるので、CSSファイル容量を削減できます。

モディファイアとして指定するとバリエーションが多くなってしまう場合のユーティリティとしてご使用ください

使用する可能性のあるもの
[Padding](https://tailwindcss.com/docs/padding)
[Margin](https://tailwindcss.com/docs/margin)
[Text Transform](https://tailwindcss.com/docs/text-transform)

## Pre Commit

pre-commit で各種リンターやフォーマッターを実行しています。
Commit が中断された場合は、エラーを解消した上で再度 Commit お願いします。

- [commitlint](https://commitlint.js.org/)
- [markuplint](https://markuplint.dev/ja/)
- [Stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)
