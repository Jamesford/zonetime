import Head from 'next/head'

export default () => (
  <Head>
    <title>Zonetime</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/favicons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/static/favicons/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/static/favicons/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
    <meta name="msapplication-TileColor" content="#603cba" />
    <meta
      name="msapplication-config"
      content="/static/favicons/browserconfig.xml"
    />
    <meta name="theme-color" content="#ffffff" />

    <link rel="stylesheet" type="text/css" href="/static/style.css" />
    <style>{`
      html {
        background: #efefef;
        color: #333;
        font-family: sans-serif;
      }
    `}</style>
  </Head>
)
