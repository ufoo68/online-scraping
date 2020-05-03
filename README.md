# オンライン施設の情報収集用スクレイピング

[おうちハッカソン](https://connpass.com/event/174573/)にて作成。オンライン施設（に限らずですが）についてのGoogle検索情報をスクレイピングにて収集できます。

## 使い方

**オンライン水族館**の情報を**100件**取得するためのコマンド。`-`の引数には検索結果かた取り除きたい情報を付け足しています（省略可）。先頭の引数`data`がファイルの出力先を指定する箇所です。

```bash
node index.js data 100 オンライン水族館 -オンラインショップ -通販 -ニュース -オンラインストア
```

## 参考

[cheerio-httpcli で簡単スクレイピングして、Google検索一覧取得](https://qiita.com/hoshimado/items/32a29974f1edfb0ddf83)